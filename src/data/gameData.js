export const GENRES = ['Hip-Hop','R&B','Pop','Afrobeats','Latin','Rock','Electronic','K-Pop','Reggaeton','Gospel'];

export const PRODUCERS = [
  { id:'maxmartin', name:'Max Martin', specialty:'Pop', cost:180000, qualityBonus:25 },
  { id:'hitboy', name:'Hit-Boy', specialty:'Hip-Hop', cost:120000, qualityBonus:20 },
  { id:'sarz', name:'Sarz', specialty:'Afrobeats', cost:80000, qualityBonus:22 },
  { id:'metro', name:'Metro Boomin', specialty:'Hip-Hop', cost:200000, qualityBonus:28 },
  { id:'pharrell', name:'Pharrell Williams', specialty:'Pop/R&B', cost:250000, qualityBonus:30 },
  { id:'london', name:'London on da Track', specialty:'Trap', cost:100000, qualityBonus:18 },
  { id:'p2j', name:'P2J', specialty:'R&B/Afrobeats', cost:90000, qualityBonus:20 },
  { id:'ksaid', name:'Kaytranada', specialty:'Electronic/R&B', cost:130000, qualityBonus:22 },
  { id:'timbaland', name:'Timbaland', specialty:'R&B/Hip-Hop', cost:160000, qualityBonus:24 },
  { id:'madlib', name:'Madlib', specialty:'Alternative', cost:110000, qualityBonus:26 },
  { id:'ovy', name:'Ovy on the Drums', specialty:'Reggaeton', cost:95000, qualityBonus:21 },
  { id:'rnoit', name:'Rn0it', specialty:'Afrobeats', cost:60000, qualityBonus:15 },
];

