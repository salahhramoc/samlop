
(()=>{
const FED={single:{std:16100,b:[[12400,.10],[50400,.12],[105700,.22],[201775,.24],[256225,.32],[640600,.35],[Infinity,.37]]},
married:{std:32200,b:[[24800,.10],[100800,.12],[211400,.22],[403550,.24],[512450,.32],[768700,.35],[Infinity,.37]]}};
const SS_BASE=184500,ADDL={single:200000,married:250000};
const ST={AL:["Alabama",4],AK:["Alaska",0],AZ:["Arizona",2.5],AR:["Arkansas",3.9],CA:["California",6],CO:["Colorado",4.4],CT:["Connecticut",5],DE:["Delaware",5],FL:["Florida",0],GA:["Georgia",5.19],HI:["Hawaii",6.5],ID:["Idaho",5.3],IL:["Illinois",4.95],IN:["Indiana",3],IA:["Iowa",3.8],KS:["Kansas",5],KY:["Kentucky",4],LA:["Louisiana",3],ME:["Maine",6],MD:["Maryland",4.75],MA:["Massachusetts",5],MI:["Michigan",4.25],MN:["Minnesota",6],MS:["Mississippi",4],MO:["Missouri",4.7],MT:["Montana",5],NE:["Nebraska",5],NV:["Nevada",0],NH:["New Hampshire",0],NJ:["New Jersey",4.5],NM:["New Mexico",4.5],NY:["New York",5.5],NC:["North Carolina",3.99],ND:["North Dakota",1.8],OH:["Ohio",3],OK:["Oklahoma",4],OR:["Oregon",7.5],PA:["Pennsylvania",3.07],RI:["Rhode Island",4.5],SC:["South Carolina",5],SD:["South Dakota",0],TN:["Tennessee",0],TX:["Texas",0],UT:["Utah",4.5],VT:["Vermont",5.5],VA:["Virginia",5],WA:["Washington",0],WV:["West Virginia",4],WI:["Wisconsin",5],WY:["Wyoming",0]};
const $=id=>document.getElementById(id);
const f=n=>n.toLocaleString('en-US',{style:'currency',currency:'USD'});
const num=s=>parseFloat(String(s).replace(/[^0-9.]/g,''))||0;
const body=document.body;let mode=body.dataset.mode||'annual';
const vals={annual:75000,hourly:36};
$('state').innerHTML=Object.entries(ST).map(([k,v])=>`<option value="${k}">${v[0]}</option>`).join('');
$('state').value='CA';
function annualGross(){const p=num($('pay').value);
 if(mode==='annual')return p;
 const h=num($('hrs').value),o=num($('ot').value);return p*52*(h+1.5*o)}
function fedTax(g,fs){let t=Math.max(0,g-FED[fs].std),tax=0,prev=0;
 for(const[c,r]of FED[fs].b){if(t>prev){tax+=(Math.min(t,c)-prev)*r}prev=c}return tax}
function calc(){
 const g=annualGross(),fs=$('fs').value,n=+$('freq').value,st=$('state').value;
 const fed=fedTax(g,fs),state=Math.max(0,g-5000)*ST[st][1]/100;
 const fica=Math.min(g,SS_BASE)*.062+g*.0145+Math.max(0,g-ADDL[fs])*.009;
 const taxes=fed+state+fica,net=g-taxes,pct=g>0?net/g:0;
 const per=x=>x/n;
 $('net').textContent=f(per(net));
 $('per').textContent='per paycheck • '+$('freq').selectedOptions[0].text.toLowerCase();
 $('pct').textContent=Math.round(pct*100)+'%';
 const C=2*Math.PI*89;$('arc').setAttribute('stroke-dasharray',`${C*pct} ${C}`);
 $('bGross').textContent=f(per(g));$('bFed').textContent='−'+f(per(fed));
 $('bState').textContent='−'+f(per(state));$('bFica').textContent='−'+f(per(fica));$('bNet').textContent=f(per(net));
 $('bAnnual').textContent=f(g)+' gross / '+f(net)+' net per year';}
function setMode(m){
 vals[mode]=$('pay').value;mode=m;
 document.querySelectorAll('.seg button').forEach(b=>b.classList.toggle('on',b.dataset.m===m));
 $('extra').classList.toggle('open',m==='hourly');
 $('payLbl').textContent=m==='hourly'?'Hourly rate':'Annual gross pay';
 $('pay').value=fmt(vals[m]);calc();}
const fmt=v=>{const n=num(v);return n?'$'+n.toLocaleString('en-US',{maximumFractionDigits:2}):''};
document.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>setMode(b.dataset.m));
['pay','hrs','ot'].forEach(i=>$(i).addEventListener('input',calc));
$('pay').addEventListener('blur',e=>e.target.value=fmt(e.target.value));
['freq','fs','state'].forEach(i=>$(i).addEventListener('change',calc));
$('freq').value='26';$('pay').value=fmt(mode==='hourly'?vals.hourly:vals.annual);setMode(mode);
})();
