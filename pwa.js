
(()=>{
let dp=null;const btns=document.querySelectorAll('[data-install]'),dlg=document.getElementById('installDlg');
const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
if(standalone)btns.forEach(b=>b.parentElement.style.display='none');
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e});
addEventListener('appinstalled',()=>btns.forEach(b=>b.parentElement.style.display='none'));
const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
btns.forEach(b=>b.onclick=async e=>{e.preventDefault();
 if(dp){dp.prompt();await dp.userChoice;dp=null;return}
 dlg.querySelector('.ios').hidden=!ios;dlg.querySelector('.gen').hidden=ios;dlg.showModal()});
dlg.querySelector('button').onclick=()=>dlg.close();
const bg=document.querySelector('.burger'),ul=document.querySelector('.nav ul');
bg.onclick=()=>{const o=ul.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
})();