export const ARTISTS = [
  // Hip-Hop / Rap
  { id:'drake', name:'Drake', genre:'Hip-Hop', fame:98, talent:92, mood:75, label:'Republic Records', signingBonus:15000000, weeklyFee:500000, style:'melodic rap' },
  { id:'kendrick', name:'Kendrick Lamar', genre:'Hip-Hop', fame:97, talent:99, mood:80, label:'pgLang/Interscope', signingBonus:12000000, weeklyFee:450000, style:'lyrical rap' },
  { id:'future', name:'Future', genre:'Hip-Hop', fame:90, talent:82, mood:65, label:'Epic Records', signingBonus:8000000, weeklyFee:280000, style:'trap' },
  { id:'travis', name:'Travis Scott', genre:'Hip-Hop', fame:93, talent:88, mood:70, label:'Cactus Jack', signingBonus:10000000, weeklyFee:350000, style:'psychedelic trap' },
  { id:'21savage', name:'21 Savage', genre:'Hip-Hop', fame:88, talent:84, mood:72, label:'Epic Records', signingBonus:7000000, weeklyFee:220000, style:'trap' },
  { id:'dojacat', name:'Doja Cat', genre:'Pop/Hip-Hop', fame:91, talent:90, mood:68, label:'RCA Records', signingBonus:9000000, weeklyFee:300000, style:'pop rap' },
  { id:'cardi', name:'Cardi B', genre:'Hip-Hop', fame:88, talent:82, mood:72, label:'Atlantic Records', signingBonus:8000000, weeklyFee:250000, style:'hip-hop pop' },
  { id:'youngthug', name:'Young Thug', genre:'Hip-Hop', fame:87, talent:85, mood:60, label:'YSL/300', signingBonus:7500000, weeklyFee:230000, style:'melodic trap' },
  { id:'rodwave', name:'Rod Wave', genre:'Hip-Hop/R&B', fame:82, talent:83, mood:70, label:'Alamo Records', signingBonus:5000000, weeklyFee:160000, style:'emo rap' },
  { id:'jackharlow', name:'Jack Harlow', genre:'Hip-Hop', fame:80, talent:78, mood:80, label:'Generation Now', signingBonus:4500000, weeklyFee:140000, style:'pop rap' },
  { id:'lildurk', name:'Lil Durk', genre:'Hip-Hop', fame:86, talent:82, mood:65, label:'Only the Family', signingBonus:6500000, weeklyFee:190000, style:'drill' },
  { id:'gunna', name:'Gunna', genre:'Hip-Hop', fame:83, talent:79, mood:68, label:'YSL Records', signingBonus:5000000, weeklyFee:150000, style:'melodic trap' },
  { id:'babykeem', name:'Baby Keem', genre:'Hip-Hop', fame:75, talent:82, mood:78, label:'pgLang', signingBonus:3500000, weeklyFee:100000, style:'alt rap' },
  { id:'latto', name:'Latto', genre:'Hip-Hop', fame:78, talent:80, mood:74, label:'RCA Records', signingBonus:4000000, weeklyFee:120000, style:'rap' },
  // R&B
  { id:'sza', name:'SZA', genre:'R&B', fame:94, talent:95, mood:72, label:'Top Dawg Entertainment', signingBonus:10000000, weeklyFee:360000, style:'alt R&B' },
  { id:'theweeknd', name:'The Weeknd', genre:'R&B', fame:96, talent:94, mood:68, label:'XO/Republic', signingBonus:14000000, weeklyFee:480000, style:'dark R&B' },
  { id:'usher', name:'Usher', genre:'R&B', fame:90, talent:91, mood:82, label:'RBMG', signingBonus:8000000, weeklyFee:260000, style:'classic R&B' },
  { id:'brysonTiller', name:'Bryson Tiller', genre:'R&B', fame:80, talent:82, mood:70, label:'RCA Records', signingBonus:4500000, weeklyFee:130000, style:'trap R&B' },
  { id:'brent', name:'Brent Faiyaz', genre:'R&B', fame:82, talent:87, mood:65, label:'Lost Kids', signingBonus:5000000, weeklyFee:150000, style:'indie R&B' },
  { id:'jorjasmith', name:'Jorja Smith', genre:'R&B', fame:78, talent:88, mood:80, label:'FAMM', signingBonus:3500000, weeklyFee:100000, style:'UK R&B' },
  { id:'ari', name:'Ari Lennox', genre:'R&B', fame:76, talent:85, mood:73, label:'Dreamville', signingBonus:3000000, weeklyFee:90000, style:'neo-soul' },
  { id:'summer', name:'Summer Walker', genre:'R&B', fame:82, talent:83, mood:60, label:'LVRN/Interscope', signingBonus:4500000, weeklyFee:130000, style:'contemporary R&B' },
  // Pop
  { id:'taylorswift', name:'Taylor Swift', genre:'Pop', fame:100, talent:95, mood:88, label:'Republic Records', signingBonus:25000000, weeklyFee:800000, style:'pop/country' },
  { id:'billie', name:'Billie Eilish', genre:'Pop', fame:94, talent:91, mood:75, label:'Darkroom/Interscope', signingBonus:11000000, weeklyFee:380000, style:'alt pop' },
  { id:'ariana', name:'Ariana Grande', genre:'Pop', fame:95, talent:93, mood:72, label:'Republic Records', signingBonus:12000000, weeklyFee:420000, style:'pop' },
  { id:'olivia', name:'Olivia Rodrigo', genre:'Pop', fame:91, talent:88, mood:82, label:'Geffen Records', signingBonus:9000000, weeklyFee:300000, style:'pop rock' },
  { id:'dua', name:'Dua Lipa', genre:'Pop', fame:90, talent:86, mood:83, label:'Warner Records', signingBonus:8500000, weeklyFee:280000, style:'disco pop' },
  { id:'sabrina', name:'Sabrina Carpenter', genre:'Pop', fame:88, talent:84, mood:86, label:'Island Records', signingBonus:7000000, weeklyFee:220000, style:'pop' },
  { id:'charli', name:'Charli xcx', genre:'Pop', fame:87, talent:89, mood:78, label:'Atlantic Records', signingBonus:6500000, weeklyFee:200000, style:'hyperpop' },
  { id:'harrystyles', name:'Harry Styles', genre:'Pop', fame:90, talent:85, mood:85, label:'Columbia Records', signingBonus:8000000, weeklyFee:270000, style:'rock pop' },
  { id:'sik', name:'Sik-K', genre:'K-Pop/R&B', fame:70, talent:80, mood:82, label:'H1ghr Music', signingBonus:2000000, weeklyFee:60000, style:'K-R&B' },
  // Afrobeats
  { id:'burna', name:'Burna Boy', genre:'Afrobeats', fame:95, talent:96, mood:74, label:'Atlantic/Spaceship', signingBonus:12000000, weeklyFee:400000, style:'afro-fusion' },
  { id:'wizkid', name:'Wizkid', genre:'Afrobeats', fame:93, talent:92, mood:70, label:'Starboy/RCA', signingBonus:10000000, weeklyFee:340000, style:'afropop' },
  { id:'rema', name:'Rema', genre:'Afrobeats', fame:88, talent:88, mood:82, label:'Mavin Records', signingBonus:7000000, weeklyFee:220000, style:'afro-rave' },
  { id:'davido', name:'Davido', genre:'Afrobeats', fame:90, talent:87, mood:76, label:'DMW/Sony', signingBonus:8500000, weeklyFee:280000, style:'afropop' },
  { id:'asake', name:'Asake', genre:'Afrobeats', fame:85, talent:86, mood:80, label:'YBNL/Empire', signingBonus:5500000, weeklyFee:170000, style:'afrobeats/amapiano' },
  { id:'ckay', name:'CKay', genre:'Afrobeats', fame:80, talent:83, mood:78, label:'Warner Music', signingBonus:4000000, weeklyFee:120000, style:'afro R&B' },
  { id:'fireboy', name:'Fireboy DML', genre:'Afrobeats', fame:78, talent:82, mood:79, label:'YBNL', signingBonus:3500000, weeklyFee:100000, style:'afropop' },
  { id:'tems', name:'Tems', genre:'Afrobeats', fame:86, talent:90, mood:77, label:'Since93/Columbia', signingBonus:6500000, weeklyFee:200000, style:'alt afrobeats' },
  { id:'omah', name:'Omah Lay', genre:'Afrobeats', fame:78, talent:82, mood:76, label:'KeyQaad', signingBonus:3000000, weeklyFee:90000, style:'afropop' },
  // Latin
  { id:'badbunny', name:'Bad Bunny', genre:'Latin', fame:97, talent:91, mood:78, label:'Rimas Entertainment', signingBonus:14000000, weeklyFee:480000, style:'reggaeton/trap latino' },
  { id:'jbalvin', name:'J Balvin', genre:'Latin', fame:90, talent:82, mood:80, label:'Universal Music Latino', signingBonus:8000000, weeklyFee:260000, style:'reggaeton' },
  { id:'karol', name:'Karol G', genre:'Latin', fame:88, talent:85, mood:84, label:'Universal Music Latino', signingBonus:7500000, weeklyFee:240000, style:'reggaeton/pop' },
  { id:'maluma', name:'Maluma', genre:'Latin', fame:85, talent:80, mood:83, label:'Sony Music Latin', signingBonus:6000000, weeklyFee:180000, style:'reggaeton' },
  { id:'ozuna', name:'Ozuna', genre:'Latin', fame:84, talent:79, mood:80, label:'Sony Music Latin', signingBonus:5500000, weeklyFee:160000, style:'latin trap' },
  { id:'shakira', name:'Shakira', genre:'Latin', fame:92, talent:90, mood:73, label:'Sony Music', signingBonus:9000000, weeklyFee:300000, style:'latin pop' },
  { id:'myke', name:'Myke Towers', genre:'Latin', fame:78, talent:80, mood:78, label:'UMG', signingBonus:3500000, weeklyFee:100000, style:'latin trap' },
  // Unsigned / Up-and-coming
  { id:'ico', name:'Ico Dayz', genre:'Afrobeats', fame:35, talent:72, mood:90, label:null, signingBonus:200000, weeklyFee:8000, style:'afropop' },
  { id:'nova', name:'Nova Reign', genre:'Pop', fame:28, talent:70, mood:92, label:null, signingBonus:150000, weeklyFee:6000, style:'indie pop' },
  { id:'lenzz', name:'Lenzz', genre:'Hip-Hop', fame:40, talent:74, mood:88, label:null, signingBonus:250000, weeklyFee:10000, style:'drill' },
  { id:'solei', name:'Solei', genre:'R&B', fame:32, talent:76, mood:90, label:null, signingBonus:200000, weeklyFee:8000, style:'neo-soul' },
  { id:'kxng', name:'KXNG Blaze', genre:'Hip-Hop', fame:45, talent:75, mood:85, label:null, signingBonus:300000, weeklyFee:12000, style:'trap' },
  { id:'amara', name:'Amara Gold', genre:'Afrobeats', fame:38, talent:78, mood:88, label:null, signingBonus:220000, weeklyFee:9000, style:'afro-fusion' },
  { id:'zephyr', name:'Zephyr Lane', genre:'Pop', fame:30, talent:73, mood:91, label:null, signingBonus:160000, weeklyFee:7000, style:'electropop' },
  { id:'draco', name:'Draco Rize', genre:'Latin', fame:42, talent:72, mood:86, label:null, signingBonus:270000, weeklyFee:11000, style:'latin trap' },
  { id:'xanthe', name:'Xanthe', genre:'R&B', fame:36, talent:77, mood:89, label:null, signingBonus:210000, weeklyFee:8500, style:'alt R&B' },
  { id:'omi', name:'Omi Beats', genre:'Afrobeats', fame:50, talent:76, mood:84, label:null, signingBonus:350000, weeklyFee:14000, style:'amapiano' },
  { id:'prix', name:'Prix', genre:'Hip-Hop', fame:55, talent:80, mood:82, label:null, signingBonus:500000, weeklyFee:18000, style:'conscious rap' },
  { id:'luna', name:'Luna Silver', genre:'Pop', fame:60, talent:81, mood:83, label:null, signingBonus:600000, weeklyFee:20000, style:'synth-pop' },
];

