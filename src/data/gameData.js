// ─────────────────────────────────────────────────────────────
//  GOLDNOTE — MASTER GAME DATA v3
//  Fixes: artists all show in market (currentLabel vs label field)
//  Economy: balanced, difficulty scaling, regional system
// ─────────────────────────────────────────────────────────────

export const GENRES = [
  'Hip-Hop','R&B','Pop','Afrobeats','Latin','Rock',
  'Electronic','K-Pop','Reggaeton','Gospel','Amapiano',
  'Drill','Dancehall','Indie','Afro-Fusion',
];

export const REGIONS = [
  'US','UK','Nigeria','Ghana','South Africa',
  'Jamaica','Brazil','Colombia','Mexico',
  'South Korea','France','Canada','Australia','India',
];

// Genre trend cycle — rotates every ~6 weeks in engine
export const GENRE_TREND_CYCLES = [
  { genre:'Afrobeats',   mult:1.6, description:'Afrobeats dominates global charts' },
  { genre:'Hip-Hop',     mult:1.5, description:'Rap takes over streaming platforms' },
  { genre:'Pop',         mult:1.4, description:'Pop crossover wave hitting worldwide' },
  { genre:'Latin',       mult:1.6, description:'Latin explosion — global audiences tuning in' },
  { genre:'R&B',         mult:1.4, description:'R&B renaissance drives playlist numbers' },
  { genre:'Drill',       mult:1.5, description:'Drill dominates street culture globally' },
  { genre:'Amapiano',    mult:1.7, description:'Amapiano wave sweeps dance floors worldwide' },
  { genre:'Electronic',  mult:1.3, description:'Electronic revival — festival season effect' },
  { genre:'K-Pop',       mult:1.5, description:'K-Pop frenzy pushing global streaming records' },
  { genre:'Dancehall',   mult:1.4, description:'Caribbean sound taking over summer playlists' },
];

// Regional influence tiers
export const REGIONAL_TIERS = {
  'Nigeria':      { label:'Lagos Scene',     globalMult:0.6, localMult:1.8 },
  'US':           { label:'US Market',       globalMult:1.0, localMult:1.0 },
  'UK':           { label:'UK Scene',        globalMult:0.8, localMult:1.4 },
  'South Africa': { label:'SA Scene',        globalMult:0.5, localMult:1.9 },
  'Colombia':     { label:'Latin Core',      globalMult:0.7, localMult:1.6 },
  'Jamaica':      { label:'Caribbean Sound', globalMult:0.6, localMult:1.7 },
  'South Korea':  { label:'K-Wave Hub',      globalMult:0.7, localMult:2.0 },
  'Brazil':       { label:'Brazilian Market',globalMult:0.65,localMult:1.7 },
  'Ghana':        { label:'Accra Scene',     globalMult:0.45,localMult:1.6 },
};

// ─── PRODUCERS ────────────────────────────────
export const PRODUCERS = [
  { id:'maxmartin',   name:'Max Martin',           specialty:'Pop',           cost:180000, qualityBonus:25, region:'US'          },
  { id:'hitboy',      name:'Hit-Boy',               specialty:'Hip-Hop',       cost:120000, qualityBonus:20, region:'US'          },
  { id:'sarz',        name:'Sarz',                  specialty:'Afrobeats',     cost:80000,  qualityBonus:22, region:'Nigeria'     },
  { id:'metro',       name:'Metro Boomin',           specialty:'Hip-Hop',       cost:200000, qualityBonus:28, region:'US'          },
  { id:'pharrell',    name:'Pharrell Williams',      specialty:'Pop/R&B',       cost:250000, qualityBonus:30, region:'US'          },
  { id:'london',      name:'London on da Track',     specialty:'Trap',          cost:100000, qualityBonus:18, region:'US'          },
  { id:'p2j',         name:'P2J',                    specialty:'R&B/Afrobeats', cost:90000,  qualityBonus:20, region:'UK'          },
  { id:'kaytranada',  name:'Kaytranada',              specialty:'Electronic/R&B',cost:130000, qualityBonus:22, region:'Canada'      },
  { id:'timbaland',   name:'Timbaland',               specialty:'R&B/Hip-Hop',   cost:160000, qualityBonus:24, region:'US'          },
  { id:'madlib',      name:'Madlib',                 specialty:'Alternative',    cost:110000, qualityBonus:26, region:'US'          },
  { id:'ovy',         name:'Ovy on the Drums',        specialty:'Reggaeton',     cost:95000,  qualityBonus:21, region:'Colombia'    },
  { id:'killertunes', name:'Killer Tunes',            specialty:'Afrobeats',     cost:55000,  qualityBonus:16, region:'Nigeria'     },
  { id:'spax',        name:'Spax',                   specialty:'Amapiano',       cost:65000,  qualityBonus:18, region:'South Africa'},
  { id:'cardo',       name:'Cardo Got Wings',         specialty:'Hip-Hop',       cost:85000,  qualityBonus:18, region:'US'          },
  { id:'easylife',    name:'Easylife',                specialty:'Drill',          cost:50000,  qualityBonus:15, region:'UK'          },
];

