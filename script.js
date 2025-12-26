const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function populatePicker(id,start,end,format=x=>x){
    const el=document.getElementById(id);
    el.innerHTML='<div class="h-24"></div>';
    for(let i=start;i<=end;i++){
        const div=document.createElement('div');
        div.className='snap-center';
        div.dataset.val=i;
        div.textContent=format(i);
        el.appendChild(div);
    }
    el.innerHTML+='<div class="h-24"></div>';
}
populatePicker('p-day',1,31);
populatePicker('p-month',1,12,i=>MONTHS[i-1]);
populatePicker('p-year',2010,2025);

function updatePickerActive(id){
    const el=document.getElementById(id);
    const center=el.scrollTop+el.clientHeight/2;
    el.querySelectorAll('[data-val]').forEach(item=>{
        const offset=Math.abs((item.offsetTop+item.offsetHeight/2)-center);
        if(offset<item.offsetHeight/2){ item.classList.add('active'); }
        else{ item.classList.remove('active'); }
    });
}

['p-day','p-month','p-year'].forEach(id=>{
    const el=document.getElementById(id);
    el.addEventListener('scroll',()=>updatePickerActive(id));
    updatePickerActive(id);
});

function getSelected(id){
    const el=document.getElementById(id);
    const center=el.scrollTop+el.clientHeight/2;
    let val=null;
    el.querySelectorAll('[data-val]').forEach(item=>{
        if(Math.abs((item.offsetTop+item.offsetHeight/2)-center)<item.offsetHeight/2) val=item.dataset.val;
    });
    return val;
}

function verify(){
    const d=getSelected('p-day'), m=getSelected('p-month'), y=getSelected('p-year');
    if(d==30 && m==12 && y==2015){
        document.getElementById('light-burst').style.opacity='1';
        setTimeout(()=>{go('gift');document.getElementById('light-burst').style.opacity='0';},1000);
    }else{
        const hint=document.getElementById('gate-hint');
        hint.style.opacity='1';
        setTimeout(()=>hint.style.opacity='0',3000);
    }
}

window.onload=()=>{
    ['p-day','p-month','p-year'].forEach(id=>{
        const el=document.getElementById(id);
        el.scrollTop=1;
    });
};

function go(id){
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function spawnStardust(e,count=10){}
function closeSecret(){}
