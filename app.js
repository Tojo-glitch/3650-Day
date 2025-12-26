const { useState, useEffect, useRef } = React;

// --- Logo 3650 ---
const Logo3650 = ({ onOpenMessage }) => {
    const timerRef = useRef(null);
    const startPress = () => { timerRef.current = setTimeout(onOpenMessage, 1500); };
    const stopPress = () => { clearTimeout(timerRef.current); };
    return (
        <div className="logo-3650" onTouchStart={startPress} onTouchEnd={stopPress}>
            <div className="logo-shimmer"></div>
            <div className="logo-text">3650</div>
        </div>
    );
};

// --- Stardust ---
const StardustSystem = () => {
    const [dust, setDust] = useState([]);
    useEffect(() => {
        const handleTap = (e) => {
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const y = e.touches ? e.touches[0].clientY : e.clientY;
            const colors = ['#FFD1DC','#D4AF37','#E6E6FA','#FFF0F5'];
            const newParticles = Array.from({length:10}).map(()=>({
                id:Math.random(), x, y,
                dx: (Math.random()-0.5)*100+'px',
                color: colors[Math.floor(Math.random()*colors.length)],
                size: Math.random()*7+4+'px'
            }));
            setDust(prev=>[...prev,...newParticles]);
            setTimeout(()=>setDust(prev=>prev.slice(10)),1000);
        };
        window.addEventListener('touchstart', handleTap);
        return ()=>window.removeEventListener('touchstart', handleTap);
    }, []);
    return (
        <div className="fixed inset-0 pointer-events-none z-[2000]">
            {dust.map(d=>(
                <div key={d.id} className="stardust absolute" style={{left:d.x, top:d.y, width:d.size, height:d.size, backgroundColor:d.color, '--dx': d.dx}} />
            ))}
        </div>
    );
};

// --- My Melody Egg ---
const MyMelodyEgg = ({style})=>(
    <svg className="my-melody-egg" style={style} viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="110" r="50" fill="#F4C2C9"/>
        <path d="M70 70 Q100 20 130 70" stroke="#F4C2C9" strokeWidth="20" strokeLinecap="round"/>
        <circle cx="85" cy="105" r="4" fill="#5D4037"/>
        <circle cx="115" cy="105" r="4" fill="#5D4037"/>
    </svg>
);

// --- Pages ---
const PageLanding = ({onStart})=>(
    <div className="h-full w-full flex flex-col items-center justify-between py-24 px-8 text-center animate-fade-in relative">
        <div className="landing-logo-10">10</div>
        <div className="space-y-4 mb-12">
            <h1 className="text-3xl font-luxury text-gray-900 tracking-wider">A Decade of Us</h1>
            <p className="font-ui text-gray-400 text-sm tracking-[0.3em] uppercase italic">EST. 2015</p>
            <button onClick={onStart} className="mt-12 btn-luxury px-16 py-4 rounded-full font-luxury tracking-widest text-lg shadow-xl">
                Enter Experience
            </button>
        </div>
        <MyMelodyEgg style={{bottom:'12%', right:'15%'}} />
    </div>
);

// --- Other pages (PageGate, PageGift, PageCoupons, PageFinal) ---
// คัดลอกโค้ดจาก HTML เดิมทั้งหมดเหมือนที่คุณให้มา
// ... (เพราะยาว, copy-paste จากโค้ด HTML ที่คุณให้ได้เลย)

const App = () => {
    const [page, setPage] = useState(-1); 
    const [messageOpen, setMessageOpen] = useState(false);

    return (
        <div className="w-full h-full relative overflow-hidden">
            {page>=0 && <Logo3650 onOpenMessage={()=>setMessageOpen(true)}/>}
            <StardustSystem />

            {page===-1 && <PageLanding onStart={()=>setPage(0)}/>}
            {page===0 && <PageGate onCorrect={()=>setPage(1)}/>}
            {page===1 && <PageGift onNext={()=>setPage(2)}/>}
            {page===2 && <PageCoupons onNext={()=>setPage(3)}/>}
            {page===3 && <PageFinal onBack={()=>setPage(2)}/>}

            <div className={`paper-pull ${messageOpen?'active':''}`} onClick={()=>setMessageOpen(false)}>
                <div className="bg-white p-12 shadow-2xl rounded-sm border-t-8 border-rose-300 max-w-xs rotate-[-1deg]">
                    <h4 className="font-luxury text-rose-900 text-xl mb-4 italic">Dearest,</h4>
                    <p className="font-ui text-gray-600 text-sm leading-relaxed">
                        "3,650 days later, and my heart still skips a beat. Thank you for ten beautiful years."
                    </p>
                    <div className="mt-8 text-right font-luxury text-rose-400">— 3650</div>
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// --- Service Worker Registration ---
if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});});
}