// ─── REAL ARTISTS ─────────────────────────────
// KEY FIX: "currentLabel" is just flavor text shown in UI
// ALL real artists are available to sign — market shows them all
// Player competes with rival AI to sign them
export const REAL_ARTISTS = [
  // ── HIP-HOP ────────────────────────────────
  { id:'drake',       name:'Drake',             genre:'Hip-Hop',     region:'Canada',      fame:98,  talent:92, workEthic:85, ego:88, loyalty:60, creativity:84, controversyLevel:55, starPotential:99,  burnoutRisk:20, viralProbability:75, careerPhase:'peak',   currentLabel:'Republic Records',       signingBonus:15000000, weeklyFee:480000, style:'melodic rap',         isReal:true, tier:'S' },
  { id:'kendrick',    name:'Kendrick Lamar',    genre:'Hip-Hop',     region:'US',          fame:97,  talent:99, workEthic:96, ego:60, loyalty:82, creativity:99, controversyLevel:45, starPotential:100, burnoutRisk:15, viralProbability:70, careerPhase:'peak',   currentLabel:'pgLang/Interscope',      signingBonus:12000000, weeklyFee:420000, style:'lyrical rap',         isReal:true, tier:'S' },
  { id:'drake2',      name:'21 Savage',         genre:'Hip-Hop',     region:'UK/US',       fame:88,  talent:84, workEthic:80, ego:65, loyalty:72, creativity:76, controversyLevel:55, starPotential:87,  burnoutRisk:25, viralProbability:65, careerPhase:'peak',   currentLabel:'Epic Records',           signingBonus:7000000,  weeklyFee:200000, style:'trap',                isReal:true, tier:'A' },
  { id:'travis',      name:'Travis Scott',      genre:'Hip-Hop',     region:'US',          fame:93,  talent:88, workEthic:82, ego:80, loyalty:65, creativity:90, controversyLevel:70, starPotential:95,  burnoutRisk:30, viralProbability:80, careerPhase:'peak',   currentLabel:'Cactus Jack/Epic',       signingBonus:10000000, weeklyFee:320000, style:'psychedelic trap',    isReal:true, tier:'S' },
  { id:'future',      name:'Future',            genre:'Hip-Hop',     region:'US',          fame:90,  talent:82, workEthic:90, ego:75, loyalty:55, creativity:78, controversyLevel:60, starPotential:88,  burnoutRisk:35, viralProbability:60, careerPhase:'peak',   currentLabel:'Epic Records',           signingBonus:8000000,  weeklyFee:260000, style:'trap',                isReal:true, tier:'A' },
  { id:'dojacat',     name:'Doja Cat',          genre:'Pop/Hip-Hop', region:'US',          fame:91,  talent:90, workEthic:75, ego:70, loyalty:58, creativity:92, controversyLevel:65, starPotential:94,  burnoutRisk:38, viralProbability:85, careerPhase:'peak',   currentLabel:'RCA Records',            signingBonus:9000000,  weeklyFee:280000, style:'pop rap',             isReal:true, tier:'A' },
  { id:'cardi',       name:'Cardi B',           genre:'Hip-Hop',     region:'US',          fame:88,  talent:82, workEthic:78, ego:82, loyalty:68, creativity:80, controversyLevel:75, starPotential:88,  burnoutRisk:30, viralProbability:78, careerPhase:'peak',   currentLabel:'Atlantic Records',       signingBonus:8000000,  weeklyFee:230000, style:'hip-hop pop',         isReal:true, tier:'A' },
  { id:'lildurk',     name:'Lil Durk',          genre:'Hip-Hop',     region:'US',          fame:86,  talent:82, workEthic:85, ego:65, loyalty:72, creativity:78, controversyLevel:60, starPotential:86,  burnoutRisk:28, viralProbability:62, careerPhase:'peak',   currentLabel:'Only the Family/Alamo',  signingBonus:6500000,  weeklyFee:175000, style:'drill',               isReal:true, tier:'A' },
  { id:'babykeem',    name:'Baby Keem',         genre:'Hip-Hop',     region:'US',          fame:75,  talent:82, workEthic:88, ego:50, loyalty:85, creativity:88, controversyLevel:30, starPotential:92,  burnoutRisk:18, viralProbability:55, careerPhase:'rise',   currentLabel:'pgLang/Columbia',        signingBonus:3500000,  weeklyFee:90000,  style:'alt rap',             isReal:true, tier:'B' },
  { id:'latto',       name:'Latto',             genre:'Hip-Hop',     region:'US',          fame:78,  talent:80, workEthic:84, ego:68, loyalty:70, creativity:76, controversyLevel:45, starPotential:85,  burnoutRisk:22, viralProbability:60, careerPhase:'rise',   currentLabel:'RCA Records',            signingBonus:4000000,  weeklyFee:110000, style:'rap',                 isReal:true, tier:'B' },
  { id:'youngthug',   name:'Young Thug',        genre:'Hip-Hop',     region:'US',          fame:87,  talent:86, workEthic:80, ego:72, loyalty:55, creativity:90, controversyLevel:80, starPotential:90,  burnoutRisk:35, viralProbability:68, careerPhase:'peak',   currentLabel:'YSL Records',            signingBonus:7500000,  weeklyFee:210000, style:'melodic trap',        isReal:true, tier:'A' },
  { id:'gunna',       name:'Gunna',             genre:'Hip-Hop',     region:'US',          fame:83,  talent:79, workEthic:82, ego:68, loyalty:62, creativity:76, controversyLevel:55, starPotential:83,  burnoutRisk:28, viralProbability:58, careerPhase:'peak',   currentLabel:'YSL/300',                signingBonus:5000000,  weeklyFee:140000, style:'melodic trap',        isReal:true, tier:'B' },
  { id:'nle',         name:'NLE Choppa',        genre:'Hip-Hop',     region:'US',          fame:72,  talent:74, workEthic:90, ego:60, loyalty:75, creativity:72, controversyLevel:50, starPotential:82,  burnoutRisk:20, viralProbability:65, careerPhase:'rise',   currentLabel:'No Love Entertainment',  signingBonus:2500000,  weeklyFee:70000,  style:'trap',                isReal:true, tier:'B' },
  { id:'jackharlow',  name:'Jack Harlow',       genre:'Hip-Hop',     region:'US',          fame:80,  talent:78, workEthic:84, ego:60, loyalty:80, creativity:76, controversyLevel:28, starPotential:84,  burnoutRisk:20, viralProbability:60, careerPhase:'rise',   currentLabel:'Generation Now/Atlantic',signingBonus:4500000,  weeklyFee:120000, style:'pop rap',             isReal:true, tier:'B' },
  // ── R&B ────────────────────────────────────
  { id:'sza',         name:'SZA',               genre:'R&B',         region:'US',          fame:94,  talent:95, workEthic:72, ego:55, loyalty:78, creativity:96, controversyLevel:25, starPotential:98,  burnoutRisk:40, viralProbability:72, careerPhase:'peak',   currentLabel:'Top Dawg/RCA',           signingBonus:10000000, weeklyFee:330000, style:'alt R&B',             isReal:true, tier:'S' },
  { id:'theweeknd',   name:'The Weeknd',        genre:'R&B',         region:'Canada',      fame:96,  talent:94, workEthic:88, ego:72, loyalty:62, creativity:92, controversyLevel:40, starPotential:98,  burnoutRisk:25, viralProbability:75, careerPhase:'peak',   currentLabel:'XO/Republic',            signingBonus:14000000, weeklyFee:450000, style:'dark R&B',            isReal:true, tier:'S' },
  { id:'usher',       name:'Usher',             genre:'R&B',         region:'US',          fame:90,  talent:91, workEthic:92, ego:65, loyalty:80, creativity:85, controversyLevel:30, starPotential:90,  burnoutRisk:15, viralProbability:65, careerPhase:'peak',   currentLabel:'RBMG/Capitol',           signingBonus:8000000,  weeklyFee:240000, style:'classic R&B',         isReal:true, tier:'A' },
  { id:'brent',       name:'Brent Faiyaz',      genre:'R&B',         region:'US',          fame:82,  talent:87, workEthic:80, ego:60, loyalty:72, creativity:90, controversyLevel:35, starPotential:92,  burnoutRisk:28, viralProbability:58, careerPhase:'rise',   currentLabel:'Lost Kids/UMG',          signingBonus:5000000,  weeklyFee:140000, style:'indie R&B',           isReal:true, tier:'B' },
  { id:'summer',      name:'Summer Walker',     genre:'R&B',         region:'US',          fame:82,  talent:83, workEthic:65, ego:55, loyalty:62, creativity:82, controversyLevel:45, starPotential:84,  burnoutRisk:48, viralProbability:60, careerPhase:'peak',   currentLabel:'LVRN/Interscope',        signingBonus:4500000,  weeklyFee:120000, style:'contemporary R&B',    isReal:true, tier:'B' },
  { id:'bryson',      name:'Bryson Tiller',     genre:'R&B',         region:'US',          fame:80,  talent:82, workEthic:70, ego:55, loyalty:70, creativity:80, controversyLevel:25, starPotential:83,  burnoutRisk:30, viralProbability:52, careerPhase:'peak',   currentLabel:'RCA Records',            signingBonus:4000000,  weeklyFee:110000, style:'trap R&B',            isReal:true, tier:'B' },
  { id:'jorja',       name:'Jorja Smith',       genre:'R&B',         region:'UK',          fame:78,  talent:88, workEthic:80, ego:48, loyalty:82, creativity:88, controversyLevel:15, starPotential:90,  burnoutRisk:22, viralProbability:55, careerPhase:'rise',   currentLabel:'FAMM',                   signingBonus:3000000,  weeklyFee:80000,  style:'UK R&B',              isReal:true, tier:'B' },
  { id:'ari',         name:'Ari Lennox',        genre:'R&B',         region:'US',          fame:76,  talent:85, workEthic:75, ego:50, loyalty:75, creativity:82, controversyLevel:30, starPotential:84,  burnoutRisk:32, viralProbability:50, careerPhase:'peak',   currentLabel:'Dreamville/Interscope',  signingBonus:2800000,  weeklyFee:75000,  style:'neo-soul',            isReal:true, tier:'B' },
  // ── POP ────────────────────────────────────
  { id:'taylorswift', name:'Taylor Swift',      genre:'Pop',         region:'US',          fame:100, talent:95, workEthic:98, ego:62, loyalty:85, creativity:94, controversyLevel:35, starPotential:100, burnoutRisk:10, viralProbability:90, careerPhase:'peak',   currentLabel:'Republic Records',       signingBonus:25000000, weeklyFee:750000, style:'pop/country',         isReal:true, tier:'S' },
  { id:'billie',      name:'Billie Eilish',     genre:'Pop',         region:'US',          fame:94,  talent:91, workEthic:85, ego:48, loyalty:88, creativity:94, controversyLevel:28, starPotential:96,  burnoutRisk:32, viralProbability:82, careerPhase:'peak',   currentLabel:'Darkroom/Interscope',    signingBonus:11000000, weeklyFee:355000, style:'alt pop',             isReal:true, tier:'S' },
  { id:'ariana',      name:'Ariana Grande',     genre:'Pop',         region:'US',          fame:95,  talent:93, workEthic:88, ego:58, loyalty:75, creativity:88, controversyLevel:22, starPotential:97,  burnoutRisk:28, viralProbability:80, careerPhase:'peak',   currentLabel:'Republic Records',       signingBonus:12000000, weeklyFee:390000, style:'pop',                 isReal:true, tier:'S' },
  { id:'olivia',      name:'Olivia Rodrigo',    genre:'Pop',         region:'US',          fame:91,  talent:88, workEthic:90, ego:48, loyalty:88, creativity:88, controversyLevel:20, starPotential:95,  burnoutRisk:22, viralProbability:78, careerPhase:'peak',   currentLabel:'Geffen/Interscope',      signingBonus:9000000,  weeklyFee:275000, style:'pop rock',            isReal:true, tier:'A' },
  { id:'sabrina',     name:'Sabrina Carpenter', genre:'Pop',         region:'US',          fame:88,  talent:84, workEthic:92, ego:52, loyalty:84, creativity:82, controversyLevel:18, starPotential:93,  burnoutRisk:20, viralProbability:82, careerPhase:'peak',   currentLabel:'Island/Republic',        signingBonus:7000000,  weeklyFee:200000, style:'pop',                 isReal:true, tier:'A' },
  { id:'charli',      name:'Charli xcx',        genre:'Pop',         region:'UK',          fame:87,  talent:89, workEthic:88, ego:60, loyalty:72, creativity:95, controversyLevel:32, starPotential:93,  burnoutRisk:25, viralProbability:85, careerPhase:'peak',   currentLabel:'Atlantic Records',       signingBonus:6500000,  weeklyFee:185000, style:'hyperpop',            isReal:true, tier:'A' },
  { id:'dua',         name:'Dua Lipa',          genre:'Pop',         region:'UK',          fame:90,  talent:86, workEthic:90, ego:58, loyalty:78, creativity:84, controversyLevel:20, starPotential:92,  burnoutRisk:18, viralProbability:74, careerPhase:'peak',   currentLabel:'Warner Records',         signingBonus:8500000,  weeklyFee:255000, style:'disco pop',           isReal:true, tier:'A' },
  { id:'harrystyles', name:'Harry Styles',      genre:'Pop',         region:'UK',          fame:90,  talent:85, workEthic:88, ego:55, loyalty:80, creativity:86, controversyLevel:22, starPotential:92,  burnoutRisk:20, viralProbability:76, careerPhase:'peak',   currentLabel:'Columbia Records',       signingBonus:8000000,  weeklyFee:245000, style:'rock pop',            isReal:true, tier:'A' },
  { id:'chappell',    name:'Chappell Roan',     genre:'Pop',         region:'US',          fame:76,  talent:86, workEthic:88, ego:48, loyalty:82, creativity:92, controversyLevel:22, starPotential:94,  burnoutRisk:25, viralProbability:80, careerPhase:'rise',   currentLabel:'Island Records',         signingBonus:3500000,  weeklyFee:85000,  style:'camp pop',            isReal:true, tier:'B' },
  { id:'tate',        name:'Tate McRae',        genre:'Pop',         region:'Canada',      fame:74,  talent:82, workEthic:88, ego:50, loyalty:82, creativity:80, controversyLevel:15, starPotential:88,  burnoutRisk:20, viralProbability:70, careerPhase:'rise',   currentLabel:'RCA Records',            signingBonus:3000000,  weeklyFee:75000,  style:'indie pop',           isReal:true, tier:'B' },
  { id:'gracie',      name:'Gracie Abrams',     genre:'Indie',       region:'US',          fame:68,  talent:84, workEthic:85, ego:44, loyalty:86, creativity:88, controversyLevel:10, starPotential:86,  burnoutRisk:18, viralProbability:62, careerPhase:'rise',   currentLabel:'Interscope',             signingBonus:2200000,  weeklyFee:60000,  style:'folk pop',            isReal:true, tier:'C' },
  // ── AFROBEATS ──────────────────────────────
  { id:'burna',       name:'Burna Boy',         genre:'Afrobeats',   region:'Nigeria',     fame:95,  talent:96, workEthic:88, ego:82, loyalty:65, creativity:94, controversyLevel:55, starPotential:99,  burnoutRisk:22, viralProbability:78, careerPhase:'peak',   currentLabel:'Atlantic/Spaceship',     signingBonus:12000000, weeklyFee:370000, style:'afro-fusion',         isReal:true, tier:'S' },
  { id:'wizkid',      name:'Wizkid',            genre:'Afrobeats',   region:'Nigeria',     fame:93,  talent:92, workEthic:80, ego:78, loyalty:62, creativity:90, controversyLevel:45, starPotential:96,  burnoutRisk:25, viralProbability:72, careerPhase:'peak',   currentLabel:'Starboy/RCA',            signingBonus:10000000, weeklyFee:315000, style:'afropop',             isReal:true, tier:'S' },
  { id:'rema',        name:'Rema',              genre:'Afrobeats',   region:'Nigeria',     fame:88,  talent:88, workEthic:88, ego:58, loyalty:80, creativity:90, controversyLevel:25, starPotential:97,  burnoutRisk:18, viralProbability:82, careerPhase:'peak',   currentLabel:'Mavin Records',          signingBonus:7000000,  weeklyFee:200000, style:'afro-rave',           isReal:true, tier:'A' },
  { id:'davido',      name:'Davido',            genre:'Afrobeats',   region:'Nigeria',     fame:90,  talent:87, workEthic:85, ego:75, loyalty:72, creativity:86, controversyLevel:50, starPotential:92,  burnoutRisk:28, viralProbability:70, careerPhase:'peak',   currentLabel:'DMW/Sony',               signingBonus:8500000,  weeklyFee:255000, style:'afropop',             isReal:true, tier:'A' },
  { id:'asake',       name:'Asake',             genre:'Afrobeats',   region:'Nigeria',     fame:85,  talent:86, workEthic:90, ego:55, loyalty:78, creativity:88, controversyLevel:22, starPotential:94,  burnoutRisk:20, viralProbability:75, careerPhase:'peak',   currentLabel:'YBNL/Empire',            signingBonus:5500000,  weeklyFee:155000, style:'amapiano/afrobeats',  isReal:true, tier:'A' },
  { id:'tems',        name:'Tems',              genre:'Afrobeats',   region:'Nigeria',     fame:86,  talent:90, workEthic:85, ego:52, loyalty:82, creativity:92, controversyLevel:18, starPotential:96,  burnoutRisk:20, viralProbability:70, careerPhase:'peak',   currentLabel:'Since93/Columbia',       signingBonus:6500000,  weeklyFee:182000, style:'alt afrobeats',       isReal:true, tier:'A' },
  { id:'ckay',        name:'CKay',              genre:'Afrobeats',   region:'Nigeria',     fame:80,  talent:83, workEthic:82, ego:50, loyalty:78, creativity:84, controversyLevel:20, starPotential:88,  burnoutRisk:25, viralProbability:68, careerPhase:'peak',   currentLabel:'Warner Music Africa',    signingBonus:4000000,  weeklyFee:108000, style:'afro R&B',            isReal:true, tier:'B' },
  { id:'omah',        name:'Omah Lay',          genre:'Afrobeats',   region:'Nigeria',     fame:78,  talent:82, workEthic:80, ego:52, loyalty:75, creativity:82, controversyLevel:25, starPotential:88,  burnoutRisk:28, viralProbability:62, careerPhase:'peak',   currentLabel:'KeyQaad/Interscope',     signingBonus:3000000,  weeklyFee:82000,  style:'afropop',             isReal:true, tier:'B' },
  { id:'fireboy',     name:'Fireboy DML',       genre:'Afrobeats',   region:'Nigeria',     fame:78,  talent:82, workEthic:82, ego:48, loyalty:80, creativity:80, controversyLevel:18, starPotential:86,  burnoutRisk:22, viralProbability:58, careerPhase:'peak',   currentLabel:'YBNL/Republic',          signingBonus:3500000,  weeklyFee:92000,  style:'afropop',             isReal:true, tier:'B' },
  { id:'ayrastair',   name:'Ayra Starr',        genre:'Afrobeats',   region:'Nigeria',     fame:72,  talent:85, workEthic:88, ego:52, loyalty:80, creativity:88, controversyLevel:20, starPotential:95,  burnoutRisk:18, viralProbability:72, careerPhase:'rise',   currentLabel:'Mavin Records',          signingBonus:3000000,  weeklyFee:78000,  style:'afropop',             isReal:true, tier:'B' },
  { id:'tyla',        name:'Tyla',              genre:'Afrobeats',   region:'South Africa',fame:74,  talent:84, workEthic:85, ego:50, loyalty:82, creativity:86, controversyLevel:18, starPotential:93,  burnoutRisk:20, viralProbability:75, careerPhase:'rise',   currentLabel:'Warner Music Africa',    signingBonus:3200000,  weeklyFee:84000,  style:'afropop/R&B',         isReal:true, tier:'B' },
  { id:'ruger',       name:'Ruger',             genre:'Afrobeats',   region:'Nigeria',     fame:70,  talent:80, workEthic:85, ego:60, loyalty:75, creativity:80, controversyLevel:30, starPotential:88,  burnoutRisk:22, viralProbability:65, careerPhase:'rise',   currentLabel:'Audiomack/independent',  signingBonus:2200000,  weeklyFee:58000,  style:'dancehall afrobeats', isReal:true, tier:'C' },
  { id:'oxlade',      name:'Oxlade',            genre:'Afrobeats',   region:'Nigeria',     fame:68,  talent:82, workEthic:82, ego:48, loyalty:80, creativity:82, controversyLevel:18, starPotential:88,  burnoutRisk:20, viralProbability:62, careerPhase:'rise',   currentLabel:'Platoon',                signingBonus:2000000,  weeklyFee:52000,  style:'alt afrobeats',       isReal:true, tier:'C' },
  { id:'victony',     name:'Victony',           genre:'Afrobeats',   region:'Nigeria',     fame:65,  talent:80, workEthic:84, ego:48, loyalty:80, creativity:80, controversyLevel:15, starPotential:86,  burnoutRisk:18, viralProbability:62, careerPhase:'rise',   currentLabel:'independent',            signingBonus:1800000,  weeklyFee:46000,  style:'afropop',             isReal:true, tier:'C' },
  // ── LATIN ──────────────────────────────────
  { id:'badbunny',    name:'Bad Bunny',         genre:'Latin',       region:'Puerto Rico', fame:97,  talent:91, workEthic:90, ego:72, loyalty:68, creativity:92, controversyLevel:38, starPotential:99,  burnoutRisk:22, viralProbability:88, careerPhase:'peak',   currentLabel:'Rimas Entertainment',    signingBonus:14000000, weeklyFee:440000, style:'reggaeton/trap latino',isReal:true, tier:'S' },
  { id:'karol',       name:'Karol G',           genre:'Latin',       region:'Colombia',    fame:88,  talent:85, workEthic:92, ego:58, loyalty:80, creativity:82, controversyLevel:22, starPotential:94,  burnoutRisk:18, viralProbability:78, careerPhase:'peak',   currentLabel:'UML/Interscope',         signingBonus:7500000,  weeklyFee:218000, style:'reggaeton/pop',       isReal:true, tier:'A' },
  { id:'shakira',     name:'Shakira',           genre:'Latin',       region:'Colombia',    fame:92,  talent:90, workEthic:92, ego:62, loyalty:75, creativity:88, controversyLevel:35, starPotential:94,  burnoutRisk:15, viralProbability:80, careerPhase:'peak',   currentLabel:'Sony Music',             signingBonus:9000000,  weeklyFee:272000, style:'latin pop',           isReal:true, tier:'A' },
  { id:'jbalvin',     name:'J Balvin',          genre:'Latin',       region:'Colombia',    fame:90,  talent:82, workEthic:85, ego:68, loyalty:72, creativity:80, controversyLevel:35, starPotential:90,  burnoutRisk:25, viralProbability:72, careerPhase:'peak',   currentLabel:'UML',                    signingBonus:8000000,  weeklyFee:235000, style:'reggaeton',           isReal:true, tier:'A' },
  { id:'peso',        name:'Peso Pluma',        genre:'Latin',       region:'Mexico',      fame:78,  talent:80, workEthic:88, ego:60, loyalty:75, creativity:82, controversyLevel:35, starPotential:92,  burnoutRisk:22, viralProbability:78, careerPhase:'peak',   currentLabel:'Double P Records',       signingBonus:4000000,  weeklyFee:105000, style:'corridos tumbados',   isReal:true, tier:'B' },
  { id:'maluma',      name:'Maluma',            genre:'Latin',       region:'Colombia',    fame:85,  talent:80, workEthic:85, ego:68, loyalty:72, creativity:78, controversyLevel:32, starPotential:86,  burnoutRisk:25, viralProbability:68, careerPhase:'peak',   currentLabel:'Sony Music Latin',       signingBonus:6000000,  weeklyFee:165000, style:'reggaeton',           isReal:true, tier:'B' },
  { id:'ozuna',       name:'Ozuna',             genre:'Latin',       region:'Puerto Rico', fame:84,  talent:79, workEthic:82, ego:65, loyalty:70, creativity:76, controversyLevel:30, starPotential:84,  burnoutRisk:28, viralProbability:62, careerPhase:'peak',   currentLabel:'Sony Music Latin',       signingBonus:5500000,  weeklyFee:148000, style:'latin trap',          isReal:true, tier:'B' },
  // ── EMERGING / NEWCOMERS ───────────────────
  { id:'benson',      name:'Benson Boone',      genre:'Indie',       region:'US',          fame:68,  talent:82, workEthic:90, ego:45, loyalty:85, creativity:82, controversyLevel:15, starPotential:90,  burnoutRisk:20, viralProbability:65, careerPhase:'rise',   currentLabel:'Warner Records',         signingBonus:2500000,  weeklyFee:62000,  style:'indie pop',           isReal:true, tier:'C' },
  { id:'central',     name:'Central Cee',       genre:'Drill',       region:'UK',          fame:80,  talent:84, workEthic:88, ego:60, loyalty:72, creativity:85, controversyLevel:40, starPotential:92,  burnoutRisk:22, viralProbability:72, careerPhase:'rise',   currentLabel:'Central Cee/Columbia',   signingBonus:4500000,  weeklyFee:120000, style:'UK drill',            isReal:true, tier:'B' },
  { id:'litobaby',    name:'Lito Baby',         genre:'Afrobeats',   region:'Nigeria',     fame:55,  talent:76, workEthic:88, ego:50, loyalty:82, creativity:78, controversyLevel:18, starPotential:85,  burnoutRisk:18, viralProbability:68, careerPhase:'rise',   currentLabel:'independent',            signingBonus:900000,   weeklyFee:22000,  style:'street afrobeats',    isReal:true, tier:'D' },
  { id:'seun',        name:'Seun Kuti',         genre:'Afrobeats',   region:'Nigeria',     fame:58,  talent:80, workEthic:84, ego:55, loyalty:78, creativity:82, controversyLevel:20, starPotential:80,  burnoutRisk:22, viralProbability:55, careerPhase:'rise',   currentLabel:'Knitting Factory',       signingBonus:800000,   weeklyFee:18000,  style:'afrobeat/jazz',       isReal:true, tier:'D' },
  { id:'youngjonn',   name:'Young Jonn',        genre:'Afrobeats',   region:'Nigeria',     fame:60,  talent:82, workEthic:86, ego:52, loyalty:80, creativity:84, controversyLevel:15, starPotential:86,  burnoutRisk:18, viralProbability:60, careerPhase:'rise',   currentLabel:'independent',            signingBonus:1200000,  weeklyFee:28000,  style:'afropop',             isReal:true, tier:'D' },
  { id:'kizzdaniel',  name:'Kizz Daniel',       genre:'Afrobeats',   region:'Nigeria',     fame:72,  talent:82, workEthic:85, ego:55, loyalty:80, creativity:82, controversyLevel:22, starPotential:85,  burnoutRisk:22, viralProbability:60, careerPhase:'peak',   currentLabel:'Fly Boy Inc',            signingBonus:2800000,  weeklyFee:72000,  style:'afropop',             isReal:true, tier:'C' },
  { id:'black',       name:'Black Sherif',      genre:'Afrobeats',   region:'Ghana',       fame:70,  talent:86, workEthic:88, ego:50, loyalty:82, creativity:88, controversyLevel:20, starPotential:92,  burnoutRisk:18, viralProbability:70, careerPhase:'rise',   currentLabel:'independent',            signingBonus:2200000,  weeklyFee:56000,  style:'highlife/drill',      isReal:true, tier:'C' },
  { id:'stonebwoy',   name:'Stonebwoy',         genre:'Dancehall',   region:'Ghana',       fame:68,  talent:80, workEthic:84, ego:55, loyalty:78, creativity:80, controversyLevel:25, starPotential:82,  burnoutRisk:22, viralProbability:55, careerPhase:'peak',   currentLabel:'Bhim Nation',            signingBonus:1800000,  weeklyFee:44000,  style:'reggae/dancehall',    isReal:true, tier:'C' },
  { id:'amaarae',     name:'Amaarae',           genre:'R&B',         region:'Ghana',       fame:65,  talent:86, workEthic:80, ego:48, loyalty:82, creativity:90, controversyLevel:18, starPotential:90,  burnoutRisk:22, viralProbability:65, careerPhase:'rise',   currentLabel:'independent/Interscope', signingBonus:1800000,  weeklyFee:45000,  style:'alt R&B',             isReal:true, tier:'C' },
];

