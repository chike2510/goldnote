// ─────────────────────────────────────────────
//  GOLDNOTE — MASTER DATA FILE v2
// ─────────────────────────────────────────────

export const GENRES = [
  'Hip-Hop','R&B','Pop','Afrobeats','Latin',
  'Rock','Electronic','K-Pop','Reggaeton',
  'Gospel','Amapiano','Drill','Dancehall','Indie',
];

export const REGIONS = ['US','UK','Nigeria','Ghana','South Africa','Jamaica','Brazil','Colombia','Mexico','South Korea','France','Canada','Australia','India'];

// ─── PRODUCERS ───────────────────────────────
export const PRODUCERS = [
  { id:'maxmartin',  name:'Max Martin',          specialty:'Pop',           cost:180000, qualityBonus:25, region:'US'  },
  { id:'hitboy',     name:'Hit-Boy',              specialty:'Hip-Hop',       cost:120000, qualityBonus:20, region:'US'  },
  { id:'sarz',       name:'Sarz',                 specialty:'Afrobeats',     cost:80000,  qualityBonus:22, region:'Nigeria' },
  { id:'metro',      name:'Metro Boomin',          specialty:'Hip-Hop',       cost:200000, qualityBonus:28, region:'US'  },
  { id:'pharrell',   name:'Pharrell Williams',     specialty:'Pop/R&B',       cost:250000, qualityBonus:30, region:'US'  },
  { id:'london',     name:'London on da Track',    specialty:'Trap',          cost:100000, qualityBonus:18, region:'US'  },
  { id:'p2j',        name:'P2J',                   specialty:'R&B/Afrobeats', cost:90000,  qualityBonus:20, region:'UK'  },
  { id:'kaytranada', name:'Kaytranada',             specialty:'Electronic/R&B',cost:130000, qualityBonus:22, region:'Canada'},
  { id:'timbaland',  name:'Timbaland',              specialty:'R&B/Hip-Hop',   cost:160000, qualityBonus:24, region:'US'  },
  { id:'madlib',     name:'Madlib',                specialty:'Alternative',    cost:110000, qualityBonus:26, region:'US'  },
  { id:'ovy',        name:'Ovy on the Drums',       specialty:'Reggaeton',     cost:95000,  qualityBonus:21, region:'Colombia'},
  { id:'killertunes',name:'Killer Tunes',           specialty:'Afrobeats',     cost:60000,  qualityBonus:15, region:'Nigeria'},
  { id:'spax',       name:'Spax',                  specialty:'Amapiano',       cost:70000,  qualityBonus:17, region:'South Africa'},
  { id:'cardo',      name:'Cardo Got Wings',        specialty:'Hip-Hop',       cost:85000,  qualityBonus:18, region:'US'  },
];

