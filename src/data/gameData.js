// ─────────────────────────────────────────────────────────────
//  GOLDNOTE — MASTER GAME DATA v4
//  Changes: 50+ producers, 10-level staff, rebalanced economy,
//  contract negotiation system, harder tours, expensive promotion
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

// ─── 50+ PRODUCERS ────────────────────────────
// cost = per-track fee, qualityBonus = quality points added
// tier: 'budget'|'mid'|'premium'|'elite'|'legend'
export const PRODUCERS = [
  // ── LEGEND TIER (very expensive, huge quality) ──
  { id:'pharrell',    name:'Pharrell Williams',    specialty:'Pop/R&B',        cost:450000,  qualityBonus:32, region:'US',           tier:'legend'  },
  { id:'maxmartin',   name:'Max Martin',           specialty:'Pop',            cost:420000,  qualityBonus:30, region:'US',           tier:'legend'  },
  { id:'quincy',      name:'Quincy Jones',         specialty:'R&B/Pop',        cost:'unavailable', qualityBonus:35, region:'US',   tier:'legend', legacy:true },
  { id:'timbaland',   name:'Timbaland',            specialty:'R&B/Hip-Hop',    cost:380000,  qualityBonus:28, region:'US',           tier:'legend'  },
  { id:'drdre',       name:'Dr. Dre',              specialty:'Hip-Hop',        cost:500000,  qualityBonus:34, region:'US',           tier:'legend'  },
  { id:'kanye',       name:'Kanye West',           specialty:'Hip-Hop/Gospel', cost:600000,  qualityBonus:36, region:'US',           tier:'legend'  },
  { id:'finneas',     name:'FINNEAS',              specialty:'Alt Pop',        cost:350000,  qualityBonus:30, region:'US',           tier:'legend'  },

  // ── ELITE TIER ──
  { id:'metro',       name:'Metro Boomin',         specialty:'Hip-Hop',        cost:280000,  qualityBonus:28, region:'US',           tier:'elite'   },
  { id:'hitboy',      name:'Hit-Boy',              specialty:'Hip-Hop',        cost:200000,  qualityBonus:24, region:'US',           tier:'elite'   },
  { id:'tainy',       name:'Tainy',                specialty:'Latin/Reggaeton',cost:220000,  qualityBonus:26, region:'Puerto Rico',  tier:'elite'   },
  { id:'andrew_watt', name:'Andrew Watt',          specialty:'Rock/Pop',       cost:240000,  qualityBonus:26, region:'US',           tier:'elite'   },
  { id:'dmile',       name:"D'Mile",               specialty:'R&B',            cost:210000,  qualityBonus:25, region:'US',           tier:'elite'   },
  { id:'no_id',       name:'No I.D.',              specialty:'Hip-Hop/R&B',    cost:230000,  qualityBonus:26, region:'US',           tier:'elite'   },
  { id:'kaytranada',  name:'Kaytranada',           specialty:'Electronic/R&B', cost:200000,  qualityBonus:24, region:'Canada',       tier:'elite'   },
  { id:'ryan_tedder', name:'Ryan Tedder',          specialty:'Pop',            cost:250000,  qualityBonus:26, region:'US',           tier:'elite'   },

  // ── PREMIUM TIER ──
  { id:'madlib',      name:'Madlib',               specialty:'Alternative',    cost:160000,  qualityBonus:26, region:'US',           tier:'premium' },
  { id:'nineteen85',  name:'Nineteen85',           specialty:'R&B',            cost:140000,  qualityBonus:22, region:'Canada',       tier:'premium' },
  { id:'sky_rompiendo',name:'Sky Rompiendo',       specialty:'Latin',          cost:130000,  qualityBonus:21, region:'Puerto Rico',  tier:'premium' },
  { id:'charlieputh', name:'Charlie Puth',         specialty:'Pop/R&B',        cost:150000,  qualityBonus:22, region:'US',           tier:'premium' },
  { id:'jon_bellion', name:'Jon Bellion',          specialty:'Pop/Hip-Hop',    cost:145000,  qualityBonus:22, region:'US',           tier:'premium' },
  { id:'p2j',         name:'P2J',                  specialty:'R&B/Afrobeats',  cost:140000,  qualityBonus:22, region:'UK',           tier:'premium' },
  { id:'london',      name:'London on da Track',   specialty:'Trap',           cost:130000,  qualityBonus:20, region:'US',           tier:'premium' },
  { id:'pi_erre',     name:"Pi'erre Bourne",       specialty:'Hip-Hop',        cost:135000,  qualityBonus:21, region:'US',           tier:'premium' },
  { id:'wheezy',      name:'Wheezy',               specialty:'Trap',           cost:120000,  qualityBonus:20, region:'US',           tier:'premium' },
  { id:'tay_keith',   name:'Tay Keith',            specialty:'Trap',           cost:125000,  qualityBonus:20, region:'US',           tier:'premium' },
  { id:'greg_kurstin', name:'Greg Kurstin',        specialty:'Pop',            cost:155000,  qualityBonus:22, region:'US',           tier:'premium' },
  { id:'mnek',        name:'MNEK',                 specialty:'Pop/R&B',        cost:120000,  qualityBonus:20, region:'UK',           tier:'premium' },
  { id:'darkchild',   name:'Darkchild',            specialty:'R&B/Pop',        cost:130000,  qualityBonus:21, region:'US',           tier:'premium' },
  { id:'vinylz',      name:'Vinylz',               specialty:'Hip-Hop',        cost:115000,  qualityBonus:20, region:'US',           tier:'premium' },

  // ── MID TIER ──
  { id:'sarz',        name:'Sarz',                 specialty:'Afrobeats',      cost:90000,   qualityBonus:22, region:'Nigeria',      tier:'mid'     },
  { id:'pheelz',      name:'Pheelz',               specialty:'Afrobeats',      cost:85000,   qualityBonus:21, region:'Nigeria',      tier:'mid'     },
  { id:'shizzi',      name:'Shizzi',               specialty:'Afrobeats',      cost:80000,   qualityBonus:20, region:'Nigeria',      tier:'mid'     },
  { id:'rexxie',      name:'Rexxie',               specialty:'Afrobeats',      cost:75000,   qualityBonus:19, region:'Nigeria',      tier:'mid'     },
  { id:'kel_p',       name:'Kel-P',                specialty:'Afrobeats',      cost:72000,   qualityBonus:19, region:'Nigeria',      tier:'mid'     },
  { id:'masterkraft', name:'Masterkraft',          specialty:'Afrobeats',      cost:70000,   qualityBonus:18, region:'Nigeria',      tier:'mid'     },
  { id:'blaise',      name:'Blaise Beatz',         specialty:'Afrobeats',      cost:65000,   qualityBonus:17, region:'Nigeria',      tier:'mid'     },
  { id:'kabza',       name:'Kabza De Small',       specialty:'Amapiano',       cost:80000,   qualityBonus:21, region:'South Africa', tier:'mid'     },
  { id:'maphorisa',   name:'DJ Maphorisa',         specialty:'Amapiano',       cost:75000,   qualityBonus:20, region:'South Africa', tier:'mid'     },
  { id:'spax',        name:'Spax',                 specialty:'Amapiano',       cost:68000,   qualityBonus:18, region:'South Africa', tier:'mid'     },
  { id:'ovy',         name:'Ovy on the Drums',     specialty:'Reggaeton',      cost:95000,   qualityBonus:21, region:'Colombia',     tier:'mid'     },
  { id:'mosty',       name:'Mosty',                specialty:'Latin',          cost:78000,   qualityBonus:19, region:'Dominican Republic', tier:'mid' },
  { id:'dimelo',      name:'Dimelo Flow',          specialty:'Latin',          cost:70000,   qualityBonus:18, region:'Colombia',     tier:'mid'     },
  { id:'southside',   name:'Southside',            specialty:'Trap',           cost:88000,   qualityBonus:19, region:'US',           tier:'mid'     },
  { id:'murda',       name:'Murda Beatz',          specialty:'Trap',           cost:85000,   qualityBonus:19, region:'Canada',       tier:'mid'     },
  { id:'cardo',       name:'Cardo Got Wings',      specialty:'Hip-Hop',        cost:82000,   qualityBonus:18, region:'US',           tier:'mid'     },
  { id:'ojivolta',    name:'OJi Volta',            specialty:'K-Pop',          cost:90000,   qualityBonus:20, region:'South Korea',  tier:'mid'     },
  { id:'ben_billions',name:'Ben Billions',         specialty:'Hip-Hop',        cost:75000,   qualityBonus:18, region:'US',           tier:'mid'     },

  // ── BUDGET TIER ──
  { id:'killertunes', name:'Killer Tunes',         specialty:'Afrobeats',      cost:35000,   qualityBonus:14, region:'Nigeria',      tier:'budget'  },
  { id:'gosple',      name:'Gosple Obi',           specialty:'Gospel/Afrobeats',cost:30000,  qualityBonus:13, region:'Nigeria',      tier:'budget'  },
  { id:'tuc',         name:'TUC',                  specialty:'Afrobeats',      cost:28000,   qualityBonus:12, region:'Nigeria',      tier:'budget'  },
  { id:'easylife',    name:'Easylife',             specialty:'Drill',          cost:32000,   qualityBonus:13, region:'UK',           tier:'budget'  },
  { id:'richie_souf', name:'Richie Souf',          specialty:'Trap',           cost:35000,   qualityBonus:13, region:'US',           tier:'budget'  },
  { id:'brodinski',   name:'Brodinski',            specialty:'Electronic',     cost:38000,   qualityBonus:14, region:'France',       tier:'budget'  },
  { id:'subelo',      name:'Subelo NEO',           specialty:'Latin',          cost:30000,   qualityBonus:12, region:'Spain',        tier:'budget'  },
  { id:'loud_urban',  name:'Loud Urban Musik',     specialty:'Afrobeats',      cost:25000,   qualityBonus:11, region:'Nigeria',      tier:'budget'  },
  { id:'jordan_ware', name:'Jordan Ware',          specialty:'R&B',            cost:32000,   qualityBonus:13, region:'US',           tier:'budget'  },
];

