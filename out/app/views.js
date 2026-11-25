// Route renderers: each view is a function returning HTML for #view.
// All figures come from data.js; every figure on screen names its source
// and year in the "source-note" under its chart or table.
import {
  HEADLINES, POPULATION_SERIES, AGE_GROUPS, GDP_GROWTH, GDP_SECTORS,
  CPI_GROUPS, EMPLOYMENT_SECTORS, PROVINCES, TRADE, RELEASES, DATASETS,
  EXPLAINERS, SOURCES,
} from './data.js';
import { lineChart, barChart, hbarChart, donutChart } from './charts.js';

function sourceNote(text) {
  return `<p class="source-note">Source: ${text}. Figures rounded; see Datasets for the full tables.</p>`;
}

function headlineCards() {
  return `<div class="cards">${HEADLINES.map((h) => `
    <a class="card" href="${h.route}">
      <span class="card-label">${h.label}</span>
      <span class="card-value">${h.value}</span>
      <span class="card-change">${h.change}</span>
      <span class="card-note">${h.note}</span>
    </a>`).join('')}</div>`;
}

export function viewHome() {
  return `
  <section class="hero">
    <div>
      <p class="eyebrow">Portal Statistik Indonesia &middot; Updated 5 November 2026</p>
      <h1>Indonesia in numbers, <span>explained.</span></h1>
      <p class="lede">Population, the economy, jobs, prices and every province — the official
      figures, with their sources and years, in one place. No account, no paywall, no tracking.</p>
      <div class="hero-actions">
        <a class="btn primary" href="#/population">Explore the population</a>
        <a class="btn" href="#/datasets">Download the data</a>
      </div>
      <form class="hero-search" id="hero-search" role="search">
        <label for="q">Search indicators</label>
        <input id="q" name="q" type="search" placeholder="Try “inflation”, “Java”, “exports”… " autocomplete="off">
        <button class="btn primary" type="submit">Search</button>
      </form>
      <div id="search-results" class="search-results" aria-live="polite"></div>
    </div>
    <div class="hero-chart">
      <h2>Population, 2015–2024</h2>
      ${lineChart(POPULATION_SERIES, { label: 'Population of Indonesia 2015 to 2024, millions', format: (v) => `${v.toFixed(1)}m` })}
      ${sourceNote(SOURCES.population)}
    </div>
  </section>
  <section>
    <h2>Key indicators at a glance</h2>
    ${headlineCards()}
  </section>
  <section class="split">
    <div>
      <h2>What people ask first</h2>
      <div class="explainers">${EXPLAINERS.map((e) => `
        <article class="explainer"><h3>${e.title}</h3><p>${e.body}</p>
        <a href="${e.route}">Read the full page &rarr;</a></article>`).join('')}</div>
    </div>
    <div>
      <h2>Latest releases</h2>
      <ul class="releases">${RELEASES.map((r) => `
        <li><span class="release-date">${r.date}</span>
        <span class="release-title">${r.title}</span>
        <span class="tag ${r.status === 'Published' ? 'tag-ok' : 'tag-soon'}">${r.status}</span></li>`).join('')}</ul>
      <p class="muted">Releases appear here at 11:00 WIB on the day. The full calendar is on the Datasets page.</p>
    </div>
  </section>`;
}

