// ปุ่ม Enter ของ Landing Page
function enterSite() {
    document.getElementById('landing').classList.remove('active');
    go('gate'); // เรียกใช้ฟังก์ชัน go() ของโค้ดเดิม
}

// REGISTER SERVICE WORKER
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker Registered'))
      .catch(err => console.log('Service Worker Failed', err));
  });
}

// SPA FUNCTION ของโค้ดเดิม
function go(id) {
    const current = document.querySelector('.screen.active');
    if(current) {
        current.style.opacity = '0';
        current.style.transform = 'scale(0.95) translateY(-20px)';
    }
    setTimeout(() => {
        if(current) current.classList.remove('active');
        const next = document.getElementById(id);
        next.classList.add('active');
        next.style.opacity = '0';
        next.style.transform = 'scale(1.08)';
        setTimeout(() => {
            next.style.transform = 'scale(1)';
            next.style.opacity = '1';
        }, 50);
    }, 800);
}

// ตัวอย่างฟังก์ชัน spawnStardust (copy ของเดิม)
function spawnStardust(e, count = 10) {
    // สามารถเอาโค้ด stardust จากไฟล์เดิมมาได้เลย
}
