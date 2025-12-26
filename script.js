// --- COUNTDOWN LOGIC ---
const TARGET_DATE = new Date("Dec 27, 2025 17:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = TARGET_DATE - now;

    if (diff <= 0) {
        unlockSite();
        return;
    }

    document.getElementById('lock-screen').style.display = 'flex';
    document.getElementById('gate').classList.remove('active'); // ซ่อนหน้าแรกไว้ก่อน

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = d.toString().padStart(2, '0');
    document.getElementById('hours').textContent = h.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
}

function unlockSite() {
    const lock = document.getElementById('lock-screen');
    if (lock.style.display === 'none' && document.getElementById('gate').classList.contains('active')) return;

    lock.style.opacity = '0';
    lock.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        lock.style.display = 'none';
        const gate = document.getElementById('gate');
        gate.classList.add('active');
        gate.style.opacity = '1';
    }, 1500);
}

// เรียกใช้งาน
const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // รันทันทีเมื่อโหลดหน้า

// เพิ่มการคลิกแล้วมีละออง My Melody (Particles)
document.getElementById('lock-screen').addEventListener('click', (e) => {
    spawnStardust(e, 15);
    // ฟังก์ชันเสริมสำหรับ icon พิเศษ
    const icons = ['🐰', '🎀', '🌸'];
    const icon = document.createElement('div');
    icon.className = 'fixed pointer-events-none z-[9999] text-xl';
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.left = e.clientX + 'px';
    icon.style.top = e.clientY + 'px';
    document.body.appendChild(icon);
    icon.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: 'translateY(-100px) scale(2)', opacity: 0 }
    ], { duration: 1000 }).onfinish = () => icon.remove();
});