export function viewPopulation(state) {
  const mode = state.chart === 'bar' ? 'bar' : 'line';
  const chart = mode === 'bar'
    ? barChart(POPULATION_SERIES, { label: 'Population by year, millions', format: (v) => `${v.toFixed(1)}` })
    : lineChart(POPULATION_SERIES, { label: 'Population 2015 to 2024, millions', format: (v) => `${v.toFixed(1)}m` });
  return `
  <section>
    <p class="eyebrow">Population</p>
    <h1>281.6 million people</h1>
    <p class="lede">Indonesia is the world’s fourth most populous country. The population grows
    about 0.7% a year — slower than a decade ago — and 69.3% of people are of working age.</p>
    <div class="controls" role="group" aria-label="Chart type">
      <span>Chart:</span>
      <button data-chart="line" class="${mode === 'line' ? 'active' : ''}">Line</button>
      <button data-chart="bar" class="${mode === 'bar' ? 'active' : ''}">Bars</button>
    </div>
    ${chart}
    ${sourceNote(SOURCES.population)}
  </section>
  <section class="split">
    <div>
      <h2>Who lives where</h2>
      <p>Java holds 56% of the population on 7% of the land. Jakarta is the densest
      province at 15,927 people per km&sup2;; Papua is the sparsest at 13.</p>
      ${hbarChart([...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 8).map((p) => ({ label: p.name, value: p.pop })),
        { label: 'Largest provinces by population, millions', format: (v) => `${v.toFixed(1)}m` })}
      ${sourceNote(SOURCES.population)}
    </div>
    <div>
      <h2>Age structure, 2024</h2>
      <p>One in four Indonesians is under 15; 6.0% are 65 or older. The dependency
      ratio is 44.3 — every 100 working-age people support about 44 others.</p>
      ${hbarChart(AGE_GROUPS.map((a) => ({ label: a.group, value: a.value })),
        { label: 'Age groups as percent of population', format: (v) => `${v.toFixed(1)}%` })}
      ${sourceNote(SOURCES.population)}
      <h2>Poverty</h2>
      <p><strong>8.57%</strong> of people — 24.06 million — lived below the poverty line in
      September 2024, down from 9.03% in March. Rural poverty (11.34%) runs more than
      twice urban poverty (6.99%).</p>
      ${sourceNote(SOURCES.poverty)}
    </div>
  </section>`;
}

export function viewEconomy(state) {
  const range = state.range || 'all';
  const series = range === 'recent' ? GDP_GROWTH.slice(5)
    : range === 'early' ? GDP_GROWTH.slice(0, 5) : GDP_GROWTH;
  return `
  <section>
    <p class="eyebrow">Economy</p>
    <h1>An economy of US$1.40 trillion</h1>
    <p class="lede">Real GDP grew 5.03% in 2024 to Rp 22,139 trillion. Growth has sat near 5% for
    a decade, interrupted only by the pandemic contraction of −2.07% in 2020.</p>
    <div class="controls" role="group" aria-label="Years shown">
      <span>Years:</span>
      <button data-range="all" class="${range === 'all' ? 'active' : ''}">2015–2024</button>
      <button data-range="early" class="${range === 'early' ? 'active' : ''}">2015–2019</button>
      <button data-range="recent" class="${range === 'recent' ? 'active' : ''}">2020–2024</button>
    </div>
    ${barChart(series, { label: 'Real GDP growth by year, percent', format: (v) => `${v.toFixed(2)}%` })}
    ${sourceNote(SOURCES.gdp)}
  </section>
  <section class="split">
    <div>
      <h2>What the economy makes</h2>
      ${donutChart(GDP_SECTORS.slice(0, 8), { label: 'Share of GDP by sector, 2024', centre: '18.9%', centreLabel: 'manufacturing' })}
      ${sourceNote(SOURCES.gdp)}
    </div>
    <div>
      <h2>Trade with the world</h2>
      <table class="data-table"><thead><tr><th>Item</th><th>Value</th><th>Change</th></tr></thead><tbody>
      ${TRADE.map((t) => `<tr><td>${t.item}</td><td><strong>${t.value.toFixed(1)} ${t.unit}</strong></td><td>${t.change}</td></tr>`).join('')}
      </tbody></table>
      ${sourceNote(SOURCES.trade)}
      <h2>GDP per capita</h2>
      <p>Output per person reached <strong>US$4,960</strong> in 2024, up from US$4,766 in 2023.
      In purchasing-power terms the World Bank puts it near US$17,000 — Indonesia is
      classified as an upper-middle-income country.</p>
      ${sourceNote('BPS National Accounts and World Bank, 2024')}
    </div>
  </section>`;
}