// ─── REAL ARTISTS ─────────────────────────────
export const REAL_ARTISTS = [
  { id:'drake',      name:'Drake',            genre:'Hip-Hop',    region:'Canada',       fame:98, talent:92, workEthic:85, ego:88, loyalty:60, creativity:84, controversyLevel:55, starPotential:99, burnoutRisk:20, viralProbability:75, careerPhase:'peak',  label:'Republic Records',          signingBonus:15000000, weeklyFee:500000, style:'melodic rap',            isReal:true },
  { id:'kendrick',   name:'Kendrick Lamar',   genre:'Hip-Hop',    region:'US',           fame:97, talent:99, workEthic:96, ego:60, loyalty:82, creativity:99, controversyLevel:45, starPotential:100,burnoutRisk:15, viralProbability:70, careerPhase:'peak',  label:'pgLang/Interscope',         signingBonus:12000000, weeklyFee:450000, style:'lyrical rap',            isReal:true },
  { id:'future',     name:'Future',           genre:'Hip-Hop',    region:'US',           fame:90, talent:82, workEthic:90, ego:75, loyalty:55, creativity:78, controversyLevel:60, starPotential:88, burnoutRisk:35, viralProbability:60, careerPhase:'peak',  label:'Epic Records',              signingBonus:8000000,  weeklyFee:280000, style:'trap',                   isReal:true },
  { id:'travis',     name:'Travis Scott',     genre:'Hip-Hop',    region:'US',           fame:93, talent:88, workEthic:82, ego:80, loyalty:65, creativity:90, controversyLevel:70, starPotential:95, burnoutRisk:30, viralProbability:80, careerPhase:'peak',  label:'Cactus Jack',               signingBonus:10000000, weeklyFee:350000, style:'psychedelic trap',       isReal:true },
  { id:'21savage',   name:'21 Savage',        genre:'Hip-Hop',    region:'UK/US',        fame:88, talent:84, workEthic:80, ego:65, loyalty:72, creativity:76, controversyLevel:55, starPotential:87, burnoutRisk:25, viralProbability:65, careerPhase:'peak',  label:'Epic Records',              signingBonus:7000000,  weeklyFee:220000, style:'trap',                   isReal:true },
  { id:'dojacat',    name:'Doja Cat',         genre:'Pop/Hip-Hop',region:'US',           fame:91, talent:90, workEthic:75, ego:70, loyalty:58, creativity:92, controversyLevel:65, starPotential:94, burnoutRisk:38, viralProbability:85, careerPhase:'peak',  label:'RCA Records',               signingBonus:9000000,  weeklyFee:300000, style:'pop rap',                isReal:true },
  { id:'cardi',      name:'Cardi B',          genre:'Hip-Hop',    region:'US',           fame:88, talent:82, workEthic:78, ego:82, loyalty:68, creativity:80, controversyLevel:75, starPotential:88, burnoutRisk:30, viralProbability:78, careerPhase:'peak',  label:'Atlantic Records',          signingBonus:8000000,  weeklyFee:250000, style:'hip-hop pop',            isReal:true },
  { id:'lildurk',    name:'Lil Durk',         genre:'Hip-Hop',    region:'US',           fame:86, talent:82, workEthic:85, ego:65, loyalty:72, creativity:78, controversyLevel:60, starPotential:86, burnoutRisk:28, viralProbability:62, careerPhase:'peak',  label:'Only the Family',           signingBonus:6500000,  weeklyFee:190000, style:'drill',                  isReal:true },
  { id:'babykeem',   name:'Baby Keem',        genre:'Hip-Hop',    region:'US',           fame:75, talent:82, workEthic:88, ego:50, loyalty:85, creativity:88, controversyLevel:30, starPotential:92, burnoutRisk:18, viralProbability:55, careerPhase:'rise',  label:'pgLang',                    signingBonus:3500000,  weeklyFee:100000, style:'alt rap',                isReal:true },
  { id:'latto',      name:'Latto',            genre:'Hip-Hop',    region:'US',           fame:78, talent:80, workEthic:84, ego:68, loyalty:70, creativity:76, controversyLevel:45, starPotential:85, burnoutRisk:22, viralProbability:60, careerPhase:'rise',  label:'RCA Records',               signingBonus:4000000,  weeklyFee:120000, style:'rap',                    isReal:true },
  { id:'sza',        name:'SZA',              genre:'R&B',        region:'US',           fame:94, talent:95, workEthic:72, ego:55, loyalty:78, creativity:96, controversyLevel:25, starPotential:98, burnoutRisk:40, viralProbability:72, careerPhase:'peak',  label:'TDE',                       signingBonus:10000000, weeklyFee:360000, style:'alt R&B',                isReal:true },
  { id:'theweeknd',  name:'The Weeknd',       genre:'R&B',        region:'Canada',       fame:96, talent:94, workEthic:88, ego:72, loyalty:62, creativity:92, controversyLevel:40, starPotential:98, burnoutRisk:25, viralProbability:75, careerPhase:'peak',  label:'XO/Republic',               signingBonus:14000000, weeklyFee:480000, style:'dark R&B',               isReal:true },
  { id:'usher',      name:'Usher',            genre:'R&B',        region:'US',           fame:90, talent:91, workEthic:92, ego:65, loyalty:80, creativity:85, controversyLevel:30, starPotential:90, burnoutRisk:15, viralProbability:65, careerPhase:'peak',  label:'RBMG',                      signingBonus:8000000,  weeklyFee:260000, style:'classic R&B',            isReal:true },
  { id:'brent',      name:'Brent Faiyaz',     genre:'R&B',        region:'US',           fame:82, talent:87, workEthic:80, ego:60, loyalty:72, creativity:90, controversyLevel:35, starPotential:92, burnoutRisk:28, viralProbability:58, careerPhase:'rise',  label:'Lost Kids',                 signingBonus:5000000,  weeklyFee:150000, style:'indie R&B',              isReal:true },
  { id:'summer',     name:'Summer Walker',    genre:'R&B',        region:'US',           fame:82, talent:83, workEthic:65, ego:55, loyalty:62, creativity:82, controversyLevel:45, starPotential:84, burnoutRisk:48, viralProbability:60, careerPhase:'peak',  label:'LVRN/Interscope',           signingBonus:4500000,  weeklyFee:130000, style:'contemporary R&B',       isReal:true },
  { id:'taylorswift',name:'Taylor Swift',     genre:'Pop',        region:'US',           fame:100,talent:95, workEthic:98, ego:62, loyalty:85, creativity:94, controversyLevel:35, starPotential:100,burnoutRisk:10, viralProbability:90, careerPhase:'peak',  label:'Republic Records',          signingBonus:25000000, weeklyFee:800000, style:'pop/country',            isReal:true },
  { id:'billie',     name:'Billie Eilish',    genre:'Pop',        region:'US',           fame:94, talent:91, workEthic:85, ego:48, loyalty:88, creativity:94, controversyLevel:28, starPotential:96, burnoutRisk:32, viralProbability:82, careerPhase:'peak',  label:'Darkroom/Interscope',       signingBonus:11000000, weeklyFee:380000, style:'alt pop',                isReal:true },
  { id:'ariana',     name:'Ariana Grande',    genre:'Pop',        region:'US',           fame:95, talent:93, workEthic:88, ego:58, loyalty:75, creativity:88, controversyLevel:22, starPotential:97, burnoutRisk:28, viralProbability:80, careerPhase:'peak',  label:'Republic Records',          signingBonus:12000000, weeklyFee:420000, style:'pop',                    isReal:true },
  { id:'olivia',     name:'Olivia Rodrigo',   genre:'Pop',        region:'US',           fame:91, talent:88, workEthic:90, ego:48, loyalty:88, creativity:88, controversyLevel:20, starPotential:95, burnoutRisk:22, viralProbability:78, careerPhase:'rise',  label:'Geffen Records',            signingBonus:9000000,  weeklyFee:300000, style:'pop rock',               isReal:true },
  { id:'sabrina',    name:'Sabrina Carpenter',genre:'Pop',        region:'US',           fame:88, talent:84, workEthic:92, ego:52, loyalty:84, creativity:82, controversyLevel:18, starPotential:93, burnoutRisk:20, viralProbability:82, careerPhase:'rise',  label:'Island Records',            signingBonus:7000000,  weeklyFee:220000, style:'pop',                    isReal:true },
  { id:'charli',     name:'Charli xcx',       genre:'Pop',        region:'UK',           fame:87, talent:89, workEthic:88, ego:60, loyalty:72, creativity:95, controversyLevel:32, starPotential:93, burnoutRisk:25, viralProbability:85, careerPhase:'peak',  label:'Atlantic Records',          signingBonus:6500000,  weeklyFee:200000, style:'hyperpop',               isReal:true },
  { id:'dua',        name:'Dua Lipa',         genre:'Pop',        region:'UK',           fame:90, talent:86, workEthic:90, ego:58, loyalty:78, creativity:84, controversyLevel:20, starPotential:92, burnoutRisk:18, viralProbability:74, careerPhase:'peak',  label:'Warner Records',            signingBonus:8500000,  weeklyFee:280000, style:'disco pop',              isReal:true },
  { id:'harrystyles',name:'Harry Styles',     genre:'Pop',        region:'UK',           fame:90, talent:85, workEthic:88, ego:55, loyalty:80, creativity:86, controversyLevel:22, starPotential:92, burnoutRisk:20, viralProbability:76, careerPhase:'peak',  label:'Columbia Records',          signingBonus:8000000,  weeklyFee:270000, style:'rock pop',               isReal:true },
  { id:'burna',      name:'Burna Boy',        genre:'Afrobeats',  region:'Nigeria',      fame:95, talent:96, workEthic:88, ego:82, loyalty:65, creativity:94, controversyLevel:55, starPotential:99, burnoutRisk:22, viralProbability:78, careerPhase:'peak',  label:'Atlantic/Spaceship',        signingBonus:12000000, weeklyFee:400000, style:'afro-fusion',            isReal:true },
  { id:'wizkid',     name:'Wizkid',           genre:'Afrobeats',  region:'Nigeria',      fame:93, talent:92, workEthic:80, ego:78, loyalty:62, creativity:90, controversyLevel:45, starPotential:96, burnoutRisk:25, viralProbability:72, careerPhase:'peak',  label:'Starboy/RCA',               signingBonus:10000000, weeklyFee:340000, style:'afropop',                isReal:true },
  { id:'rema',       name:'Rema',             genre:'Afrobeats',  region:'Nigeria',      fame:88, talent:88, workEthic:88, ego:58, loyalty:80, creativity:90, controversyLevel:25, starPotential:97, burnoutRisk:18, viralProbability:82, careerPhase:'rise',  label:'Mavin Records',             signingBonus:7000000,  weeklyFee:220000, style:'afro-rave',              isReal:true },
  { id:'davido',     name:'Davido',           genre:'Afrobeats',  region:'Nigeria',      fame:90, talent:87, workEthic:85, ego:75, loyalty:72, creativity:86, controversyLevel:50, starPotential:92, burnoutRisk:28, viralProbability:70, careerPhase:'peak',  label:'DMW/Sony',                  signingBonus:8500000,  weeklyFee:280000, style:'afropop',                isReal:true },
  { id:'asake',      name:'Asake',            genre:'Afrobeats',  region:'Nigeria',      fame:85, talent:86, workEthic:90, ego:55, loyalty:78, creativity:88, controversyLevel:22, starPotential:94, burnoutRisk:20, viralProbability:75, careerPhase:'rise',  label:'YBNL/Empire',               signingBonus:5500000,  weeklyFee:170000, style:'afrobeats/amapiano',     isReal:true },
  { id:'tems',       name:'Tems',             genre:'Afrobeats',  region:'Nigeria',      fame:86, talent:90, workEthic:85, ego:52, loyalty:82, creativity:92, controversyLevel:18, starPotential:96, burnoutRisk:20, viralProbability:70, careerPhase:'rise',  label:'Since93/Columbia',          signingBonus:6500000,  weeklyFee:200000, style:'alt afrobeats',          isReal:true },
  { id:'ckay',       name:'CKay',             genre:'Afrobeats',  region:'Nigeria',      fame:80, talent:83, workEthic:82, ego:50, loyalty:78, creativity:84, controversyLevel:20, starPotential:88, burnoutRisk:25, viralProbability:68, careerPhase:'rise',  label:'Warner Music',              signingBonus:4000000,  weeklyFee:120000, style:'afro R&B',               isReal:true },
  { id:'omah',       name:'Omah Lay',         genre:'Afrobeats',  region:'Nigeria',      fame:78, talent:82, workEthic:80, ego:52, loyalty:75, creativity:82, controversyLevel:25, starPotential:88, burnoutRisk:28, viralProbability:62, careerPhase:'rise',  label:'KeyQaad',                   signingBonus:3000000,  weeklyFee:90000,  style:'afropop',                isReal:true },
  { id:'fireboy',    name:'Fireboy DML',      genre:'Afrobeats',  region:'Nigeria',      fame:78, talent:82, workEthic:82, ego:48, loyalty:80, creativity:80, controversyLevel:18, starPotential:86, burnoutRisk:22, viralProbability:58, careerPhase:'rise',  label:'YBNL',                      signingBonus:3500000,  weeklyFee:100000, style:'afropop',                isReal:true },
  { id:'badbunny',   name:'Bad Bunny',        genre:'Latin',      region:'Puerto Rico',  fame:97, talent:91, workEthic:90, ego:72, loyalty:68, creativity:92, controversyLevel:38, starPotential:99, burnoutRisk:22, viralProbability:88, careerPhase:'peak',  label:'Rimas Entertainment',       signingBonus:14000000, weeklyFee:480000, style:'reggaeton/trap latino',  isReal:true },
  { id:'karol',      name:'Karol G',          genre:'Latin',      region:'Colombia',     fame:88, talent:85, workEthic:92, ego:58, loyalty:80, creativity:82, controversyLevel:22, starPotential:94, burnoutRisk:18, viralProbability:78, careerPhase:'peak',  label:'Universal Music Latino',    signingBonus:7500000,  weeklyFee:240000, style:'reggaeton/pop',          isReal:true },
  { id:'shakira',    name:'Shakira',          genre:'Latin',      region:'Colombia',     fame:92, talent:90, workEthic:92, ego:62, loyalty:75, creativity:88, controversyLevel:35, starPotential:94, burnoutRisk:15, viralProbability:80, careerPhase:'peak',  label:'Sony Music',                signingBonus:9000000,  weeklyFee:300000, style:'latin pop',              isReal:true },
  { id:'jbalvin',    name:'J Balvin',         genre:'Latin',      region:'Colombia',     fame:90, talent:82, workEthic:85, ego:68, loyalty:72, creativity:80, controversyLevel:35, starPotential:90, burnoutRisk:25, viralProbability:72, careerPhase:'peak',  label:'Universal Music Latino',    signingBonus:8000000,  weeklyFee:260000, style:'reggaeton',              isReal:true },
  // UNSIGNED REAL ARTISTS (emerging)
  { id:'ayrastair',  name:'Ayra Starr',       genre:'Afrobeats',  region:'Nigeria',      fame:72, talent:85, workEthic:88, ego:52, loyalty:80, creativity:88, controversyLevel:20, starPotential:95, burnoutRisk:18, viralProbability:72, careerPhase:'rise',  label:null,                        signingBonus:3000000,  weeklyFee:85000,  style:'afropop',                isReal:true },
  { id:'benson',     name:'Benson Boone',     genre:'Pop',        region:'US',           fame:68, talent:82, workEthic:90, ego:45, loyalty:85, creativity:82, controversyLevel:15, starPotential:90, burnoutRisk:20, viralProbability:65, careerPhase:'rise',  label:null,                        signingBonus:2500000,  weeklyFee:70000,  style:'indie pop',              isReal:true },
  { id:'tyla',       name:'Tyla',             genre:'Afrobeats',  region:'South Africa', fame:74, talent:84, workEthic:85, ego:50, loyalty:82, creativity:86, controversyLevel:18, starPotential:93, burnoutRisk:20, viralProbability:75, careerPhase:'rise',  label:null,                        signingBonus:3200000,  weeklyFee:90000,  style:'afropop/R&B',            isReal:true },
  { id:'chappell',   name:'Chappell Roan',    genre:'Pop',        region:'US',           fame:76, talent:86, workEthic:88, ego:48, loyalty:82, creativity:92, controversyLevel:22, starPotential:94, burnoutRisk:25, viralProbability:80, careerPhase:'rise',  label:null,                        signingBonus:3500000,  weeklyFee:95000,  style:'camp pop',               isReal:true },
  { id:'peso',       name:'Peso Pluma',       genre:'Latin',      region:'Mexico',       fame:78, talent:80, workEthic:88, ego:60, loyalty:75, creativity:82, controversyLevel:35, starPotential:92, burnoutRisk:22, viralProbability:78, careerPhase:'rise',  label:null,                        signingBonus:4000000,  weeklyFee:110000, style:'corridos tumbados',      isReal:true },
];

