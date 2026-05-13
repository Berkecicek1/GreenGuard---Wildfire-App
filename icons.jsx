/* GreenGuard — shared inline icons (white-line, matching the user's drawings) */

const Icon = {
  Hamburger: ({ size = 26, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <path d="M3 7h20M3 13h20M3 19h20" stroke={color} strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  ),
  Back: ({ size = 26, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <path d="M16 4L7 13l9 9" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Settings: ({ size = 26, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <path d="M13 1.2l2.1 2.7 3.3-.8 1 3.3 3.2 1.2-.8 3.3 2.2 2.6-2.2 2.6.8 3.3-3.2 1.2-1 3.3-3.3-.8L13 24.8 10.9 22l-3.3.8-1-3.3-3.2-1.2.8-3.3L2 12.4l2.2-2.6-.8-3.3 3.2-1.2 1-3.3 3.3.8L13 1.2z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="13" cy="13" r="3.6" stroke={color} strokeWidth="1.8"/>
    </svg>
  ),

  // Home / Book / Profile (bottom tab bar — matches drawings)
  TabHome: ({ active }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M3 11.5L13 3l10 8.5V22a1.5 1.5 0 01-1.5 1.5h-5V16h-7v7.5h-5A1.5 1.5 0 013 22V11.5z"
        stroke={active ? 'white' : 'rgba(255,255,255,0.55)'} strokeWidth="2.2" strokeLinejoin="round"
        fill={active ? 'rgba(255,255,255,0.07)' : 'none'}/>
    </svg>
  ),
  TabBook: ({ active }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M3 5.5C5.5 4 9 4 13 5.5 17 4 20.5 4 23 5.5v15c-2.5-1.5-6-1.5-10 0-4-1.5-7.5-1.5-10 0v-15zM13 5.5v15"
        stroke={active ? 'white' : 'rgba(255,255,255,0.55)'} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  ),
  TabProfile: ({ active }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="11" stroke={active ? 'white' : 'rgba(255,255,255,0.55)'} strokeWidth="2"/>
      <circle cx="13" cy="10.5" r="3.6" stroke={active ? 'white' : 'rgba(255,255,255,0.55)'} strokeWidth="2"/>
      <path d="M5.5 21.5c1-3.5 4-5.5 7.5-5.5s6.5 2 7.5 5.5" stroke={active ? 'white' : 'rgba(255,255,255,0.55)'} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Hazards (Recent Local Alerts on the home screen)
  Flame: ({ size = 38, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none">
      <path d="M19 4c0 5.5-7 8-7 14a7 7 0 0014 0c0-3.4-2-5-2-9 0 0-2 2-3 2-1.5 0-2-7-2-7z"
        stroke={color} strokeWidth="2.2" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  Smoke: ({ size = 38, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none">
      <rect x="6" y="13" width="26" height="4.5" rx="2" stroke={color} strokeWidth="2.2"/>
      <path d="M11 21c0 2 0 3 1.5 5M16 21c0 2 0 3 1.5 5M21 21c0 2 0 3 1.5 5M26 21c0 2 0 3 1.5 5"
        stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
  Siren: ({ size = 38, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none">
      <path d="M9 26v-9a10 10 0 0120 0v9z" stroke={color} strokeWidth="2.2" strokeLinejoin="round"/>
      <rect x="6" y="26" width="26" height="4" rx="1" stroke={color} strokeWidth="2.2"/>
      <path d="M19 7v-3" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
  CropBurn: ({ size = 38, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none">
      <rect x="7" y="7" width="18" height="18" rx="2" stroke={color} strokeWidth="2.2"/>
      <path d="M16 14c0 2.5-3 3.5-3 6a3 3 0 006 0c0-1.5-1-2-1-4 0 0-1 1-1.4 1-.6 0-.6-3-.6-3z"
        stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none"/>
      <path d="M28 14l4-4M28 22l4 4M32 18h-4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Prevention guide tile glyphs (matches drawings)
  Cigarette: ({ size = 60, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M28 18c4-2 4-6 2-9M34 18c4-2 4-6 2-9" stroke={color} strokeWidth="2.6" strokeLinecap="round"/>
      <rect x="6" y="34" width="36" height="9" rx="1" stroke={color} strokeWidth="2.6"/>
      <line x1="32" y1="34" x2="32" y2="43" stroke={color} strokeWidth="2.6"/>
      <line x1="46" y1="38.5" x2="56" y2="38.5" stroke={color} strokeWidth="2.6" strokeLinecap="round"/>
    </svg>
  ),
  Warning: ({ size = 60, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect x="30" y="6" width="34" height="34" rx="3" transform="rotate(45 30 6)" stroke={color} strokeWidth="2.6"/>
      <line x1="30" y1="20" x2="30" y2="36" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <circle cx="30" cy="42" r="1.8" fill={color}/>
    </svg>
  ),
  GlassBottle: ({ size = 60, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M22 6h12v12c5 1 8 5 8 10v22a4 4 0 01-4 4H18a4 4 0 01-4-4V28c0-5 3-9 8-10V6z"
        stroke={color} strokeWidth="2.6" strokeLinejoin="round"/>
      <circle cx="38" cy="20" r="6" stroke={color} strokeWidth="2.6" fill="none"/>
    </svg>
  ),
  Campfire: ({ size = 60, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M30 16c-2 4-2 7-2 7M30 16c2 4 4 5 4 5M30 12c0 1 0 3 0 3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="30" cy="34" rx="18" ry="4" stroke={color} strokeWidth="2.6"/>
      <path d="M14 34l-4 6M46 34l4 6M30 38v6" stroke={color} strokeWidth="2.6" strokeLinecap="round"/>
      <circle cx="22" cy="34" r="1.5" fill={color}/>
    </svg>
  ),

  // Misc small
  Phone: ({ size = 22, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M3 4.5c0 9 5.5 14.5 14.5 14.5l1-3.5-4-1.5-2 2c-2-1-4-3-5-5l2-2-1.5-4z"
        stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  Mail: ({ size = 18, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <rect x="2" y="5" width="18" height="13" rx="2" stroke={color} strokeWidth="1.8"/>
      <path d="M3 6.5l8 6 8-6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Pin: ({ size = 18, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M11 20c-4-5-7-8-7-12a7 7 0 0114 0c0 4-3 7-7 12z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="11" cy="8" r="2.4" stroke={color} strokeWidth="1.8"/>
    </svg>
  ),
  Calendar: ({ size = 18, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <rect x="3" y="5" width="16" height="14" rx="2" stroke={color} strokeWidth="1.8"/>
      <path d="M3 9h16M7 3v4M15 3v4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Verified: ({ size = 18, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="9" r="3.5" stroke={color} strokeWidth="1.8"/>
      <path d="M4 19c1.4-3 4-4.5 7-4.5s5.6 1.5 7 4.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="17" cy="17" r="3" fill={color}/>
      <path d="M15.5 17l1 1 2-2" stroke="#3a1f1f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Truck: ({ size = 22, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 26 22" fill="none">
      <rect x="2" y="6" width="14" height="10" rx="1.5" stroke={color} strokeWidth="1.8"/>
      <path d="M16 9h5l3 3v4h-8z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="7" cy="18" r="2" stroke={color} strokeWidth="1.8"/>
      <circle cx="19" cy="18" r="2" stroke={color} strokeWidth="1.8"/>
    </svg>
  ),
  Search: ({ size = 18, color = 'rgba(255,255,255,0.55)' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="10" cy="10" r="6.5" stroke={color} strokeWidth="2"/>
      <path d="M15 15l4.5 4.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Plus: ({ size = 18, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M11 4v14M4 11h14" stroke={color} strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  ),
  Bell: ({ size = 22, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 17V11a7 7 0 1114 0v6l1.5 2H3.5L5 17z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9.5 21a2.5 2.5 0 005 0" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Camera: ({ size = 22, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 8a2 2 0 012-2h2.5l1.5-2h6l1.5 2H19a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="4" stroke={color} strokeWidth="1.8"/>
    </svg>
  ),
  ChevronRight: ({ size = 18, color = 'rgba(255,255,255,0.5)' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M8 4l7 7-7 7" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Check: ({ size = 18, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M4 11l5 5 9-11" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Close: ({ size = 22, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M5 5l12 12M17 5L5 17" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
  Globe: ({ size = 22, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8"/>
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth="1.8"/>
      <path d="M3 12h18" stroke={color} strokeWidth="1.8"/>
    </svg>
  ),
  Wind: ({ size = 18, color = 'rgba(255,255,255,0.7)' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M3 7h11a3 3 0 100-6M3 11h15a3 3 0 110 6M3 15h9a2 2 0 110 4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Drop: ({ size = 18, color = 'rgba(255,255,255,0.7)' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M11 3c-3 4-6 7-6 11a6 6 0 0012 0c0-4-3-7-6-11z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  Thermo: ({ size = 18, color = 'rgba(255,255,255,0.7)' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M11 3a2.5 2.5 0 00-2.5 2.5v8a4.5 4.5 0 105 0v-8A2.5 2.5 0 0011 3z" stroke={color} strokeWidth="1.8"/>
      <circle cx="11" cy="16" r="1.4" fill={color}/>
    </svg>
  ),
  Layers: ({ size = 22, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l10 6-10 6L2 8l10-6z" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M2 13l10 6 10-6M2 17l10 6 10-6" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  Locate: ({ size = 22, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.8"/>
      <path d="M12 1v3M12 20v3M1 12h3M20 12h3" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  ArrowRight: ({ size = 18, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path d="M4 11h14M12 5l6 6-6 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  TabMap: ({ active }) => (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <path d="M3 6l6.5-2 7 2 6.5-2v16l-6.5 2-7-2L3 22V6z" stroke={active ? 'white' : 'rgba(255,255,255,0.55)'} strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="M9.5 4v16M16.5 6v16" stroke={active ? 'white' : 'rgba(255,255,255,0.55)'} strokeWidth="2.2"/>
    </svg>
  ),
  RiskBolt: ({ size = 26, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <path d="M14 2L4 15h7l-2 9 11-14h-7l1-8z" stroke={color} strokeWidth="2.2" strokeLinejoin="round" fill={color} fillOpacity="0.18"/>
    </svg>
  ),
  FireSiren: ({ size = 26, color = 'white' }) => (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <path d="M13 3c0 4-5 5-5 10a5 5 0 0010 0c0-2.5-1.5-3.5-1.5-6.5 0 0-1.5 1.5-2 1.5-1 0-1.5-5-1.5-5z"
        stroke={color} strokeWidth="2.2" strokeLinejoin="round" fill={color} fillOpacity="0.18"/>
      <circle cx="13" cy="14" r="2" fill={color}/>
    </svg>
  ),
};

window.Icon = Icon;