export function viewLabour() {
  return `
  <section>
    <p class="eyebrow">Jobs &amp; wages</p>
    <h1>149.4 million people at work</h1>
    <p class="lede">The open unemployment rate was 4.76% in August 2024 — 7.5 million people
    looking for work — the lowest since 1998. But 59.4% of workers are informal,
    without a contract or social protection.</p>
    ${hbarChart(EMPLOYMENT_SECTORS.map((s) => ({ label: s.sector, value: s.value })),
      { label: 'Employment by sector, percent of workers', format: (v) => `${v.toFixed(1)}%` })}
    ${sourceNote(SOURCES.labour)}
  </section>
  <section class="split">
    <div>
      <h2>Who is out of work?</h2>
      <table class="data-table"><thead><tr><th>Group</th><th>Unemployment</th></tr></thead><tbody>
        <tr><td>Women</td><td><strong>5.00%</strong></td></tr>
        <tr><td>Men</td><td><strong>4.58%</strong></td></tr>
        <tr><td>Youth (15–24)</td><td><strong>17.3%</strong></td></tr>
        <tr><td>Urban</td><td><strong>5.62%</strong></td></tr>
        <tr><td>Rural</td><td><strong>3.82%</strong></td></tr>
        <tr><td>University graduates</td><td><strong>5.6%</strong></td></tr>
      </tbody></table>
      ${sourceNote(SOURCES.labour)}
    </div>
    <div>
      <h2>Wages</h2>
      <p>The average monthly wage of employees was <strong>Rp 3.11 million</strong> in August 2024.
      The highest-paying sector is finance (Rp 5.9 million); agriculture pays the least
      (Rp 2.1 million). Provincial minimum wages for 2026 range from Rp 2.1 million in
      Central Java to Rp 5.7 million in Jakarta.</p>
      ${sourceNote(SOURCES.labour)}
      <h2>Formal vs informal</h2>
      <p>40.6% of workers are formal employees; 59.4% work informally — own-account
      workers, casual labourers and unpaid family workers. Informal work dominates
      agriculture (88%) and is rare in finance (4%).</p>
      ${sourceNote(SOURCES.labour)}
    </div>
  </section>`;
}

export function viewPrices(state) {
  const sorted = state.sort === 'high'
    ? [...CPI_GROUPS].sort((a, b) => b.value - a.value)
    : [...CPI_GROUPS].sort((a, b) => a.value - b.value);
  return `
  <section>
    <p class="eyebrow">Prices &amp; inflation</p>
    <h1>Prices rose 1.57% in a year</h1>
    <p class="lede">Consumer price inflation was 1.57% year-on-year in December 2024, inside Bank
    Indonesia’s 1.5–3.5% target band. Food and personal care rose fastest; communication
    got slightly cheaper.</p>
    <div class="controls" role="group" aria-label="Sort order">
      <span>Sort:</span>
      <button data-sort="high" class="${state.sort !== 'low' ? 'active' : ''}">Fastest rising first</button>
      <button data-sort="low" class="${state.sort === 'low' ? 'active' : ''}">Slowest first</button>
    </div>
    ${hbarChart(sorted.map((c) => ({ label: c.group, value: Math.abs(c.value) })),
      { label: 'CPI inflation by spending group, December 2024, percent', format: (v) => `${v.toFixed(2)}%` })}
    <p class="muted">Communication shows 0.18% — its price actually fell 0.18% over the year.</p>
    ${sourceNote(SOURCES.prices)}
  </section>
  <section class="split">
    <div>
      <h2>What inflation means for a household</h2>
      <p>A basket that cost Rp 100,000 in December 2023 cost Rp 101,570 a year later. For
      the poorest fifth of households, food is 55% of spending, so the 2.41% rise in food
      prices bites harder than the headline rate suggests.</p>
      <h2>How the CPI is built</h2>
      <p>BPS prices about 400 goods and services in 90 cities every month, weighted by
      how households actually spend. The index is rebased every five years; the current
      base year is 2022.</p>
      ${sourceNote(SOURCES.prices)}
    </div>
    <div>
      <h2>Inflation through the year</h2>
      <table class="data-table"><thead><tr><th>Month (2024)</th><th>Year-on-year</th></tr></thead><tbody>
        <tr><td>March</td><td><strong>3.05%</strong></td></tr>
        <tr><td>June</td><td><strong>2.51%</strong></td></tr>
        <tr><td>September</td><td><strong>1.84%</strong></td></tr>
        <tr><td>December</td><td><strong>1.57%</strong></td></tr>
      </tbody></table>
      <p class="muted">Inflation cooled through 2024 as food prices settled after the early-year spike.</p>
      ${sourceNote(SOURCES.prices)}
    </div>
  </section>`;
}