// ─── AI ARTIST GENERATOR ─────────────────────
const AI_NAME_PARTS = {
  prefixes:   ['Lil','King','Queen','Young','Big','Dark','Nova','Blaze','Ice','Neon','Gold','Shadow','Zeph','Kris','Ace','Sol','Lux','Arc','Dex','Vex','Kai','Lex','Rex','Zion','Axe','Echo','Vibe','Flux'],
  suffixes:   ['Wave','Fire','Reign','Flow','Blade','Star','Drift','Spark','Byte','Grit','Tide','Mist','Rush','Haze','Bliss','Rook','Sire','Lace','Daze','Crux','Wren','Styx','Vale','Crest'],
  standalone: ['Aiko','Solis','Faroe','Cadence','Vesper','Onyx','Lyra','Zara','Orion','Cyra','Mace','Avon','Lyric','Sable','Halo','Wraith','Quill','Psalm','Cade','Drex','Sera','Omen','Vanta','Roux','Cleo','Miro','Wax','Dex','Juno','Kova','Lune'],
};

const REGIONAL_GENRE_BIAS = {
  'Nigeria':      ['Afrobeats','Amapiano','R&B'],
  'Ghana':        ['Afrobeats','R&B','Pop'],
  'South Africa': ['Amapiano','Afrobeats','Electronic'],
  'Jamaica':      ['Dancehall','Reggaeton','R&B'],
  'US':           ['Hip-Hop','R&B','Pop','Trap','Electronic'],
  'UK':           ['R&B','Drill','Pop','Electronic','Indie'],
  'Colombia':     ['Latin','Reggaeton','Pop'],
  'Mexico':       ['Latin','Reggaeton','Pop'],
  'Brazil':       ['Latin','Electronic','Pop'],
  'South Korea':  ['K-Pop','Electronic','R&B'],
  'Canada':       ['Pop','Hip-Hop','R&B','Electronic'],
  'Australia':    ['Pop','Rock','Electronic','Indie'],
  'France':       ['Electronic','Pop','R&B'],
  'India':        ['Pop','Electronic','R&B'],
};

