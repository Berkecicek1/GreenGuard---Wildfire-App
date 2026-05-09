/* GreenGuard — Guides screens & illustrations.
   Illustrations are styled to match the user's hand-drawn cards: bold black outline,
   filled colors, slight cartoon look. Drawn at 100×100, scaled to fit the card.
*/
const { useState: useState_G } = React;

function GuidesScreen({ go, search, setSearch }) {
  const guides = [
    { id: 'cigarette', label: 'SAFE CIGARETTE\nDISPOSAL', icon: <Icon.Cigarette size={78}/> },
    { id: 'hidden',    label: 'IDENTIFYING\nHIDDEN RISKS', icon: <Icon.Warning size={78}/> },
    { id: 'glass',     label: 'GLASS WASTE\nMANAGEMENT',   icon: <Icon.GlassBottle size={78}/> },
    { id: 'campfire',  label: 'HOW TO PUT\nOUT A CAMPFIRE',icon: <Icon.Campfire size={78}/> },
  ];
  const filtered = !search ? guides
    : guides.filter(g => g.label.toLowerCase().replace(/\n/g,' ').includes(search.toLowerCase()));
  return (
    <div className="gg-screen enter">
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={() => go('home', null, true)}><Icon.Back/></button>
        <div className="gg-title">Prevention Guides</div>
      </div>
      <div className="gg-body">
        <div className="gg-search" style={{marginBottom: 18}}>
          <Icon.Search/>
          <input placeholder="Search guides…" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14}}>
          {filtered.map(g => (
            <button key={g.id} className="gg-card" onClick={() => go('guide_' + g.id)} style={{
              padding: 18, display:'flex', flexDirection:'column', alignItems:'center', gap: 14,
              cursor:'pointer', border:'none', color:'white', fontFamily:'var(--font)',
              minHeight: 180,
            }}>
              <div style={{
                width: 88, height: 88, borderRadius: 18,
                background:'rgba(255,255,255,0.06)', display:'flex',
                alignItems:'center', justifyContent:'center',
              }}>{g.icon}</div>
              <div style={{fontSize: 13, fontWeight: 800, textAlign:'center', whiteSpace:'pre-line', lineHeight: 1.25, letterSpacing: 0.3}}>
                {g.label}
              </div>
            </button>
          ))}
        </div>
        {/* Quick Facts strip — non-clickable */}
        <div style={{marginTop: 22, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, color:'var(--muted-2)', textTransform:'uppercase'}}>
          Quick Facts
        </div>
        <div className="gg-card" style={{marginTop: 10, padding: 16, pointerEvents:'none'}}>
          <div style={{display:'flex', alignItems:'flex-start', gap: 12}}>
            <div style={{width: 38, height: 38, borderRadius: 10, background:'rgba(230,114,58,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 4c0 4-5 6-5 10a5 5 0 0010 0c0-2-1-3-1-5 0 0-1.5 1.5-2 1.5-1 0-1.5-2.5-2-6.5z" stroke="#e6723a" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 14, fontWeight: 800, marginBottom: 4}}>85% of wildfires are human-caused</div>
              <div style={{fontSize: 12, lineHeight: 1.5, color:'rgba(255,255,255,0.65)'}}>Most are preventable with simple precautions outlined in these guides.</div>
            </div>
          </div>
        </div>
        <div className="gg-card" style={{marginTop: 10, padding: 16, pointerEvents:'none'}}>
          <div style={{display:'flex', alignItems:'flex-start', gap: 12}}>
            <div style={{width: 38, height: 38, borderRadius: 10, background:'rgba(90,168,78,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M4 11l5 5 9-11" stroke="#5aa84e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 14, fontWeight: 800, marginBottom: 4}}>5 minutes can save a forest</div>
              <div style={{fontSize: 12, lineHeight: 1.5, color:'rgba(255,255,255,0.65)'}}>Properly extinguishing a campfire takes minutes — preventing it takes lifetimes.</div>
            </div>
          </div>
        </div>
        <div className="gg-card" style={{marginTop: 10, padding: 16, pointerEvents:'none'}}>
          <div style={{display:'flex', alignItems:'flex-start', gap: 12}}>
            <div style={{width: 38, height: 38, borderRadius: 10, background:'rgba(91,150,216,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0}}>
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 3c-3 4-6 7-6 11a6 6 0 0012 0c0-4-3-7-6-11z" stroke="#5b96d8" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 14, fontWeight: 800, marginBottom: 4}}>Drown · Stir · Feel</div>
              <div style={{fontSize: 12, lineHeight: 1.5, color:'rgba(255,255,255,0.65)'}}>The 3-step rule for fully extinguishing any outdoor fire.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* The 4 detail pages — content & layout EXACTLY matching the user's drawings */
function GuideDetail({ go, kind }) {
  const data = {
    cigarette: {
      title: 'Safe Cigarette Disposal',
      heading: 'FOREST FIRE PREVENTION GUIDE:',
      body: "Did you know? Every year, careless cigaratte disposal starts numerous numbers of wildfires. To protect our forests ensure your smoking materials are always completely extinguished before you move or dispose of them.",
      cards: [
        { img: 'assets/guides/cigarette_1_avoid_throwing.png', label: 'Avoid Throwing\nCigarattes' },
        { img: 'assets/guides/cigarette_2_avoid_dry.png',      label: 'Avoid Dry\nAreas' },
        { img: 'assets/guides/cigarette_3_put_out_cold.png',   label: 'Put Out Cold' },
        { img: 'assets/guides/cigarette_4_douse_your.png',     label: 'Douse Your\nCigarattes' },
      ],
    },
    hidden: {
      title: 'Identifying Hidden Risks',
      heading: 'HIDDEN WILDFIRE DANGER GUIDE:',
      body: "Wildfires often start from overlooked dangers. A simple spark from equipment, unmanaged debris, or even reflection can become catastrophic. Beyond visible smoke, knowing and mitigating hidden risks is essential for forest protection. Inspect everything.",
      cards: [
        { img: 'assets/guides/hidden_1_inspect_equipment.png', label: 'Inspect Your\nEquiments' },
        { img: 'assets/guides/hidden_2_secure_debris.png',     label: 'Secure Debris\nPiles' },
        { img: 'assets/guides/hidden_3_check_wiring.png',      label: 'Check Frayed\nWiring' },
        { img: 'assets/guides/hidden_4_tools_nearby.png',      label: 'Keep Your\nTools Nearby' },
      ],
    },
    glass: {
      title: 'Glass Waste Management',
      heading: 'THE MAGNIFYING GLASS EFFECT:',
      body: "Glass bottles and shards left in the forest can act as powerful magnifying lenses. Under direct sunlight, they concentrate heat onto dry grass or leaves, igniting fires in minutes. Proper disposal is not just about littering; it's about preventing a disaster.",
      cards: [
        { img: 'assets/guides/glass_1_avoid_sunlight.png', label: 'Avoid Direck\nSunlight' },
        { img: 'assets/guides/glass_2_collect_broken.png', label: 'Collect Broken\nGlass' },
        { img: 'assets/guides/glass_3_recycle_bins.png',   label: 'Recycle\nDesignated Bins' },
        { img: 'assets/guides/glass_4_dispose_buried.png', label: 'Dispose Partailly\nBuried' },
      ],
    },
    campfire: {
      title: 'How to Put Out a Campfire',
      heading: 'COMPLETE EXTINGUISHMENT GUIDE:',
      body: 'A campfire is not truly out until it is cold to the touch. Even buried embers can retain heat for days and reignite under windy conditions. Following the "Drown, Stir, and Feel" method is the only way to ensure you leave no danger behind.',
      cards: [
        { img: 'assets/guides/campfire_1_put_water.png',  label: 'Put Your Fire\nWith Water' },
        { img: 'assets/guides/campfire_2_stir_ashes.png', label: 'Stir Ashes\nWith Water' },
        { img: 'assets/guides/campfire_3_scrape_logs.png',label: 'Scrape\nRemaining Logs' },
        { img: 'assets/guides/campfire_4_feel_cold.png',  label: 'Feel The Cold' },
      ],
    },
  }[kind];

  /* Extra detail sections per guide — appended below the 4-card grid */
  const extras = {
    cigarette: [
      { title: 'Why It Matters', body: 'A single discarded cigarette can smolder for over an hour before igniting dry vegetation. In peak summer, that is enough time for wind to carry sparks across hundreds of meters.' },
      { steps: ['Crush the ember against a non-flammable surface', 'Soak the butt in water if possible', 'Carry it out — do not bury it in soil or leaves'], title: 'The 3-Step Rule' },
    ],
    hidden: [
      { title: 'Common Hidden Triggers', body: 'Lawnmower blades striking rocks, frayed power cords, hot exhaust pipes on dry grass, and even discarded glass acting as a lens — every one of these has started a major wildfire in the last decade.' },
      { steps: ['Inspect tools before each use', 'Clear dry brush 3m around any equipment', 'Keep a 5L water container within reach'], title: 'Field Checklist' },
    ],
    glass: [
      { title: 'The Science', body: 'A curved glass surface can focus sunlight to over 400°C — hotter than the autoignition point of dry leaves (260°C). Even a clear bottle bottom in tall grass becomes a fire starter on a sunny afternoon.' },
      { steps: ['Pack out every piece — even small shards', 'Use puncture-resistant containers', 'Report broken glass clusters via the app'], title: 'Disposal Steps' },
    ],
    campfire: [
      { title: 'The Drown · Stir · Feel Method', body: 'Pour water until hissing stops. Stir ashes and embers with a stick to expose hidden coals. Pour again. Then place your bare hand near the ashes — if you feel any warmth, it is not out.' },
      { steps: ['Drown the fire with water until silent', 'Stir all ashes and remaining wood', 'Feel for heat — repeat until cold'], title: '3 Steps to Cold' },
    ],
  }[kind];

  return (
    <div className={`gg-screen enter ${data.maroon ? 'cigaretteMaroon' : ''}`}>
      <div className="gg-header">
        <button className="gg-iconbtn" onClick={() => go('guides', null, true)}><Icon.Back/></button>
        <div className="gg-title" style={{fontSize: 18}}>{data.title}</div>
      </div>
      <div className="gg-body">
        <div className={`gg-card ${data.maroon ? 'cigaretteMaroon' : ''}`}>
          <div style={{fontSize: 22, fontWeight: 800, lineHeight: 1.15, letterSpacing: 0.2}}>{data.heading}</div>
          <div style={{fontSize: 14, lineHeight: 1.55, color:'var(--text-2)', marginTop: 14}}>{data.body}</div>
          <div className="gg-divider"/>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 18, marginTop: 6}}>
            {data.cards.map((c, i) => (
              <div key={i} style={{display:'flex', flexDirection:'column', alignItems:'center', gap: 8, cursor:'pointer'}}
                   onClick={() => alert('Open full step: ' + c.label.replace('\n',' '))}>
                <IllustrationCard kind={c.img}/>
                <div style={{fontSize: 14, fontWeight: 700, textAlign:'center', whiteSpace:'pre-line', lineHeight: 1.2}}>
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extra detail sections */}
        {extras && extras.map((ex, i) => (
          <div key={i} className={`gg-card ${data.maroon ? 'cigaretteMaroon' : ''}`} style={{marginTop: 14, padding: 18}}>
            <div style={{fontSize: 16, fontWeight: 800, letterSpacing: 0.3, marginBottom: 10}}>{ex.title}</div>
            {ex.body && (
              <div style={{fontSize: 13.5, lineHeight: 1.6, color:'rgba(255,255,255,0.82)'}}>{ex.body}</div>
            )}
            {ex.steps && (
              <div style={{display:'flex', flexDirection:'column', gap: 10, marginTop: 4}}>
                {ex.steps.map((s, j) => (
                  <div key={j} style={{display:'flex', alignItems:'flex-start', gap: 12}}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: data.maroon ? 'rgba(255,255,255,0.16)' : 'rgba(90,168,78,0.22)',
                      color: data.maroon ? '#fff' : '#a8d8a0',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize: 13, fontWeight: 800, flexShrink: 0,
                    }}>{j + 1}</div>
                    <div style={{fontSize: 13.5, lineHeight: 1.5, color:'var(--text-2)', paddingTop: 3}}>{s}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Reminder footer */}
        <div style={{marginTop: 14, marginBottom: 8, padding: '14px 16px', borderRadius: 12,
                     background:'rgba(230,114,58,0.12)', border:'1px solid rgba(230,114,58,0.3)',
                     display:'flex', gap: 12, alignItems:'center'}}>
          <div style={{fontSize: 22}}>⚠</div>
          <div style={{fontSize: 12.5, lineHeight: 1.5, color:'var(--text-2)', flex: 1}}>
            See something risky? Use <b>Report Risk</b> on the home screen — every report helps protect the forest.
          </div>
        </div>
      </div>
    </div>
  );
}

function IllustrationCard({ kind }) {
  // kind is now a path to a PNG
  return (
    <div style={{
      width: '100%', aspectRatio: '1 / 1', maxWidth: 150,
      background:'#dcdcdc', borderRadius: 14,
      display:'flex', alignItems:'center', justifyContent:'center',
      overflow:'hidden',
    }}>
      <img src={kind} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}/>
    </div>
  );
}

/* Simple icon-style illustrations (clean line + accent fill) */
function Illustration({ kind }) {
  const S = '#1a1a1a';
  const sw = 2.4;
  const RED = '#d34a3a';
  const GREEN = '#5aa84e';
  const BLUE = '#5b96d8';
  const YELLOW = '#e6b83a';
  const ORANGE = '#e0723a';

  const Prohibit = () => (
    <g>
      <circle cx="50" cy="50" r="36" fill="none" stroke={RED} strokeWidth="5"/>
      <line x1="26" y1="26" x2="74" y2="74" stroke={RED} strokeWidth="5" strokeLinecap="round"/>
    </g>
  );

  const Cigarette = (props) => (
    <g {...props}>
      <rect x="20" y="48" width="40" height="6" rx="1" fill="#fff" stroke={S} strokeWidth={sw}/>
      <rect x="54" y="48" width="8" height="6" fill={YELLOW} stroke={S} strokeWidth={sw}/>
      <rect x="18" y="48" width="4" height="6" fill="#3a3a3a"/>
      <circle cx="18" cy="51" r="2.4" fill={ORANGE}/>
    </g>
  );

  switch (kind) {
    /* CIGARETTE */
    case 'cigarette-throw':
      return (
        <svg viewBox="0 0 100 100" width="78%" height="78%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <Cigarette transform="rotate(-25 40 51)"/>
          <Prohibit/>
        </svg>
      );
    case 'cigarette-dry':
      return (
        <svg viewBox="0 0 100 100" width="78%" height="78%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M20 70 L26 60 M30 72 L36 58 M40 70 L46 58 M58 70 L64 58 M70 72 L76 60 M82 70 L86 60" stroke={GREEN} strokeWidth="3"/>
          <Cigarette transform="translate(0 -4)"/>
          <Prohibit/>
        </svg>
      );
    case 'cigarette-boot':
      return (
        <svg viewBox="0 0 100 100" width="86%" height="86%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M22 70 L22 36 Q22 28 30 28 L42 28 Q48 28 50 36 L50 56 L72 56 Q76 56 76 60 L76 72 Z" fill="#6e6ba5"/>
          <rect x="20" y="70" width="58" height="6" fill="#4a4878"/>
          <line x1="28" y1="38" x2="44" y2="40"/><line x1="28" y1="44" x2="44" y2="46"/><line x1="28" y1="50" x2="44" y2="52"/>
        </svg>
      );
    case 'cigarette-bowl':
      return (
        <svg viewBox="0 0 100 100" width="86%" height="86%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <ellipse cx="50" cy="60" rx="32" ry="8" fill="#e8c8c0"/>
          <path d="M18 60 Q22 78 50 78 Q78 78 82 60" fill="#d6a89c"/>
          <ellipse cx="50" cy="60" rx="26" ry="5" fill={BLUE}/>
          <Cigarette transform="rotate(-30 56 50) translate(8 0)"/>
        </svg>
      );

    /* HIDDEN */
    case 'hidden-mower':
      return (
        <svg viewBox="0 0 100 100" width="86%" height="86%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="20" y="50" width="44" height="22" rx="3" fill={RED}/>
          <path d="M64 52 L82 30" strokeWidth="3"/>
          <rect x="78" y="26" width="8" height="4" fill="#3a3a3c"/>
          <circle cx="30" cy="74" r="6" fill="#3a3a3c"/>
          <circle cx="56" cy="74" r="6" fill="#3a3a3c"/>
        </svg>
      );
    case 'hidden-debris':
      return (
        <svg viewBox="0 0 100 100" width="78%" height="78%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="28" y="60" width="44" height="8" rx="2" fill="#8a5a32"/>
          <path d="M40 58 Q40 46 48 42 Q50 50 54 46 Q58 38 62 46 Q64 56 60 60 Z" fill={ORANGE}/>
          <Prohibit/>
        </svg>
      );
    case 'hidden-wire':
      return (
        <svg viewBox="0 0 100 100" width="86%" height="86%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M14 76 Q26 64 38 50" stroke="#3a3a3c" strokeWidth="9"/>
          <path d="M38 50 L30 30" stroke={ORANGE} strokeWidth="3.5"/>
          <path d="M38 50 L42 26" stroke={YELLOW} strokeWidth="3.5"/>
          <path d="M38 50 L52 28" stroke={BLUE} strokeWidth="3.5"/>
          <path d="M38 50 L58 40" stroke={GREEN} strokeWidth="3.5"/>
          <path d="M44 22 L46 18 L48 22" fill="#f4d04a" stroke={ORANGE}/>
        </svg>
      );
    case 'hidden-tools':
      return (
        <svg viewBox="0 0 100 100" width="86%" height="86%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M22 46 L42 46 L40 78 L24 78 Z" fill="#9aa0a6"/>
          <path d="M22 48 Q32 34 42 48"/>
          <ellipse cx="32" cy="46" rx="10" ry="3" fill={BLUE}/>
          <g transform="rotate(20 70 60)">
            <rect x="68" y="20" width="4" height="44" fill="#8a5a32"/>
            <rect x="64" y="18" width="12" height="4" rx="1" fill={YELLOW}/>
            <path d="M62 60 L78 60 L74 78 L66 78 Z" fill="#9aa0a6"/>
          </g>
        </svg>
      );

    /* GLASS */
    case 'glass-magnify':
      return (
        <svg viewBox="0 0 100 100" width="82%" height="82%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="42" cy="42" r="18" fill="#b8d6e0" fillOpacity="0.7" stroke={S} strokeWidth="3.5"/>
          <path d="M37 34 Q42 32 48 36" stroke="#fff" strokeWidth="2"/>
          <rect x="56" y="56" width="22" height="6" rx="2" transform="rotate(40 56 56)" fill="#3a3a3c"/>
          <path d="M16 80 L20 70 M30 82 L34 68 M48 80 L52 68 M70 82 L74 70 M86 80 L88 70" stroke={GREEN} strokeWidth="3"/>
        </svg>
      );
    case 'glass-bag':
      return (
        <svg viewBox="0 0 100 100" width="78%" height="78%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M34 36 L40 28 L52 28 L66 36 L70 64 Q70 72 60 74 L42 74 Q32 72 32 64 Z" fill="#3a3a3c"/>
          <path d="M44 50 L50 56 L46 60 M56 46 L60 52 L56 56" stroke="#cfcfcf"/>
          <Prohibit/>
        </svg>
      );
    case 'glass-buried':
      return (
        <svg viewBox="0 0 100 100" width="78%" height="78%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M22 64 Q40 56 50 60 Q62 56 80 64 L80 78 L22 78 Z" fill="#7d5532"/>
          <path d="M40 50 L50 64 L46 66 L36 52 Z" fill="#cde6ec" stroke={S}/>
          <path d="M52 44 L60 60 L56 62 L48 50" fill="#b8d6e0" stroke={S}/>
          <Prohibit/>
        </svg>
      );
    case 'glass-bin':
      return (
        <svg viewBox="0 0 100 100" width="86%" height="86%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="22" y="34" width="36" height="48" rx="3" fill={GREEN}/>
          <rect x="20" y="28" width="40" height="8" rx="2" fill="#3f8636"/>
          <path d="M32 50 L38 56 L44 50 M32 60 L38 54 L44 60" stroke="#fff" strokeWidth="2.4"/>
          <path d="M64 48 L68 42 L76 42 L84 50 L86 80 Q86 84 80 84 L66 84 Q60 84 60 80 Z" fill="#2d2d2f"/>
        </svg>
      );

    /* CAMPFIRE */
    case 'camp-water':
      return (
        <svg viewBox="0 0 100 100" width="86%" height="86%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="32" y="72" width="44" height="8" rx="2" fill="#8a5a32"/>
          <path d="M44 72 Q40 60 48 54 Q48 64 54 58 Q56 48 62 54 Q66 64 70 56 Q72 68 64 72 Z" fill={ORANGE}/>
          <path d="M50 70 Q48 60 54 56 Q56 62 60 58 Q62 64 64 64 Q62 70 58 70 Z" fill="#f0a93c"/>
          <g>
            <path d="M14 30 L30 24 L34 36 L18 42 Z" fill="#3a3a3c"/>
            <path d="M28 24 Q34 14 40 24"/>
            <path d="M30 36 Q36 44 44 56" stroke={BLUE} strokeWidth="4"/>
          </g>
        </svg>
      );
    case 'camp-stir':
      return (
        <svg viewBox="0 0 100 100" width="86%" height="86%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <ellipse cx="50" cy="78" rx="36" ry="6" fill="#3d3d3d"/>
          <path d="M22 78 Q40 68 50 70 Q62 68 78 78 Z" fill="#5a5a5a"/>
          <path d="M36 56 Q32 46 38 40" stroke="#bdbdbd" strokeWidth="2.4"/>
          <path d="M50 50 Q46 42 52 36" stroke="#bdbdbd" strokeWidth="2.4"/>
          <g transform="rotate(15 58 56)">
            <rect x="56" y="38" width="4" height="32" fill="#8a5a32"/>
            <path d="M50 60 L66 60 L62 76 L52 76 Z" fill="#9aa0a6"/>
          </g>
        </svg>
      );
    case 'camp-scrape':
      return (
        <svg viewBox="0 0 100 100" width="86%" height="86%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <ellipse cx="50" cy="72" rx="34" ry="8" fill="#5a3a1f"/>
          <ellipse cx="50" cy="68" rx="34" ry="6" fill="#8a5a32"/>
          <circle cx="20" cy="68" r="3" fill="#5a3a1f"/>
          <circle cx="80" cy="68" r="3" fill="#5a3a1f"/>
          <g transform="rotate(-25 50 50)">
            <rect x="48" y="14" width="4" height="46" fill="#8a5a32"/>
            <rect x="44" y="10" width="12" height="6" rx="1" fill={YELLOW}/>
            <path d="M40 58 L60 58 L56 74 L44 74 Z" fill="#9aa0a6"/>
          </g>
        </svg>
      );
    case 'camp-feel':
      return (
        <svg viewBox="0 0 100 100" width="86%" height="86%" stroke={S} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none">
          <ellipse cx="50" cy="82" rx="36" ry="6" fill="#3d3d3d"/>
          <path d="M16 80 Q40 70 50 72 Q62 70 84 80 Z" fill="#5a5a5a"/>
          <path d="M30 56 Q34 44 46 44 Q56 44 64 50 Q72 52 76 60 Q78 70 70 76 L40 78 Q30 76 28 68 Q26 62 30 56 Z" fill="#f0c89c"/>
          <path d="M68 22 L78 32 L92 14" stroke="#4ea83b" strokeWidth="6"/>
        </svg>
      );

    default: return null;
  }
}

window.GuidesScreen = GuidesScreen;
window.GuideDetail  = GuideDetail;
