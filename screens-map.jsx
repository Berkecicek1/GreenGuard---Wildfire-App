/* GreenGuard — Map View (büyütülmüş, animasyonlu, scroll mekaniği) */
const { useState: useState_M, useEffect: useEffect_M, useRef: useRef_M } = React;

function MapScreen({ go, openMenu }) {
  const [selected, setSelected] = useState_M(0);
  const [sheetOpen, setSheetOpen] = useState_M(true);
  const scrollRef = useRef_M(null);

  // Pins on the big map. x,y are % of the wide map canvas (1200×1700).
  const pins = [
    { id: 0, x: 28, y: 22, kind: 'glass',     title: 'Glass waste',         time: '10m ago', priority: 'high',
      lat: '41.1850 N', lon: '29.0420 E', loc: 'Belgrad Forest, İstanbul', reporter: 'Aykut_37', rid: '#34821' },
    { id: 1, x: 64, y: 38, kind: 'campfire',  title: 'Unattended Campfire', time: '30m ago', priority: 'medium',
      lat: '41.1139 N', lon: '29.2122 E', loc: 'Polonezköy, İstanbul', reporter: 'Eren_D', rid: '#34833' },
    { id: 2, x: 42, y: 58, kind: 'smoke',     title: 'Heavy smoke',         time: '1h ago',  priority: 'medium',
      lat: '41.0931 N', lon: '29.0710 E', loc: 'Riva Köyü, İstanbul', reporter: 'Selin_K', rid: '#34842' },
    { id: 3, x: 78, y: 70, kind: 'flame',     title: 'Wildfire signal',     time: '2h ago',  priority: 'high',
      lat: '41.0312 N', lon: '29.2811 E', loc: 'Şile, İstanbul', reporter: 'Mert_22', rid: '#34855' },
    { id: 4, x: 22, y: 80, kind: 'cigarette', title: 'Cigarette debris',    time: '3h ago',  priority: 'low',
      lat: '41.0011 N', lon: '28.9920 E', loc: 'Maslak, İstanbul', reporter: 'Burak_9', rid: '#34870' },
  ];

  const sel = pins[selected];

  const scrollSelectingRef = useRef_M(false);

  // Auto-scroll the map to keep the selected pin visible (only when pin tapped, not when scroll-detected)
  useEffect_M(() => {
    if (scrollSelectingRef.current) {
      scrollSelectingRef.current = false;
      return;
    }
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const targetY = (sel.y / 100) * 1700 - el.clientHeight * 0.45;
    const targetX = (sel.x / 100) * 1200 - el.clientWidth / 2;
    el.scrollTo({ top: Math.max(0, targetY), left: Math.max(0, targetX), behavior: 'smooth' });
  }, [selected]);

  // Detect closest pin to viewport center while user scrolls — auto-select & auto-show sheet
  useEffect_M(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = null;
    let last = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const cx = el.scrollLeft + el.clientWidth / 2;
        const cy = el.scrollTop + el.clientHeight * 0.45;
        let best = 0, bestD = Infinity;
        pins.forEach((p, i) => {
          const px = (p.x / 100) * 1200;
          const py = (p.y / 100) * 1700;
          const d = Math.hypot(px - cx, py - cy);
          if (d < bestD) { bestD = d; best = i; }
        });
        if (best !== last && bestD < 280) {
          last = best;
          scrollSelectingRef.current = true;
          setSelected(best);
          setSheetOpen(true);
        }
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const pinIcon = (kind) => {
    switch (kind) {
      case 'glass': return <span style={{fontFamily:'monospace', color:'#e87b34', fontWeight:800, fontSize:14}}>[O]</span>;
      case 'campfire': return <Icon.Campfire size={16} color="white"/>;
      case 'smoke': return <Icon.Smoke size={16} color="white"/>;
      case 'flame': return <Icon.Flame size={16} color="white"/>;
      case 'cigarette': return <Icon.Cigarette size={16} color="white"/>;
      default: return null;
    }
  };
  const pinDot = (priority) => {
    return priority === 'high' ? '#d65656' : priority === 'medium' ? '#e87b34' : '#65a861';
  };

  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={openMenu}><Icon.Hamburger/></button>
        <div className="gg-title">Map View</div>
      </div>

      {/* Big scrollable map area */}
      <div ref={scrollRef} style={{
        flex: 1,
        overflow: 'auto',
        position: 'relative',
        background: '#1c1c1e',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}>
        <style>{`.gg-map-scroll::-webkit-scrollbar { display: none; }`}</style>
        <div style={{
          width: 1200, height: 1700, position: 'relative',
        }}>
          {/* SVG hazard overlay (red/orange/green zones, road network) */}
          <svg width="1200" height="1700" viewBox="0 0 1200 1700" style={{display:'block'}}>
            <defs>
              <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
            </defs>
            {/* Big red zone NW */}
            <path d="M0,0 L760,0 C720,160 660,250 540,360 C400,470 240,520 120,640 C40,720 0,640 0,500 Z"
              fill="#d44a3a"/>
            {/* Orange middle zone */}
            <path d="M760,0 L1200,0 L1200,520 C1080,560 980,520 880,580 C760,640 700,560 540,360 C660,250 720,160 760,0 Z"
              fill="#e87b34"/>
            {/* Bigger orange south */}
            <path d="M0,500 C40,640 120,640 200,720 C320,820 460,820 580,920 C720,1040 880,1020 960,1140 C1040,1240 1080,1380 1200,1400 L1200,520 C1080,560 980,520 880,580 C760,640 700,560 540,360 C400,470 240,520 120,640 Z"
              fill="#e87b34" opacity="0.95"/>
            {/* Red south-west */}
            <path d="M0,500 L0,1700 L420,1700 C400,1560 320,1440 240,1340 C180,1260 100,1200 60,1100 C20,1000 0,820 0,720 Z"
              fill="#d44a3a"/>
            {/* Green safe zone E */}
            <path d="M1200,1400 C1080,1380 1040,1240 960,1140 C880,1020 720,1040 580,920 C620,1080 720,1180 820,1280 C920,1380 1040,1500 1200,1530 Z"
              fill="#4faa56"/>
            <path d="M420,1700 L1200,1700 L1200,1530 C1040,1500 920,1380 820,1280 C720,1180 620,1080 580,920 C480,1020 460,1180 440,1340 C420,1480 410,1600 420,1700 Z"
              fill="#4faa56" opacity="0.92"/>

            {/* Road network — black squiggles */}
            <g stroke="#1a1a1a" strokeWidth="6" fill="none" strokeLinecap="round">
              <path d="M-20,180 C200,240 380,180 560,300 C740,420 880,500 1020,420 C1140,360 1220,340 1240,360"/>
              <path d="M-20,640 C200,560 380,620 580,720 C780,820 940,840 1080,800 C1180,780 1220,780 1240,800"/>
              <path d="M-20,1100 C220,1020 480,1100 640,1240 C800,1380 980,1440 1160,1500 C1200,1520 1230,1540 1240,1540"/>
              <path d="M180,-20 C140,200 200,440 320,640 C440,840 540,1020 580,1240 C620,1460 580,1620 560,1720"/>
              <path d="M820,-20 C800,200 760,400 700,600 C640,820 600,1020 660,1240 C720,1480 800,1640 820,1720"/>
            </g>
            {/* thin minor roads */}
            <g stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7">
              <path d="M-20,360 C200,440 480,400 700,500"/>
              <path d="M300,200 C420,380 460,520 480,720"/>
              <path d="M-20,920 C220,860 440,920 600,1080"/>
              <path d="M900,200 C920,460 940,720 980,980"/>
              <path d="M0,1380 C260,1320 540,1380 760,1500"/>
            </g>
          </svg>

          {/* Pins */}
          {pins.map((p, i) => (
            <button key={p.id} onClick={() => setSelected(i)} style={{
              position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
              transform: 'translate(-50%, -50%)',
              border: 'none', background: 'transparent', padding: 0, cursor: 'pointer',
            }}>
              {/* pulse ring */}
              <div style={{
                position:'absolute', inset: -20, borderRadius: '50%',
                background: pinDot(p.priority), opacity: 0.5,
              }} className="gg-pulse"/>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'white',
                border: `4px solid ${pinDot(p.priority)}`,
                boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                position: 'relative', zIndex: 2,
                display:'flex', alignItems:'center', justifyContent:'center',
                transform: i === selected ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform .25s',
              }}/>
              {/* tooltip on selected */}
              {i === selected && (
                <div style={{
                  position: 'absolute', left: 22, bottom: 22,
                  background: '#1c1c1e', color: 'white',
                  padding: '8px 12px', borderRadius: 10,
                  fontSize: 14, fontWeight: 700,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
                  animation: 'gg-rise .25s ease-out',
                  display:'flex', alignItems:'center', gap: 8,
                }}>
                  {pinIcon(p.kind)}
                  <span>{p.title}</span>
                  <span style={{fontWeight: 500, color:'var(--muted)'}}>({p.time})</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Floating right-side map controls */}
      <div style={{
        position: 'absolute', right: 14, top: 130, zIndex: 20,
        display:'flex', flexDirection:'column', gap: 10,
      }}>
        <FabBtn icon={<Icon.Layers/>}/>
        <FabBtn icon={<Icon.Locate/>}/>
        <FabBtn icon={<Icon.Plus/>}/>
        <FabBtn icon={<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 11h12" stroke="white" strokeWidth="2.4" strokeLinecap="round"/></svg>}/>
      </div>

      {/* Bottom sheet: tap selected pin */}
      {sheetOpen ? (
        <div className="gg-sheet" style={{paddingBottom: 92}}>
          <div
            className="grabber"
            onClick={() => setSheetOpen(false)}
            onMouseDown={(e) => { e.currentTarget.dataset.startY = e.clientY; e.currentTarget.dataset.dragging = '1'; }}
            onMouseMove={(e) => {
              if (!e.currentTarget.dataset.dragging) return;
              const dy = e.clientY - parseFloat(e.currentTarget.dataset.startY || '0');
              if (dy > 30) { e.currentTarget.dataset.dragging = ''; setSheetOpen(false); }
            }}
            onMouseUp={(e) => { e.currentTarget.dataset.dragging = ''; }}
            onTouchStart={(e) => { e.currentTarget.dataset.startY = e.touches[0].clientY; }}
            onTouchMove={(e) => {
              const dy = e.touches[0].clientY - parseFloat(e.currentTarget.dataset.startY || '0');
              if (dy > 30) setSheetOpen(false);
            }}
            style={{cursor:'grab'}}
          />
          <div style={{display:'flex', alignItems:'center', gap: 14}}>
            <div style={{width: 42, height: 42, borderRadius: 10, background:'#3a3a3c', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
              {sel.kind === 'campfire' && <Icon.Campfire size={26}/>}
              {sel.kind === 'glass' && <Icon.GlassBottle size={26}/>}
              {sel.kind === 'smoke' && <Icon.Smoke size={26}/>}
              {sel.kind === 'flame' && <Icon.Flame size={26}/>}
              {sel.kind === 'cigarette' && <Icon.Cigarette size={26}/>}
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 16, fontWeight: 800}}>{sel.title}</div>
              <div style={{fontSize: 12, color:'var(--muted)', marginTop: 2}}>Reported {sel.time}</div>
            </div>
            <span className={`gg-chip ${sel.priority}`}>{sel.priority === 'high' ? 'High Priority' : sel.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}</span>
          </div>
          <div className="gg-divider"/>
          <div style={{display:'flex', alignItems:'center', gap: 14}}>
            <div style={{width: 22, display:'flex', justifyContent:'center'}}><Icon.Pin/></div>
            <div style={{flex:1}}>
              <div style={{fontSize: 15, fontWeight: 800}}>{sel.loc}</div>
              <div style={{fontSize: 12, color:'var(--muted)', marginTop: 2}}>{sel.lat}, {sel.lon}</div>
            </div>
          </div>
          <div className="gg-divider"/>
          <div style={{display:'flex', alignItems:'center', gap: 14}}>
            <div style={{width: 22, display:'flex', justifyContent:'center'}}><Icon.TabProfile active/></div>
            <div style={{flex:1}}>
              <div style={{fontSize: 15, fontWeight: 800}}>Reported by</div>
              <div style={{fontSize: 13, color:'var(--muted)', marginTop: 2}}>{sel.reporter}</div>
            </div>
            <div style={{fontSize: 13, color:'var(--muted)'}}>Report ID: {sel.rid}</div>
          </div>
          <div style={{marginTop: 14, display:'flex', gap: 10}}>
            <button onClick={() => go('alertDetail', { a: 'flame' })} style={{
              flex: 1, padding: '12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.18)',
              background: 'transparent', color: 'white', fontWeight: 700, cursor:'pointer', fontFamily: 'var(--font)',
            }}>View Details</button>
            <button onClick={() => go('reportRisk')} style={{
              flex: 1, padding: '12px', borderRadius: 12, border: 'none',
              background: 'var(--teal)', color: 'white', fontWeight: 800, cursor:'pointer', fontFamily: 'var(--font)',
            }}>Confirm</button>
          </div>
        </div>
      ) : (
        /* Sheet kapalıyken: yukarı sürüklenebilir mini-handle (iPhone'daki gibi) */
        <button
          onClick={() => setSheetOpen(true)}
          onMouseDown={(e) => { e.currentTarget.dataset.startY = e.clientY; e.currentTarget.dataset.dragging = '1'; }}
          onMouseMove={(e) => {
            if (!e.currentTarget.dataset.dragging) return;
            const dy = e.clientY - parseFloat(e.currentTarget.dataset.startY || '0');
            if (dy < -15) { e.currentTarget.dataset.dragging = ''; setSheetOpen(true); }
          }}
          onMouseUp={(e) => { e.currentTarget.dataset.dragging = ''; }}
          onTouchStart={(e) => { e.currentTarget.dataset.startY = e.touches[0].clientY; }}
          onTouchMove={(e) => {
            const dy = e.touches[0].clientY - parseFloat(e.currentTarget.dataset.startY || '0');
            if (dy < -15) setSheetOpen(true);
          }}
          style={{
            position: 'absolute', left: 0, right: 0, bottom: 92,
            padding: '12px 0 16px', background:'transparent',
            border:'none', cursor:'grab', zIndex: 10,
            display:'flex', flexDirection:'column', alignItems:'center', gap: 6,
          }}>
          <div style={{
            width: 56, height: 5, borderRadius: 3,
            background:'rgba(255,255,255,0.65)',
            boxShadow:'0 0 10px rgba(0,0,0,0.4)',
          }}/>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 0.6,
            color:'var(--text-2)', textTransform:'uppercase',
            background:'rgba(28,28,30,0.85)', padding:'4px 10px', borderRadius: 8,
            backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
          }}>Swipe up · {sel.title}</div>
        </button>
      )}
    </div>
  );
}

function FabBtn({ icon, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 42, height: 42, borderRadius: 10,
      background: 'rgba(28,28,30,0.92)',
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      border: '0.5px solid rgba(255,255,255,0.12)',
      display:'flex', alignItems:'center', justifyContent:'center',
      cursor:'pointer',
      boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
    }}>{icon}</button>
  );
}

window.MapScreen = MapScreen;