export function viewRegions(state) {
  const q = (state.q || '').toLowerCase();
  const sortKey = state.sort || 'pop';
  let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
  rows = [...rows].sort((a, b) => (sortKey === 'growth' ? b.growth - a.growth : sortKey === 'density' ? b.density - a.density : b.pop - a.pop));
  const a = PROVINCES.find((p) => p.name === state.a) || PROVINCES[0];
  const b = PROVINCES.find((p) => p.name === state.b) || PROVINCES[1];
  const options = PROVINCES.map((p) => `<option value="${p.name}">${p.name}</option>`).join('');
  const compareRow = (label, va, vb, fmt) => `<tr><td>${label}</td><td><strong>${fmt(va)}</strong></td><td><strong>${fmt(vb)}</strong></td></tr>`;
  return `
  <section>
    <p class="eyebrow">Provinces</p>
    <h1>38 provinces, one table</h1>
    <p class="lede">Compare every province on population, growth and density. The table below
    lists the 24 largest; the full 38-province file is on the Datasets page.</p>
    <div class="controls">
      <label for="region-search">Search a province or capital</label>
      <input id="region-search" type="search" placeholder="e.g. Java, Medan…" value="${state.q || ''}">
      <span>Sort by:</span>
      <button data-sort="pop" class="${sortKey === 'pop' ? 'active' : ''}">Population</button>
      <button data-sort="growth" class="${sortKey === 'growth' ? 'active' : ''}">Growth</button>
      <button data-sort="density" class="${sortKey === 'density' ? 'active' : ''}">Density</button>
    </div>
    <table class="data-table"><thead><tr><th>Province</th><th>Capital</th><th>Population 2024</th><th>Growth / yr</th><th>Density / km&sup2;</th></tr></thead><tbody>
    ${rows.map((p) => `<tr><td><strong>${p.name}</strong></td><td>${p.capital}</td><td>${p.pop.toFixed(2)}m</td><td>${p.growth.toFixed(2)}%</td><td>${p.density.toLocaleString('en-US')}</td></tr>`).join('') || '<tr><td colspan="5">No province matches that search.</td></tr>'}
    </tbody></table>
    ${sourceNote(SOURCES.population)}
  </section>
  <section>
    <h2>Compare two provinces</h2>
    <div class="controls">
      <label for="cmp-a">First province</label>
      <select id="cmp-a">${options.replace(`value="${a.name}"`, `value="${a.name}" selected`)}</select>
      <label for="cmp-b">Second province</label>
      <select id="cmp-b">${options.replace(`value="${b.name}"`, `value="${b.name}" selected`)}</select>
    </div>
    <table class="data-table compare"><thead><tr><th></th><th>${a.name}</th><th>${b.name}</th></tr></thead><tbody>
      ${compareRow('Capital', a.capital, b.capital, (v) => v)}
      ${compareRow('Population, 2024', a.pop, b.pop, (v) => `${v.toFixed(2)}m`)}
      ${compareRow('Growth per year', a.growth, b.growth, (v) => `${v.toFixed(2)}%`)}
      ${compareRow('Density, people / km²', a.density, b.density, (v) => v.toLocaleString('en-US'))}
      ${compareRow('Share of Indonesia', (a.pop / 281.6) * 100, (b.pop / 281.6) * 100, (v) => `${v.toFixed(1)}%`)}
    </tbody></table>
    <p class="muted">${a.name} has ${(a.pop / b.pop).toFixed(1)}&times; the population of ${b.name}, and is
    ${(a.density / b.density).toFixed(1)}&times; as densely settled.</p>
    ${sourceNote(SOURCES.population)}
  </section>`;
}

