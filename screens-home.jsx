/* GreenGuard — Home, SideMenu, AlertDetail, Notifications */
const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────
// Risk Gauge — semicircle, color segments, animated needle
// ─────────────────────────────────────────────────────────────
function RiskGauge({ value = 78 }) {
  // Sabit konum: kırmızı bölgenin ortasına, sağ üste denk gelsin
  const a = 67.5; // → needle 157.5° (kırmızı segmentin ortası, sağ üst)

  const label =
    value < 33 ? 'LOW' :
    value < 55 ? 'MODERATE' :
    value <= 78 ? 'HIGH' : 'EXTREME';
  const labelColor =
    value < 33 ? '#65a861' :
    value < 55 ? '#e0b03a' :
    value < 78 ? '#d65656' : '#d65656';

  // arc segments
  const cx = 130, cy = 130, r = 105;
  const polar = (deg, rad = r) => {
    const rr = (deg - 180) * Math.PI / 180;
    return [cx + rad * Math.cos(rr), cy + rad * Math.sin(rr)];
  };
  const arc = (a1, a2, color) => {
    const [x1, y1] = polar(a1);
    const [x2, y2] = polar(a2);
    const large = (a2 - a1) > 180 ? 1 : 0;
    return (
      <path d={`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`}
        stroke={color} strokeWidth="22" strokeLinecap="butt" fill="none"/>
    );
  };

  return (
    <div style={{position:'relative', width: 280, height: 175, margin: '6px auto 0'}}>
      <svg width="280" height="170" viewBox="0 0 280 170" style={{display:'block'}}>
        <defs>
          <filter id="needleShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="2" result="off"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* arc segments — green | yellow | orange | red */}
        {(() => {
          const cx2 = 140, cy2 = 130, r2 = 95;
          const polar2 = (deg) => {
            const rr = (deg - 180) * Math.PI / 180;
            return [cx2 + r2 * Math.cos(rr), cy2 + r2 * Math.sin(rr)];
          };
          const arc2 = (a1, a2, color, key) => {
            const [x1, y1] = polar2(a1);
            const [x2, y2] = polar2(a2);
            return (
              <path key={key} d={`M ${x1} ${y1} A ${r2} ${r2} 0 0 1 ${x2} ${y2}`}
                stroke={color} strokeWidth="26" strokeLinecap="butt" fill="none"/>
            );
          };
          return [
            arc2(0,   45,  '#5aa84e', 'g'),
            arc2(45,  90,  '#e6a93a', 'y'),
            arc2(90,  135, '#e6723a', 'o'),
            arc2(135, 180, '#d8453a', 'r'),
          ];
        })()}
        {/* needle — pivots from gauge center, points right at 0deg */}
        <g style={{transformOrigin: '140px 130px', transform: `rotate(-22.5deg)`}} filter="url(#needleShadow)">
          <path d="M 140 122 Q 195 126 215 130 Q 195 134 140 138 Z" fill="white"/>
          <circle cx="140" cy="130" r="11" fill="white"/>
        </g>
        <circle cx="140" cy="130" r="3.5" fill="#1c1c1e"/>
      </svg>
      <div style={{
        position:'absolute', left: 0, right: 0, top: 138, textAlign:'center',
        fontSize: 28, fontWeight: 800, letterSpacing: 2, color: labelColor,
      }}>{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Home Dashboard
// ─────────────────────────────────────────────────────────────
function HomeScreen({ go, openMenu, riskValue }) {
  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={openMenu}><Icon.Hamburger/></button>
        <div className="gg-title">Home Dashboard</div>
      </div>
      <div className="gg-body">
        {/* Risk Meter card */}
        <div className="gg-card gg-up" style={{padding: '16px 18px 18px'}}>
          <div style={{textAlign:'center', fontSize: 18, fontWeight: 700, letterSpacing: 0.5, marginBottom: 6}}>
            WILDFIRE RISK METER
          </div>
          <RiskGauge value={riskValue}/>
          <div style={{
            display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
            marginTop: 14, paddingTop: 14, borderTop:'1px solid rgba(255,255,255,0.10)',
          }}>
            <RiskStat label="Temprature" value="38°C" border/>
            <RiskStat label="Humidity" value="73%" border/>
            <RiskStat label="Wind" value="25 km/h"/>
          </div>
          <div style={{textAlign:'center', marginTop: 14, paddingTop: 12, borderTop:'1px solid rgba(255,255,255,0.10)', fontSize: 14, color: 'var(--text-2)'}}>
            Current Location: Belgrad Forest, Istanbul
          </div>
        </div>

        {/* Big buttons */}
        <button className="gg-bigbtn teal" style={{marginTop: 16}} onClick={() => go('reportRisk')}>
          <span className="row"><Icon.RiskBolt size={32}/><span>REPORT RISK</span></span>
          <span className="sub">(Glass, Campfire, Smoke)</span>
        </button>
        <button className="gg-bigbtn red" style={{marginTop: 12}} onClick={() => go('reportFire')}>
          <span className="row"><Icon.FireSiren size={32}/><span>REPORT FIRE</span></span>
          <span className="sub">(Report)</span>
        </button>

        {/* Recent Local Alerts */}
        <div style={{marginTop: 22, marginBottom: 12, fontSize: 22, fontWeight: 800, letterSpacing: -0.3}}>
          Recent Local Alerts
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
          <AlertTile icon={<Icon.Flame size={64}/>}    label="Wildfire signal in north zone" onClick={() => go('alertDetail', {a:'flame'})}/>
          <AlertTile icon={<Icon.Smoke size={64}/>}    label="Heavy smoke reported"           onClick={() => go('alertDetail', {a:'smoke'})}/>
          <AlertTile icon={<Icon.Siren size={64}/>}    label="Minor fire incident on 3 km"    onClick={() => go('alertDetail', {a:'siren'})}/>
          <AlertTile icon={<Icon.CropBurn size={52}/>} label="Crop burning detected nearby"   onClick={() => go('alertDetail', {a:'crop'})}/>
        </div>
      </div>
    </div>
  );
}
function RiskStat({ label, value, border }) {
  return (
    <div style={{
      textAlign:'center',
      borderRight: border ? '1px solid rgba(255,255,255,0.18)' : 'none',
      padding: '4px 6px',
    }}>
      <div style={{fontSize: 14, fontWeight: 700, color:'var(--text)'}}>{label}</div>
      <div style={{fontSize: 18, fontWeight: 800, marginTop: 4, color:'white'}}>{value}</div>
    </div>
  );
}
function Stat({ label, value, border }) {
  return (
    <div style={{
      textAlign:'center',
      borderRight: border ? '1px solid rgba(255,255,255,0.18)' : 'none',
      padding: '4px 6px',
    }}>
      <div style={{fontSize: 14, fontWeight: 700}}>{label}</div>
      <div style={{fontSize: 18, fontWeight: 800, marginTop: 4}}>{value}</div>
    </div>
  );
}
function AlertTile({ icon, label, onClick }) {
  return (
    <div className="gg-tile" onClick={onClick}>
      <div style={{height: 60, display:'flex', alignItems:'center'}}>{icon}</div>
      <div className="label">{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Side Menu (slide from left)
// ─────────────────────────────────────────────────────────────
function SideMenu({ open, close, go, user }) {
  if (!open) return null;
  const item = (label, onClick, icon) => (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', gap: 14,
      width: '100%', padding: '14px 4px', background:'none', border:'none',
      color: 'white', fontSize: 16, fontWeight: 600, fontFamily: 'var(--font)',
      cursor: 'pointer', textAlign:'left',
      borderBottom:'0.5px solid rgba(255,255,255,0.08)',
    }}>
      <span style={{width: 26, display:'flex', justifyContent:'center'}}>{icon}</span>
      {label}
    </button>
  );
  return (
    <>
      <div onClick={close} style={{
        position:'absolute', inset: 0, background:'rgba(0,0,0,0.5)', zIndex: 80,
        animation: 'gg-fade .25s ease-out',
      }}/>
      <div style={{
        position:'absolute', top:0, bottom:0, left: 0, width: 290,
        background:'#141416',
        zIndex: 90, padding: '70px 22px 30px',
        display:'flex', flexDirection:'column',
        animation: 'sidemenu-in .28s ease-out forwards',
        transform: 'translateX(-100%)',
      }}>
        <style>{`@keyframes sidemenu-in { to { transform: translateX(0); } }`}</style>

        <div style={{display:'flex', alignItems:'center', gap: 12, marginBottom: 22}}>
          <img src="assets/logo.png" alt="" style={{width: 52, height: 52, borderRadius: 14, objectFit:'contain'}}/>
          <div>
            <div style={{fontSize: 20, fontWeight: 800, letterSpacing: -0.3}}>GreenGuard</div>
            <div style={{fontSize: 12, color:'var(--muted)'}}>Wildfire Awareness</div>
          </div>
        </div>

        <div style={{
          background:'#222226', borderRadius: 14, padding: 12, marginBottom: 16,
          display:'flex', alignItems:'center', gap: 12,
        }}>
          <div style={{width: 38, height: 38, borderRadius: '50%', background:'#3a3a3c', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon.TabProfile active/>
          </div>
          <div>
            <div style={{fontSize: 14, color:'var(--muted)'}}>Logged in</div>
            <div style={{fontSize: 15, fontWeight: 700}}>{user.name}</div>
          </div>
        </div>

        {item('Home Dashboard', () => { close(); go('home'); }, <Icon.TabHome active/>)}
        {item('Map View',       () => { close(); go('map'); },  <Icon.Globe/>)}
        {item('Prevention Guides', () => { close(); go('guides'); }, <Icon.TabBook active/>)}
        {item('Notifications',  () => { close(); go('notifications'); }, <Icon.Bell/>)}
        {item('My Profile',     () => { close(); go('profile'); }, <Icon.TabProfile active/>)}
        {item('Settings',       () => { close(); go('settings'); }, <Icon.Settings/>)}
        {item('About GreenGuard', () => { close(); go('about'); }, <Icon.Verified/>)}

        <div style={{flex: 1}}/>
        <button onClick={() => { close(); go('login'); }} style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 12, padding: '10px 16px',
          color: '#e26b6b', fontWeight: 700, cursor:'pointer',
        }}>Log Out</button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Alert Detail (when a Recent Local Alert tile is tapped)
// ─────────────────────────────────────────────────────────────
function AlertDetailScreen({ go, params }) {
  const which = params?.a || 'flame';
  const map = {
    flame: { icon: <Icon.Flame size={72}/>, title: 'Wildfire Signal', priority:'high' },
    smoke: { icon: <Icon.Smoke size={56}/>, title: 'Heavy Smoke',     priority:'medium' },
    siren: { icon: <Icon.Siren size={56}/>, title: 'Minor Fire Incident', priority:'medium' },
    crop:  { icon: <Icon.CropBurn size={56}/>, title: 'Crop Burning Detected', priority:'high' },
  };
  const a = map[which];

  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={() => go('home', null, true)}><Icon.Back/></button>
        <div className="gg-title">Alert Detail</div>
      </div>
      <div className="gg-body">
        <div className="gg-card" style={{display:'flex', alignItems:'center', gap: 16}}>
          <div style={{width: 64, height: 64, borderRadius: 14, background:'#3a3a3c', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
            {a.icon}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize: 18, fontWeight: 800}}>{a.title}</div>
            <div style={{fontSize: 13, color:'var(--muted)', marginTop: 2}}>3.2 km from your location</div>
            <div style={{marginTop: 8}}>
              <span className={`gg-chip ${a.priority}`}>{a.priority.toUpperCase()} PRIORITY</span>
            </div>
          </div>
        </div>

        <div className="gg-card" style={{marginTop: 14}}>
          <div style={{fontSize: 13, color:'var(--muted)', textTransform:'uppercase', letterSpacing:0.5, marginBottom: 8}}>Details</div>
          <Detail icon={<Icon.Pin/>} label="Location" value="Polonezköy, İstanbul"/>
          <div className="gg-divider"/>
          <Detail icon={<Icon.Calendar/>} label="Reported" value="12 minutes ago"/>
          <div className="gg-divider"/>
          <Detail icon={<Icon.TabProfile active/>} label="Reporter" value="Aykut_37 · Verified"/>
          <div className="gg-divider"/>
          <Detail icon={<Icon.Globe/>} label="Coordinates" value="41.1139 N, 29.2122 E"/>
        </div>

        <div className="gg-card" style={{marginTop: 14}}>
          <div style={{fontSize: 13, color:'var(--muted)', textTransform:'uppercase', letterSpacing:0.5, marginBottom: 8}}>Description</div>
          <div style={{fontSize: 15, lineHeight: 1.55, color: 'white'}}>
            Multiple users reported visible smoke rising from the northern ridge, near the forest service road.
            Local fire department has been notified and is en route. Avoid the area and stay tuned for updates.
          </div>
        </div>

        <button className="gg-bigbtn red" style={{marginTop: 16}} onClick={() => go('reportFire')}>
          <span className="row"><Icon.FireSiren size={26}/><span>REPORT FIRE NEARBY</span></span>
          <span className="sub">Confirm or escalate this alert</span>
        </button>

        <button onClick={() => go('map')} style={{
          width: '100%', marginTop: 12, background:'transparent',
          border:'1px solid rgba(255,255,255,0.2)', color: 'white',
          padding: '12px', borderRadius: 12, fontWeight: 700, cursor:'pointer',
          fontFamily: 'var(--font)', fontSize: 15,
        }}>View on Map</button>
      </div>
    </div>
  );
}
function Detail({ icon, label, value }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap: 12, padding: '4px 0'}}>
      <div style={{width:22, display:'flex', justifyContent:'center'}}>{icon}</div>
      <div style={{flex: 1}}>
        <div style={{fontSize: 12, color:'var(--muted)'}}>{label}</div>
        <div style={{fontSize: 15, fontWeight: 700}}>{value}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Notifications
// ─────────────────────────────────────────────────────────────
function NotificationsScreen({ go }) {
  const items = [
    { icon: <Icon.Flame size={28} color="#e26b6b"/>, bg: 'rgba(214,86,86,0.18)',  title: 'Wildfire risk elevated to HIGH', sub: 'Belgrad Forest · 2m ago', unread: true,  tone:'red' },
    { icon: <Icon.Smoke size={28} color="#e0b03a"/>, bg: 'rgba(224,176,58,0.18)', title: 'Smoke reported 3 km from you',   sub: 'Polonezköy · 14m ago',  unread: true,  tone:'yellow' },
    { icon: <Icon.Siren size={28} color="#65a861"/>, bg: 'rgba(101,168,97,0.18)', title: 'Your report #34788 was verified', sub: 'Today · 1h ago',       unread: false, tone:'green' },
    { icon: <Icon.Bell color="#4aa3b3"/>,            bg: 'rgba(74,163,179,0.18)', title: 'New prevention guide added',   sub: 'Yesterday',            unread: false, tone:'teal' },
    { icon: <Icon.CropBurn size={28} color="#e07b3a"/>, bg: 'rgba(224,123,58,0.18)', title: 'Crop burning advisory lifted', sub: '2 days ago',           unread: false, tone:'orange' },
  ];
  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={() => go('home', null, true)}><Icon.Back/></button>
        <div className="gg-title">Notifications</div>
      </div>
      <div className="gg-body">
        {items.map((it, i) => (
          <div key={i} className="gg-card" onClick={() => go('alertDetail', { a: 'flame' })} style={{
            marginBottom: 10, padding: 14, cursor:'pointer',
            display:'flex', alignItems:'center', gap: 12,
            borderLeft: `3px solid ${
              it.tone === 'red' ? '#d65656' :
              it.tone === 'yellow' ? '#e0b03a' :
              it.tone === 'green' ? '#65a861' :
              it.tone === 'teal' ? '#4aa3b3' : '#e07b3a'
            }`,
          }}>
            <div style={{width: 44, height: 44, borderRadius: 10, background: it.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
              {it.icon}
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 15, fontWeight: 700}}>{it.title}</div>
              <div style={{fontSize: 12, color:'var(--muted)', marginTop: 2}}>{it.sub}</div>
            </div>
            {it.unread && <div style={{width: 8, height: 8, borderRadius: '50%', background: 'var(--red-2)'}}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.SideMenu = SideMenu;
window.AlertDetailScreen = AlertDetailScreen;
window.NotificationsScreen = NotificationsScreen;
