# Trading Journal - Stock Portfolio Tracker

Aplikasi web untuk mencatat dan melacak transaksi trading saham dengan analytics dashboard lengkap.

## Fitur

- **Login/Signup** - Autentikasi pengguna
- **Dashboard Analytics**
  - Total Ekuitas
  - Floating PnL (posisi terbuka)
  - Realized PnL (posisi tertutup)
  - Win Rate percentage
  - Calendar Heatmap (visualisasi profit/loss harian)
  
- **Form Input Transaksi**
  - Input lengkap: Ticker, Buy/Sell, Entry Price, Lot
  - Strategy dropdown
  - Stop Loss & Take Profit
  - Notes textarea
  - Upload chart screenshot
  
- **Histori Transaksi**
  - Tabel dengan semua transaksi
  - Filter by ticker & strategy
  - Sorting by date, ticker, PnL
  - Status open/closed

## Tech Stack

- React 18
- Tailwind CSS (dark mode)
- React Router DOM
- Vite
- Lucide React (icons)
- date-fns

## Setup

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### Build Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Struktur Project

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout.jsx           # Main layout dengan navbar
│   │   └── CalendarHeatmap.jsx  # Calendar heatmap component
│   ├── pages/
│   │   ├── Login.jsx            # Login/Signup page
│   │   ├── Dashboard.jsx        # Dashboard dengan stats & calendar
│   │   ├── TradeForm.jsx        # Form input transaksi
│   │   └── History.jsx          # Tabel histori dengan filter/sort
│   ├── services/
│   │   └── mockData.js          # Mock data & API functions
│   ├── App.jsx                  # Main app dengan routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Mock Data

App menggunakan mock data untuk development. Data tersimpan di `src/services/mockData.js` dengan fungsi:

- `getTrades()` - Ambil semua transaksi
- `addTrade(trade)` - Tambah transaksi baru
- `getStats()` - Ambil statistik (ekuitas, PnL, win rate)
- `getCalendarData()` - Data untuk calendar heatmap

## Features Detail

### Dark Mode
UI sudah full dark mode dengan color scheme:
- Background: `#0f172a`
- Card: `#1e293b`
- Border: `#334155`
- Profit: `#10b981` (green)
- Loss: `#ef4444` (red)

### Responsive Design
Layout responsive untuk mobile, tablet, dan desktop dengan Tailwind breakpoints.

### Calendar Heatmap
Menampilkan 3 bulan terakhir dengan color coding:
- Hijau (profit) - intensity berdasarkan nilai
- Merah (loss) - intensity berdasarkan nilai
- Gray (tidak ada transaksi)

### Filter & Sort
History page support:
- Search ticker
- Filter by strategy
- Filter by status (open/closed)
- Sort by date, ticker, PnL (ascending/descending)

## Development Notes

Login page tidak memerlukan kredensial valid - langsung masuk dengan submit form apapun (untuk development).

Untuk production, ganti mock data dengan API calls ke backend yang sebenarnya di `src/services/`.