export const RIVAL_LABELS = [
  { id:'universal', name:'Universal Music Group', tier:'Major', budget:500000000, artists:['Taylor Swift','Drake','Billie Eilish','Bad Bunny','Kendrick Lamar'], strength:95 },
  { id:'sony', name:'Sony Music Entertainment', tier:'Major', budget:400000000, artists:['Beyoncé','Harry Styles','Shakira','Dua Lipa','Olivia Rodrigo'], strength:90 },
  { id:'warner', name:'Warner Music Group', tier:'Major', budget:350000000, artists:['Cardi B','Bruno Mars','Ed Sheeran','Dua Lipa','Lizzo'], strength:87 },
  { id:'atlanticr', name:'Atlantic Records', tier:'Major', budget:280000000, artists:['Bruno Mars','Charli XCX','Lizzo','Saweetie'], strength:82 },
  { id:'rca', name:'RCA Records', tier:'Major', budget:260000000, artists:['SZA','Justin Timberlake','Doja Cat','Latto'], strength:80 },
  { id:'interscope', name:'Interscope Records', tier:'Mid-Major', budget:200000000, artists:['Billie Eilish','Dr. Dre','Eminem','Post Malone'], strength:78 },
  { id:'def_jam', name:'Def Jam Recordings', tier:'Mid-Major', budget:180000000, artists:['Rick Ross','Pusha T','Pop Smoke','Logic'], strength:75 },
  { id:'empire', name:'EMPIRE', tier:'Independent', budget:80000000, artists:['Tyga','Snoop Dogg','YBN Cordae'], strength:62 },
  { id:'top_dawg', name:'Top Dawg Entertainment', tier:'Independent', budget:70000000, artists:['Kendrick Lamar','SZA','Isaiah Rashad'], strength:68 },
  { id:'mavin', name:'Mavin Records', tier:'Independent', budget:50000000, artists:['Rema','Ayra Starr','Johnny Drille'], strength:60 },
];

