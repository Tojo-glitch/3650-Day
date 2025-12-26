// LANDING PAGE ENTER
function enterSite() {
    document.getElementById('landing').classList.remove('active');
    go('gate');
}

// SPA NAVIGATION
function go(id) {
    const current = document.querySelector('.screen.active');
    if(current) current.classList.remove('active');
    const next = document.getElementById(id);
    next.classList.add('active');
}

// PICKER
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function populatePicker(id, start, end, format=x=>x){
  const el = document.getElementById(id);
  el.innerHTML = '';
  for(let i=start;i<=end;i++){
    const div = document.createElement('div'); div.textContent = format(i); div.dataset.val=i;
    el.appendChild(div);
  }
}
populatePicker('p-day',1,31);
populatePicker('p-month',1,12,i=>MONTHS[i-1]);
populatePicker('p-year',2010,2025);

function getSelected(id){
  const el=document.getElementById(id);
  const center = el.scrollTop + el.clientHeight/2;
  let val=null;
  el.querySelectorAll('[data-val]').forEach(item=>{
    if(Math.abs(item.offsetTop+25 - center)<30) val=item.dataset.val;
  });
  return val;
}

function verify(){
  const d=getSelected('p-day'), m=getSelected('p-month'), y=getSelected('p-year');
  if(d==30 && m==12 && y==2015){
    go('gift');
  }else{
    const hint=document.getElementById('gate-hint');
    hint.style.opacity='1';
    setTimeout(()=>hint.style.opacity='0',3000);
  }
}

// SPA FLOATING HEART EXAMPLE
setInterval(()=>{
  const h=document.createElement('div');
  h.className='floating-heart';
  h.style.position='absolute';
  h.innerText=['💖','🌸','✨','💕','🌹'][Math.floor(Math.random()*5)];
  h.style.left=Math.random()*window.innerWidth+'px';
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),6000);
},700);
