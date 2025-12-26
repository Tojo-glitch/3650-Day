document.addEventListener("DOMContentLoaded", () => {

  const dayWheel = document.getElementById("dayWheel");
  const monthWheel = document.getElementById("monthWheel");
  const yearWheel = document.getElementById("yearWheel");
  const btn = document.getElementById("unlockBtn");
  const hint = document.getElementById("hint");

  function buildWheel(el, items) {
    el.innerHTML = '<div></div><div></div>';
    items.forEach(v => {
      const d = document.createElement("div");
      d.textContent = v;
      el.appendChild(d);
    });
    el.innerHTML += '<div></div><div></div>';
  }

  buildWheel(dayWheel, [...Array(31)].map((_,i)=>i+1));
  buildWheel(monthWheel, ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]);
  buildWheel(yearWheel, [...Array(16)].map((_,i)=>2010+i));

  function bindScroll(el) {
    el.addEventListener("scroll", () => {
      const center = el.scrollTop + el.clientHeight / 2;
      [...el.children].forEach(c => {
        const offset = c.offsetTop + c.offsetHeight / 2;
        c.classList.toggle("active", Math.abs(offset - center) < 18);
      });
    });
  }

  [dayWheel, monthWheel, yearWheel].forEach(bindScroll);

  btn.addEventListener("click", () => {
    const d = [...dayWheel.children].find(x=>x.classList.contains("active"))?.textContent;
    const m = [...monthWheel.children].find(x=>x.classList.contains("active"))?.textContent;
    const y = [...yearWheel.children].find(x=>x.classList.contains("active"))?.textContent;

    if (d=="30" && m=="Dec" && y=="2015") {
      hint.textContent = "Unlocked 💖";
    } else {
      hint.textContent = "Almost there… ✨";
    }
  });

});