export const CHART_SONGS = [
  { title:"One Dance", artist:"Drake", streams:4200000 },
  { title:"Calm Down", artist:"Rema & Selena Gomez", streams:3900000 },
  { title:"Die With A Smile", artist:"Lady Gaga & Bruno Mars", streams:5100000 },
  { title:"APT.", artist:"ROSÉ & Bruno Mars", streams:4800000 },
  { title:"Water", artist:"Tyla", streams:3600000 },
  { title:"Espresso", artist:"Sabrina Carpenter", streams:4400000 },
  { title:"Beautiful Things", artist:"Benson Boone", streams:3300000 },
  { title:"Lose Control", artist:"Teddy Swims", streams:3100000 },
  { title:"TEXAS HOLD 'EM", artist:"Beyoncé", streams:4700000 },
  { title:"Not Like Us", artist:"Kendrick Lamar", streams:5500000 },
  { title:"luther", artist:"Kendrick Lamar & SZA", streams:5000000 },
  { title:"Birds of a Feather", artist:"Billie Eilish", streams:4200000 },
  { title:"Too Sweet", artist:"Hozier", streams:3800000 },
  { title:"Good Luck, Babe!", artist:"Chappell Roan", streams:3700000 },
  { title:"Please Please Please", artist:"Sabrina Carpenter", streams:4100000 },
];

export const PR_EVENTS = [
  { id:'scandal', text:'[ARTIST] spotted at exclusive party — photos leaked online', impact:-15, fameChange:-5, type:'scandal' },
  { id:'beef', text:'[ARTIST] drops diss track targeting rival artist — Twitter explodes', impact:10, fameChange:8, type:'beef' },
  { id:'viral', text:'[ARTIST] dance challenge goes viral on TikTok — 50M views overnight', impact:20, fameChange:12, type:'viral' },
  { id:'grammy', text:'[ARTIST] receives Grammy nomination — label celebrates', impact:25, fameChange:15, type:'award' },
  { id:'collab', text:'[ARTIST] announces surprise collab with global superstar', impact:18, fameChange:10, type:'collab' },
  { id:'interview', text:'[ARTIST] opens up about personal struggles in emotional interview', impact:8, fameChange:5, type:'interview' },
  { id:'arrest', text:'Breaking: [ARTIST] arrested — label scrambles for crisis response', impact:-30, fameChange:-20, type:'crisis' },
  { id:'breakup', text:'[ARTIST] announces public breakup — sympathy streams spike', impact:12, fameChange:6, type:'personal' },
  { id:'charity', text:'[ARTIST] donates $1M to hurricane relief — praised globally', impact:20, fameChange:14, type:'positive' },
  { id:'feud', text:'[ARTIST] and label exec publicly argue — industry watches closely', impact:-10, fameChange:-5, type:'internal' },
  { id:'comeback', text:'[ARTIST] breaks streaming records with surprise midnight drop', impact:22, fameChange:16, type:'release' },
  { id:'sold_out', text:'[ARTIST] sells out 50-city world tour in 4 minutes — scalpers abound', impact:18, fameChange:12, type:'tour' },
];