// ─── REAL ARTISTS ─────────────────────────────
export const REAL_ARTISTS = [
  // HIP-HOP
  { id:'drake',       name:'Drake',             genre:'Hip-Hop',     region:'Canada',      fame:98,  talent:92, workEthic:85, ego:88, loyalty:60, creativity:84, controversyLevel:55, starPotential:99,  burnoutRisk:20, viralProbability:75, careerPhase:'peak',  currentLabel:'Republic Records',       signingBonus:15000000, weeklyFee:480000, style:'melodic rap',          isReal:true, tier:'S' },
  { id:'kendrick',    name:'Kendrick Lamar',    genre:'Hip-Hop',     region:'US',          fame:97,  talent:99, workEthic:96, ego:60, loyalty:82, creativity:99, controversyLevel:45, starPotential:100, burnoutRisk:15, viralProbability:70, careerPhase:'peak',  currentLabel:'pgLang/Interscope',      signingBonus:12000000, weeklyFee:420000, style:'lyrical rap',          isReal:true, tier:'S' },
  { id:'travis',      name:'Travis Scott',      genre:'Hip-Hop',     region:'US',          fame:93,  talent:88, workEthic:82, ego:80, loyalty:65, creativity:90, controversyLevel:70, starPotential:95,  burnoutRisk:30, viralProbability:80, careerPhase:'peak',  currentLabel:'Cactus Jack/Epic',       signingBonus:10000000, weeklyFee:320000, style:'psychedelic trap',     isReal:true, tier:'S' },
  { id:'21savage',    name:'21 Savage',         genre:'Hip-Hop',     region:'UK/US',       fame:88,  talent:84, workEthic:80, ego:65, loyalty:72, creativity:76, controversyLevel:55, starPotential:87,  burnoutRisk:25, viralProbability:65, careerPhase:'peak',  currentLabel:'Epic Records',           signingBonus:7000000,  weeklyFee:200000, style:'trap',                 isReal:true, tier:'A' },
  { id:'future',      name:'Future',            genre:'Hip-Hop',     region:'US',          fame:90,  talent:82, workEthic:90, ego:75, loyalty:55, creativity:78, controversyLevel:60, starPotential:88,  burnoutRisk:35, viralProbability:60, careerPhase:'peak',  currentLabel:'Epic Records',           signingBonus:8000000,  weeklyFee:260000, style:'trap',                 isReal:true, tier:'A' },
  { id:'dojacat',     name:'Doja Cat',          genre:'Pop/Hip-Hop', region:'US',          fame:91,  talent:90, workEthic:75, ego:70, loyalty:58, creativity:92, controversyLevel:65, starPotential:94,  burnoutRisk:38, viralProbability:85, careerPhase:'peak',  currentLabel:'RCA Records',            signingBonus:9000000,  weeklyFee:280000, style:'pop rap',              isReal:true, tier:'A' },
  { id:'cardi',       name:'Cardi B',           genre:'Hip-Hop',     region:'US',          fame:88,  talent:82, workEthic:78, ego:82, loyalty:68, creativity:80, controversyLevel:75, starPotential:88,  burnoutRisk:30, viralProbability:78, careerPhase:'peak',  currentLabel:'Atlantic Records',       signingBonus:8000000,  weeklyFee:230000, style:'hip-hop pop',          isReal:true, tier:'A' },
  { id:'lildurk',     name:'Lil Durk',          genre:'Hip-Hop',     region:'US',          fame:86,  talent:82, workEthic:85, ego:65, loyalty:72, creativity:78, controversyLevel:60, starPotential:86,  burnoutRisk:28, viralProbability:62, careerPhase:'peak',  currentLabel:'Only the Family/Alamo',  signingBonus:6500000,  weeklyFee:175000, style:'drill',                isReal:true, tier:'A' },
  { id:'youngthug',   name:'Young Thug',        genre:'Hip-Hop',     region:'US',          fame:87,  talent:86, workEthic:80, ego:72, loyalty:55, creativity:90, controversyLevel:80, starPotential:90,  burnoutRisk:35, viralProbability:68, careerPhase:'peak',  currentLabel:'YSL Records',            signingBonus:7500000,  weeklyFee:210000, style:'melodic trap',         isReal:true, tier:'A' },
  { id:'babykeem',    name:'Baby Keem',         genre:'Hip-Hop',     region:'US',          fame:75,  talent:82, workEthic:88, ego:50, loyalty:85, creativity:88, controversyLevel:30, starPotential:92,  burnoutRisk:18, viralProbability:55, careerPhase:'rise',  currentLabel:'pgLang/Columbia',        signingBonus:3500000,  weeklyFee:90000,  style:'alt rap',              isReal:true, tier:'B' },
  { id:'latto',       name:'Latto',             genre:'Hip-Hop',     region:'US',          fame:78,  talent:80, workEthic:84, ego:68, loyalty:70, creativity:76, controversyLevel:45, starPotential:85,  burnoutRisk:22, viralProbability:60, careerPhase:'rise',  currentLabel:'RCA Records',            signingBonus:4000000,  weeklyFee:110000, style:'rap',                  isReal:true, tier:'B' },
  { id:'central',     name:'Central Cee',       genre:'Drill',       region:'UK',          fame:80,  talent:84, workEthic:88, ego:60, loyalty:72, creativity:85, controversyLevel:40, starPotential:92,  burnoutRisk:22, viralProbability:72, careerPhase:'rise',  currentLabel:'Central Cee/Columbia',   signingBonus:4500000,  weeklyFee:120000, style:'UK drill',             isReal:true, tier:'B' },
  { id:'jackharlow',  name:'Jack Harlow',       genre:'Hip-Hop',     region:'US',          fame:80,  talent:78, workEthic:84, ego:60, loyalty:80, creativity:76, controversyLevel:28, starPotential:84,  burnoutRisk:20, viralProbability:60, careerPhase:'rise',  currentLabel:'Generation Now/Atlantic',signingBonus:4500000,  weeklyFee:120000, style:'pop rap',              isReal:true, tier:'B' },
  { id:'gunna',       name:'Gunna',             genre:'Hip-Hop',     region:'US',          fame:83,  talent:79, workEthic:82, ego:68, loyalty:62, creativity:76, controversyLevel:55, starPotential:83,  burnoutRisk:28, viralProbability:58, careerPhase:'peak',  currentLabel:'YSL/300',                signingBonus:5000000,  weeklyFee:140000, style:'melodic trap',         isReal:true, tier:'B' },
  // R&B
  { id:'sza',         name:'SZA',               genre:'R&B',         region:'US',          fame:94,  talent:95, workEthic:72, ego:55, loyalty:78, creativity:96, controversyLevel:25, starPotential:98,  burnoutRisk:40, viralProbability:72, careerPhase:'peak',  currentLabel:'Top Dawg/RCA',           signingBonus:10000000, weeklyFee:330000, style:'alt R&B',              isReal:true, tier:'S' },
  { id:'theweeknd',   name:'The Weeknd',        genre:'R&B',         region:'Canada',      fame:96,  talent:94, workEthic:88, ego:72, loyalty:62, creativity:92, controversyLevel:40, starPotential:98,  burnoutRisk:25, viralProbability:75, careerPhase:'peak',  currentLabel:'XO/Republic',            signingBonus:14000000, weeklyFee:450000, style:'dark R&B',             isReal:true, tier:'S' },
  { id:'usher',       name:'Usher',             genre:'R&B',         region:'US',          fame:90,  talent:91, workEthic:92, ego:65, loyalty:80, creativity:85, controversyLevel:30, starPotential:90,  burnoutRisk:15, viralProbability:65, careerPhase:'peak',  currentLabel:'RBMG/Capitol',           signingBonus:8000000,  weeklyFee:240000, style:'classic R&B',          isReal:true, tier:'A' },
  { id:'brent',       name:'Brent Faiyaz',      genre:'R&B',         region:'US',          fame:82,  talent:87, workEthic:80, ego:60, loyalty:72, creativity:90, controversyLevel:35, starPotential:92,  burnoutRisk:28, viralProbability:58, careerPhase:'rise',  currentLabel:'Lost Kids/UMG',          signingBonus:5000000,  weeklyFee:140000, style:'indie R&B',            isReal:true, tier:'B' },
  { id:'summer',      name:'Summer Walker',     genre:'R&B',         region:'US',          fame:82,  talent:83, workEthic:65, ego:55, loyalty:62, creativity:82, controversyLevel:45, starPotential:84,  burnoutRisk:48, viralProbability:60, careerPhase:'peak',  currentLabel:'LVRN/Interscope',        signingBonus:4500000,  weeklyFee:120000, style:'contemporary R&B',     isReal:true, tier:'B' },
  { id:'bryson',      name:'Bryson Tiller',     genre:'R&B',         region:'US',          fame:80,  talent:82, workEthic:70, ego:55, loyalty:70, creativity:80, controversyLevel:25, starPotential:83,  burnoutRisk:30, viralProbability:52, careerPhase:'peak',  currentLabel:'RCA Records',            signingBonus:4000000,  weeklyFee:110000, style:'trap R&B',             isReal:true, tier:'B' },
  { id:'jorja',       name:'Jorja Smith',       genre:'R&B',         region:'UK',          fame:78,  talent:88, workEthic:80, ego:48, loyalty:82, creativity:88, controversyLevel:15, starPotential:90,  burnoutRisk:22, viralProbability:55, careerPhase:'rise',  currentLabel:'FAMM',                   signingBonus:3000000,  weeklyFee:80000,  style:'UK R&B',               isReal:true, tier:'B' },
  { id:'victoria',    name:'Victoria Monét',    genre:'R&B',         region:'US',          fame:76,  talent:88, workEthic:82, ego:48, loyalty:84, creativity:90, controversyLevel:12, starPotential:92,  burnoutRisk:20, viralProbability:62, careerPhase:'rise',  currentLabel:'Lovett/RCA',             signingBonus:3200000,  weeklyFee:85000,  style:'neo-soul R&B',         isReal:true, tier:'B' },
  // POP
  { id:'taylorswift', name:'Taylor Swift',      genre:'Pop',         region:'US',          fame:100, talent:95, workEthic:98, ego:62, loyalty:85, creativity:94, controversyLevel:35, starPotential:100, burnoutRisk:10, viralProbability:90, careerPhase:'peak',  currentLabel:'Republic Records',       signingBonus:25000000, weeklyFee:750000, style:'pop/country',          isReal:true, tier:'S' },
  { id:'billie',      name:'Billie Eilish',     genre:'Pop',         region:'US',          fame:94,  talent:91, workEthic:85, ego:48, loyalty:88, creativity:94, controversyLevel:28, starPotential:96,  burnoutRisk:32, viralProbability:82, careerPhase:'peak',  currentLabel:'Darkroom/Interscope',    signingBonus:11000000, weeklyFee:355000, style:'alt pop',              isReal:true, tier:'S' },
  { id:'ariana',      name:'Ariana Grande',     genre:'Pop',         region:'US',          fame:95,  talent:93, workEthic:88, ego:58, loyalty:75, creativity:88, controversyLevel:22, starPotential:97,  burnoutRisk:28, viralProbability:80, careerPhase:'peak',  currentLabel:'Republic Records',       signingBonus:12000000, weeklyFee:390000, style:'pop',                  isReal:true, tier:'S' },
  { id:'olivia',      name:'Olivia Rodrigo',    genre:'Pop',         region:'US',          fame:91,  talent:88, workEthic:90, ego:48, loyalty:88, creativity:88, controversyLevel:20, starPotential:95,  burnoutRisk:22, viralProbability:78, careerPhase:'peak',  currentLabel:'Geffen/Interscope',      signingBonus:9000000,  weeklyFee:275000, style:'pop rock',             isReal:true, tier:'A' },
  { id:'sabrina',     name:'Sabrina Carpenter', genre:'Pop',         region:'US',          fame:88,  talent:84, workEthic:92, ego:52, loyalty:84, creativity:82, controversyLevel:18, starPotential:93,  burnoutRisk:20, viralProbability:82, careerPhase:'peak',  currentLabel:'Island/Republic',        signingBonus:7000000,  weeklyFee:200000, style:'pop',                  isReal:true, tier:'A' },
  { id:'charli',      name:'Charli xcx',        genre:'Pop',         region:'UK',          fame:87,  talent:89, workEthic:88, ego:60, loyalty:72, creativity:95, controversyLevel:32, starPotential:93,  burnoutRisk:25, viralProbability:85, careerPhase:'peak',  currentLabel:'Atlantic Records',       signingBonus:6500000,  weeklyFee:185000, style:'hyperpop',             isReal:true, tier:'A' },
  { id:'dua',         name:'Dua Lipa',          genre:'Pop',         region:'UK',          fame:90,  talent:86, workEthic:90, ego:58, loyalty:78, creativity:84, controversyLevel:20, starPotential:92,  burnoutRisk:18, viralProbability:74, careerPhase:'peak',  currentLabel:'Warner Records',         signingBonus:8500000,  weeklyFee:255000, style:'disco pop',            isReal:true, tier:'A' },
  { id:'harrystyles', name:'Harry Styles',      genre:'Pop',         region:'UK',          fame:90,  talent:85, workEthic:88, ego:55, loyalty:80, creativity:86, controversyLevel:22, starPotential:92,  burnoutRisk:20, viralProbability:76, careerPhase:'peak',  currentLabel:'Columbia Records',       signingBonus:8000000,  weeklyFee:245000, style:'rock pop',             isReal:true, tier:'A' },
  { id:'chappell',    name:'Chappell Roan',     genre:'Pop',         region:'US',          fame:76,  talent:86, workEthic:88, ego:48, loyalty:82, creativity:92, controversyLevel:22, starPotential:94,  burnoutRisk:25, viralProbability:80, careerPhase:'rise',  currentLabel:'Island Records',         signingBonus:3500000,  weeklyFee:88000,  style:'camp pop',             isReal:true, tier:'B' },
  { id:'tate',        name:'Tate McRae',        genre:'Pop',         region:'Canada',      fame:74,  talent:82, workEthic:88, ego:50, loyalty:82, creativity:80, controversyLevel:15, starPotential:88,  burnoutRisk:20, viralProbability:70, careerPhase:'rise',  currentLabel:'RCA Records',            signingBonus:3000000,  weeklyFee:75000,  style:'indie pop',            isReal:true, tier:'B' },
  { id:'gracie',      name:'Gracie Abrams',     genre:'Indie',       region:'US',          fame:68,  talent:84, workEthic:85, ego:44, loyalty:86, creativity:88, controversyLevel:10, starPotential:86,  burnoutRisk:18, viralProbability:62, careerPhase:'rise',  currentLabel:'Interscope',             signingBonus:2200000,  weeklyFee:58000,  style:'folk pop',             isReal:true, tier:'C' },
  // AFROBEATS
  { id:'burna',       name:'Burna Boy',         genre:'Afrobeats',   region:'Nigeria',     fame:95,  talent:96, workEthic:88, ego:82, loyalty:65, creativity:94, controversyLevel:55, starPotential:99,  burnoutRisk:22, viralProbability:78, careerPhase:'peak',  currentLabel:'Atlantic/Spaceship',     signingBonus:12000000, weeklyFee:370000, style:'afro-fusion',          isReal:true, tier:'S' },
  { id:'wizkid',      name:'Wizkid',            genre:'Afrobeats',   region:'Nigeria',     fame:93,  talent:92, workEthic:80, ego:78, loyalty:62, creativity:90, controversyLevel:45, starPotential:96,  burnoutRisk:25, viralProbability:72, careerPhase:'peak',  currentLabel:'Starboy/RCA',            signingBonus:10000000, weeklyFee:315000, style:'afropop',              isReal:true, tier:'S' },
  { id:'rema',        name:'Rema',              genre:'Afrobeats',   region:'Nigeria',     fame:88,  talent:88, workEthic:88, ego:58, loyalty:80, creativity:90, controversyLevel:25, starPotential:97,  burnoutRisk:18, viralProbability:82, careerPhase:'peak',  currentLabel:'Mavin Records',          signingBonus:7000000,  weeklyFee:200000, style:'afro-rave',            isReal:true, tier:'A' },
  { id:'davido',      name:'Davido',            genre:'Afrobeats',   region:'Nigeria',     fame:90,  talent:87, workEthic:85, ego:75, loyalty:72, creativity:86, controversyLevel:50, starPotential:92,  burnoutRisk:28, viralProbability:70, careerPhase:'peak',  currentLabel:'DMW/Sony',               signingBonus:8500000,  weeklyFee:255000, style:'afropop',              isReal:true, tier:'A' },
  { id:'asake',       name:'Asake',             genre:'Afrobeats',   region:'Nigeria',     fame:85,  talent:86, workEthic:90, ego:55, loyalty:78, creativity:88, controversyLevel:22, starPotential:94,  burnoutRisk:20, viralProbability:75, careerPhase:'peak',  currentLabel:'YBNL/Empire',            signingBonus:5500000,  weeklyFee:155000, style:'amapiano/afrobeats',   isReal:true, tier:'A' },
  { id:'tems',        name:'Tems',              genre:'Afrobeats',   region:'Nigeria',     fame:86,  talent:90, workEthic:85, ego:52, loyalty:82, creativity:92, controversyLevel:18, starPotential:96,  burnoutRisk:20, viralProbability:70, careerPhase:'peak',  currentLabel:'Since93/Columbia',       signingBonus:6500000,  weeklyFee:182000, style:'alt afrobeats',        isReal:true, tier:'A' },
  { id:'ckay',        name:'CKay',              genre:'Afrobeats',   region:'Nigeria',     fame:80,  talent:83, workEthic:82, ego:50, loyalty:78, creativity:84, controversyLevel:20, starPotential:88,  burnoutRisk:25, viralProbability:68, careerPhase:'peak',  currentLabel:'Warner Music Africa',    signingBonus:4000000,  weeklyFee:108000, style:'afro R&B',             isReal:true, tier:'B' },
  { id:'omah',        name:'Omah Lay',          genre:'Afrobeats',   region:'Nigeria',     fame:78,  talent:82, workEthic:80, ego:52, loyalty:75, creativity:82, controversyLevel:25, starPotential:88,  burnoutRisk:28, viralProbability:62, careerPhase:'peak',  currentLabel:'KeyQaad/Interscope',     signingBonus:3000000,  weeklyFee:82000,  style:'afropop',              isReal:true, tier:'B' },
  { id:'fireboy',     name:'Fireboy DML',       genre:'Afrobeats',   region:'Nigeria',     fame:78,  talent:82, workEthic:82, ego:48, loyalty:80, creativity:80, controversyLevel:18, starPotential:86,  burnoutRisk:22, viralProbability:58, careerPhase:'peak',  currentLabel:'YBNL/Republic',          signingBonus:3500000,  weeklyFee:92000,  style:'afropop',              isReal:true, tier:'B' },
  { id:'ayrastair',   name:'Ayra Starr',        genre:'Afrobeats',   region:'Nigeria',     fame:72,  talent:85, workEthic:88, ego:52, loyalty:80, creativity:88, controversyLevel:20, starPotential:95,  burnoutRisk:18, viralProbability:72, careerPhase:'rise',  currentLabel:'Mavin Records',          signingBonus:3000000,  weeklyFee:78000,  style:'afropop',              isReal:true, tier:'B' },
  { id:'tyla',        name:'Tyla',              genre:'Afrobeats',   region:'South Africa',fame:74,  talent:84, workEthic:85, ego:50, loyalty:82, creativity:86, controversyLevel:18, starPotential:93,  burnoutRisk:20, viralProbability:75, careerPhase:'rise',  currentLabel:'Warner Music Africa',    signingBonus:3200000,  weeklyFee:84000,  style:'afropop/R&B',          isReal:true, tier:'B' },
  { id:'ruger',       name:'Ruger',             genre:'Afrobeats',   region:'Nigeria',     fame:70,  talent:80, workEthic:85, ego:60, loyalty:75, creativity:80, controversyLevel:30, starPotential:88,  burnoutRisk:22, viralProbability:65, careerPhase:'rise',  currentLabel:'Audiomack/independent',  signingBonus:2200000,  weeklyFee:58000,  style:'dancehall afrobeats',  isReal:true, tier:'C' },
  { id:'black',       name:'Black Sherif',      genre:'Afrobeats',   region:'Ghana',       fame:70,  talent:86, workEthic:88, ego:50, loyalty:82, creativity:88, controversyLevel:20, starPotential:92,  burnoutRisk:18, viralProbability:70, careerPhase:'rise',  currentLabel:'independent',            signingBonus:2200000,  weeklyFee:56000,  style:'highlife/drill',       isReal:true, tier:'C' },
  { id:'kizzdaniel',  name:'Kizz Daniel',       genre:'Afrobeats',   region:'Nigeria',     fame:72,  talent:82, workEthic:85, ego:55, loyalty:80, creativity:82, controversyLevel:22, starPotential:85,  burnoutRisk:22, viralProbability:60, careerPhase:'peak',  currentLabel:'Fly Boy Inc',            signingBonus:2800000,  weeklyFee:72000,  style:'afropop',              isReal:true, tier:'C' },
  { id:'oxlade',      name:'Oxlade',            genre:'Afrobeats',   region:'Nigeria',     fame:68,  talent:82, workEthic:82, ego:48, loyalty:80, creativity:82, controversyLevel:18, starPotential:88,  burnoutRisk:20, viralProbability:62, careerPhase:'rise',  currentLabel:'Platoon',                signingBonus:2000000,  weeklyFee:52000,  style:'alt afrobeats',        isReal:true, tier:'C' },
  { id:'amaarae',     name:'Amaarae',           genre:'R&B',         region:'Ghana',       fame:65,  talent:86, workEthic:80, ego:48, loyalty:82, creativity:90, controversyLevel:18, starPotential:90,  burnoutRisk:22, viralProbability:65, careerPhase:'rise',  currentLabel:'independent/Interscope', signingBonus:1800000,  weeklyFee:45000,  style:'alt R&B',              isReal:true, tier:'C' },
  // LATIN
  { id:'badbunny',    name:'Bad Bunny',         genre:'Latin',       region:'Puerto Rico', fame:97,  talent:91, workEthic:90, ego:72, loyalty:68, creativity:92, controversyLevel:38, starPotential:99,  burnoutRisk:22, viralProbability:88, careerPhase:'peak',  currentLabel:'Rimas Entertainment',    signingBonus:14000000, weeklyFee:440000, style:'reggaeton/trap latino',isReal:true, tier:'S' },
  { id:'karol',       name:'Karol G',           genre:'Latin',       region:'Colombia',    fame:88,  talent:85, workEthic:92, ego:58, loyalty:80, creativity:82, controversyLevel:22, starPotential:94,  burnoutRisk:18, viralProbability:78, careerPhase:'peak',  currentLabel:'UML/Interscope',         signingBonus:7500000,  weeklyFee:218000, style:'reggaeton/pop',        isReal:true, tier:'A' },
  { id:'shakira',     name:'Shakira',           genre:'Latin',       region:'Colombia',    fame:92,  talent:90, workEthic:92, ego:62, loyalty:75, creativity:88, controversyLevel:35, starPotential:94,  burnoutRisk:15, viralProbability:80, careerPhase:'peak',  currentLabel:'Sony Music',             signingBonus:9000000,  weeklyFee:272000, style:'latin pop',            isReal:true, tier:'A' },
  { id:'jbalvin',     name:'J Balvin',          genre:'Latin',       region:'Colombia',    fame:90,  talent:82, workEthic:85, ego:68, loyalty:72, creativity:80, controversyLevel:35, starPotential:90,  burnoutRisk:25, viralProbability:72, careerPhase:'peak',  currentLabel:'UML',                    signingBonus:8000000,  weeklyFee:235000, style:'reggaeton',            isReal:true, tier:'A' },
  { id:'peso',        name:'Peso Pluma',        genre:'Latin',       region:'Mexico',      fame:78,  talent:80, workEthic:88, ego:60, loyalty:75, creativity:82, controversyLevel:35, starPotential:92,  burnoutRisk:22, viralProbability:78, careerPhase:'peak',  currentLabel:'Double P Records',       signingBonus:4000000,  weeklyFee:105000, style:'corridos tumbados',    isReal:true, tier:'B' },
  { id:'maluma',      name:'Maluma',            genre:'Latin',       region:'Colombia',    fame:85,  talent:80, workEthic:85, ego:68, loyalty:72, creativity:78, controversyLevel:32, starPotential:86,  burnoutRisk:25, viralProbability:68, careerPhase:'peak',  currentLabel:'Sony Music Latin',       signingBonus:6000000,  weeklyFee:165000, style:'reggaeton',            isReal:true, tier:'B' },
  // EMERGING
  { id:'benson',      name:'Benson Boone',      genre:'Indie',       region:'US',          fame:68,  talent:82, workEthic:90, ego:45, loyalty:85, creativity:82, controversyLevel:15, starPotential:90,  burnoutRisk:20, viralProbability:65, careerPhase:'rise',  currentLabel:'Warner Records',         signingBonus:2500000,  weeklyFee:62000,  style:'indie pop',            isReal:true, tier:'C' },
  { id:'youngjonn',   name:'Young Jonn',        genre:'Afrobeats',   region:'Nigeria',     fame:60,  talent:82, workEthic:86, ego:52, loyalty:80, creativity:84, controversyLevel:15, starPotential:86,  burnoutRisk:18, viralProbability:60, careerPhase:'rise',  currentLabel:'independent',            signingBonus:1200000,  weeklyFee:28000,  style:'afropop',              isReal:true, tier:'D' },
  { id:'stonebwoy',   name:'Stonebwoy',         genre:'Dancehall',   region:'Ghana',       fame:68,  talent:80, workEthic:84, ego:55, loyalty:78, creativity:80, controversyLevel:25, starPotential:82,  burnoutRisk:22, viralProbability:55, careerPhase:'peak',  currentLabel:'Bhim Nation',            signingBonus:1800000,  weeklyFee:44000,  style:'reggae/dancehall',     isReal:true, tier:'C' },
];

