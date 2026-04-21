# GoldNote — Music Label Tycoon

A dark & gold music label simulation game. Sign artists, drop releases, book tours, manage merch, land sync deals, and climb the charts.

---

## Features

- **Account System** — Register, log in, manage multiple careers per account
- **Auto-Save** — Game saves automatically every 60 seconds to browser localStorage
- **Manual Save** — Save anytime from Settings or the Dashboard
- **Multiple Careers** — Run up to many label careers from one account
- **Delete Career / Delete Account** — Full data management with confirmation dialogs

### Gameplay
- 60+ real artists (Drake, Burna Boy, SZA, Bad Bunny, Taylor Swift, Tems, Rema, and many more)
- Contract types: 360 Deal, Standard Record Deal, Distribution Only, Joint Venture
- Release music: single / EP / album — pick producers (Max Martin, Metro Boomin, Sarz, etc.), MV budgets
- Book tours: Club → Theater → Arena → Stadium → World Tour
- Launch merch lines: basic drops to luxury fashion collabs and fragrances
- Sync deals: Netflix, Apple, Nike, FIFA World Cup, Marvel, GTA, and more
- Label tier progression: Garage → Indie → Boutique → Rising → Mid-Major → Major → Conglomerate
- PR events: scandals, beefs, viral moments, Grammy nominations, arrests, charity moments
- Weekly simulation tick with streaming revenue, tour income, merch passive income
- Global charts with your releases competing against real hits

---

## Setup & Run

### Prerequisites
- Node.js 16+ ([nodejs.org](https://nodejs.org))
- npm (comes with Node)

### Steps

```bash
# 1. Navigate to the project folder
cd goldnote

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The app will open at **http://localhost:3000**

### Build for production

```bash
npm run build
```

This creates a `build/` folder you can deploy to any static host (Vercel, Netlify, GitHub Pages).

---

## Tech Stack

- **React 18** — UI framework
- **React Router v6** — navigation
- **localStorage** — all data persisted client-side (no server needed)
- **uuid** — unique IDs for careers, releases, events
- **Google Fonts** — Cinzel (display), Crimson Pro (body), JetBrains Mono (numbers)
- Custom SVG icons (no external icon library needed at runtime)

---

## File Structure

```
src/
├── App.js                  # Root router & game shell
├── index.js                # Entry point
├── index.css               # Global styles & design tokens
├── data/
│   └── gameData.js         # Artists, producers, labels, events data
├── hooks/
│   ├── useAuth.js          # Account system (register/login/logout/delete)
│   └── useGameState.js     # Core game engine & simulation
├── components/
│   ├── Icons.js            # All SVG icons
│   └── Toasts.js           # Toast notification component
└── pages/
    ├── AuthScreen.js       # Login & register
    ├── CareerSelect.js     # Career lobby (new/continue/delete)
    ├── Dashboard.js        # Label HQ overview
    ├── Market.js           # Talent market & contract negotiation
    ├── Roster.js           # Artist management, releases, tours, merch
    ├── Business.js         # Sync deals, tours overview, merch overview
    ├── SocialFeed.js       # Industry news & events feed
    ├── Charts.js           # Global charts & your releases
    └── Settings.js         # Save, account, delete career/account
```

---

## Data Persistence

All data is stored in the browser's `localStorage`:
- `goldnote_accounts` — all user accounts and their careers
- `goldnote_session` — currently logged-in user

No internet connection required after initial setup. Clearing browser data will erase all saves.

---

## Tips

- **Advance Week** is the core loop — each click simulates one week of label operations
- Start with unsigned/emerging artists (lower signing bonuses) to grow your cash
- Pair producers with artists for quality bonuses — Max Martin, Metro Boomin, Sarz, etc.
- Music videos above $200K add a +10 quality bonus to releases
- Keep an eye on contract expiry warnings in the Social Feed
- Sync deals are free money — accept them whenever your roster artists qualify
- Artist mood drops after scandals — PR events affect your roster's performance

---

Built with ❤️ and a luxurious dark & gold aesthetic.