export function viewDatasets(state) {
  const q = (state.q || '').toLowerCase();
  const list = DATASETS.filter((d) => !q || d.title.toLowerCase().includes(q) || d.topic.toLowerCase().includes(q));
  return `
  <section>
    <p class="eyebrow">Datasets</p>
    <h1>Download the data</h1>
    <p class="lede">Every figure on this site comes from a table you can download and check.
    Files are CSV, free to use with attribution to BPS and NusaStat.</p>
    <div class="controls">
      <label for="ds-search">Search datasets</label>
      <input id="ds-search" type="search" placeholder="e.g. population, CPI…" value="${state.q || ''}">
    </div>
    <div class="datasets">${list.map((d) => `
      <article class="dataset">
        <span class="tag tag-ok">${d.topic}</span>
        <h3>${d.title}</h3>
        <p>${d.rows} rows &middot; Updated ${d.updated} &middot; ${d.size}</p>
        <a class="btn" href="data/${d.file}" download="${d.file}">Download CSV</a>
      </article>`).join('') || '<p>No dataset matches that search.</p>'}</div>
    <h2>Release calendar</h2>
    <ul class="releases">${RELEASES.map((r) => `
      <li><span class="release-date">${r.date}</span>
      <span class="release-title">${r.title}</span>
      <span class="tag ${r.status === 'Published' ? 'tag-ok' : 'tag-soon'}">${r.status}</span></li>`).join('')}</ul>
    <h2>How to cite</h2>
    <p>“Statistics Indonesia (BPS), via NusaStat, 2024.” For the CPI tables cite
    “BPS, Consumer Price Index, December 2024.”</p>
  </section>`;
}

export function viewAbout() {
  return `
  <section>
    <p class="eyebrow">About</p>
    <h1>About NusaStat</h1>
    <p class="lede">NusaStat is an independent, original statistics portal about Indonesia. It is
    not affiliated with BPS or any government body. It collects the official figures
    people ask for most and presents them with their sources, years and definitions —
    so a number is never left standing on its own.</p>
    <h2>Sources</h2>
    <table class="data-table"><thead><tr><th>Figures</th><th>Source</th></tr></thead><tbody>
      <tr><td>Population, age structure, provinces</td><td>BPS, mid-year estimates, 2024</td></tr>
      <tr><td>GDP, growth, sectors, GDP per capita</td><td>BPS, National Accounts, 2024</td></tr>
      <tr><td>Jobs, unemployment, wages, formality</td><td>BPS, Sakernas, August 2024</td></tr>
      <tr><td>Consumer prices and inflation</td><td>BPS, Consumer Price Index, December 2024</td></tr>
      <tr><td>Exports, imports, trade balance</td><td>BPS, Foreign Trade Statistics, 2024</td></tr>
      <tr><td>Life expectancy, Human Development Index</td><td>BPS and UNDP, 2024</td></tr>
      <tr><td>Poverty</td><td>BPS, Poverty Statistics, September 2024</td></tr>
    </tbody></table>
    <h2>Methods in brief</h2>
    <ul class="methods">
      <li><strong>Population</strong> is the mid-year estimate for 30 June 2024; growth is the annual change on the previous mid-year estimate.</li>
      <li><strong>Real GDP growth</strong> is the change in GDP at constant 2010 prices.</li>
      <li><strong>Unemployment</strong> is the open unemployment rate: people without work, available for work and actively looking, as a share of the labour force.</li>
      <li><strong>Inflation</strong> is the year-on-year change in the consumer price index.</li>
      <li><strong>Poverty</strong> counts people whose monthly spending falls below the poverty line (Rp 595,242 per capita in September 2024).</li>
    </ul>
    <h2>Corrections</h2>
    <p>Figures are revised when BPS revises them. If you spot an error, write to
    corrections at this site’s domain and it will be fixed with a dated note.</p>
  </section>`;
}