export const LABEL_TIERS = [
  { name:'Garage Label', minRevenue:0, color:'#888', icon:'🏠' },
  { name:'Indie Label', minRevenue:5000000, color:'#c0392b', icon:'🎸' },
  { name:'Boutique Label', minRevenue:25000000, color:'#8e44ad', icon:'💎' },
  { name:'Rising Label', minRevenue:75000000, color:'#2980b9', icon:'📈' },
  { name:'Mid-Major', minRevenue:200000000, color:'#27ae60', icon:'🏆' },
  { name:'Major Label', minRevenue:500000000, color:'#f39c12', icon:'⭐' },
  { name:'Conglomerate', minRevenue:1500000000, color:'#c9a84c', icon:'👑' },
];

export const SYNC_DEALS = [
  { id:'netflix', title:'Netflix Original Series', fee:500000, fameBonus:8, platform:'Netflix' },
  { id:'apple_ad', title:'Apple Product Launch', fee:800000, fameBonus:10, platform:'Apple' },
  { id:'nike', title:'Nike Global Campaign', fee:600000, fameBonus:9, platform:'Nike' },
  { id:'gta', title:'Grand Theft Auto VII Soundtrack', fee:1200000, fameBonus:15, platform:'Rockstar Games' },
  { id:'nba', title:'NBA Finals Theme', fee:400000, fameBonus:7, platform:'NBA' },
  { id:'worldcup', title:'FIFA World Cup Anthem', fee:2000000, fameBonus:20, platform:'FIFA' },
  { id:'marvel', title:'Marvel Movie Soundtrack', fee:900000, fameBonus:12, platform:'Marvel Studios' },
  { id:'spotify', title:'Spotify Wrapped Campaign', fee:350000, fameBonus:6, platform:'Spotify' },
  { id:'coca_cola', title:'Coca-Cola Holiday Ad', fee:450000, fameBonus:5, platform:'Coca-Cola' },
  { id:'amazon', title:'Amazon Prime Launch Event', fee:550000, fameBonus:7, platform:'Amazon' },
];

export const TOUR_TIERS = [
  { id:'club', name:'Club Tour', venues:8, capacity:500, ticketPrice:45, cost:80000 },
  { id:'theater', name:'Theater Tour', venues:12, capacity:2000, ticketPrice:75, cost:250000 },
  { id:'arena', name:'Arena Tour', venues:20, capacity:15000, ticketPrice:120, cost:1200000 },
  { id:'stadium', name:'Stadium Tour', venues:30, capacity:60000, ticketPrice:200, cost:5000000 },
  { id:'world', name:'World Tour', venues:50, capacity:80000, ticketPrice:250, cost:12000000 },
];

export const MERCH_LINES = [
  { id:'basic', name:'Basic Merch Bundle', weeklyRevenue:5000, cost:10000, description:'T-shirts, caps, hoodies' },
  { id:'premium', name:'Premium Collection', weeklyRevenue:20000, cost:50000, description:'Limited edition drops' },
  { id:'streetwear', name:'Streetwear Collab', weeklyRevenue:50000, cost:150000, description:'Brand partnership' },
  { id:'luxury', name:'Luxury Fashion Line', weeklyRevenue:120000, cost:400000, description:'High-end designer collab' },
  { id:'fragrance', name:'Signature Fragrance', weeklyRevenue:80000, cost:300000, description:'Celebrity perfume/cologne' },
];

export const AWARD_SHOWS = [
  { id:'grammy', name:'Grammy Awards', prestige:100, months:[2] },
  { id:'bet', name:'BET Awards', prestige:80, months:[6] },
  { id:'vma', name:'MTV VMAs', prestige:75, months:[9] },
  { id:'ama', name:'American Music Awards', prestige:70, months:[11] },
  { id:'billboard', name:'Billboard Music Awards', prestige:72, months:[5] },
  { id:'mobo', name:'MOBO Awards', prestige:65, months:[11] },
];
