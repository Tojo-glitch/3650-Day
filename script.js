// --- Picker Data ---
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function populatePicker(id, start, end, format = x => x) {
  const el = document.getElementById(id);
  el.innerHTML = '';
  for(let i=start;i<=end;i++){
    const div = document.createElement('div');
    div.textContent = format(i);
    div.dataset.val = i;
    el.appendChild(div);
  }
  highlightCenter(el);
  el.addEventListener('scroll', ()=> highlightCenter(el));
}
function highlightCenter(el){
  const center = el.scrollTop + el.clientHeight/2;
  el.querySelectorAll('div').forEach(div=>{
    const offset = Math.abs(div.offsetTop + div.offsetHeight/2 - center);
    div.classList.toggle('selected', offset < 20);
  });
}
populatePicker('p-day', 1, 31);
populatePicker('p-month', 1, 12, i => MONTHS[i-1]);
populatePicker('p-year', 2010, 2025);

function getSelected(id){
  const el = document.getElementById(id);
  const center = el.scrollTop + el.clientHeight/2;
  let val=null;
  el.querySelectorAll('div').forEach(div=>{
    if(Math.abs(div.offsetTop + div.offsetHeight/2 - center) < 20) val = div.dataset.val;
  });
  return val;
}

// --- Unlock Button ---
document.getElementById('unlock-btn').addEventListener('click', ()=>{
  const d=getSelected('p-day'), m=getSelected('p-month'), y=getSelected('p-year');
  if(d==30 && m==12 && y==2015){
    document.getElementById('light-burst').style.opacity='1';
    setTimeout(()=>document.getElementById('light-burst').style.opacity='0',1000);
    alert("Unlocked! 🎉"); // เปลี่ยนเป็นไปหน้าต่อไป
  } else {
    const hint = document.getElementById('hint');
    hint.style.opacity='1';
    setTimeout(()=>hint.style.opacity='0',3000);
  }
});
