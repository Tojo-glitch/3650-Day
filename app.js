const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function createPicker(id, values) {
  const col = document.getElementById(id);
  const inner = document.createElement("div");
  inner.className = "col-inner";

  let index = 0;

  values.forEach(v => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = v;
    inner.appendChild(div);
  });

  col.appendChild(inner);

  function render() {
    inner.style.transform = `translateY(${60 - index * 40}px)`;
    [...inner.children].forEach((el,i)=>{
      el.classList.toggle("active", i === index);
    });
  }

  col.addEventListener("click", e => {
    index = (index + 1) % values.length;
    render();
  });

  render();

  return () => values[index];
}

const getDay = createPicker("day", Array.from({length:31},(_,i)=>i+1));
const getMonth = createPicker("month", MONTHS);
const getYear = createPicker("year", Array.from({length:16},(_,i)=>2010+i));

function verify() {
  if (getDay()==30 && getMonth()=="Dec" && getYear()==2015) {
    alert("ผ่าน! ไปหน้าถัดไปได้แล้ว 🎉");
  } else {
    const h = document.getElementById("hint");
    h.style.opacity = 1;
    setTimeout(()=>h.style.opacity=0,2000);
  }
}