// ─── AI ARTIST GENERATOR ──────────────────────
const AI_FIRST = ['Blaze','Nova','Kira','Dex','Zeph','Axel','Sera','Cade','Lyric','Vex','Sol','Mace','Onyx','Arc','Echo','Lex','Roux','Cleo','Vanta','Juno','Kai','Wren','Orion','Lune','Sable','Miro','Cyra'];
const AI_LAST  = ['Wave','Fire','Reign','Flow','Blade','Star','Drift','Rush','Haze','Rook','Tide','Crux','Grit','Byte','Sire','Mist','Vale','Wax','Crest','Flux'];
const AI_SINGLE = ['Solis','Faroe','Vesper','Lyra','Psalm','Avon','Halo','Wraith','Quill','Drex','Omen','Aiko','Zara','Cyra','Cadence'];
const ARCHETYPES = [
  { name:'The Prodigy',   workEthic:90, ego:50, loyalty:80, creativity:90, controversyLevel:20 },
  { name:'The Diva',      workEthic:70, ego:92, loyalty:48, creativity:80, controversyLevel:72 },
  { name:'The Grinder',   workEthic:96, ego:54, loyalty:78, creativity:72, controversyLevel:24 },
  { name:'The Wild Card', workEthic:65, ego:72, loyalty:44, creativity:90, controversyLevel:88 },
  { name:'The Visionary', workEthic:82, ego:64, loyalty:70, creativity:96, controversyLevel:36 },
  { name:'The Hustler',   workEthic:94, ego:75, loyalty:64, creativity:74, controversyLevel:50 },
  { name:'The Introvert', workEthic:86, ego:36, loyalty:90, creativity:92, controversyLevel:12 },
  { name:'The Icon',      workEthic:80, ego:84, loyalty:60, creativity:86, controversyLevel:56 },
];
const REGION_GENRE = {
  'Nigeria':      ['Afrobeats','Afro-Fusion','R&B','Amapiano'],
  'Ghana':        ['Afrobeats','Dancehall','R&B'],
  'South Africa': ['Amapiano','Afrobeats','Electronic','Afro-Fusion'],
  'Jamaica':      ['Dancehall','R&B','Afrobeats'],
  'US':           ['Hip-Hop','R&B','Pop','Drill','Electronic'],
  'UK':           ['R&B','Drill','Pop','Electronic','Indie'],
  'Colombia':     ['Latin','Reggaeton','Pop'],
  'Mexico':       ['Latin','Reggaeton','Pop'],
  'Brazil':       ['Latin','Electronic','Pop'],
  'South Korea':  ['K-Pop','Electronic','R&B'],
  'Canada':       ['Pop','Hip-Hop','R&B'],
  'Australia':    ['Pop','Indie','Electronic'],
  'France':       ['Electronic','Pop','R&B'],
  'India':        ['Pop','Electronic','R&B'],
};
function ri(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
function rf(arr){return arr[Math.floor(Math.random()*arr.length)];}
function clamp(v,lo,hi){return Math.min(hi,Math.max(lo,v));}

export function generateAIArtist(week=0) {
  const region = rf(REGIONS);
  const genre  = rf(REGION_GENRE[region]||GENRES);
  const arch   = rf(ARCHETYPES);
  const style  = Math.random();
  const name   = style < 0.3 ? `${rf(AI_FIRST)} ${rf(AI_LAST)}`
               : style < 0.6 ? rf(AI_SINGLE)
               : `${rf(AI_FIRST)} ${rf(AI_SINGLE)}`;
  const baseFame   = ri(4,52);
  const baseTalent = ri(44,80);
  const starPot    = ri(20,100);
  const bonus      = Math.floor(baseFame*3800 + baseTalent*1400 + ri(40000,180000));
  const fee        = Math.max(2500, Math.floor(bonus*0.0048)+ri(1800,7000));
  return {
    id: `ai_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    name, genre, region, isReal:false,
    fame:baseFame, talent:baseTalent,
    workEthic:       clamp(arch.workEthic+ri(-8,8),20,100),
    ego:             clamp(arch.ego+ri(-8,8),20,100),
    loyalty:         clamp(arch.loyalty+ri(-8,8),20,100),
    creativity:      clamp(arch.creativity+ri(-8,8),20,100),
    controversyLevel:clamp(arch.controversyLevel+ri(-8,8),5,100),
    archetype:arch.name,
    starPotential:starPot,
    burnoutRisk:ri(5,68),
    viralProbability:ri(5,78),
    growthCeiling:Math.min(100,baseFame+Math.floor(starPot*0.55)),
    careerPhase:'rise',
    mood:ri(64,92), imageDecay:100,
    currentLabel:null, style:`${genre.toLowerCase()} artist`,
    signingBonus:bonus, weeklyFee:fee,
    tier: starPot>=85?'A':starPot>=60?'B':'C',
    createdWeek:week,
  };
}

// ─── DIFFICULTY PRESETS ───────────────────────
export const DIFFICULTY = {
  easy:   { startCash:8000000,  streamRate:0.0040, rivalStrength:0.4, eventFreq:0.20, label:'Easy'   },
  normal: { startCash:5000000,  streamRate:0.0028, rivalStrength:0.7, eventFreq:0.30, label:'Normal' },
  hard:   { startCash:2500000,  streamRate:0.0020, rivalStrength:1.0, eventFreq:0.40, label:'Hard'   },
  legend: { startCash:1000000,  streamRate:0.0015, rivalStrength:1.3, eventFreq:0.50, label:'Legend' },
};

// ─── CHART DATA ───────────────────────────────
export const CHART_SONGS = [
  { title:"Cruel Summer",             artist:"Taylor Swift",               streams:5800000, genre:'Pop',       peakRank:1, weeksOnChart:52 },
  { title:"Not Like Us",              artist:"Kendrick Lamar",             streams:5500000, genre:'Hip-Hop',   peakRank:1, weeksOnChart:28 },
  { title:"luther",                   artist:"Kendrick Lamar & SZA",       streams:5000000, genre:'R&B',       peakRank:1, weeksOnChart:20 },
  { title:"APT.",                     artist:"ROSÉ & Bruno Mars",          streams:4900000, genre:'Pop',       peakRank:1, weeksOnChart:18 },
  { title:"Die With A Smile",         artist:"Lady Gaga & Bruno Mars",     streams:5100000, genre:'Pop',       peakRank:1, weeksOnChart:22 },
  { title:"Espresso",                 artist:"Sabrina Carpenter",          streams:4400000, genre:'Pop',       peakRank:1, weeksOnChart:30 },
  { title:"TEXAS HOLD 'EM",           artist:"Beyoncé",                    streams:4700000, genre:'Pop',       peakRank:1, weeksOnChart:24 },
  { title:"Flowers",                  artist:"Miley Cyrus",                streams:4600000, genre:'Pop',       peakRank:1, weeksOnChart:35 },
  { title:"As It Was",                artist:"Harry Styles",               streams:5200000, genre:'Pop',       peakRank:1, weeksOnChart:55 },
  { title:"One Dance",                artist:"Drake",                      streams:4200000, genre:'Hip-Hop',   peakRank:1, weeksOnChart:18 },
  { title:"Birds of a Feather",       artist:"Billie Eilish",              streams:4200000, genre:'Pop',       peakRank:2, weeksOnChart:22 },
  { title:"Calm Down",                artist:"Rema & Selena Gomez",        streams:3900000, genre:'Afrobeats', peakRank:3, weeksOnChart:40 },
  { title:"Please Please Please",     artist:"Sabrina Carpenter",          streams:4100000, genre:'Pop',       peakRank:2, weeksOnChart:15 },
  { title:"Too Sweet",                artist:"Hozier",                     streams:3800000, genre:'Indie',     peakRank:1, weeksOnChart:26 },
  { title:"Good Luck, Babe!",         artist:"Chappell Roan",              streams:3700000, genre:'Pop',       peakRank:2, weeksOnChart:20 },
  { title:"Water",                    artist:"Tyla",                       streams:3600000, genre:'Afrobeats', peakRank:7, weeksOnChart:32 },
  { title:"Million Dollar Baby",      artist:"Tommy Richman",              streams:3500000, genre:'R&B',       peakRank:1, weeksOnChart:14 },
  { title:"Ella Baila Sola",          artist:"Eslabon & Peso Pluma",       streams:3900000, genre:'Latin',     peakRank:1, weeksOnChart:28 },
  { title:"Bzrp Sessions #53",        artist:"Bizarrap & Shakira",         streams:4500000, genre:'Latin',     peakRank:1, weeksOnChart:22 },
  { title:"Rich Flex",                artist:"Drake & 21 Savage",          streams:3800000, genre:'Hip-Hop',   peakRank:1, weeksOnChart:18 },
  { title:"Creepin'",                 artist:"Metro Boomin & Weeknd",      streams:3300000, genre:'R&B',       peakRank:3, weeksOnChart:20 },
  { title:"Snooze",                   artist:"SZA",                        streams:2700000, genre:'R&B',       peakRank:6, weeksOnChart:28 },
  { title:"All Mine",                 artist:"Burna Boy",                  streams:3100000, genre:'Afrobeats', peakRank:8, weeksOnChart:18 },
  { title:"LALA",                     artist:"Myke Towers",                streams:3200000, genre:'Latin',     peakRank:4, weeksOnChart:22 },
  { title:"Beautiful Things",         artist:"Benson Boone",               streams:3300000, genre:'Indie',     peakRank:4, weeksOnChart:18 },
  { title:"Unholy",                   artist:"Sam Smith & Kim Petras",     streams:3400000, genre:'Pop',       peakRank:1, weeksOnChart:24 },
  { title:"Stick Season",             artist:"Noah Kahan",                 streams:2900000, genre:'Indie',     peakRank:8, weeksOnChart:35 },
  { title:"Golden Hour",              artist:"JVKE",                       streams:2800000, genre:'Pop',       peakRank:8, weeksOnChart:30 },
  { title:"Woman of the Hour",        artist:"Billie Eilish",              streams:2900000, genre:'Pop',       peakRank:5, weeksOnChart:14 },
  { title:"Qué Más Pues?",            artist:"J Balvin & Maria Becerra",   streams:2600000, genre:'Latin',     peakRank:9, weeksOnChart:16 },
  // extra to fill top 50 for albums chart
  { title:"SOS",                      artist:"SZA",                        streams:3500000, genre:'R&B',       peakRank:2, weeksOnChart:40, isAlbum:true },
  { title:"Mañana Será Bonito",       artist:"Karol G",                    streams:3800000, genre:'Latin',     peakRank:1, weeksOnChart:32, isAlbum:true },
  { title:"Midnights",                artist:"Taylor Swift",               streams:6000000, genre:'Pop',       peakRank:1, weeksOnChart:45, isAlbum:true },
  { title:"For All The Dogs",         artist:"Drake",                      streams:4200000, genre:'Hip-Hop',   peakRank:1, weeksOnChart:22, isAlbum:true },
  { title:"Cowboy Carter",            artist:"Beyoncé",                    streams:4500000, genre:'Pop',       peakRank:1, weeksOnChart:18, isAlbum:true },
  { title:"I Am Music",               artist:"Post Malone",                streams:3100000, genre:'Pop',       peakRank:2, weeksOnChart:14, isAlbum:true },
  { title:"Naomi",                    artist:"Asake",                      streams:2900000, genre:'Afrobeats', peakRank:1, weeksOnChart:20, isAlbum:true },
  { title:"We Outside",               artist:"Burna Boy",                  streams:3200000, genre:'Afrobeats', peakRank:1, weeksOnChart:24, isAlbum:true },
  { title:"Heaven & Hell",            artist:"Polo G",                     streams:2700000, genre:'Hip-Hop',   peakRank:2, weeksOnChart:18, isAlbum:true },
  { title:"Jaguar II",                artist:"Victoria Monét",             streams:2500000, genre:'R&B',       peakRank:3, weeksOnChart:22, isAlbum:true },
];

// ─── DRAMA EVENTS ──────────────────────────────
export const DRAMA_EVENTS = [
  {
    id:'beef_start', type:'beef', severity:'medium', urgent:true,
    headline:'[ARTIST] just went SCORCHED EARTH on a rival — Twitter is chaos',
    storyBeat:'A 2 AM tweet mentioning names. Screenshots everywhere. The blogs are running.',
    choices:[
      { label:'🔥 Drop the diss track', desc:'Respond with bars — fuel the fire',       streamBoost:45, moodDelta:-12, fameDelta:14, loyaltyDelta:5,  cost:60000,  risk:'high',   riskNote:'Could escalate to real feud' },
      { label:'📢 Issue statement',     desc:'Measured public response, keep it classy', streamBoost:8,  moodDelta:6,  fameDelta:0,  loyaltyDelta:2,  cost:15000,  risk:'low'    },
      { label:'🤐 Radio silence',       desc:'Say nothing. Let it fade.',                streamBoost:18, moodDelta:2,  fameDelta:4,  loyaltyDelta:-2, cost:0,      risk:'medium', riskNote:'Fans may read it as weakness' },
    ]
  },
  {
    id:'scandal_leak', type:'scandal', severity:'high', urgent:true,
    headline:'Private footage of [ARTIST] leaks — trending #1 worldwide',
    storyBeat:'The footage is everywhere. Brands are nervous. Fans are split.',
    choices:[
      { label:'🙏 Full apology tour',   desc:'Public apology + charity donation',       streamBoost:-8,  moodDelta:14, fameDelta:-10, cost:200000,  risk:'low',    loyaltyDelta:8  },
      { label:'⚖️ Legal action',        desc:'Lawyers up. Demand takedowns.',            streamBoost:-18, moodDelta:6,  fameDelta:-16, cost:400000,  risk:'medium'  },
      { label:'💪 Own it completely',   desc:'Lean in. Turn it into a brand moment.',    streamBoost:32,  moodDelta:-6, fameDelta:12,  cost:90000,   risk:'high',   riskNote:'Could backfire spectacularly' },
    ]
  },
  {
    id:'viral_tiktok', type:'viral', severity:'positive', urgent:false,
    headline:'[ARTIST] is the #1 sound on TikTok — 300M videos in 72 hours',
    storyBeat:'Everyone is using the audio. A dance challenge is everywhere.',
    choices:[
      { label:'🚀 Full push NOW',       desc:'Emergency marketing + remix drop',         streamBoost:90, moodDelta:18, fameDelta:22, cost:250000, risk:'low'   },
      { label:'🌊 Organic wave',        desc:'Let the algorithm do its thing',           streamBoost:55, moodDelta:12, fameDelta:14, cost:0,      risk:'low'   },
      { label:'🎤 Official remix',      desc:'Bring in a featured artist for a remix',   streamBoost:70, moodDelta:15, fameDelta:18, cost:150000, risk:'medium'},
    ]
  },
  {
    id:'grammy_nom', type:'award', severity:'positive', urgent:false,
    headline:'[ARTIST] gets Grammy nomination — Album of the Year shortlist',
    storyBeat:'The Recording Academy made their picks. Your artist is in the conversation.',
    choices:[
      { label:'💰 Full Grammy campaign',desc:'$500K push — billboards, press, events',   streamBoost:28, moodDelta:22, fameDelta:20, cost:500000, risk:'low'  },
      { label:'📱 Socials + press',     desc:'Digital campaign only',                    streamBoost:12, moodDelta:16, fameDelta:12, cost:80000,  risk:'low'  },
    ]
  },
  {
    id:'arrest', type:'crisis', severity:'critical', urgent:true,
    headline:'BREAKING: [ARTIST] arrested — label in full emergency mode',
    storyBeat:'Phones blowing up. Brands calling. Streaming numbers about to crater.',
    choices:[
      { label:'💼 Full legal defence',  desc:'Best lawyers, bail, PR team',              streamBoost:-28, moodDelta:-5,  fameDelta:-18, cost:1200000, risk:'medium' },
      { label:'📵 Suspend everything',  desc:'Pause all activity, stay quiet',           streamBoost:-50, moodDelta:-18, fameDelta:-30, cost:50000,   risk:'low'    },
      { label:'✂️ Drop the artist',     desc:'Immediate contract termination',           streamBoost:0,   moodDelta:0,   fameDelta:-8,  cost:0,       risk:'low',   dropsArtist:true },
    ]
  },
  {
    id:'demand_raise', type:'internal', severity:'medium', urgent:true,
    headline:'[ARTIST] demands renegotiation — wants 30% more or they walk',
    storyBeat:'Their manager sent the letter at 11PM. They want an answer by Friday.',
    choices:[
      { label:'✅ Accept demands',      desc:'Raise their weekly fee 30%',               streamBoost:12, moodDelta:28, fameDelta:0, cost:0,       renegotiate:true, renegotiateMultiplier:1.30, risk:'low',    loyaltyDelta:15 },
      { label:'🤝 Counter: 12% + bonus',desc:'Counter offer — 12% raise + milestone bonus', streamBoost:6, moodDelta:14,fameDelta:0, cost:250000, renegotiate:true, renegotiateMultiplier:1.12, risk:'medium', loyaltyDelta:5  },
      { label:'❌ Refuse entirely',     desc:'Hold firm on current contract',            streamBoost:-18,moodDelta:-28,fameDelta:0, cost:0,       risk:'high',   loyaltyDelta:-25, riskNote:'They may leave when contract expires' },
    ]
  },
  {
    id:'collab_offer', type:'collab', severity:'positive', urgent:false,
    headline:'Global superstar wants to collab with [ARTIST] — offer on the table',
    storyBeat:'The email came through their management. This could be the biggest song of the year.',
    choices:[
      { label:'🎵 Accept the collab',   desc:'Joint single drops in 3 weeks',            streamBoost:48, moodDelta:16, fameDelta:16, cost:350000, risk:'low'   },
      { label:'⏳ Negotiate terms',     desc:'Counter with better backend deal',          streamBoost:35, moodDelta:10, fameDelta:10, cost:100000, risk:'medium'},
      { label:'🚫 Decline politely',    desc:'Stay focused on album rollout',             streamBoost:0,  moodDelta:5,  fameDelta:0,  cost:0,      risk:'low'   },
    ]
  },
  {
    id:'burnout', type:'crisis', severity:'high', urgent:true,
    headline:'[ARTIST] collapses on stage — burnout crisis, media everywhere',
    storyBeat:'It was the 3rd show in 4 days. Ambulance called. Fans worried.',
    choices:[
      { label:'🛌 Mandatory 8wk rest',  desc:'Cancel everything, full recovery',         streamBoost:-30, moodDelta:35, fameDelta:-10, cost:0,       risk:'low',    burnoutRiskDelta:-25 },
      { label:'💊 Light schedule',      desc:'Half the bookings, add support',            streamBoost:-12, moodDelta:15, fameDelta:-4,  cost:180000,  risk:'medium', burnoutRiskDelta:-10 },
      { label:'📅 Push through',        desc:'Keep the schedule, hire extra staff',       streamBoost:5,   moodDelta:-20,fameDelta:2,   cost:300000,  risk:'high',   burnoutRiskDelta:15, riskNote:'Could cause permanent damage' },
    ]
  },
  {
    id:'label_dispute', type:'internal', severity:'high', urgent:true,
    headline:'[ARTIST] goes public — accuses label of killing their creative vision',
    storyBeat:'They posted a 10-tweet thread. Music Twitter is picking sides.',
    choices:[
      { label:'🎨 Give creative control', desc:'Let them A&R their next project',        streamBoost:22, moodDelta:32, fameDelta:6,   cost:120000, loyaltyDelta:18, risk:'medium' },
      { label:'🤫 Settle privately',      desc:'Mediator meeting, NDA signed',           streamBoost:5,  moodDelta:16, fameDelta:0,   cost:220000, loyaltyDelta:6,  risk:'low'    },
      { label:'⚖️ Enforce contract',      desc:'Legal letter — silence them',            streamBoost:-24,moodDelta:-32,fameDelta:-12, cost:550000, loyaltyDelta:-28,risk:'high'   },
    ]
  },
  {
    id:'festival_offer', type:'tour', severity:'positive', urgent:false,
    headline:'[ARTIST] invited to headline Coachella / Glastonbury / Afronation',
    storyBeat:'The festival booker called personally. Guaranteed fee + streaming bump.',
    choices:[
      { label:'🎪 Accept headline',     desc:'$2.5M fee + global exposure',              streamBoost:32, moodDelta:22, fameDelta:24, cost:-2500000, risk:'low'  },
      { label:'🎯 Negotiate for more', desc:'Hold out for $3.5M + merch split',          streamBoost:25, moodDelta:16, fameDelta:20, cost:-3500000, risk:'medium'},
      { label:'🏠 Pass this year',      desc:'Focus on world tour instead',              streamBoost:0,  moodDelta:5,  fameDelta:0,  cost:0,        risk:'low'  },
    ]
  },
  {
    id:'fan_cancel', type:'scandal', severity:'medium', urgent:true,
    headline:'[ARTIST] faces mass cancel campaign — #[ARTIST]IsOver trending',
    storyBeat:'An old clip resurfaced. 50K tweets in an hour. PR is calling.',
    choices:[
      { label:'📝 Sincere apology',     desc:'Long-form apology post + donation',       streamBoost:-5,  moodDelta:10, fameDelta:-8,  cost:40000, risk:'low'                },
      { label:'💪 Defend publicly',     desc:'Statement defending the original clip',   streamBoost:18,  moodDelta:-9, fameDelta:-6,  cost:0,     risk:'high', riskNote:'May double the backlash' },
      { label:'🌑 Total blackout',      desc:'Delete everything, say nothing, wait',    streamBoost:-18, moodDelta:4,  fameDelta:-12, cost:0,     risk:'medium'             },
    ]
  },
  {
    id:'stadium_sellout', type:'tour', severity:'positive', urgent:false,
    headline:'[ARTIST] sells out 5 stadium nights in 8 minutes — historic demand',
    storyBeat:'The box office broke records. Scalpers got $4K per ticket.',
    choices:[
      { label:'➕ Add 5 more nights',   desc:'Double the run — $8M+ more revenue',      streamBoost:22, moodDelta:18, fameDelta:15, cost:4000000, risk:'low'    },
      { label:'🎯 Keep original dates', desc:'Maintain exclusivity, manage fan demand',  streamBoost:10, moodDelta:12, fameDelta:8,  cost:0,       risk:'low'    },
    ]
  },
  {
    id:'surprise_drop', type:'release', severity:'positive', urgent:false,
    headline:'[ARTIST] wants to drop a surprise project — zero promo, pure shock',
    storyBeat:'They finished recording at 2 AM and want to upload at midnight.',
    choices:[
      { label:'🌙 Midnight surprise drop',desc:'Zero notice — pure organic discovery', streamBoost:55, moodDelta:12, fameDelta:15, cost:0,      risk:'medium', riskNote:'Could flop without promo' },
      { label:'📣 48hr teaser first',     desc:'Two-day tease then drop',              streamBoost:42, moodDelta:10, fameDelta:12, cost:30000,  risk:'low'   },
    ]
  },
  {
    id:'near_miss_collab', type:'collab', severity:'medium', urgent:true,
    headline:'Rival label is about to snatch that collab deal from [ARTIST]',
    storyBeat:'Universal just made a bigger offer. You have 24 hours to counter.',
    choices:[
      { label:'💸 Outbid them',         desc:'Top their offer by $200K',               streamBoost:40, moodDelta:14, fameDelta:12, cost:800000,  risk:'medium'},
      { label:'🤝 Match their offer',   desc:'Match exactly, lean on loyalty',          streamBoost:28, moodDelta:10, fameDelta:8,  cost:600000,  risk:'medium'},
      { label:'🚪 Let it go',           desc:'Not worth the bidding war',               streamBoost:0,  moodDelta:-5, fameDelta:-3, cost:0,       risk:'low'  },
    ]
  },
];

// ─── NEAR-MISS MESSAGES ───────────────────────
export const NEAR_MISS_EVENTS = [
  { type:'chart',     msg:(a,r)=>`📊 ${a} peaked at #${r} — just ONE position off the top spot. So close.`  },
  { type:'chart',     msg:(a,r)=>`📊 ${a} debuted at #2 this week. #1 was ${r} streams away.`               },
  { type:'viral',     msg:(a)  =>`⚡ ${a}'s track almost went viral — 890K TikTok uses in 48h. Watch this.`  },
  { type:'grammy',    msg:(a)  =>`🏆 ${a} narrowly missed the Grammy shortlist. 4 votes. FOUR.`              },
  { type:'sync',      msg:()   =>`📺 Nike almost chose your track for their campaign. They went another way.` },
  { type:'bidding',   msg:(a)  =>`🔥 Universal tried to poach ${a}. Their loyalty to you held — barely.`     },
];

// ─── PASSIVE NEWS ──────────────────────────────
export const NEWS_EVENTS = [
  { text:'[ARTIST] spotted recording in Lagos — new project incoming?',                   type:'news',      fameBoost:2  },
  { text:'[ARTIST] hits 1 billion streams — a landmark moment for the label',             type:'milestone', fameBoost:8  },
  { text:'A deep-cut [ARTIST] track resurfaces on TikTok — streams up 400%',              type:'viral',     streamBoost:22, fameBoost:6 },
  { text:'[ARTIST] earns first platinum certification — career milestone unlocked',       type:'milestone', fameBoost:6  },
  { text:'[ARTIST] covers Vogue / Rolling Stone / Essence — cultural moment certified',   type:'news',      fameBoost:5  },
  { text:'[ARTIST] announces surprise world tour — pre-sale crashes the server',          type:'tour',      fameBoost:7  },
  { text:'[ARTIST] donates to community causes — widely praised online',                  type:'positive',  fameBoost:6  },
  { text:'[ARTIST] trends #1 in 44 countries — a global phenomenon',                      type:'viral',     streamBoost:35, fameBoost:12},
  { text:'Industry insiders say [ARTIST] is the most-searched artist this month',         type:'news',      fameBoost:3  },
  { text:'[ARTIST] confirms new collab — snippet drops on Instagram at midnight',         type:'collab',    fameBoost:4  },
  { text:'[ARTIST] receives shoutout from major head of state at cultural event',         type:'milestone', fameBoost:8  },
  { text:'[ARTIST]\'s style goes viral — the fashion moment everyone is copying',         type:'viral',     fameBoost:5  },
  { text:'Streaming data shows [ARTIST] topped DSP charts in 3 continents simultaneously',type:'milestone', fameBoost:7  },
  { text:'[ARTIST] signs major brand ambassador deal outside the label',                  type:'deal',      fameBoost:5  },
  { text:'Music critics name [ARTIST] the most innovative artist of the quarter',         type:'news',      fameBoost:6  },
  { text:'[ARTIST] breaks personal streaming record — their biggest week ever',           type:'milestone', fameBoost:5  },
];

// ─── WEEKLY OBJECTIVES ────────────────────────
export const WEEKLY_OBJECTIVES = [
  { id:'first_signing',   title:'First Signing',        desc:'Sign your first artist',               reward:80000,   metric:'rosterSize',    target:1        },
  { id:'first_release',   title:'First Drop',           desc:'Release your first track',             reward:50000,   metric:'releaseCount',  target:1        },
  { id:'earn_500k',       title:'First Half Mil',       desc:'Earn $500K in total revenue',          reward:75000,   metric:'totalRevenue',  target:500000   },
  { id:'chart_top20',     title:'Charting Artist',      desc:'Get a release in the Top 20',          reward:200000,  metric:'chartPos',      target:20       },
  { id:'earn_1m',         title:'First Million',        desc:'Earn $1M total revenue',               reward:120000,  metric:'totalRevenue',  target:1000000  },
  { id:'roster_3',        title:'Growing Roster',       desc:'Sign 3 artists',                       reward:250000,  metric:'rosterSize',    target:3        },
  { id:'sync_deal',       title:'Sync Secured',         desc:'Land your first sync deal',            reward:100000,  metric:'syncCount',     target:1        },
  { id:'chart_top5',      title:'Top 5 Hit',            desc:'Crack the Top 5',                      reward:400000,  metric:'chartPos',      target:5        },
  { id:'earn_5m',         title:'Five Mill',            desc:'Earn $5M total revenue',               reward:300000,  metric:'totalRevenue',  target:5000000  },
  { id:'chart_number1',   title:'🏆 NUMBER ONE',        desc:'Hit #1 on the global chart',           reward:1000000, metric:'chartNum1',     target:1        },
  { id:'roster_5',        title:'Full Roster',          desc:'Have 5 artists signed',                reward:400000,  metric:'rosterSize',    target:5        },
  { id:'earn_10m',        title:'Double Digits',        desc:'Earn $10M total revenue',              reward:500000,  metric:'totalRevenue',  target:10000000 },
  { id:'ai_artist_sign',  title:'Diamond in the Rough', desc:'Sign an AI-generated artist',          reward:150000,  metric:'aiRoster',      target:1        },
  { id:'streams_50m',     title:'50M Streams',          desc:'Accumulate 50M total streams',         reward:300000,  metric:'totalStreams',  target:50000000 },
  { id:'earn_50m',        title:'Fifty Mill',           desc:'Earn $50M total revenue',              reward:2000000, metric:'totalRevenue',  target:50000000 },
  { id:'tier_indie',      title:'Indie Label',          desc:'Reach Indie Label tier',               reward:500000,  metric:'tierIdx',       target:1        },
  { id:'tier_boutique',   title:'Boutique Status',      desc:'Reach Boutique Label tier',            reward:1500000, metric:'tierIdx',       target:2        },
  { id:'rival_beaten',    title:'Chart War Won',        desc:'Beat a rival label on the charts',     reward:300000,  metric:'rivalBeaten',   target:1        },
  { id:'streams_200m',    title:'200M Streams',         desc:'Accumulate 200M total streams',        reward:800000,  metric:'totalStreams',  target:200000000},
  { id:'earn_100m',       title:'Nine Figures',         desc:'Earn $100M total revenue',             reward:5000000, metric:'totalRevenue',  target:100000000},
];

// ─── STAFF ────────────────────────────────────
export const STAFF_ROLES = [
  {
    id:'anr', name:'A&R Manager', icon:'🎤',
    desc:'Unlocks better market artists and improves AI artist quality. Higher levels let you poach signed superstars.',
    levels:[
      { level:1, name:'Junior A&R',    weeklyCost:5000,  bonus:'Unlocks premium AI artists in market' },
      { level:2, name:'Senior A&R',    weeklyCost:12000, bonus:'+15 talent on all signed artists. Better market refresh.' },
      { level:3, name:'Executive A&R', weeklyCost:28000, bonus:'Can approach currently-signed real artists to poach.' },
    ]
  },
  {
    id:'pr', name:'PR Manager', icon:'📣',
    desc:'Reduces scandal damage and unlocks better drama event choices. Higher levels can suppress events.',
    levels:[
      { level:1, name:'PR Coordinator', weeklyCost:6000,  bonus:'-35% scandal fame damage. Extra event context.' },
      { level:2, name:'PR Director',    weeklyCost:15000, bonus:'-65% damage. Unlocks hidden event choices.' },
      { level:3, name:'Crisis Expert',  weeklyCost:30000, bonus:'Suppress 1 event per month entirely.' },
    ]
  },
  {
    id:'marketing', name:'Marketing Director', icon:'📈',
    desc:'Multiplies streaming revenue and chart placement for all releases.',
    levels:[
      { level:1, name:'Marketing Exec',  weeklyCost:7000,  bonus:'+12% all streaming revenue' },
      { level:2, name:'Marketing VP',    weeklyCost:18000, bonus:'+28% streams + editorial playlist access' },
      { level:3, name:'Chief Marketing', weeklyCost:32000, bonus:'+45% streams + guaranteed chart debut boost' },
    ]
  },
  {
    id:'legal', name:'Legal Team', icon:'⚖️',
    desc:'Reduces buyout penalties and handles contract disputes. Unlocks complex deals.',
    levels:[
      { level:1, name:'In-House Counsel', weeklyCost:8000,  bonus:'-25% artist buyout cost' },
      { level:2, name:'Legal Department', weeklyCost:20000, bonus:'-50% buyout + can renegotiate rival poachings' },
      { level:3, name:'Top Law Firm',     weeklyCost:38000, bonus:'Nullify any penalty. Full contract flexibility.' },
    ]
  },
];

// ─── LOANS ───────────────────────────────────
export const LOAN_OPTIONS = [
  { id:'bank_sm',   name:'Bank Loan — Small',   amount:1000000,  interestRate:0.08, weeklyPayment:26000,  durationWeeks:52, type:'bank',   risk:'low',    penaltyOnMiss:'Credit damage. +5% interest.' },
  { id:'bank_lg',   name:'Bank Loan — Large',   amount:5000000,  interestRate:0.09, weeklyPayment:118000, durationWeeks:52, type:'bank',   risk:'medium', penaltyOnMiss:'Asset freeze. Rival poaching window.' },
  { id:'angel',     name:'Angel Investor',       amount:3000000,  equityStake:0.08,  weeklyPayment:0,      durationWeeks:0,  type:'equity', risk:'low',    equityNote:'8% of all future profits forever' },
  { id:'vc',        name:'Venture Capital',      amount:10000000, equityStake:0.18,  weeklyPayment:0,      durationWeeks:0,  type:'equity', risk:'medium', equityNote:'18% equity stake + quarterly board vote' },
  { id:'shark',     name:'Private Money',        amount:2000000,  interestRate:0.24, weeklyPayment:65000,  durationWeeks:38, type:'high',   risk:'high',   penaltyOnMiss:'They take your top artist. No appeal.' },
];

// ─── LABEL TIERS ──────────────────────────────
export const LABEL_TIERS = [
  { name:'Garage Label',   minRevenue:0,          idx:0, perks:'Starting out. Limited market access.'             },
  { name:'Indie Label',    minRevenue:5000000,     idx:1, perks:'Sync deal eligibility. Better market refresh.'   },
  { name:'Boutique Label', minRevenue:25000000,    idx:2, perks:'Festival bookings. Premium AI artists unlock.'   },
  { name:'Rising Label',   minRevenue:75000000,    idx:3, perks:'Rivals take notice. A-list artist negotiation.'  },
  { name:'Mid-Major',      minRevenue:200000000,   idx:4, perks:'Global distribution. Award show invitations.'    },
  { name:'Major Label',    minRevenue:500000000,   idx:5, perks:'Industry power. Superstar signings accessible.'  },
  { name:'Conglomerate',   minRevenue:1500000000,  idx:6, perks:'You ARE the industry. Legacy unlocked.'          },
];

// ─── RIVALS ──────────────────────────────────
export const RIVAL_LABELS = [
  { id:'universal',  name:'Universal Music Group',    tier:'Major',       strength:95, aggression:0.8 },
  { id:'sony',       name:'Sony Music Entertainment', tier:'Major',       strength:90, aggression:0.7 },
  { id:'warner',     name:'Warner Music Group',       tier:'Major',       strength:87, aggression:0.7 },
  { id:'atlantic',   name:'Atlantic Records',         tier:'Major',       strength:82, aggression:0.6 },
  { id:'interscope', name:'Interscope Records',       tier:'Mid-Major',   strength:78, aggression:0.6 },
  { id:'defjam',     name:'Def Jam Recordings',       tier:'Mid-Major',   strength:75, aggression:0.5 },
  { id:'empire',     name:'EMPIRE',                   tier:'Independent', strength:62, aggression:0.4 },
  { id:'tde',        name:'Top Dawg Entertainment',   tier:'Independent', strength:68, aggression:0.5 },
  { id:'mavin',      name:'Mavin Records',            tier:'Independent', strength:60, aggression:0.4 },
];

// ─── SYNC DEALS ──────────────────────────────
export const SYNC_DEALS = [
  { id:'netflix',    title:'Netflix Drama Soundtrack',  fee:500000,  fameBonus:8,  platform:'Netflix',        minFame:40, genreFit:['R&B','Pop','Electronic'] },
  { id:'apple',      title:'Apple Product Launch',      fee:800000,  fameBonus:10, platform:'Apple',          minFame:60, genreFit:['Pop','Electronic','Indie'] },
  { id:'nike',       title:'Nike Global Campaign',      fee:650000,  fameBonus:9,  platform:'Nike',           minFame:50, genreFit:['Hip-Hop','R&B','Afrobeats'] },
  { id:'gta',        title:'GTA VII Soundtrack',        fee:1200000, fameBonus:15, platform:'Rockstar Games', minFame:55, genreFit:['Hip-Hop','Electronic','Latin'] },
  { id:'nba',        title:'NBA Finals Theme',          fee:400000,  fameBonus:7,  platform:'NBA',            minFame:45, genreFit:['Hip-Hop','R&B','Pop'] },
  { id:'worldcup',   title:'FIFA World Cup Anthem',     fee:2000000, fameBonus:20, platform:'FIFA',           minFame:75, genreFit:['Pop','Latin','Afrobeats'] },
  { id:'marvel',     title:'Marvel Movie Soundtrack',   fee:950000,  fameBonus:12, platform:'Marvel Studios', minFame:65, genreFit:['Pop','Electronic','R&B'] },
  { id:'spotify',    title:'Spotify Wrapped Campaign',  fee:350000,  fameBonus:6,  platform:'Spotify',        minFame:30, genreFit:null },
  { id:'cocacola',   title:'Coca-Cola Holiday Campaign', fee:480000, fameBonus:5,  platform:'Coca-Cola',      minFame:40, genreFit:['Pop','R&B','Latin'] },
  { id:'samsung',    title:'Samsung Galaxy Launch',     fee:720000,  fameBonus:8,  platform:'Samsung',        minFame:55, genreFit:['Pop','K-Pop','Electronic'] },
  { id:'amazon',     title:'Amazon Prime Event',        fee:560000,  fameBonus:7,  platform:'Amazon',         minFame:45, genreFit:null },
  { id:'adidas',     title:'Adidas Global Campaign',    fee:580000,  fameBonus:8,  platform:'Adidas',         minFame:50, genreFit:['Hip-Hop','Afrobeats','R&B'] },
  { id:'uniqlo',     title:'Uniqlo x Artist Collab',    fee:320000,  fameBonus:4,  platform:'Uniqlo',         minFame:35, genreFit:null },
  { id:'pepsi',      title:'Pepsi Super Bowl Ad',       fee:1500000, fameBonus:16, platform:'PepsiCo',        minFame:70, genreFit:['Pop','Hip-Hop','R&B'] },
];

// ─── TOURS ───────────────────────────────────
export const TOUR_TIERS = [
  { id:'club',    name:'Club Tour',    venues:8,  capacity:500,   ticketPrice:45,  cost:80000    },
  { id:'theater', name:'Theater Tour', venues:12, capacity:2000,  ticketPrice:78,  cost:250000   },
  { id:'arena',   name:'Arena Tour',   venues:20, capacity:15000, ticketPrice:125, cost:1200000  },
  { id:'stadium', name:'Stadium Tour', venues:30, capacity:60000, ticketPrice:210, cost:5000000  },
  { id:'world',   name:'World Tour',   venues:50, capacity:80000, ticketPrice:260, cost:12000000 },
];

// ─── MERCH ───────────────────────────────────
export const MERCH_LINES = [
  { id:'basic',      name:'Basic Bundle',        weeklyRevenue:5000,   cost:10000,  description:'T-shirts, caps, hoodies'   },
  { id:'premium',    name:'Premium Collection',  weeklyRevenue:22000,  cost:55000,  description:'Limited edition drops'     },
  { id:'streetwear', name:'Streetwear Collab',   weeklyRevenue:55000,  cost:160000, description:'Brand partnership drop'   },
  { id:'luxury',     name:'Luxury Fashion Line', weeklyRevenue:130000, cost:420000, description:'High-end designer collab' },
  { id:'fragrance',  name:'Signature Fragrance', weeklyRevenue:88000,  cost:320000, description:'Celebrity scent line'     },
];

// ─── TRAINING ─────────────────────────────────
export const TRAINING_PROGRAMS = [
  { id:'vocal',      name:'Vocal Coaching',       cost:55000,  durationWeeks:4, stat:'talent',           gain:5,   desc:'Professional vocal development'  },
  { id:'branding',   name:'Brand Workshop',        cost:85000,  durationWeeks:6, stat:'creativity',       gain:6,   desc:'Image and brand reinvention'      },
  { id:'performance',name:'Performance Bootcamp',  cost:65000,  durationWeeks:3, stat:'workEthic',        gain:8,   desc:'Stage presence + stamina'         },
  { id:'songwriting',name:'Songwriting Camp',      cost:110000, durationWeeks:8, stat:'creativity',       gain:11,  desc:'Elite songwriting programme'      },
  { id:'social',     name:'Social Media Strategy', cost:42000,  durationWeeks:3, stat:'fame',             gain:8,   desc:'Build and monetise online presence'},
  { id:'media',      name:'Media Training',        cost:38000,  durationWeeks:2, stat:'controversyLevel', gain:-12, desc:'Reduce controversy sensitivity'   },
  { id:'wellness',   name:'Wellness Programme',    cost:50000,  durationWeeks:4, stat:'burnoutRisk',      gain:-15, desc:'Mental health + stamina reset'    },
];

// ─── ROLLOUT STRATEGIES ──────────────────────
export const ROLLOUT_STRATEGIES = [
  { id:'surprise',   name:'Surprise Drop',      streamMult:1.45, hypeDecay:0.94, viralBonus:28, cost:0,      desc:'Zero notice — pure shock and discovery' },
  { id:'standard',   name:'Standard Rollout',   streamMult:1.0,  hypeDecay:0.98, viralBonus:5,  cost:50000,  desc:'2-week rollout: press, social, radio'   },
  { id:'campaign',   name:'Full Campaign',      streamMult:1.25, hypeDecay:0.99, viralBonus:12, cost:200000, desc:'6-week full-press campaign launch'       },
  { id:'deluxe',     name:'Deluxe Edition',     streamMult:1.18, hypeDecay:1.0,  viralBonus:8,  cost:150000, desc:'Bonus tracks added 4 weeks post-release' },
  { id:'exclusive',  name:'Platform Exclusive', streamMult:0.88, hypeDecay:0.97, viralBonus:18, cost:300000, desc:'72h exclusive — guaranteed editorial'    },
];

// ─── PLATFORM STRATEGIES ─────────────────────
export const PLATFORM_STRATEGIES = [
  { id:'tiktok',    name:'TikTok Push',         cost:85000,  viralBonus:32, streamBonus:16, desc:'Seed TikTok creators with the audio'      },
  { id:'streaming', name:'Streaming Editorial', cost:125000, viralBonus:5,  streamBonus:42, desc:'Pitch to Spotify/Apple editorial playlists'},
  { id:'youtube',   name:'YouTube Strategy',    cost:65000,  viralBonus:16, streamBonus:26, desc:'YouTube premiere + Shorts campaign'        },
  { id:'radio',     name:'Radio Campaign',      cost:160000, viralBonus:8,  streamBonus:22, desc:'National radio push across formats'         },
  { id:'blog_press',name:'Press Rollout',       cost:42000,  viralBonus:5,  streamBonus:10, desc:'Pitchfork, Rolling Stone, NME, The Guardian' },
];

// ─── AWARD SHOWS ──────────────────────────────
export const AWARD_SHOWS = [
  { id:'grammy',    name:'Grammy Awards',          prestige:100, months:[2],     minFame:70  },
  { id:'bet',       name:'BET Awards',             prestige:80,  months:[6],     minFame:55  },
  { id:'vma',       name:'MTV VMAs',               prestige:75,  months:[9],     minFame:55  },
  { id:'ama',       name:'American Music Awards',  prestige:70,  months:[11],    minFame:50  },
  { id:'billboard', name:'Billboard Music Awards', prestige:72,  months:[5],     minFame:50  },
  { id:'mobo',      name:'MOBO Awards',            prestige:65,  months:[11],    minFame:40  },
  { id:'headies',   name:'Headies Awards',         prestige:65,  months:[10],    minFame:38  },
  { id:'afrima',    name:'AFRIMA',                 prestige:62,  months:[12],    minFame:35  },
  { id:'brit',      name:'BRIT Awards',            prestige:78,  months:[3],     minFame:52  },
];
