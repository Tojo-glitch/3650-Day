// --- DATA GATE PICKER ---
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function populatePicker(id, start, end, format = x => x) {
    const el = document.getElementById(id);
    el.innerHTML = '<div class="h-24"></div>';
    for(let i=start; i<=end; i++) {
        const div = document.createElement('div');
        div.className = 'h-20 flex items-center justify-center text-xl text-rose-300 transition-all snap-center font-serif';
        div.dataset.val = i; div.textContent = format(i);
        el.appendChild(div);
    }
    el.innerHTML += '<div class="h-24"></div>';
    el.addEventListener('scroll', () => {
        const center = el.scrollTop + el.clientHeight/2;
        el.querySelectorAll('[data-val]').forEach(item => {
            const offset = Math.abs((item.offsetTop + 40) - center);
            if(offset < 40) {
                item.classList.add('text-rose-800', 'text-4xl', 'font-bold', 'scale-110');
                item.classList.remove('text-rose-300');
            } else {
                item.classList.remove('text-rose-800', 'text-4xl', 'font-bold', 'scale-110');
                item.classList.add('text-rose-300');
            }
        });
    });
}
populatePicker('p-day', 1, 31);
populatePicker('p-month', 1, 12, i => MONTHS[i-1]);
populatePicker('p-year', 2010, 2025);

function getSelected(id) {
    const el = document.getElementById(id);
    const center = el.scrollTop + el.clientHeight/2;
    let val = null;
    el.querySelectorAll('[data-val]').forEach(item => {
        if(Math.abs((item.offsetTop + 40) - center) < 40) val = item.dataset.val;
    });
    return val;
}

function verify() {
    const d = getSelected('p-day'), m = getSelected('p-month'), y = getSelected('p-year');
    if(d == 30 && m == 12 && y == 2015) {
        document.getElementById('light-burst').style.opacity = '1';
        setTimeout(() => { go('gift'); document.getElementById('light-burst').style.opacity = '0'; }, 1000);
    } else {
        const hint = document.getElementById('gate-hint');
        hint.style.opacity = '1'; setTimeout(() => hint.style.opacity = '0', 3000);
    }
}

// --- LUXURY BOX LOGIC ---
function openBox() { /* ... */ }

// --- GIFT CHAMBER LOGIC ---
function interactCoupon(type) { /* ... */ }
function closeAction() { /* ... */ }
function consumeGift() { /* ... */ }

// --- GLOBAL INTERACTIONS ---
function go(id) { /* ... */ }
function spawnStardust(e, count = 10) { /* ... */ }
function spawnMelody() { /* ... */ }
setInterval(spawnMelody, 8000);

// --- LOGO SECRET REVEAL ---
let logoTimer;
const logo = document.getElementById('logo-trigger');
logo.addEventListener('touchstart', () => { /* ... */ });
logo.addEventListener('touchend', () => clearTimeout(logoTimer));
function closeSecret() { document.getElementById('paper-reveal').classList.remove('active'); }

function startMessage() { /* ... */ }

window.onload = () => {
    ['p-day', 'p-month', 'p-year'].forEach(id => document.getElementById(id).scrollTop = 1);
};