// ─── AI ARTIST GENERATOR ──────────────────────
const AI_FIRST  = ['Blaze','Nova','Kira','Dex','Zeph','Axel','Sera','Cade','Lyric','Vex','Sol','Mace','Onyx','Arc','Echo','Lex','Roux','Cleo','Vanta','Juno','Kai','Wren','Orion','Lune','Sable','Miro','Cyra','Flux','Drex','Ace'];
const AI_LAST   = ['Wave','Fire','Reign','Flow','Blade','Star','Drift','Rush','Haze','Rook','Tide','Crux','Grit','Byte','Sire','Mist','Vale','Wax','Crest','Smoke','Pulse'];
const AI_SINGLE = ['Solis','Faroe','Vesper','Lyra','Psalm','Avon','Halo','Wraith','Quill','Drex','Omen','Aiko','Zara','Cyra','Cadence','Vanta','Roux','Miro'];
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
function cl(v,lo,hi){return Math.min(hi,Math.max(lo,v));}

export function generateAIArtist(week=0) {
  const region = rf(REGIONS);
  const genre  = rf(REGION_GENRE[region]||GENRES);
  const arch   = rf(ARCHETYPES);
  const style  = Math.random();
  const name   = style<0.3 ? `${rf(AI_FIRST)} ${rf(AI_LAST)}`
               : style<0.6 ? rf(AI_SINGLE)
               : `${rf(AI_FIRST)} ${rf(AI_SINGLE)}`;
  const baseFame   = ri(4,52);
  const baseTalent = ri(44,80);
  const starPot    = ri(20,100);
  const bonus      = Math.floor(baseFame*3800+baseTalent*1400+ri(40000,180000));
  const fee        = Math.max(2500, Math.floor(bonus*0.0048)+ri(1800,7000));
  return {
    id:`ai_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    name,genre,region,isReal:false,
    fame:baseFame,talent:baseTalent,
    workEthic:       cl(arch.workEthic+ri(-8,8),20,100),
    ego:             cl(arch.ego+ri(-8,8),20,100),
    loyalty:         cl(arch.loyalty+ri(-8,8),20,100),
    creativity:      cl(arch.creativity+ri(-8,8),20,100),
    controversyLevel:cl(arch.controversyLevel+ri(-8,8),5,100),
    archetype:arch.name,
    starPotential:starPot,burnoutRisk:ri(5,68),viralProbability:ri(5,78),
    growthCeiling:Math.min(100,baseFame+Math.floor(starPot*0.55)),
    careerPhase:'rise',mood:ri(64,92),imageDecay:100,
    currentLabel:null,style:`${genre.toLowerCase()} artist`,
    signingBonus:bonus,weeklyFee:fee,
    tier:starPot>=85?'A':starPot>=60?'B':'C',createdWeek:week,
  };
}

// ─── DIFFICULTY ───────────────────────────────
// Much harder now — larger gap between modes
export const DIFFICULTY = {
  easy:   { startCash:8000000,  streamRate:0.0038, rivalStrength:0.3, eventFreq:0.18, overheadMult:0.5,  tourCostMult:0.6,  promoMult:0.5,  label:'Easy',   artistFeeMult:0.7  },
  normal: { startCash:5000000,  streamRate:0.0022, rivalStrength:0.7, eventFreq:0.30, overheadMult:1.0,  tourCostMult:1.0,  promoMult:1.0,  label:'Normal', artistFeeMult:1.0  },
  hard:   { startCash:2000000,  streamRate:0.0014, rivalStrength:1.1, eventFreq:0.42, overheadMult:1.5,  tourCostMult:1.4,  promoMult:1.5,  label:'Hard',   artistFeeMult:1.3  },
  legend: { startCash:750000,   streamRate:0.0009, rivalStrength:1.5, eventFreq:0.55, overheadMult:2.2,  tourCostMult:2.0,  promoMult:2.0,  label:'Legend', artistFeeMult:1.8  },
};

// ─── LABEL OPERATING OVERHEAD ─────────────────
// Weekly costs just to exist at each tier — scales with difficulty
export const LABEL_OVERHEAD = [
  { tierIdx:0, name:'Home Studio',   weeklyCost:1500   },
  { tierIdx:1, name:'Indie Office',  weeklyCost:12000  },
  { tierIdx:2, name:'Boutique HQ',   weeklyCost:40000  },
  { tierIdx:3, name:'Rising Label',  weeklyCost:120000 },
  { tierIdx:4, name:'Mid-Major HQ',  weeklyCost:350000 },
  { tierIdx:5, name:'Major Label',   weeklyCost:900000 },
  { tierIdx:6, name:'Conglomerate',  weeklyCost:2500000},
];

// ─── CONTRACT NEGOTIATION TERMS ───────────────
// Player negotiates EACH of these separately
export const DEAL_TYPES = [
  { id:'360',          label:'360 Deal',            royaltyRate:0.15, desc:'Label earns 15% of ALL revenue streams', moodImpact:-15, loyaltyImpact:-10 },
  { id:'standard',     label:'Standard Record Deal', royaltyRate:0.20, desc:'20% royalty on recorded music only',     moodImpact:0,   loyaltyImpact:0   },
  { id:'distribution', label:'Distribution Only',    royaltyRate:0.30, desc:'30% cut — artist retains creative rights',moodImpact:10,  loyaltyImpact:8   },
  { id:'joint',        label:'Joint Venture',         royaltyRate:0.50, desc:'50/50 — full creative and financial partner',moodImpact:8, loyaltyImpact:12 },
];

// Album delivery obligations the artist must fulfill
export const ALBUM_OBLIGATIONS = [
  { id:'1album',  label:'1 Album',   albums:1, desc:'One studio album required' },
  { id:'2albums', label:'2 Albums',  albums:2, desc:'Two studio albums required' },
  { id:'3albums', label:'3 Albums',  albums:3, desc:'Three studio albums — rare in modern era' },
  { id:'eps_only',label:'EPs Only',  albums:0, desc:'No album obligation — EPs and singles only' },
];

// Advance payment on top of signing bonus
export const ADVANCE_OPTIONS = [
  { id:'no_advance',  label:'No Advance',     amount:0,       desc:'No upfront advance — lower total cost' },
  { id:'sm_advance',  label:'$100K Advance',  amount:100000,  desc:'Small advance recouped from royalties' },
  { id:'md_advance',  label:'$500K Advance',  amount:500000,  desc:'Mid advance — artist very happy' },
  { id:'lg_advance',  label:'$1M Advance',    amount:1000000, desc:'Large advance — massive loyalty boost' },
  { id:'xl_advance',  label:'$3M Advance',    amount:3000000, desc:'Superstar advance — seals the deal' },
];

// Revenue split options
export const REVENUE_SPLITS = [
  { id:'60_40', label:'60/40 (Label/Artist)', labelPct:0.60, artistPct:0.40, desc:'Label-favorable. Artist resentment risk.' },
  { id:'50_50', label:'50/50 Split',           labelPct:0.50, artistPct:0.50, desc:'Even split. Industry standard.' },
  { id:'40_60', label:'40/60 (Label/Artist)', labelPct:0.40, artistPct:0.60, desc:'Artist-favorable. Higher loyalty.' },
  { id:'30_70', label:'30/70 (Label/Artist)', labelPct:0.30, artistPct:0.70, desc:'Artist gets most. Low conflict risk.' },
];

// ─── CHART DATA ───────────────────────────────
export const CHART_SONGS = [
  { title:"Cruel Summer",             artist:"Taylor Swift",               streams:5800000, genre:'Pop'       },
  { title:"Not Like Us",              artist:"Kendrick Lamar",             streams:5500000, genre:'Hip-Hop'   },
  { title:"luther",                   artist:"Kendrick Lamar & SZA",       streams:5000000, genre:'R&B'       },
  { title:"APT.",                     artist:"ROSÉ & Bruno Mars",          streams:4900000, genre:'Pop'       },
  { title:"Die With A Smile",         artist:"Lady Gaga & Bruno Mars",     streams:5100000, genre:'Pop'       },
  { title:"Espresso",                 artist:"Sabrina Carpenter",          streams:4400000, genre:'Pop'       },
  { title:"TEXAS HOLD 'EM",           artist:"Beyoncé",                    streams:4700000, genre:'Pop'       },
  { title:"Flowers",                  artist:"Miley Cyrus",                streams:4600000, genre:'Pop'       },
  { title:"As It Was",                artist:"Harry Styles",               streams:5200000, genre:'Pop'       },
  { title:"One Dance",                artist:"Drake",                      streams:4200000, genre:'Hip-Hop'   },
  { title:"Birds of a Feather",       artist:"Billie Eilish",              streams:4200000, genre:'Pop'       },
  { title:"Calm Down",                artist:"Rema & Selena Gomez",        streams:3900000, genre:'Afrobeats' },
  { title:"Please Please Please",     artist:"Sabrina Carpenter",          streams:4100000, genre:'Pop'       },
  { title:"Too Sweet",                artist:"Hozier",                     streams:3800000, genre:'Indie'     },
  { title:"Good Luck, Babe!",         artist:"Chappell Roan",              streams:3700000, genre:'Pop'       },
  { title:"Water",                    artist:"Tyla",                       streams:3600000, genre:'Afrobeats' },
  { title:"Million Dollar Baby",      artist:"Tommy Richman",              streams:3500000, genre:'R&B'       },
  { title:"Ella Baila Sola",          artist:"Eslabon & Peso Pluma",       streams:3900000, genre:'Latin'     },
  { title:"Bzrp Sessions #53",        artist:"Bizarrap & Shakira",         streams:4500000, genre:'Latin'     },
  { title:"Rich Flex",                artist:"Drake & 21 Savage",          streams:3800000, genre:'Hip-Hop'   },
  { title:"Creepin'",                 artist:"Metro Boomin & Weeknd",      streams:3300000, genre:'R&B'       },
  { title:"Snooze",                   artist:"SZA",                        streams:2700000, genre:'R&B'       },
  { title:"All Mine",                 artist:"Burna Boy",                  streams:3100000, genre:'Afrobeats' },
  { title:"LALA",                     artist:"Myke Towers",                streams:3200000, genre:'Latin'     },
  { title:"Beautiful Things",         artist:"Benson Boone",               streams:3300000, genre:'Indie'     },
  { title:"Unholy",                   artist:"Sam Smith & Kim Petras",     streams:3400000, genre:'Pop'       },
  { title:"Stick Season",             artist:"Noah Kahan",                 streams:2900000, genre:'Indie'     },
  { title:"Golden Hour",              artist:"JVKE",                       streams:2800000, genre:'Pop'       },
  { title:"Woman of the Hour",        artist:"Billie Eilish",              streams:2900000, genre:'Pop'       },
  { title:"Qué Más Pues?",            artist:"J Balvin & Maria Becerra",   streams:2600000, genre:'Latin'     },
  { title:"SOS",                      artist:"SZA",                        streams:3500000, genre:'R&B',      isAlbum:true },
  { title:"Mañana Será Bonito",       artist:"Karol G",                    streams:3800000, genre:'Latin',    isAlbum:true },
  { title:"Midnights",                artist:"Taylor Swift",               streams:6000000, genre:'Pop',      isAlbum:true },
  { title:"For All The Dogs",         artist:"Drake",                      streams:4200000, genre:'Hip-Hop',  isAlbum:true },
  { title:"Cowboy Carter",            artist:"Beyoncé",                    streams:4500000, genre:'Pop',      isAlbum:true },
  { title:"Naomi",                    artist:"Asake",                      streams:2900000, genre:'Afrobeats',isAlbum:true },
  { title:"We Outside",               artist:"Burna Boy",                  streams:3200000, genre:'Afrobeats',isAlbum:true },
  { title:"Jaguar II",                artist:"Victoria Monét",             streams:2500000, genre:'R&B',      isAlbum:true },
];

// ─── DRAMA EVENTS ─────────────────────────────
export const DRAMA_EVENTS = [
  { id:'beef_start',      type:'beef',     severity:'medium', urgent:true,  headline:'[ARTIST] calls out a rival on social media — the internet is COOKING', storyBeat:'A 2AM tweet mentioning names. Screenshots everywhere. Blogs running.',
    choices:[
      { label:'🔥 Drop the diss track', desc:'Respond with bars', streamBoost:45, moodDelta:-12, fameDelta:14, loyaltyDelta:5,  cost:60000,  risk:'high',   riskNote:'Could escalate to real feud' },
      { label:'📢 Issue statement',     desc:'Measured public response', streamBoost:8, moodDelta:6,  fameDelta:0,  loyaltyDelta:2,  cost:15000, risk:'low'   },
      { label:'🤐 Radio silence',       desc:'Say nothing. Let it fade.', streamBoost:18, moodDelta:2, fameDelta:4, loyaltyDelta:-2, cost:0,     risk:'medium' },
    ]},
  { id:'scandal_leak',    type:'scandal',  severity:'high',   urgent:true,  headline:'Private footage of [ARTIST] leaks online — trending #1 worldwide', storyBeat:'The footage is everywhere. Brands calling. Fans split.',
    choices:[
      { label:'🙏 Apology tour',      desc:'Public apology + charity', streamBoost:-8,  moodDelta:14, fameDelta:-10, cost:200000,  risk:'low'  },
      { label:'⚖️ Lawyer up',          desc:'File legal action',        streamBoost:-18, moodDelta:6,  fameDelta:-16, cost:400000,  risk:'medium' },
      { label:'💪 Own it',             desc:'Lean in. Make it a brand.', streamBoost:32,  moodDelta:-6, fameDelta:12,  cost:90000,  risk:'high', riskNote:'Could backfire spectacularly' },
    ]},
  { id:'viral_tiktok',    type:'viral',    severity:'positive',urgent:false, headline:'[ARTIST] is the #1 sound on TikTok — 300M videos in 72 hours', storyBeat:'Everyone is using the audio. Dance challenge everywhere.',
    choices:[
      { label:'🚀 Full push NOW', desc:'Emergency marketing + remix drop', streamBoost:90, moodDelta:18, fameDelta:22, cost:250000, risk:'low'    },
      { label:'🌊 Organic wave',   desc:'Let the algorithm run',           streamBoost:55, moodDelta:12, fameDelta:14, cost:0,      risk:'low'    },
      { label:'🎤 Official remix', desc:'Bring in a featured artist',      streamBoost:70, moodDelta:15, fameDelta:18, cost:150000, risk:'medium' },
    ]},
  { id:'grammy_nom',      type:'award',    severity:'positive',urgent:false, headline:'[ARTIST] receives Grammy nomination — Album of the Year shortlist', storyBeat:'The Recording Academy made their picks.',
    choices:[
      { label:'💰 Full Grammy campaign', desc:'$500K push', streamBoost:28, moodDelta:22, fameDelta:20, cost:500000, risk:'low' },
      { label:'📱 Socials + press',      desc:'Digital only', streamBoost:12, moodDelta:16, fameDelta:12, cost:80000, risk:'low' },
    ]},
  { id:'arrest',          type:'crisis',   severity:'critical',urgent:true,  headline:'BREAKING: [ARTIST] arrested — label in full emergency mode', storyBeat:'Phones blowing up. Brands calling. Streaming about to crater.',
    choices:[
      { label:'💼 Full legal defence', desc:'Best lawyers, bail, PR team', streamBoost:-28, moodDelta:-5,  fameDelta:-18, cost:1200000, risk:'medium'                },
      { label:'📵 Suspend everything', desc:'Pause all activity',           streamBoost:-50, moodDelta:-18, fameDelta:-30, cost:50000,   risk:'low'                   },
      { label:'✂️ Drop the artist',    desc:'Immediate termination',        streamBoost:0,   moodDelta:0,   fameDelta:-8,  cost:0,       risk:'low', dropsArtist:true },
    ]},
  { id:'demand_raise',    type:'internal', severity:'medium',  urgent:true,  headline:'[ARTIST] demands renegotiation — wants 30% more or walks', storyBeat:'Manager sent the letter at 11PM. Answer by Friday.',
    choices:[
      { label:'✅ Accept demands', desc:'Raise weekly fee 30%',         streamBoost:12, moodDelta:28, fameDelta:0, cost:0,       renegotiate:true, renegotiateMultiplier:1.30, risk:'low',    loyaltyDelta:15 },
      { label:'🤝 Counter: 12%',  desc:'Counter + milestone bonus',     streamBoost:6,  moodDelta:14, fameDelta:0, cost:250000, renegotiate:true, renegotiateMultiplier:1.12, risk:'medium', loyaltyDelta:5  },
      { label:'❌ Refuse',         desc:'Hold firm on current contract', streamBoost:-18,moodDelta:-28,fameDelta:0, cost:0,       risk:'high',   loyaltyDelta:-25, riskNote:'May leave at contract end' },
    ]},
  { id:'collab_offer',    type:'collab',   severity:'positive',urgent:false, headline:'Global superstar wants to collab with [ARTIST]', storyBeat:'Email came through management. Could be song of the year.',
    choices:[
      { label:'🎵 Accept',          desc:'Joint single in 3 weeks', streamBoost:48, moodDelta:16, fameDelta:16, cost:350000, risk:'low'    },
      { label:'⏳ Negotiate terms', desc:'Counter for better backend', streamBoost:35, moodDelta:10, fameDelta:10, cost:100000, risk:'medium' },
      { label:'🚫 Decline',         desc:'Focus on album rollout',   streamBoost:0,  moodDelta:5,  fameDelta:0,  cost:0,      risk:'low'    },
    ]},
  { id:'burnout',         type:'crisis',   severity:'high',    urgent:true,  headline:'[ARTIST] collapses on stage — burnout crisis, media everywhere', storyBeat:'3rd show in 4 days. Ambulance called. Fans worried.',
    choices:[
      { label:'🛌 Mandatory 8wk rest', desc:'Cancel everything',   streamBoost:-30, moodDelta:35, fameDelta:-10, cost:0,       risk:'low',  burnoutRiskDelta:-25 },
      { label:'💊 Light schedule',      desc:'Half bookings + support', streamBoost:-12, moodDelta:15, fameDelta:-4, cost:180000, risk:'medium',burnoutRiskDelta:-10 },
      { label:'📅 Push through',        desc:'Keep schedule, hire staff', streamBoost:5, moodDelta:-20,fameDelta:2, cost:300000, risk:'high', burnoutRiskDelta:15, riskNote:'Could cause permanent damage' },
    ]},
  { id:'label_dispute',   type:'internal', severity:'high',    urgent:true,  headline:'[ARTIST] goes public — accuses label of stifling creative freedom', storyBeat:'10-tweet thread. Music Twitter picking sides.',
    choices:[
      { label:'🎨 Give creative control', desc:'Let them self-produce', streamBoost:22, moodDelta:32, fameDelta:6,   cost:120000, loyaltyDelta:18, risk:'medium' },
      { label:'🤫 Settle privately',      desc:'Mediator, NDA',        streamBoost:5,  moodDelta:16, fameDelta:0,   cost:220000, loyaltyDelta:6,  risk:'low'    },
      { label:'⚖️ Enforce contract',      desc:'Legal letter',          streamBoost:-24,moodDelta:-32,fameDelta:-12, cost:550000, loyaltyDelta:-28,risk:'high'   },
    ]},
  { id:'festival_offer',  type:'tour',     severity:'positive',urgent:false, headline:'[ARTIST] invited to headline Coachella / Glastonbury / Afronation', storyBeat:'Festival booker called personally.',
    choices:[
      { label:'🎪 Accept headline', desc:'$2.5M fee + exposure', streamBoost:32, moodDelta:22, fameDelta:24, cost:-2500000, risk:'low'    },
      { label:'🎯 Hold for more',   desc:'Counter $3.5M',        streamBoost:25, moodDelta:16, fameDelta:20, cost:-3500000, risk:'medium' },
      { label:'🏠 Pass',            desc:'Save for world tour',  streamBoost:0,  moodDelta:5,  fameDelta:0,  cost:0,        risk:'low'    },
    ]},
  { id:'fan_cancel',      type:'scandal',  severity:'medium',  urgent:true,  headline:'[ARTIST] faces mass cancel campaign — trending everywhere', storyBeat:'Old clip resurfaced. 50K tweets in an hour.',
    choices:[
      { label:'📝 Sincere apology', desc:'Long apology + donation', streamBoost:-5,  moodDelta:10, fameDelta:-8,  cost:40000, risk:'low'                           },
      { label:'💪 Defend publicly', desc:'Defend the original clip',streamBoost:18,  moodDelta:-9, fameDelta:-6,  cost:0,     risk:'high', riskNote:'May double backlash' },
      { label:'🌑 Total blackout',  desc:'Delete everything',       streamBoost:-18, moodDelta:4,  fameDelta:-12, cost:0,     risk:'medium'                         },
    ]},
  { id:'drug_problem',    type:'crisis',   severity:'high',    urgent:true,  headline:'Sources: [ARTIST] is struggling privately — performances slipping', storyBeat:'Insiders are talking. Attendance dropping. Something is wrong.',
    choices:[
      { label:'🏥 Send to rehab',   desc:'Private 60-day facility',  streamBoost:-40, moodDelta:40, fameDelta:-5,  cost:350000, risk:'low',  burnoutRiskDelta:-30 },
      { label:'💼 Hire private help',desc:'Private doctors + manager',streamBoost:-15, moodDelta:20, fameDelta:-2,  cost:180000, risk:'medium',burnoutRiskDelta:-15 },
      { label:'🙈 Ignore it',        desc:'Hope it resolves itself',  streamBoost:-8,  moodDelta:-5, fameDelta:-8,  cost:0,      risk:'high', burnoutRiskDelta:20, riskNote:'Could spiral into full crisis' },
    ]},
  { id:'stadium_sellout', type:'tour',     severity:'positive',urgent:false, headline:'[ARTIST] sells out 5 stadium nights in 8 minutes — historic demand', storyBeat:'Box office broke records.',
    choices:[
      { label:'➕ Add 5 more nights', desc:'$8M+ more revenue', streamBoost:22, moodDelta:18, fameDelta:15, cost:4000000, risk:'low'  },
      { label:'🎯 Keep original',     desc:'Maintain exclusivity',streamBoost:10, moodDelta:12, fameDelta:8,  cost:0,       risk:'low'  },
    ]},
];

export const NEAR_MISS_EVENTS = [
  { type:'chart',  msg:(a,r)=>`📊 ${a} peaked at #${r} — just ONE position off the top. That stings.`      },
  { type:'chart',  msg:(a,r)=>`📊 ${a} debuted at #2. You needed ${r} more streams for #1. DEVASTATING.`    },
  { type:'viral',  msg:(a)  =>`⚡ ${a}'s track almost went viral — 890K TikTok uses in 48h. Watch this.`   },
  { type:'grammy', msg:(a)  =>`🏆 ${a} missed the Grammy shortlist by 4 votes. Four.`                        },
  { type:'sync',   msg:()   =>`📺 Nike almost chose your track. They went another way at the last second.`   },
  { type:'bidding',msg:(a)  =>`🔥 Universal tried to poach ${a}. Their loyalty held — barely.`              },
];

export const NEWS_EVENTS = [
  { text:'[ARTIST] spotted recording in Lagos — new project incoming?',                    type:'news',      fameBoost:2  },
  { text:'[ARTIST] hits 1 billion streams — a landmark moment for the label',              type:'milestone', fameBoost:8  },
  { text:'A deep-cut [ARTIST] track resurfaces on TikTok — streams up 400%',               type:'viral',     streamBoost:22, fameBoost:6 },
  { text:'[ARTIST] earns first platinum certification',                                     type:'milestone', fameBoost:6  },
  { text:'[ARTIST] covers Vogue / Rolling Stone / Essence',                                 type:'news',      fameBoost:5  },
  { text:'[ARTIST] announces surprise world tour — pre-sale crashes the server',            type:'tour',      fameBoost:7  },
  { text:'[ARTIST] donates to community causes — widely praised',                           type:'positive',  fameBoost:6  },
  { text:'[ARTIST] trends #1 in 44 countries — a global phenomenon',                       type:'viral',     streamBoost:35, fameBoost:12},
  { text:'[ARTIST] confirms new collab — snippet drops at midnight',                        type:'collab',    fameBoost:4  },
  { text:'[ARTIST] breaks personal streaming record — biggest week ever',                   type:'milestone', fameBoost:5  },
  { text:'[ARTIST] style goes viral — the fashion moment everyone is copying',              type:'viral',     fameBoost:5  },
];

export const WEEKLY_OBJECTIVES = [
  { id:'first_signing',  title:'First Signing',       desc:'Sign your first artist',              reward:80000,   metric:'rosterSize',   target:1        },
  { id:'first_release',  title:'First Drop',          desc:'Release your first track',            reward:50000,   metric:'releaseCount', target:1        },
  { id:'earn_500k',      title:'First Half Mil',      desc:'Earn $500K in total revenue',         reward:75000,   metric:'totalRevenue', target:500000   },
  { id:'chart_top20',    title:'Charting Artist',     desc:'Get a release in the Top 20',         reward:200000,  metric:'chartPos',     target:20       },
  { id:'earn_1m',        title:'First Million',       desc:'Earn $1M total revenue',              reward:120000,  metric:'totalRevenue', target:1000000  },
  { id:'roster_3',       title:'Growing Roster',      desc:'Sign 3 artists',                      reward:250000,  metric:'rosterSize',   target:3        },
  { id:'sync_deal',      title:'Sync Secured',        desc:'Land your first sync deal',           reward:100000,  metric:'syncCount',    target:1        },
  { id:'chart_top5',     title:'Top 5 Hit',           desc:'Crack the Top 5',                     reward:400000,  metric:'chartPos',     target:5        },
  { id:'earn_5m',        title:'Five Mill',           desc:'Earn $5M total revenue',              reward:300000,  metric:'totalRevenue', target:5000000  },
  { id:'chart_number1',  title:'🏆 NUMBER ONE',       desc:'Hit #1 on the global chart',          reward:1000000, metric:'chartNum1',    target:1        },
  { id:'roster_5',       title:'Full Roster',         desc:'Have 5 artists signed',               reward:400000,  metric:'rosterSize',   target:5        },
  { id:'earn_10m',       title:'Double Digits',       desc:'Earn $10M total revenue',             reward:500000,  metric:'totalRevenue', target:10000000 },
  { id:'ai_artist_sign', title:'Diamond in the Rough',desc:'Sign an AI-generated artist',        reward:150000,  metric:'aiRoster',     target:1        },
  { id:'streams_50m',    title:'50M Streams',         desc:'Accumulate 50M total streams',        reward:300000,  metric:'totalStreams', target:50000000 },
  { id:'earn_50m',       title:'Fifty Mill',          desc:'Earn $50M total revenue',             reward:2000000, metric:'totalRevenue', target:50000000 },
  { id:'tier_indie',     title:'Indie Label',         desc:'Reach Indie Label tier',              reward:500000,  metric:'tierIdx',      target:1        },
  { id:'tier_boutique',  title:'Boutique Status',     desc:'Reach Boutique Label tier',           reward:1500000, metric:'tierIdx',      target:2        },
  { id:'rival_beaten',   title:'Chart War Won',       desc:'Beat a rival on the charts',          reward:300000,  metric:'rivalBeaten',  target:1        },
  { id:'earn_100m',      title:'Nine Figures',        desc:'Earn $100M total revenue',            reward:5000000, metric:'totalRevenue', target:100000000},
];

// ─── 10-LEVEL STAFF SYSTEM ────────────────────
// Each level costs more per week. Bonuses compound.
function staffLevels(baseCost, baseBonus, name, specialty) {
  return Array.from({length:10}, (_,i) => ({
    level:    i+1,
    name:     `${['Intern','Junior','Associate','Senior','Lead','Director','VP','SVP','EVP','C-Suite'][i]} ${name}`,
    weeklyCost: Math.floor(baseCost * Math.pow(1.55, i)),
    bonus:    `${baseBonus} ${specialty} +${Math.round((i+1)*10)}%`,
    bonusPct: (i+1)*0.10,  // each level = +10% to relevant stat
  }));
}

export const STAFF_ROLES = [
  {
    id:'anr', name:'A&R Department', icon:'🎤',
    desc:'Unlocks better market artists, improves AI generation quality, allows poaching from rival rosters at higher levels.',
    levels: staffLevels(3000, 'Talent scouting', 'A&R').map((l,i) => ({
      ...l,
      bonus: [
        'Access to C/D tier real artists in market',
        'Access to B tier artists. Better AI quality.',
        'Access to A tier artists.',
        'Rival roster scouting — see who they signed.',
        '+20% to all AI artist generated talent scores.',
        'Can approach signed A-tier artists for poaching.',
        'Rival label poaching — receive counteroffers.',
        'Access to S-tier superstars.',
        'Global scouting network — see 15 market artists.',
        'Legendary A&R — guaranteed superstar each quarter.',
      ][i],
    })),
  },
  {
    id:'pr', name:'PR Department', icon:'📣',
    desc:'Reduces scandal damage, unlocks hidden event choices, can suppress events at high levels.',
    levels: staffLevels(4000, 'Crisis management', 'PR').map((l,i) => ({
      ...l,
      bonus: [
        '-15% scandal damage to image.',
        '-25% scandal damage. Unlock extra event choices.',
        '-35% scandal damage.',
        'One event suppression per month.',
        '-50% all negative event damage.',
        'Two event suppressions per month.',
        'Turn any scandal into a PR win (once per month).',
        '-70% damage. Rivals\' scandals affect your artists too.',
        'Media blackout ability — silence any story for 2 weeks.',
        'Total image control. Scandals become opportunities.',
      ][i],
    })),
  },
  {
    id:'marketing', name:'Marketing Department', icon:'📈',
    desc:'Multiplies streaming revenue and chart performance. Higher levels unlock platform exclusives and guaranteed placements.',
    levels: staffLevels(5000, 'Stream boost', 'Marketing').map((l,i) => ({
      ...l,
      bonus: [
        '+8% all streaming revenue.',
        '+15% streams. Spotify playlist consideration.',
        '+22% streams.',
        '+30% streams. Apple Music editorial access.',
        '+38% streams. Guaranteed playlist placement for A-tier releases.',
        '+46% streams. TikTok algorithm partnerships.',
        '+55% streams. Billboard chart reporting partners.',
        '+65% streams. Global marketing coordination.',
        '+75% streams. Real-time trend exploitation.',
        '+90% streams. Full industry marketing monopoly.',
      ][i],
    })),
  },
  {
    id:'legal', name:'Legal Team', icon:'⚖️',
    desc:'Reduces buyout costs, handles disputes, protects against rival poaching, enables complex deal structures.',
    levels: staffLevels(5500, 'Contract protection', 'Legal').map((l,i) => ({
      ...l,
      bonus: [
        '-15% artist buyout costs.',
        '-25% buyout. Handle minor disputes.',
        '-35% buyout. Block one rival poaching attempt per month.',
        '-45% buyout. Full contract dispute resolution.',
        '-55% buyout. Force rivals to pay damages for poaching.',
        '-65% buyout. Nullify any loan penalty once per quarter.',
        '-75% buyout. Renegotiate any contract mid-term.',
        '-85% buyout. Industry-wide legal protection.',
        '-90% buyout. No artist can be poached against their will.',
        '-100% buyout. Zero exit costs. Contracts fully protected.',
      ][i],
    })),
  },
  {
    id:'finance', name:'Finance Team', icon:'💰',
    desc:'Reduces overhead costs, improves loan terms, generates passive investment income.',
    levels: staffLevels(4500, 'Cost reduction', 'Finance').map((l,i) => ({
      ...l,
      bonus: [
        '-10% weekly overhead costs.',
        '-20% overhead. Better loan interest rates.',
        '-30% overhead. Passive investment income starts.',
        '-35% overhead. Equity dilution protection.',
        '-40% overhead. Tax efficiency — +5% net revenue.',
        '-45% overhead. Negotiate better tour guarantees.',
        '-50% overhead. Bond issuance available.',
        '-55% overhead. IPO preparation tools.',
        '-60% overhead. Hedge fund partnership income.',
        '-70% overhead. Full financial monopoly. Zero cost leakage.',
      ][i],
    })),
  },
];

// ─── LOANS ─────────────────────────────────────
export const LOAN_OPTIONS = [
  { id:'bank_sm',  name:'Bank Loan — Small',  amount:1000000,  interestRate:0.08, weeklyPayment:26000,  durationWeeks:52, type:'bank',   risk:'low',    penaltyOnMiss:'Credit damage. +5% interest rate.'        },
  { id:'bank_lg',  name:'Bank Loan — Large',  amount:5000000,  interestRate:0.09, weeklyPayment:118000, durationWeeks:52, type:'bank',   risk:'medium', penaltyOnMiss:'Asset freeze. Rival poaching window opens.'},
  { id:'angel',    name:'Angel Investor',      amount:3000000,  equityStake:0.08,  weeklyPayment:0,      durationWeeks:0,  type:'equity', risk:'low',    equityNote:'8% of all future profits forever'            },
  { id:'vc',       name:'Venture Capital',     amount:10000000, equityStake:0.18,  weeklyPayment:0,      durationWeeks:0,  type:'equity', risk:'medium', equityNote:'18% equity + quarterly board vote'           },
  { id:'shark',    name:'Private Money',       amount:2000000,  interestRate:0.24, weeklyPayment:65000,  durationWeeks:38, type:'high',   risk:'high',   penaltyOnMiss:'They take your highest-valued artist. No appeal.' },
];

// ─── LABEL TIERS ───────────────────────────────
export const LABEL_TIERS = [
  { name:'Garage Label',   minRevenue:0,          idx:0, perks:'Home base. Survival mode.'                  },
  { name:'Indie Label',    minRevenue:5000000,     idx:1, perks:'Sync eligibility. Better market access.'   },
  { name:'Boutique Label', minRevenue:25000000,    idx:2, perks:'Festival bookings. Premium AI artists.'    },
  { name:'Rising Label',   minRevenue:75000000,    idx:3, perks:'A-list negotiation. Rivals watching.'      },
  { name:'Mid-Major',      minRevenue:200000000,   idx:4, perks:'Global distribution. Award invitations.'   },
  { name:'Major Label',    minRevenue:500000000,   idx:5, perks:'Industry power. Superstar access.'         },
  { name:'Conglomerate',   minRevenue:1500000000,  idx:6, perks:'You ARE the industry. Dynasty unlocked.'   },
];

// ─── RIVALS ────────────────────────────────────
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

// ─── SYNC DEALS ────────────────────────────────
export const SYNC_DEALS = [
  { id:'netflix',    title:'Netflix Drama Soundtrack',   fee:500000,  fameBonus:8,  platform:'Netflix',        minFame:40 },
  { id:'apple',      title:'Apple Product Launch',        fee:800000,  fameBonus:10, platform:'Apple',          minFame:60 },
  { id:'nike',       title:'Nike Global Campaign',        fee:650000,  fameBonus:9,  platform:'Nike',           minFame:50 },
  { id:'gta',        title:'GTA VII Soundtrack',          fee:1200000, fameBonus:15, platform:'Rockstar Games', minFame:55 },
  { id:'nba',        title:'NBA Finals Theme',            fee:400000,  fameBonus:7,  platform:'NBA',            minFame:45 },
  { id:'worldcup',   title:'FIFA World Cup Anthem',       fee:2000000, fameBonus:20, platform:'FIFA',           minFame:75 },
  { id:'marvel',     title:'Marvel Movie Soundtrack',     fee:950000,  fameBonus:12, platform:'Marvel Studios', minFame:65 },
  { id:'spotify',    title:'Spotify Wrapped Campaign',    fee:350000,  fameBonus:6,  platform:'Spotify',        minFame:30 },
  { id:'cocacola',   title:'Coca-Cola Holiday Campaign',  fee:480000,  fameBonus:5,  platform:'Coca-Cola',      minFame:40 },
  { id:'samsung',    title:'Samsung Galaxy Launch',       fee:720000,  fameBonus:8,  platform:'Samsung',        minFame:55 },
  { id:'adidas',     title:'Adidas Global Campaign',      fee:580000,  fameBonus:8,  platform:'Adidas',         minFame:50 },
  { id:'pepsi',      title:'Pepsi Super Bowl Ad',         fee:1500000, fameBonus:16, platform:'PepsiCo',        minFame:70 },
];

// ─── TOURS (harder, realistic costs) ──────────
// Added: minimum fame requirement, risk of losing money, support costs
export const TOUR_TIERS = [
  { id:'club',      name:'Club Tour',         venues:6,   capacity:400,    ticketPrice:40,  baseCost:120000,  minFame:20, supportCost:8000,  riskPct:0.15, desc:'Small venues. Great for building local fanbase.' },
  { id:'theater',   name:'Theater Tour',      venues:10,  capacity:1800,   ticketPrice:70,  baseCost:450000,  minFame:40, supportCost:22000, riskPct:0.15, desc:'Mid-size venues. Requires genuine fan demand.'    },
  { id:'arena',     name:'Arena Tour',        venues:18,  capacity:12000,  ticketPrice:115, baseCost:2500000, minFame:60, supportCost:65000, riskPct:0.20, desc:'Major arenas. High stakes, high reward.'          },
  { id:'stadium',   name:'Stadium Tour',      venues:25,  capacity:55000,  ticketPrice:185, baseCost:8000000, minFame:78, supportCost:200000,riskPct:0.25, desc:'Stadium level. Fame required or you lose money.'  },
  { id:'world',     name:'World Tour',        venues:45,  capacity:75000,  ticketPrice:240, baseCost:18000000,minFame:88, supportCost:500000,riskPct:0.30, desc:'Global. Only superstars can pull this off.'       },
  { id:'festival',  name:'Festival Circuit',  venues:8,   capacity:25000,  ticketPrice:0,   baseCost:300000,  minFame:50, supportCost:30000, riskPct:0.10, desc:'Festival appearances. Guaranteed flat fee deal.'  },
];

// ─── MERCH ─────────────────────────────────────
export const MERCH_LINES = [
  { id:'basic',      name:'Basic Bundle',        weeklyRevenue:4000,   cost:15000,  description:'T-shirts, caps, hoodies'   },
  { id:'premium',    name:'Premium Collection',  weeklyRevenue:18000,  cost:70000,  description:'Limited edition drops'     },
  { id:'streetwear', name:'Streetwear Collab',   weeklyRevenue:50000,  cost:200000, description:'Brand partnership drop'   },
  { id:'luxury',     name:'Luxury Fashion Line', weeklyRevenue:120000, cost:550000, description:'High-end designer collab' },
  { id:'fragrance',  name:'Signature Fragrance', weeklyRevenue:85000,  cost:400000, description:'Celebrity scent line'     },
];

// ─── TRAINING ──────────────────────────────────
export const TRAINING_PROGRAMS = [
  { id:'vocal',       name:'Vocal Coaching',       cost:80000,  durationWeeks:4,  stat:'talent',           gain:5,   desc:'Professional vocal development'   },
  { id:'branding',    name:'Brand Workshop',        cost:120000, durationWeeks:6,  stat:'creativity',       gain:6,   desc:'Image and brand reinvention'       },
  { id:'performance', name:'Performance Bootcamp',  cost:95000,  durationWeeks:3,  stat:'workEthic',        gain:8,   desc:'Stage presence + stamina'          },
  { id:'songwriting', name:'Songwriting Camp',      cost:150000, durationWeeks:8,  stat:'creativity',       gain:11,  desc:'Elite songwriting programme'       },
  { id:'social',      name:'Social Media Strategy', cost:65000,  durationWeeks:3,  stat:'fame',             gain:8,   desc:'Build and monetise online presence'},
  { id:'media',       name:'Media Training',        cost:55000,  durationWeeks:2,  stat:'controversyLevel', gain:-12, desc:'Reduce controversy risk'           },
  { id:'wellness',    name:'Wellness Programme',    cost:75000,  durationWeeks:4,  stat:'burnoutRisk',      gain:-15, desc:'Mental health + stamina reset'     },
  { id:'dance',       name:'Dance & Performance',   cost:60000,  durationWeeks:3,  stat:'fame',             gain:5,   desc:'Stage energy + live presence'      },
];

// ─── ROLLOUT STRATEGIES (more expensive) ───────
export const ROLLOUT_STRATEGIES = [
  { id:'surprise',  name:'Surprise Drop',      streamMult:1.45, hypeDecay:0.94, viralBonus:28, cost:0,       desc:'Zero notice — pure shock and discovery' },
  { id:'standard',  name:'Standard Rollout',   streamMult:1.0,  hypeDecay:0.98, viralBonus:5,  cost:120000,  desc:'3-week rollout: press, socials, radio'   },
  { id:'campaign',  name:'Full Campaign',      streamMult:1.25, hypeDecay:0.99, viralBonus:12, cost:500000,  desc:'6-week full-press campaign launch'       },
  { id:'deluxe',    name:'Deluxe Edition',     streamMult:1.18, hypeDecay:1.0,  viralBonus:8,  cost:350000,  desc:'Bonus tracks added 4 weeks post-release' },
  { id:'exclusive', name:'Platform Exclusive', streamMult:0.88, hypeDecay:0.97, viralBonus:18, cost:600000,  desc:'72h exclusive — guaranteed editorial'    },
];

// ─── PLATFORM STRATEGIES (more expensive) ──────
export const PLATFORM_STRATEGIES = [
  { id:'tiktok',    name:'TikTok Push',         cost:180000, viralBonus:32, streamBonus:16, desc:'Seed TikTok creators with the audio'       },
  { id:'streaming', name:'Streaming Editorial', cost:280000, viralBonus:5,  streamBonus:42, desc:'Pitch to Spotify/Apple editorial playlists' },
  { id:'youtube',   name:'YouTube Strategy',    cost:140000, viralBonus:16, streamBonus:26, desc:'YouTube premiere + Shorts campaign'         },
  { id:'radio',     name:'Radio Campaign',      cost:350000, viralBonus:8,  streamBonus:22, desc:'National radio push across all formats'     },
  { id:'blog_press',name:'Press Rollout',       cost:95000,  viralBonus:5,  streamBonus:10, desc:'Pitchfork, Rolling Stone, NME, Guardian'   },
];

// ─── AWARD SHOWS ───────────────────────────────
export const AWARD_SHOWS = [
  { id:'grammy',    name:'Grammy Awards',          prestige:100, months:[2],     minFame:70 },
  { id:'bet',       name:'BET Awards',             prestige:80,  months:[6],     minFame:55 },
  { id:'vma',       name:'MTV VMAs',               prestige:75,  months:[9],     minFame:55 },
  { id:'ama',       name:'American Music Awards',  prestige:70,  months:[11],    minFame:50 },
  { id:'billboard', name:'Billboard Music Awards', prestige:72,  months:[5],     minFame:50 },
  { id:'mobo',      name:'MOBO Awards',            prestige:65,  months:[11],    minFame:40 },
  { id:'headies',   name:'Headies Awards',         prestige:65,  months:[10],    minFame:38 },
  { id:'afrima',    name:'AFRIMA',                 prestige:62,  months:[12],    minFame:35 },
  { id:'brit',      name:'BRIT Awards',            prestige:78,  months:[3],     minFame:52 },
];