const PERSONALITY_ARCHETYPES = [
  { name:'The Prodigy',    workEthic:90, ego:50, loyalty:80, creativity:90, controversyLevel:20 },
  { name:'The Diva',       workEthic:70, ego:90, loyalty:50, creativity:80, controversyLevel:70 },
  { name:'The Grinder',    workEthic:95, ego:55, loyalty:78, creativity:72, controversyLevel:25 },
  { name:'The Wild Card',  workEthic:65, ego:72, loyalty:45, creativity:88, controversyLevel:85 },
  { name:'The Visionary',  workEthic:82, ego:65, loyalty:70, creativity:96, controversyLevel:38 },
  { name:'The Hustler',    workEthic:92, ego:75, loyalty:65, creativity:75, controversyLevel:50 },
  { name:'The Introvert',  workEthic:85, ego:38, loyalty:88, creativity:90, controversyLevel:12 },
  { name:'The Icon',       workEthic:80, ego:82, loyalty:60, creativity:85, controversyLevel:55 },
];

function rI(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function rF(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function generateAIArtist(week = 0) {
  const region = rF(REGIONS);
  const genrePool = REGIONAL_GENRE_BIAS[region] || GENRES;
  const genre = rF(genrePool);
  const archetype = rF(PERSONALITY_ARCHETYPES);

  let name;
  const nameStyle = Math.random();
  if (nameStyle < 0.35)      name = `${rF(AI_NAME_PARTS.prefixes)} ${rF(AI_NAME_PARTS.suffixes)}`;
  else if (nameStyle < 0.65) name = rF(AI_NAME_PARTS.standalone);
  else                        name = `${rF(AI_NAME_PARTS.prefixes)} ${rF(AI_NAME_PARTS.standalone)}`;

  const baseFame   = rI(5, 55);
  const baseTalent = rI(45, 80);
  const starPotential    = rI(20, 100);
  const burnoutRisk      = rI(5, 70);
  const viralProbability = rI(5, 80);

  const signingBonus = Math.floor((baseFame * 4000) + (baseTalent * 1500) + rI(50000, 200000));
  const weeklyFee    = Math.max(3000, Math.floor(signingBonus * 0.005) + rI(2000, 8000));

  return {
    id:   `ai_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
    name, genre, region,
    fame: baseFame, talent: baseTalent,
    workEthic:        Math.min(100, Math.max(20, archetype.workEthic    + rI(-8,8))),
    ego:              Math.min(100, Math.max(20, archetype.ego          + rI(-8,8))),
    loyalty:          Math.min(100, Math.max(20, archetype.loyalty      + rI(-8,8))),
    creativity:       Math.min(100, Math.max(20, archetype.creativity   + rI(-8,8))),
    controversyLevel: Math.min(100, Math.max(5,  archetype.controversyLevel + rI(-8,8))),
    archetype: archetype.name,
    starPotential, burnoutRisk, viralProbability,
    growthCeiling: Math.min(100, baseFame + Math.floor(starPotential * 0.55)),
    label: null,
    signingBonus, weeklyFee,
    style: `${genre.toLowerCase()} artist`,
    isReal: false,
    mood: rI(65, 92),
    careerPhase: 'rise',
    createdWeek: week,
    imageDecay: 100, // image health, affected by controversies
  };
}

// Legacy export alias
export const ARTISTS = REAL_ARTISTS;

// ─── CHART BASELINE ───────────────────────────
export const CHART_SONGS = [
  { title:"Cruel Summer",              artist:"Taylor Swift",               streams:5800000, genre:'Pop'       },
  { title:"Not Like Us",               artist:"Kendrick Lamar",             streams:5500000, genre:'Hip-Hop'   },
  { title:"luther",                    artist:"Kendrick Lamar & SZA",       streams:5000000, genre:'R&B'       },
  { title:"As It Was",                 artist:"Harry Styles",               streams:5200000, genre:'Pop'       },
  { title:"Die With A Smile",          artist:"Lady Gaga & Bruno Mars",     streams:5100000, genre:'Pop'       },
  { title:"APT.",                      artist:"ROSÉ & Bruno Mars",          streams:4800000, genre:'Pop'       },
  { title:"TEXAS HOLD 'EM",            artist:"Beyoncé",                    streams:4700000, genre:'Pop'       },
  { title:"Espresso",                  artist:"Sabrina Carpenter",          streams:4400000, genre:'Pop'       },
  { title:"One Dance",                 artist:"Drake",                      streams:4200000, genre:'Hip-Hop'   },
  { title:"Birds of a Feather",        artist:"Billie Eilish",              streams:4200000, genre:'Pop'       },
  { title:"Flowers",                   artist:"Miley Cyrus",                streams:4600000, genre:'Pop'       },
  { title:"Please Please Please",      artist:"Sabrina Carpenter",          streams:4100000, genre:'Pop'       },
  { title:"Calm Down",                 artist:"Rema & Selena Gomez",        streams:3900000, genre:'Afrobeats' },
  { title:"Ella Baila Sola",           artist:"Eslabon Armado & Peso Pluma",streams:3900000, genre:'Latin'     },
  { title:"Too Sweet",                 artist:"Hozier",                     streams:3800000, genre:'Indie'     },
  { title:"Good Luck, Babe!",          artist:"Chappell Roan",              streams:3700000, genre:'Pop'       },
  { title:"Water",                     artist:"Tyla",                       streams:3600000, genre:'Afrobeats' },
  { title:"Million Dollar Baby",       artist:"Tommy Richman",              streams:3500000, genre:'R&B'       },
  { title:"Beautiful Things",          artist:"Benson Boone",               streams:3300000, genre:'Pop'       },
  { title:"Creepin'",                  artist:"Metro Boomin & The Weeknd",  streams:3300000, genre:'R&B'       },
  { title:"Lose Control",              artist:"Teddy Swims",                streams:3100000, genre:'R&B'       },
  { title:"All Mine",                  artist:"Burna Boy",                  streams:3100000, genre:'Afrobeats' },
  { title:"LALA",                      artist:"Myke Towers",                streams:3200000, genre:'Latin'     },
  { title:"Rich Flex",                 artist:"Drake & 21 Savage",          streams:3800000, genre:'Hip-Hop'   },
  { title:"Bzrp Music Sessions #53",   artist:"Bizarrap & Shakira",         streams:4500000, genre:'Latin'     },
  { title:"Unholy",                    artist:"Sam Smith & Kim Petras",     streams:3400000, genre:'Pop'       },
  { title:"Woman of the Hour",         artist:"Billie Eilish",              streams:2900000, genre:'Pop'       },
  { title:"Stick Season",              artist:"Noah Kahan",                 streams:2900000, genre:'Indie'     },
  { title:"Golden Hour",               artist:"JVKE",                       streams:2800000, genre:'Pop'       },
  { title:"Snooze",                    artist:"SZA",                        streams:2700000, genre:'R&B'       },
];

// ─── DRAMA EVENTS ─────────────────────────────
export const DRAMA_EVENTS = [
  {
    id:'beef_start', type:'beef', severity:'medium',
    headline:'[ARTIST] calls out a rival on social media — the internet is COOKING',
    choices:[
      { label:'Fuel the fire',  desc:'Release a diss track response',    streamBoost:40, moodDelta:-10, fameDelta:12, cost:50000,  risk:'high'   },
      { label:'Shut it down',   desc:'Issue a statement, move on',        streamBoost:5,  moodDelta:8,  fameDelta:-2,  cost:20000,  risk:'low'    },
      { label:'Stay silent',    desc:'Ignore the drama entirely',          streamBoost:15, moodDelta:2,  fameDelta:4,   cost:0,      risk:'medium' },
    ]
  },
  {
    id:'scandal_leak', type:'scandal', severity:'high',
    headline:'Private footage of [ARTIST] leaks online — trending worldwide',
    choices:[
      { label:'Apology tour',   desc:'Public apology + charity donation', streamBoost:-10, moodDelta:12, fameDelta:-8,  cost:150000, risk:'low'    },
      { label:'Lawyer up',      desc:'File legal action, go dark',         streamBoost:-20, moodDelta:5,  fameDelta:-15, cost:300000, risk:'medium' },
      { label:'Own it',         desc:'Turn it into brand content',         streamBoost:30,  moodDelta:-5, fameDelta:10,  cost:80000,  risk:'high'   },
    ]
  },
  {
    id:'viral_tiktok', type:'viral', severity:'positive',
    headline:'A [ARTIST] song just went INSANE on TikTok — 200M views in 48h',
    choices:[
      { label:'Capitalize now', desc:'Drop a remix + push marketing',     streamBoost:80, moodDelta:15, fameDelta:20, cost:200000, risk:'medium' },
      { label:'Ride the wave',  desc:'Let it grow organically',           streamBoost:50, moodDelta:10, fameDelta:12, cost:0,      risk:'low'    },
      { label:'Collab drop',    desc:'Announce a surprise feature',       streamBoost:65, moodDelta:12, fameDelta:16, cost:100000, risk:'medium' },
    ]
  },
  {
    id:'grammy_nom', type:'award', severity:'positive',
    headline:'[ARTIST] receives Grammy nomination for Album of the Year!',
    choices:[
      { label:'Full campaign',  desc:'Launch a Grammy campaign',          streamBoost:25, moodDelta:20, fameDelta:18, cost:500000, risk:'low'  },
      { label:'Modest push',    desc:'Social media + press only',         streamBoost:10, moodDelta:15, fameDelta:10, cost:100000, risk:'low'  },
    ]
  },
  {
    id:'arrest', type:'crisis', severity:'critical',
    headline:'BREAKING: [ARTIST] arrested — label in emergency crisis mode',
    choices:[
      { label:'Full legal defence', desc:'Hire top lawyers, pay bail',   streamBoost:-30, moodDelta:-5,  fameDelta:-20, cost:1000000, risk:'medium' },
      { label:'Suspend promotions', desc:'Pause everything, lay low',    streamBoost:-50, moodDelta:-15, fameDelta:-30, cost:50000,   risk:'low'    },
      { label:'Drop the artist',    desc:'Immediate contract termination',streamBoost:0,   moodDelta:0,   fameDelta:-5,  cost:0,       risk:'low',   dropsArtist:true },
    ]
  },
  {
    id:'demand_raise', type:'internal', severity:'medium',
    headline:'[ARTIST] sends notice demanding contract renegotiation — wants 25% more',
    choices:[
      { label:'Accept demands',  desc:'Increase weekly fee by 25%',       streamBoost:10, moodDelta:25, fameDelta:0, cost:0,       renegotiate:true, renegotiateMultiplier:1.25, risk:'low'    },
      { label:'Counter offer',   desc:'Offer 10% raise + bonus milestone', streamBoost:5,  moodDelta:12, fameDelta:0, cost:200000,  renegotiate:true, renegotiateMultiplier:1.10, risk:'medium' },
      { label:'Hold firm',       desc:'Refuse renegotiation',              streamBoost:-15,moodDelta:-25,fameDelta:0, cost:0,       loyaltyDelta:-20, risk:'high' },
    ]
  },
  {
    id:'collab_offer', type:'collab', severity:'positive',
    headline:'[ARTIST] receives collab offer from a global superstar',
    choices:[
      { label:'Accept collab',   desc:'Drop the joint single',            streamBoost:45, moodDelta:15, fameDelta:14, cost:300000, risk:'low' },
      { label:'Decline politely',desc:'Stay focused on album rollout',    streamBoost:0,  moodDelta:5,  fameDelta:0,  cost:0,      risk:'low' },
    ]
  },
  {
    id:'burnout', type:'crisis', severity:'high',
    headline:'[ARTIST] cancels all appearances citing exhaustion — fans worried',
    choices:[
      { label:'Mandate rest',    desc:'6-week hiatus, no releases',       streamBoost:-25, moodDelta:30, fameDelta:-8, cost:0,       risk:'low'  },
      { label:'Push through',    desc:'Keep the schedule, add support',   streamBoost:-5,  moodDelta:-15,fameDelta:2,  cost:250000,  risk:'high' },
    ]
  },
  {
    id:'surprise_drop', type:'release', severity:'positive',
    headline:'[ARTIST] drops a surprise project at midnight — caught everyone off guard',
    choices:[
      { label:'Full rollout now',desc:'Activate full marketing machine',  streamBoost:60, moodDelta:10, fameDelta:15, cost:400000, risk:'medium' },
      { label:'Let it breathe',  desc:'Word of mouth approach',           streamBoost:35, moodDelta:10, fameDelta:8,  cost:0,      risk:'low'    },
    ]
  },
  {
    id:'festival_headline', type:'tour', severity:'positive',
    headline:'[ARTIST] invited to headline a major international festival',
    choices:[
      { label:'Accept headline', desc:'$2M guaranteed + massive exposure', streamBoost:30, moodDelta:20, fameDelta:22, cost:-2000000, risk:'low' },
      { label:'Decline',         desc:'Save energy for world tour',        streamBoost:0,  moodDelta:5,  fameDelta:0,  cost:0,        risk:'low' },
    ]
  },
  {
    id:'fan_backlash', type:'scandal', severity:'medium',
    headline:'[ARTIST] faces fan backlash over controversial comment online',
    choices:[
      { label:'Issue apology',   desc:'Sincere public apology',           streamBoost:-5,  moodDelta:8,  fameDelta:-6,  cost:30000, risk:'low'    },
      { label:'Double down',     desc:'Defend the statement publicly',     streamBoost:15,  moodDelta:-8, fameDelta:-4,  cost:0,     risk:'high'   },
      { label:'Go dark',         desc:'Delete post, say nothing',          streamBoost:-15, moodDelta:2,  fameDelta:-10, cost:0,     risk:'medium' },
    ]
  },
  {
    id:'label_dispute', type:'internal', severity:'high',
    headline:'[ARTIST] publicly accuses label of stifling their creative freedom',
    choices:[
      { label:'Give creative control', desc:'Let them self-produce',      streamBoost:20, moodDelta:30, fameDelta:5,   cost:100000, loyaltyDelta:15,  risk:'medium' },
      { label:'Negotiate privately',   desc:'Hire mediator internally',   streamBoost:5,  moodDelta:15, fameDelta:0,   cost:200000, loyaltyDelta:5,   risk:'low'    },
      { label:'Legal escalation',      desc:'Enforce contract strictly',  streamBoost:-20,moodDelta:-30,fameDelta:-10, cost:500000, loyaltyDelta:-25, risk:'high'   },
    ]
  },
  {
    id:'stadium_sold_out', type:'tour', severity:'positive',
    headline:'[ARTIST] sells out 5 stadium nights in under 10 minutes — historic demand',
    choices:[
      { label:'Add more dates',  desc:'Announce 5 extra stadium nights',  streamBoost:20, moodDelta:18, fameDelta:14, cost:3000000, risk:'low'    },
      { label:'Keep as is',      desc:'Honor original tour dates',         streamBoost:10, moodDelta:12, fameDelta:8,  cost:0,       risk:'low'    },
    ]
  },
];

// ─── PASSIVE NEWS EVENTS ──────────────────────
export const NEWS_EVENTS = [
  { text:'[ARTIST] spotted recording in a Lagos studio — new project incoming?', type:'news', fameBoost:2 },
  { text:'[ARTIST] hits 1 billion streams on Spotify — a landmark moment', type:'milestone', fameBoost:8 },
  { text:'A deep-cut [ARTIST] track resurfaces on TikTok — streaming up 400%', type:'viral', streamBoost:20, fameBoost:5 },
  { text:'[ARTIST] earns first platinum certification — a career milestone', type:'milestone', fameBoost:6 },
  { text:'[ARTIST] seen dining with major label executives — renegotiation rumors', type:'news', fameBoost:2 },
  { text:'[ARTIST] donates proceeds from latest single to community causes', type:'positive', fameBoost:5 },
  { text:'[ARTIST] covers major magazine — cultural moment officially certified', type:'news', fameBoost:4 },
  { text:'[ARTIST] confirms new track is "done and ready" — drops a snippet', type:'collab', fameBoost:4 },
  { text:'[ARTIST] receives shoutout from US President at cultural address', type:'milestone', fameBoost:8 },
  { text:'[ARTIST] announces world tour — pre-sale crashes ticketing site', type:'tour', fameBoost:6 },
  { text:'[ARTIST] spotted in studio with three Grammy-winning producers', type:'news', fameBoost:3 },
  { text:'[ARTIST] trends #1 in 42 countries simultaneously — a global phenomenon', type:'viral', streamBoost:30, fameBoost:10 },
];

// ─── OBJECTIVES ───────────────────────────────
export const WEEKLY_OBJECTIVES = [
  { id:'first_signing',  title:'First Signing',       desc:'Sign your first artist',              reward:100000,  type:'roster',  target:1,          metric:'rosterSize'   },
  { id:'first_release',  title:'First Release',        desc:'Release your first track',            reward:50000,   type:'release', target:1,          metric:'releaseCount' },
  { id:'chart_top10',    title:'Top 10 Hit',           desc:'Get a release into the Top 10',       reward:500000,  type:'charts',  target:10,         metric:'chartPosition'},
  { id:'cash_1m',        title:'Seven Figures',        desc:'Accumulate $1M in cash',              reward:200000,  type:'finance', target:1000000,    metric:'cash'         },
  { id:'earn_1m',        title:'First Million Earned', desc:'Earn $1M total revenue',              reward:150000,  type:'finance', target:1000000,    metric:'totalRevenue' },
  { id:'roster_3',       title:'Growing Roster',       desc:'Sign 3 artists',                      reward:300000,  type:'roster',  target:3,          metric:'rosterSize'   },
  { id:'sync_deal',      title:'Sync Secured',         desc:'Land your first sync deal',           reward:100000,  type:'business',target:1,          metric:'syncDeals'    },
  { id:'chart_number1',  title:'NUMBER ONE',           desc:'Hit #1 on the global chart',          reward:1000000, type:'charts',  target:1,          metric:'chartNumber1' },
  { id:'earn_10m',       title:'Double Digits',        desc:'Earn $10M total revenue',             reward:500000,  type:'finance', target:10000000,   metric:'totalRevenue' },
  { id:'roster_5',       title:'Full Roster',          desc:'Sign 5 artists',                      reward:500000,  type:'roster',  target:5,          metric:'rosterSize'   },
  { id:'tier_indie',     title:'Going Indie',          desc:'Reach Indie Label tier',              reward:750000,  type:'tier',    target:1,          metric:'labelTierIdx' },
  { id:'tier_boutique',  title:'Boutique Status',      desc:'Reach Boutique Label tier',           reward:2000000, type:'tier',    target:2,          metric:'labelTierIdx' },
  { id:'streams_100m',   title:'100M Streams',         desc:'Accumulate 100M total streams',       reward:400000,  type:'release', target:100000000,  metric:'totalStreams'  },
  { id:'ai_artist_star', title:'Diamond in the Rough', desc:'Sign an AI artist who charts Top 20', reward:600000, type:'charts',  target:20,         metric:'aiChartPos'   },
  { id:'earn_50m',       title:'Fifty Mill',           desc:'Earn $50M total revenue',             reward:2000000, type:'finance', target:50000000,   metric:'totalRevenue' },
  { id:'roster_ai_3',    title:'AI Factory',           desc:'Sign 3 AI-generated artists',        reward:400000,  type:'roster',  target:3,          metric:'aiRosterCount'},
];

// ─── ACHIEVEMENTS ────────────────────────────
export const ACHIEVEMENTS = [
  { id:'mogul',        title:'Music Mogul',          desc:'Reach Major Label tier',              xp:1000 },
  { id:'chartking',    title:'Chart King/Queen',     desc:'Hit #1 three separate times',         xp:750  },
  { id:'viral_god',    title:'Viral God',            desc:'Get 500M total streams',              xp:500  },
  { id:'empire',       title:'The Empire',           desc:'Have 8+ artists on roster at once',   xp:800  },
  { id:'dealmaker',    title:'The Dealmaker',        desc:'Complete 10 sync deals',              xp:600  },
  { id:'loyal',        title:'Loyalty First',        desc:'Keep an artist for 3+ years (156 wks)',xp:400 },
  { id:'gambler',      title:'High Roller',          desc:'Spend $5M in a single week',          xp:300  },
  { id:'comeback',     title:'The Comeback',         desc:'Revive artist after scandal',         xp:350  },
  { id:'ai_star',      title:'Diamond in the Rough', desc:'AI artist hits #1',                   xp:600  },
  { id:'dynasty',      title:'The Dynasty',         desc:'Survive 10 years (520 weeks)',         xp:1500 },
  { id:'billion',      title:'Billionaire',          desc:'Earn $1B total revenue',              xp:2000 },
  { id:'clean_image',  title:'Untouchable',          desc:'Keep image health above 90 for a year',xp:400 },
];

// ─── STAFF ────────────────────────────────────
export const STAFF_ROLES = [
  {
    id:'anr', name:'A&R Manager', icon:'🎤',
    desc:'Scouts better talent. Improves AI artist quality, unlocks elite artists.',
    levels:[
      { level:1, name:'Junior A&R',     weeklyCost:5000,  bonus:'Access premium AI artists' },
      { level:2, name:'Senior A&R',     weeklyCost:12000, bonus:'+15% talent on signed artists' },
      { level:3, name:'Executive A&R',  weeklyCost:25000, bonus:'Access currently-signed superstars' },
    ]
  },
  {
    id:'pr', name:'PR Manager', icon:'📣',
    desc:'Reduces scandal damage. Provides extra event choices.',
    levels:[
      { level:1, name:'PR Coordinator',  weeklyCost:6000,  bonus:'-30% scandal fame damage' },
      { level:2, name:'PR Director',     weeklyCost:15000, bonus:'-60% damage + extra event choices' },
      { level:3, name:'Crisis Expert',   weeklyCost:28000, bonus:'Can suppress events once/month' },
    ]
  },
  {
    id:'marketing', name:'Marketing Director', icon:'📈',
    desc:'Boosts streaming revenue and chart performance.',
    levels:[
      { level:1, name:'Marketing Exec',   weeklyCost:7000,  bonus:'+10% streaming revenue' },
      { level:2, name:'Marketing VP',     weeklyCost:16000, bonus:'+25% streams + playlist placements' },
      { level:3, name:'Chief Marketing',  weeklyCost:30000, bonus:'+40% streams + guaranteed chart entry' },
    ]
  },
  {
    id:'legal', name:'Legal Team', icon:'⚖️',
    desc:'Handles disputes, reduces buyout costs.',
    levels:[
      { level:1, name:'In-House Counsel',  weeklyCost:8000,  bonus:'-20% artist buyout costs' },
      { level:2, name:'Legal Department',  weeklyCost:18000, bonus:'-40% buyout + handle disputes' },
      { level:3, name:'Top Law Firm',      weeklyCost:35000, bonus:'Negotiate out of any penalty' },
    ]
  },
];

// ─── LOANS / FINANCE ─────────────────────────
export const LOAN_OPTIONS = [
  { id:'bank_small',   name:'Bank Loan — Standard', amount:1000000,  interestRate:0.08, weeklyPayment:25000,  durationWeeks:52,  type:'bank',      risk:'low'    },
  { id:'bank_large',   name:'Bank Loan — Premium',  amount:5000000,  interestRate:0.09, weeklyPayment:115000, durationWeeks:52,  type:'bank',      risk:'medium' },
  { id:'angel_equity', name:'Angel Investor',        amount:3000000,  equityStake:0.10,  weeklyPayment:0,      durationWeeks:0,   type:'equity',    risk:'low',   equityNote:'10% of future profits' },
  { id:'vc_growth',    name:'Venture Capital Round', amount:10000000, equityStake:0.20,  weeklyPayment:0,      durationWeeks:0,   type:'equity',    risk:'medium',equityNote:'20% equity + board seat' },
  { id:'loan_shark',   name:'Private Money',         amount:2000000,  interestRate:0.22, weeklyPayment:60000,  durationWeeks:40,  type:'high_risk', risk:'high',  note:'Miss payments = artist taken' },
];

// ─── LABEL TIERS ─────────────────────────────
export const LABEL_TIERS = [
  { name:'Garage Label',   minRevenue:0,          idx:0 },
  { name:'Indie Label',    minRevenue:5000000,     idx:1 },
  { name:'Boutique Label', minRevenue:25000000,    idx:2 },
  { name:'Rising Label',   minRevenue:75000000,    idx:3 },
  { name:'Mid-Major',      minRevenue:200000000,   idx:4 },
  { name:'Major Label',    minRevenue:500000000,   idx:5 },
  { name:'Conglomerate',   minRevenue:1500000000,  idx:6 },
];

// ─── RIVALS ───────────────────────────────────
export const RIVAL_LABELS = [
  { id:'universal', name:'Universal Music Group',    tier:'Major',       strength:95, cash:500000000 },
  { id:'sony',      name:'Sony Music Entertainment', tier:'Major',       strength:90, cash:400000000 },
  { id:'warner',    name:'Warner Music Group',       tier:'Major',       strength:87, cash:350000000 },
  { id:'atlantic',  name:'Atlantic Records',         tier:'Major',       strength:82, cash:280000000 },
  { id:'interscope',name:'Interscope Records',       tier:'Mid-Major',   strength:78, cash:200000000 },
  { id:'defjam',    name:'Def Jam Recordings',       tier:'Mid-Major',   strength:75, cash:180000000 },
  { id:'empire',    name:'EMPIRE',                   tier:'Independent', strength:62, cash:80000000  },
  { id:'tde',       name:'Top Dawg Entertainment',   tier:'Independent', strength:68, cash:70000000  },
  { id:'mavin',     name:'Mavin Records',            tier:'Independent', strength:60, cash:50000000  },
];

// ─── SYNC DEALS ──────────────────────────────
export const SYNC_DEALS = [
  { id:'netflix_drama',  title:'Netflix Drama Soundtrack',    fee:500000,  fameBonus:8,  platform:'Netflix',        minFame:40 },
  { id:'apple_launch',   title:'Apple Product Launch',         fee:800000,  fameBonus:10, platform:'Apple',          minFame:60 },
  { id:'nike_global',    title:'Nike Global Campaign',         fee:600000,  fameBonus:9,  platform:'Nike',           minFame:50 },
  { id:'gta_ost',        title:'GTA VII Soundtrack',           fee:1200000, fameBonus:15, platform:'Rockstar Games', minFame:55 },
  { id:'nba_finals',     title:'NBA Finals Theme',             fee:400000,  fameBonus:7,  platform:'NBA',            minFame:45 },
  { id:'worldcup_anthem',title:'FIFA World Cup Anthem',        fee:2000000, fameBonus:20, platform:'FIFA',           minFame:75 },
  { id:'marvel_ost',     title:'Marvel Movie Soundtrack',      fee:900000,  fameBonus:12, platform:'Marvel Studios', minFame:65 },
  { id:'spotify_wrapped',title:'Spotify Wrapped Campaign',     fee:350000,  fameBonus:6,  platform:'Spotify',        minFame:30 },
  { id:'cocacola',       title:'Coca-Cola Holiday Campaign',   fee:450000,  fameBonus:5,  platform:'Coca-Cola',      minFame:40 },
  { id:'samsung',        title:'Samsung Galaxy Campaign',      fee:700000,  fameBonus:8,  platform:'Samsung',        minFame:55 },
  { id:'amazon_prime',   title:'Amazon Prime Event',           fee:550000,  fameBonus:7,  platform:'Amazon',         minFame:45 },
  { id:'uniqlo',         title:'Uniqlo x Artist Collab',       fee:300000,  fameBonus:4,  platform:'Uniqlo',         minFame:35 },
];

// ─── TOURS ───────────────────────────────────
export const TOUR_TIERS = [
  { id:'club',    name:'Club Tour',    venues:8,  capacity:500,   ticketPrice:45,  cost:80000    },
  { id:'theater', name:'Theater Tour', venues:12, capacity:2000,  ticketPrice:75,  cost:250000   },
  { id:'arena',   name:'Arena Tour',   venues:20, capacity:15000, ticketPrice:120, cost:1200000  },
  { id:'stadium', name:'Stadium Tour', venues:30, capacity:60000, ticketPrice:200, cost:5000000  },
  { id:'world',   name:'World Tour',   venues:50, capacity:80000, ticketPrice:250, cost:12000000 },
];

// ─── MERCH ───────────────────────────────────
export const MERCH_LINES = [
  { id:'basic',      name:'Basic Bundle',        weeklyRevenue:5000,   cost:10000,  description:'T-shirts, caps, hoodies' },
  { id:'premium',    name:'Premium Collection',  weeklyRevenue:20000,  cost:50000,  description:'Limited edition drops'   },
  { id:'streetwear', name:'Streetwear Collab',   weeklyRevenue:50000,  cost:150000, description:'Brand partnership drop'  },
  { id:'luxury',     name:'Luxury Fashion Line', weeklyRevenue:120000, cost:400000, description:'High-end designer collab'},
  { id:'fragrance',  name:'Signature Fragrance', weeklyRevenue:80000,  cost:300000, description:'Celebrity perfume/cologne'},
];

// ─── TRAINING ─────────────────────────────────
export const TRAINING_PROGRAMS = [
  { id:'vocal_coach',   name:'Vocal Coaching',        cost:50000,  durationWeeks:4, stat:'talent',           gain:5,  desc:'Professional vocal training' },
  { id:'branding',      name:'Brand Workshop',         cost:80000,  durationWeeks:6, stat:'creativity',       gain:6,  desc:'Image and brand development'  },
  { id:'performance',   name:'Performance Bootcamp',   cost:60000,  durationWeeks:3, stat:'workEthic',        gain:8,  desc:'Stage presence and stamina'   },
  { id:'songwriting',   name:'Songwriting Camp',       cost:100000, durationWeeks:8, stat:'creativity',       gain:10, desc:'Elite songwriting programme'  },
  { id:'social_media',  name:'Social Media Strategy',  cost:40000,  durationWeeks:3, stat:'fame',             gain:8,  desc:'Build online presence'        },
  { id:'pr_training',   name:'Media Training',         cost:35000,  durationWeeks:2, stat:'controversyLevel', gain:-10,desc:'Reduce controversy risk'       },
];

// ─── PLATFORM STRATEGIES ─────────────────────
export const PLATFORM_STRATEGIES = [
  { id:'tiktok',    name:'TikTok Push',         cost:80000,  viralBonus:30, streamBonus:15, desc:'TikTok campaign for viral potential'   },
  { id:'streaming', name:'Streaming Editorial',  cost:120000, viralBonus:5,  streamBonus:40, desc:'Pitch to Spotify/Apple editorial'       },
  { id:'youtube',   name:'YouTube Strategy',     cost:60000,  viralBonus:15, streamBonus:25, desc:'YouTube premiere + Shorts campaign'    },
  { id:'radio',     name:'Radio Campaign',        cost:150000, viralBonus:8,  streamBonus:20, desc:'National radio promotion push'         },
  { id:'blog_press',name:'Press & Blog Rollout', cost:40000,  viralBonus:5,  streamBonus:10, desc:'Music blogs, critics, pitchfork etc.'  },
];

// ─── ROLLOUT STRATEGIES ──────────────────────
export const ROLLOUT_STRATEGIES = [
  { id:'surprise',  name:'Surprise Drop',     streamMultiplier:1.4, hypeDecay:0.95, viralBonus:25, cost:0,      desc:'Midnight drop — pure shock value'    },
  { id:'standard',  name:'Standard Rollout',  streamMultiplier:1.0, hypeDecay:0.98, viralBonus:5,  cost:50000,  desc:'2-week rollout with press + socials'  },
  { id:'campaign',  name:'Full Campaign',     streamMultiplier:1.2, hypeDecay:0.99, viralBonus:10, cost:200000, desc:'Full press, radio, streaming push'    },
  { id:'deluxe',    name:'Deluxe Edition',    streamMultiplier:1.15,hypeDecay:1.0,  viralBonus:8,  cost:150000, desc:'Add bonus tracks 4 weeks post-release'},
  { id:'exclusive', name:'Platform Exclusive',streamMultiplier:0.9, hypeDecay:0.97, viralBonus:15, cost:300000, desc:'72h exclusive — guaranteed playlist'  },
];

// ─── AWARD SHOWS ─────────────────────────────
export const AWARD_SHOWS = [
  { id:'grammy',    name:'Grammy Awards',          prestige:100, months:[2],     minFame:70 },
  { id:'bet',       name:'BET Awards',             prestige:80,  months:[6],     minFame:55 },
  { id:'vma',       name:'MTV VMAs',               prestige:75,  months:[9],     minFame:55 },
  { id:'ama',       name:'American Music Awards',  prestige:70,  months:[11],    minFame:50 },
  { id:'billboard', name:'Billboard Music Awards', prestige:72,  months:[5],     minFame:50 },
  { id:'mobo',      name:'MOBO Awards',            prestige:65,  months:[11],    minFame:40 },
  { id:'headies',   name:'Headies Awards',         prestige:60,  months:[10],    minFame:35 },
  { id:'afrima',    name:'AFRIMA',                 prestige:62,  months:[12],    minFame:35 },
];
