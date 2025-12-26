document.addEventListener("DOMContentLoaded", () => {

  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const hint = document.getElementById("hint");
  const btn = document.getElementById("unlockBtn");

  // Populate day
  for (let i = 1; i <= 31; i++) {
    day.innerHTML += `<option value="${i}">${i}</option>`;
  }

  // Month
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];
  months.forEach((m, i) => {
    month.innerHTML += `<option value="${i+1}">${m}</option>`;
  });

  // Year
  for (let y = 2010; y <= 2025; y++) {
    year.innerHTML += `<option value="${y}">${y}</option>`;
  }

  btn.addEventListener("click", () => {
    const d = Number(day.value);
    const m = Number(month.value);
    const y = Number(year.value);

    if (d === 30 && m === 12 && y === 2015) {
      hint.textContent = "Unlocked 💖";
      // 👉 ไปหน้าถัดไปในอนาคต
    } else {
      hint.textContent = "That date feels close… but not yet ✨";
    }
  });

});
