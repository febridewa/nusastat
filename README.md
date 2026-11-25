# NusaStat — Portal Statistik Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/febridewa/nusastat/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/febridewa/nusastat/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaStat is an original national statistics portal about Indonesia: population,
economy, jobs, prices and all 38 provinces, with every figure labelled by source
and year. It runs in a browser from static files with no network request, on a
desktop and on a phone.

- **Dashboard** — eight headline indicators, a population trend chart, site search, and the latest releases
- **Population** — 2015–2024 trend (line/bar toggle), largest provinces, age structure, poverty
- **Economy** — real GDP growth 2015–2024 (year-range selector), GDP by sector, trade, GDP per capita
- **Jobs** — employment by sector, unemployment by group, wages, formal vs informal work
- **Prices** — CPI inflation by spending group (sortable), what inflation means for a household, how the CPI is built
- **Provinces** — searchable, sortable table of 38 provinces plus a two-province comparison tool
- **Datasets** — downloadable CSV files for every table, release calendar, citation guide
- **About** — full source list and methods in brief

Figures come from BPS (Statistics Indonesia), Bank Indonesia, the Ministry of
Finance, UNDP and the World Bank. NusaStat is not affiliated with BPS or any
government body.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. Or serve `app/` with any static HTTP server.

## Layout

- `app/index.html` — page shell, navigation, footer
- `app/main.js` — hash router and control wiring
- `app/views.js` — one renderer per section
- `app/charts.js` — hand-rolled SVG line, bar, horizontal-bar and donut charts
- `app/data.js` — every figure, labelled with source and year
- `app/data/*.csv` — downloadable datasets
- `app/style.css` — design system (system fonts only, no webfonts)
- `main.ts` — hands the site in (copies `app/` + `screenshots/`, writes `dossier.json`)
- `screenshots/` — renders of the site itself

---

<sub>Entered on [make.fun](https://make.fun/?ref=6etrfz79&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
