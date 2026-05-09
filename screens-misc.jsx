/* GreenGuard — Profile, Settings, Report flows, Auth, Splash, Onboarding */
const { useState: useState_P, useEffect: useEffect_P, useRef: useRef_P } = React;

// ─────────────────────────────────────────────────────────────
// Splash
// ─────────────────────────────────────────────────────────────
function SplashScreen({ go }) {
  const [phase, setPhase] = useState_P(0);
  useEffect_P(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1500);
    const t3 = setTimeout(() => go('onboarding'), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  return (
    <div className="gg-screen" style={{
      background: 'radial-gradient(ellipse at center, #1f2a1f 0%, #0c0c0e 80%)',
      display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column',
    }}>
      <style>{`
        @keyframes splash-logo-in {
          0% { transform: scale(0.4); opacity: 0; filter: blur(8px); }
          60% { transform: scale(1.08); opacity: 1; filter: blur(0); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        @keyframes splash-ring {
          from { transform: scale(0.6); opacity: 0.7; }
          to   { transform: scale(2.2); opacity: 0; }
        }
        @keyframes splash-text-in {
          from { transform: translateY(14px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes splash-lift {
          from { transform: translateY(0); }
          to   { transform: translateY(-8px); }
        }
      `}</style>
      <div style={{position:'relative', display:'flex', flexDirection:'column', alignItems:'center'}}>
        {/* expanding rings */}
        {[0, 0.4, 0.8].map((d, i) => (
          <div key={i} style={{
            position:'absolute', top: -10, left: '50%', marginLeft: -85,
            width: 170, height: 170, borderRadius: '50%',
            border: '2px solid #65a861',
            animation: `splash-ring 2.2s ease-out ${d}s infinite`,
            opacity: 0.5,
          }}/>
        ))}
        <div style={{
          width: 150, height: 150, borderRadius: 36, overflow:'hidden',
          background: 'white',
          boxShadow: '0 12px 40px rgba(101,168,97,0.5)',
          animation: 'splash-logo-in 0.9s cubic-bezier(.22,1.4,.36,1) both',
          position: 'relative', zIndex: 2,
        }}>
          <img src="assets/logo.png" alt="GreenGuard" style={{width: '100%', height:'100%', objectFit:'contain'}}/>
        </div>
        <div style={{
          marginTop: 24, fontSize: 38, fontWeight: 800, letterSpacing: -0.5,
          opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(14px)',
          transition: 'all .6s cubic-bezier(.22,1.4,.36,1)',
        }}>GreenGuard</div>
        <div style={{
          marginTop: 6, fontSize: 14, color:'var(--muted)',
          opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all .6s cubic-bezier(.22,1.4,.36,1) .1s',
        }}>Wildfire Awareness & Reporting</div>
      </div>
      <div style={{
        position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center',
        fontSize: 12, color:'rgba(255,255,255,0.35)', letterSpacing: 1.5,
      }}>PROTECTING FORESTS · TOGETHER</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Onboarding (3 slides)
// ─────────────────────────────────────────────────────────────
function OnboardingScreen({ go }) {
  const [step, setStep] = useState_P(0);
  const slides = [
    { icon: <Icon.Globe size={64}/>, title: 'Real-time Wildfire Risk',
      body: 'See live danger levels for your exact location — temperature, humidity, and wind speed combined into one clear meter.' },
    { icon: <Icon.Bell size={64}/>, title: 'Instant Local Alerts',
      body: 'Get notified the moment risks are reported nearby. Smoke, glass waste, unattended campfires — never miss a sign.' },
    { icon: <Icon.Flame size={64}/>, title: 'Report. Protect. Together.',
      body: 'Tap once to report fire or risk. Your alerts help protect your community and the forests you love.' },
  ];
  const s = slides[step];
  return (
    <div className="gg-screen" style={{padding: '70px 28px 30px'}}>
      <div style={{flex: 1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', gap: 22}}>
        <div className="gg-fade" key={step} style={{
          width: 130, height: 130, borderRadius: 30,
          background: 'rgba(101,168,97,0.18)', border: '1px solid rgba(101,168,97,0.4)',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>{s.icon}</div>
        <div className="gg-fade" key={'t'+step} style={{fontSize: 28, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.2}}>{s.title}</div>
        <div className="gg-fade" key={'b'+step} style={{fontSize: 15, lineHeight: 1.6, color: 'var(--muted)'}}>{s.body}</div>
      </div>
      <div style={{display:'flex', justifyContent:'center', gap: 8, marginBottom: 22}}>
        {slides.map((_, i) => (
          <div key={i} style={{
            width: i === step ? 22 : 8, height: 8, borderRadius: 4,
            background: i === step ? '#65a861' : 'rgba(255,255,255,0.2)',
            transition: 'all .25s',
          }}/>
        ))}
      </div>
      <button onClick={() => step < 2 ? setStep(step+1) : go('login')} style={{
        width: '100%', padding: '16px', borderRadius: 14, border: 'none',
        background: '#65a861', color: 'white', fontWeight: 800, fontSize: 17, cursor:'pointer', fontFamily:'var(--font)',
      }}>{step < 2 ? 'Next' : 'Get Started'}</button>
      {step < 2 && (
        <button onClick={() => go('login')} style={{
          width: '100%', marginTop: 8, padding: '12px', background:'transparent', border:'none',
          color:'var(--muted)', cursor:'pointer', fontFamily:'var(--font)', fontSize: 14,
        }}>Skip</button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Login
// ─────────────────────────────────────────────────────────────
function LoginScreen({ go }) {
  const [email, setEmail] = useState_P('eren.demir@gmail.com');
  const [pw, setPw] = useState_P('••••••••');
  return (
    <div className="gg-screen" style={{padding: '70px 28px 30px'}}>
      <div style={{display:'flex', alignItems:'center', gap: 12, marginBottom: 24}}>
        <img src="assets/logo.png" style={{width: 44, height: 44, borderRadius: 12}}/>
        <div style={{fontSize: 22, fontWeight: 800}}>GreenGuard</div>
      </div>
      <div style={{fontSize: 30, fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.15, marginBottom: 8}}>Welcome back</div>
      <div style={{fontSize: 15, color:'var(--muted)', marginBottom: 28}}>Log in to keep your forests safe.</div>
      <div style={{display:'flex', flexDirection:'column', gap: 12}}>
        <div style={{fontSize: 13, color:'var(--muted)', marginLeft: 4}}>Email</div>
        <input className="gg-input" value={email} onChange={e => setEmail(e.target.value)}/>
        <div style={{fontSize: 13, color:'var(--muted)', marginLeft: 4, marginTop: 6}}>Password</div>
        <input className="gg-input" type="password" value={pw} onChange={e => setPw(e.target.value)}/>
        <div style={{textAlign:'right', fontSize: 13, color: '#65a861', fontWeight: 700, cursor:'pointer'}}>Forgot password?</div>
      </div>
      <button onClick={() => go('home')} style={{
        width:'100%', marginTop: 26, padding: '16px', borderRadius: 14, border:'none',
        background: '#65a861', color: 'white', fontWeight: 800, fontSize: 17, cursor:'pointer', fontFamily:'var(--font)',
      }}>Log In</button>
      <div style={{textAlign:'center', fontSize: 14, color:'var(--muted)', marginTop: 18}}>
        Don't have an account? <span onClick={() => go('signup')} style={{color:'#65a861', fontWeight: 700, cursor:'pointer'}}>Sign Up</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sign Up
// ─────────────────────────────────────────────────────────────
function SignUpScreen({ go }) {
  return (
    <div className="gg-screen" style={{padding: '70px 28px 30px'}}>
      <button onClick={() => go('login', null, true)} className="gg-iconbtn" style={{marginBottom: 14}}><Icon.Back/></button>
      <div style={{fontSize: 30, fontWeight: 800, letterSpacing: -0.4, marginBottom: 6}}>Create account</div>
      <div style={{fontSize: 15, color:'var(--muted)', marginBottom: 22}}>Join the wildfire watch.</div>
      <div style={{display:'flex', flexDirection:'column', gap: 12}}>
        <input className="gg-input" placeholder="Full name"/>
        <input className="gg-input" placeholder="Email address"/>
        <input className="gg-input" placeholder="Phone number"/>
        <input className="gg-input" type="password" placeholder="Password"/>
        <input className="gg-input" placeholder="City / Region"/>
      </div>
      <button onClick={() => go('home')} style={{
        width:'100%', marginTop: 22, padding:'16px', borderRadius: 14, border:'none',
        background:'#65a861', color:'white', fontWeight: 800, fontSize: 17, cursor:'pointer', fontFamily:'var(--font)',
      }}>Create Account</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Report Risk — choose type
// ─────────────────────────────────────────────────────────────
function ReportRiskScreen({ go }) {
  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={() => go('home', null, true)}><Icon.Back/></button>
        <div className="gg-title">Report Risk</div>
      </div>
      <div className="gg-body">
        <div style={{fontSize: 14, color:'var(--muted)', marginBottom: 14, lineHeight: 1.4}}>
          Select the type of risk you want to report. Your input helps protect the area.
        </div>
        {[
          { id: 'glass',     icon: <Icon.GlassBottle/>, title: 'Glass Waste',          sub: 'Bottles, shards or reflective debris' },
          { id: 'campfire',  icon: <Icon.Campfire/>,    title: 'Unattended Campfire',  sub: 'Smoldering logs, hot ashes' },
          { id: 'smoke',     icon: <Icon.Smoke/>,       title: 'Smoke Sighting',       sub: 'Visible smoke without confirmed fire' },
          { id: 'cigarette', icon: <Icon.Cigarette/>,   title: 'Cigarette Debris',     sub: 'Discarded butts, lit materials' },
          { id: 'other',     icon: <Icon.Warning/>,     title: 'Other Hazard',         sub: 'Frayed wires, equipment sparks' },
        ].map(o => (
          <div key={o.id} className="gg-card" onClick={() => go('reportForm', { kind: o.title })} style={{
            display:'flex', alignItems:'center', gap: 14, padding: 16, marginBottom: 10, cursor:'pointer',
          }}>
            <div style={{width: 52, height: 52, borderRadius: 12, background:'#3a3a3c', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
              {o.icon}
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 16, fontWeight: 800}}>{o.title}</div>
              <div style={{fontSize: 13, color:'var(--muted)', marginTop: 2}}>{o.sub}</div>
            </div>
            <Icon.ChevronRight/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Report Form (works for both Risk and Fire)
// ─────────────────────────────────────────────────────────────
function ReportFormScreen({ go, params }) {
  const fire = params?.fire;
  const [priority, setPriority] = useState_P(fire ? 'high' : 'medium');
  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={() => go(fire ? 'home' : 'reportRisk', null, true)}><Icon.Back/></button>
        <div className="gg-title">{fire ? 'Report Fire' : 'New Report'}</div>
      </div>
      <div className="gg-body">
        {fire && (
          <div style={{
            background: 'rgba(214,86,86,0.15)', border: '1px solid rgba(214,86,86,0.4)',
            borderRadius: 14, padding: 14, marginBottom: 14, display:'flex', gap: 12, alignItems:'center',
          }}>
            <Icon.Flame size={28} color="#e26b6b"/>
            <div style={{fontSize: 13, lineHeight: 1.4}}>
              <strong>Active fire?</strong> Call <span style={{color:'#e26b6b', fontWeight:800}}>112</span> immediately. Use this form to add detail for responders.
            </div>
          </div>
        )}

        <div className="gg-card" style={{marginBottom: 12}}>
          <div style={{fontSize: 13, color:'var(--muted)', marginBottom: 8}}>Type</div>
          <div style={{fontSize: 17, fontWeight: 700}}>{fire ? 'Active Fire' : (params?.kind || 'Glass Waste')}</div>
        </div>

        <div className="gg-card" style={{marginBottom: 12}}>
          <div style={{fontSize: 13, color:'var(--muted)', marginBottom: 8}}>Location</div>
          <div style={{display:'flex', alignItems:'center', gap: 10}}>
            <Icon.Pin/>
            <div>
              <div style={{fontSize: 15, fontWeight: 700}}>Belgrad Forest, Istanbul</div>
              <div style={{fontSize: 12, color:'var(--muted)'}}>41.1850 N, 29.0420 E (auto)</div>
            </div>
          </div>
        </div>

        <div className="gg-card" style={{marginBottom: 12}}>
          <div style={{fontSize: 13, color:'var(--muted)', marginBottom: 10}}>Priority</div>
          <div className="gg-seg">
            {['low','medium','high'].map(p => (
              <button key={p} className={priority===p ? 'active' : ''} onClick={() => setPriority(p)}>
                {p[0].toUpperCase()+p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="gg-card" style={{marginBottom: 12}}>
          <div style={{fontSize: 13, color:'var(--muted)', marginBottom: 8}}>Description</div>
          <textarea className="gg-input" rows="4" placeholder="Briefly describe what you see..."
            style={{resize:'none', minHeight: 88}}/>
        </div>

        <div className="gg-card" style={{marginBottom: 18, display:'flex', alignItems:'center', gap: 12, cursor:'pointer'}}>
          <div style={{width: 52, height: 52, borderRadius: 12, background:'#3a3a3c', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Icon.Camera/>
          </div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 15, fontWeight: 700}}>Add Photo</div>
            <div style={{fontSize: 12, color:'var(--muted)', marginTop: 2}}>Helps responders verify faster</div>
          </div>
          <Icon.Plus/>
        </div>

        <button onClick={() => go('reportSuccess', { fire })} style={{
          width: '100%', padding: '16px', borderRadius: 14, border:'none',
          background: fire ? 'var(--red)' : 'var(--teal)', color:'white',
          fontWeight: 800, fontSize: 17, cursor:'pointer', fontFamily: 'var(--font)',
          boxShadow:'0 6px 18px rgba(0,0,0,0.25)',
        }}>{fire ? 'Submit Fire Report' : 'Submit Report'}</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Report Fire — wraps form
// ─────────────────────────────────────────────────────────────
function ReportFireScreen({ go }) {
  return <ReportFormScreen go={go} params={{ fire: true }}/>;
}

// ─────────────────────────────────────────────────────────────
// Report Success
// ─────────────────────────────────────────────────────────────
function ReportSuccessScreen({ go, params }) {
  return (
    <div className="gg-screen" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding: 28, textAlign:'center'}}>
      <div className="gg-fade" style={{
        width: 96, height: 96, borderRadius: '50%',
        background: 'rgba(101,168,97,0.18)', border: '2px solid #65a861',
        display:'flex', alignItems:'center', justifyContent:'center', marginBottom: 22,
      }}>
        <Icon.Check size={48} color="#65a861"/>
      </div>
      <div style={{fontSize: 28, fontWeight: 800, letterSpacing: -0.3}}>Report Submitted</div>
      <div style={{fontSize: 15, color:'rgba(255,255,255,0.65)', marginTop: 10, lineHeight: 1.5, maxWidth: 320}}>
        {params?.fire
          ? 'Emergency services have been notified. Stay safe and clear of the area. Thank you.'
          : 'Your report has been added to the local map. Thanks for protecting your community.'}
      </div>
      <div style={{marginTop: 22, padding: '12px 18px', borderRadius: 12, background:'#2c2c2e', fontSize: 13, color:'var(--muted)'}}>
        Report ID: <strong style={{color:'white'}}>#34{Math.floor(Math.random()*900+100)}</strong>
      </div>
      <button onClick={() => go('map')} style={{
        marginTop: 24, padding: '14px 28px', borderRadius: 12, border:'none',
        background: '#65a861', color:'white', fontWeight: 800, fontSize: 15, cursor:'pointer', fontFamily:'var(--font)',
      }}>View on Map</button>
      <button onClick={() => go('home')} style={{
        marginTop: 10, padding: '12px 28px', background:'transparent', border:'none',
        color:'rgba(255,255,255,0.65)', cursor:'pointer', fontFamily:'var(--font)', fontSize: 14,
      }}>Back to Home</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Profile (matches user drawing — maroon background)
// ─────────────────────────────────────────────────────────────
function ProfileScreen({ go, openMenu, contacts, setContacts }) {
  const [showAdd, setShowAdd] = useState_P(false);
  const [n, setN] = useState_P(''); const [v, setV] = useState_P('');
  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={openMenu}><Icon.Hamburger/></button>
        <div className="gg-title">My Profile</div>
        <button className="gg-iconbtn" onClick={() => go('settings')}><Icon.Settings/></button>
      </div>
      <div className="gg-body">
        <div className="gg-card">
          <div style={{display:'flex', alignItems:'center', gap: 16}}>
            <div style={{width: 78, height: 78, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center', border: '1px solid rgba(255,255,255,0.15)'}}>
              <Icon.TabProfile active/>
            </div>
            <div>
              <div style={{fontSize: 14, color:'var(--muted)'}}>Username:</div>
              <div style={{fontSize: 22, fontWeight: 800, marginTop: 2}}>EREN DEMİR</div>
            </div>
          </div>
          <div className="gg-divider"/>
          <div style={{fontSize: 13, fontWeight: 800, letterSpacing: 0.5, color: 'var(--muted)'}}>ACTIVITES:</div>
          <div style={{display:'flex', justifyContent:'space-between', marginTop: 8}}>
            <div><span style={{fontWeight:700}}>Reports Submited: </span><span style={{color:'var(--orange)', fontWeight: 800}}>4</span></div>
            <div><span style={{fontWeight:700}}>Fire Safety Score: </span><span style={{color:'var(--safety-green)', fontWeight: 800}}>%87</span></div>
          </div>
          <div className="gg-divider"/>
          <div style={{display:'flex', flexDirection:'column', gap: 12}}>
            <ProfRow icon={<Icon.Mail/>} label="E-mail:" value="eren.demir@gmail.com"/>
            <ProfRow icon={<Icon.Phone size={18}/>} label="Phone:" value="+90 546 457 88 99"/>
            <ProfRow icon={<Icon.Pin/>} label="Location:" value="Istanbul, Turkey"/>
            <ProfRow icon={<Icon.Calendar/>} label="Member Since:" value="March 2026"/>
            <ProfRow icon={<Icon.Verified/>} label="Profile Status:" value="Verified"/>
          </div>
        </div>

        <div style={{fontSize: 22, fontWeight: 800, marginTop: 22, marginBottom: 12}}>Emergency Contacts</div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12}}>
          {contacts.map((c, i) => (
            <div key={i} className="gg-card" style={{padding: 14, cursor:'pointer'}} onClick={() => alert(`Calling ${c.value}…`)}>
              <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between'}}>
                <div style={{fontSize: 14, fontWeight: 800, lineHeight: 1.2}}>{c.label}</div>
                {c.icon}
              </div>
              <div style={{
                background:'var(--red)', borderRadius: 12, padding:'10px 0',
                marginTop: 14, textAlign:'center',
                fontSize: 22, fontWeight: 800,
              }}>{c.value}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setShowAdd(true)} style={{
          width: '100%', marginTop: 12, background:'transparent', border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 12, padding: '12px', color:'white', fontWeight: 700, cursor:'pointer', fontFamily:'var(--font)',
          display:'flex', alignItems:'center', justifyContent:'center', gap: 8,
        }}>Add Personal Emergency Contacs <Icon.Plus/></button>

        {showAdd && (
          <>
            <div onClick={() => setShowAdd(false)} style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.5)', zIndex: 80, animation:'gg-fade .2s'}}/>
            <div className="gg-sheet" style={{zIndex: 90}}>
              <div className="grabber"/>
              <div style={{fontSize: 20, fontWeight: 800, marginBottom: 14}}>Add Emergency Contact</div>
              <input className="gg-input" placeholder="Name (e.g. Mom)" value={n} onChange={e => setN(e.target.value)} style={{marginBottom: 10}}/>
              <input className="gg-input" placeholder="Phone number" value={v} onChange={e => setV(e.target.value)}/>
              <button onClick={() => {
                if (n && v) { setContacts([...contacts, { label: n, value: v, icon: <Icon.Phone/> }]); setN(''); setV(''); setShowAdd(false); }
              }} style={{
                width:'100%', marginTop: 14, padding: '14px', borderRadius: 12, border:'none',
                background: '#65a861', color: 'white', fontWeight: 800, cursor:'pointer', fontFamily:'var(--font)', fontSize: 16,
              }}>Save Contact</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
function ProfRow({ icon, label, value }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap: 10}}>
      <div style={{width: 22, display:'flex', justifyContent:'center'}}>{icon}</div>
      <span style={{fontSize: 15, fontWeight: 800}}>{label} </span>
      <span style={{fontSize: 15}}>{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────────────────────
function SettingsScreen({ go, dark, setDark }) {
  const [push, setPush] = useState_P(true);
  const [loc, setLoc] = useState_P(true);
  const [sound, setSound] = useState_P(true);
  const Row = ({ label, value, onClick, toggle, on, setOn }) => (
    <div className="gg-card" style={{
      display:'flex', alignItems:'center', gap: 12, padding: 14, marginBottom: 10, cursor: onClick ? 'pointer' : 'default',
    }} onClick={onClick}>
      <div style={{flex:1, fontSize: 15, fontWeight: 700}}>{label}</div>
      {toggle ? <div className={`gg-toggle ${on ? 'on' : ''}`} onClick={(e) => { e.stopPropagation(); setOn(!on); }}/> : (
        <>
          {value && <div style={{fontSize: 14, color:'var(--muted)'}}>{value}</div>}
          <Icon.ChevronRight/>
        </>
      )}
    </div>
  );
  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={() => go('profile', null, true)}><Icon.Back/></button>
        <div className="gg-title">Settings</div>
      </div>
      <div className="gg-body">
        <div style={{fontSize: 13, color:'var(--muted-2)', textTransform:'uppercase', letterSpacing: 0.5, marginBottom: 8, marginLeft: 4}}>Notifications</div>
        <Row label="Push Notifications" toggle on={push} setOn={setPush}/>
        <Row label="Sound & Vibration" toggle on={sound} setOn={setSound}/>

        <div style={{fontSize: 13, color:'var(--muted-2)', textTransform:'uppercase', letterSpacing: 0.5, marginBottom: 8, marginLeft: 4, marginTop: 18}}>Privacy</div>
        <Row label="Location Services" toggle on={loc} setOn={setLoc}/>
        <Row label="Anonymous Reports" value="Off" onClick={() => {}}/>

        <div style={{fontSize: 13, color:'var(--muted-2)', textTransform:'uppercase', letterSpacing: 0.5, marginBottom: 8, marginLeft: 4, marginTop: 18}}>Display</div>
        <Row label="Dark Mode" toggle on={dark} setOn={setDark}/>
        <Row label="Language" value="English" onClick={() => {}}/>

        <div style={{fontSize: 13, color:'var(--muted-2)', textTransform:'uppercase', letterSpacing: 0.5, marginBottom: 8, marginLeft: 4, marginTop: 18}}>Account</div>
        <Row label="Edit Profile" onClick={() => go('editProfile')}/>
        <Row label="Privacy Policy" onClick={() => go('privacy')}/>
        <Row label="About GreenGuard" onClick={() => go('about')}/>

        <button onClick={() => go('login')} style={{
          width: '100%', marginTop: 18, padding: '14px', borderRadius: 12,
          background:'transparent', border:'1px solid rgba(214,86,86,0.5)',
          color: '#e26b6b', fontWeight: 800, cursor:'pointer', fontFamily:'var(--font)', fontSize: 15,
        }}>Log Out</button>
      </div>
    </div>
  );
}

function AboutScreen({ go }) {
  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={() => go('home', null, true)}><Icon.Back/></button>
        <div className="gg-title">About GreenGuard</div>
      </div>
      <div className="gg-body" style={{textAlign:'center'}}>
        <div style={{
          width: 130, height: 130, borderRadius: 32, overflow:'hidden',
          background:'white', margin:'10px auto 18px',
          boxShadow:'0 12px 40px rgba(101,168,97,0.35)',
          animation:'gg-fade .5s ease-out',
        }}>
          <img src="assets/logo.png" alt="GreenGuard" style={{width:'100%', height:'100%', objectFit:'contain'}}/>
        </div>
        <div style={{fontSize: 30, fontWeight: 800, letterSpacing: -0.5}}>GreenGuard</div>
        <div style={{fontSize: 13, color:'var(--muted)', marginTop: 4}}>v 1.0.0 · Wildfire Awareness</div>

        <div className="gg-card" style={{marginTop: 22, textAlign:'left'}}>
          <div style={{fontSize: 14, color:'var(--text-2)', lineHeight: 1.55}}>
            GreenGuard helps citizens prevent and report wildfires. Together we monitor risk,
            share local intelligence, and protect the forests we love.
          </div>
          <div className="gg-divider"/>
          <Stat n="12.4K" l="Active Guardians"/>
          <Stat n="3,127" l="Reports This Month"/>
          <Stat n="89%"   l="Verified On Time"/>
        </div>

        <div className="gg-card" style={{marginTop: 14, textAlign:'left'}} onClick={() => alert('Privacy Policy')}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontWeight:700}}>Privacy Policy</div><Icon.ArrowRight/>
          </div>
        </div>
        <div className="gg-card" style={{marginTop: 10, textAlign:'left'}} onClick={() => alert('Terms of Service')}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontWeight:700}}>Terms of Service</div><Icon.ArrowRight/>
          </div>
        </div>
        <div className="gg-card" style={{marginTop: 10, textAlign:'left'}} onClick={() => alert('greenguard@team.app')}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontWeight:700}}>Contact Team</div><Icon.ArrowRight/>
          </div>
        </div>
        <div style={{fontSize:11, color:'rgba(255,255,255,0.35)', marginTop: 22, letterSpacing: 1}}>
          PROTECTING FORESTS · TOGETHER
        </div>
      </div>
    </div>
  );
}
function Stat({ n, l }) {
  return (
    <div style={{display:'flex', justifyContent:'space-between', padding:'8px 0'}}>
      <div style={{color:'var(--muted)', fontSize: 14}}>{l}</div>
      <div style={{fontWeight: 800, fontSize: 16, color:'var(--safety-green)'}}>{n}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Edit Profile
// ─────────────────────────────────────────────────────────────
function EditProfileScreen({ go }) {
  const [name, setName] = useState_P('EREN DEMİR');
  const [email, setEmail] = useState_P('eren.demir@gmail.com');
  const [phone, setPhone] = useState_P('+90 546 457 88 99');
  const [loc, setLoc] = useState_P('Istanbul, Turkey');
  const [bio, setBio] = useState_P('Volunteer firefighter · Forest lover');
  const [photo, setPhoto] = useState_P(null);
  const fileRef = useRef_P(null);

  const onPick = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setPhoto(r.result);
    r.readAsDataURL(f);
  };

  const Field = ({ label, value, set, type = 'text', placeholder }) => (
    <div style={{marginBottom: 14}}>
      <div style={{fontSize: 12, color:'var(--muted)', textTransform:'uppercase', letterSpacing: 0.5, marginBottom: 6, marginLeft: 4}}>{label}</div>
      <input
        type={type}
        className="gg-input"
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={() => go('settings', null, true)}><Icon.Back/></button>
        <div className="gg-title">Edit Profile</div>
      </div>
      <div className="gg-body">
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop: 4, marginBottom: 22}}>
          <div style={{position:'relative'}}>
            <div style={{
              width: 110, height: 110, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.18)',
              overflow:'hidden',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 8px 26px rgba(0,0,0,0.45)',
            }}>
              {photo
                ? <img src={photo} alt="avatar" style={{width:'100%', height:'100%', objectFit:'cover'}}/>
                : <Icon.TabProfile active/>}
            </div>
            <button onClick={() => fileRef.current && fileRef.current.click()} style={{
              position:'absolute', right: -2, bottom: -2,
              width: 38, height: 38, borderRadius: '50%',
              background: 'var(--safety-green)', border: '3px solid #1c1c1e',
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', boxShadow:'0 4px 12px rgba(0,0,0,0.5)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h3l2-2h6l2 2h3v12H4V7z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="12" cy="13" r="3.5" stroke="white" strokeWidth="2"/>
              </svg>
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={onPick} style={{display:'none'}}/>
          </div>
          <button onClick={() => fileRef.current && fileRef.current.click()} style={{
            marginTop: 12, background:'transparent', border:'none',
            color:'var(--safety-green)', fontWeight: 800, fontSize: 14, cursor:'pointer', fontFamily:'var(--font)',
          }}>Change Photo</button>
        </div>

        <Field label="Full Name" value={name} set={setName}/>
        <Field label="E-mail" value={email} set={setEmail} type="email"/>
        <Field label="Phone" value={phone} set={setPhone} type="tel"/>

        <div style={{marginBottom: 14}}>
          <div style={{fontSize: 12, color:'var(--muted)', textTransform:'uppercase', letterSpacing: 0.5, marginBottom: 6, marginLeft: 4}}>Location</div>
          <div style={{position:'relative'}}>
            <input className="gg-input" value={loc} onChange={(e) => setLoc(e.target.value)} style={{paddingRight: 110}}/>
            <button onClick={() => setLoc('Istanbul, Turkey')} style={{
              position:'absolute', right: 6, top: '50%', transform:'translateY(-50%)',
              background:'rgba(101,168,97,0.18)', border:'1px solid rgba(101,168,97,0.5)',
              color:'var(--safety-green)', fontWeight: 800, fontSize: 12,
              padding:'6px 10px', borderRadius: 8, cursor:'pointer', fontFamily:'var(--font)',
              display:'flex', alignItems:'center', gap: 6,
            }}>
              <Icon.Pin size={12} color="#65a861"/> Detect
            </button>
          </div>
        </div>

        <div style={{marginBottom: 14}}>
          <div style={{fontSize: 12, color:'var(--muted)', textTransform:'uppercase', letterSpacing: 0.5, marginBottom: 6, marginLeft: 4}}>Bio</div>
          <textarea
            className="gg-input"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            style={{resize:'none', fontFamily:'var(--font)'}}
          />
        </div>

        <button onClick={() => { alert('Profile saved'); go('settings', null, true); }} style={{
          width: '100%', marginTop: 8, padding: '14px', borderRadius: 12, border:'none',
          background: 'var(--safety-green)', color:'white', fontWeight: 800,
          fontSize: 16, cursor:'pointer', fontFamily:'var(--font)',
          boxShadow:'0 8px 24px rgba(101,168,97,0.35)',
        }}>Save Changes</button>
        <button onClick={() => go('settings', null, true)} style={{
          width:'100%', marginTop: 10, padding:'12px', borderRadius: 12,
          background:'transparent', border:'1px solid rgba(255,255,255,0.16)',
          color:'var(--text-2)', fontWeight: 700, cursor:'pointer', fontFamily:'var(--font)',
        }}>Cancel</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Privacy Policy
// ─────────────────────────────────────────────────────────────
function PrivacyScreen({ go }) {
  const Section = ({ n, title, children }) => (
    <div className="gg-card" style={{marginBottom: 12, textAlign:'left'}}>
      <div style={{display:'flex', alignItems:'center', gap: 10, marginBottom: 8}}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background:'rgba(101,168,97,0.18)', color:'var(--safety-green)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontWeight: 800, fontSize: 13, flexShrink: 0,
        }}>{n}</div>
        <div style={{fontWeight: 800, fontSize: 15}}>{title}</div>
      </div>
      <div style={{fontSize: 13.5, color:'rgba(255,255,255,0.78)', lineHeight: 1.6}}>{children}</div>
    </div>
  );

  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={() => go('settings', null, true)}><Icon.Back/></button>
        <div className="gg-title">Privacy Policy</div>
      </div>
      <div className="gg-body">
        <div style={{
          background:'linear-gradient(135deg, rgba(101,168,97,0.18), rgba(101,168,97,0.04))',
          border:'1px solid rgba(101,168,97,0.35)',
          borderRadius: 14, padding: 16, marginBottom: 16,
          display:'flex', alignItems:'center', gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background:'var(--safety-green)',
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{fontWeight: 800, fontSize: 15}}>Your data is protected</div>
            <div style={{fontSize: 12, color:'rgba(255,255,255,0.65)', marginTop: 2}}>Last updated · March 2026</div>
          </div>
        </div>

        <Section n="1" title="What we collect">
          GreenGuard collects only what's needed to keep forests safe:
          your account email, the location of risk reports you submit,
          and the optional photos you attach. We never sell your data.
        </Section>

        <Section n="2" title="Location data">
          Live location is used <strong>only</strong> while you are reporting a risk
          or viewing the live map. You can switch off Location Services in Settings —
          reports will then require manual address entry.
        </Section>

        <Section n="3" title="Anonymous reports">
          Toggling "Anonymous Reports" hides your username from public alerts.
          Authorities still see your account ID for verification purposes,
          and to follow up if your report leads to action.
        </Section>

        <Section n="4" title="Notifications">
          Push alerts are sent for active fires within 25 km of your saved location
          and for verified reports near you. Manage them under Settings → Notifications.
        </Section>

        <Section n="5" title="Sharing with authorities">
          Verified reports of active fires or hazards are shared with local
          forestry and fire-response teams. Your contact info is shared only
          with your explicit consent during a report.
        </Section>

        <Section n="6" title="Your rights">
          You can request a copy of your data, ask us to delete your account,
          or correct any information at any time by writing to
          <span style={{color:'var(--safety-green)', fontWeight: 700}}> privacy@greenguard.app</span>.
        </Section>

        <div style={{
          textAlign:'center', marginTop: 12, padding: 14,
          fontSize: 12, color:'var(--muted-2)', letterSpacing: 0.4,
        }}>
          PROTECTING FORESTS · RESPECTING PEOPLE
        </div>
      </div>
    </div>
  );
}

window.SplashScreen = SplashScreen;
window.OnboardingScreen = OnboardingScreen;
window.LoginScreen = LoginScreen;
window.SignUpScreen = SignUpScreen;
window.ReportRiskScreen = ReportRiskScreen;
window.ReportFormScreen = ReportFormScreen;
window.ReportFireScreen = ReportFireScreen;
window.ReportSuccessScreen = ReportSuccessScreen;
window.ProfileScreen = ProfileScreen;
window.SettingsScreen = SettingsScreen;
window.AboutScreen = AboutScreen;
window.EditProfileScreen = EditProfileScreen;
window.PrivacyScreen = PrivacyScreen;
