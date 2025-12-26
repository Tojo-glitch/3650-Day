// Enter button click
document.getElementById('enter-btn').addEventListener('click', () => {
  alert("Welcome to the 10th Anniversary Celebration!"); 
  // ต่อ: navigate to next page
});

// --- Simple floating particle system ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0;i<80;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    d: Math.random()*1
  });
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = 'rgba(255,192,203,0.6)';
  ctx.beginPath();
  particles.forEach(p=>{
    ctx.moveTo(p.x,p.y);
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2,true);
  });
  ctx.fill();
  updateParticles();
}

function updateParticles(){
  particles.forEach(p=>{
    p.y += 0.5*p.d;
    if(p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random()*canvas.width;
    }
  });
  requestAnimationFrame(drawParticles);
}

drawParticles();

// Handle resize
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
