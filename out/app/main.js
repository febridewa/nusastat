// NusaStat router: hash routes for every section, plus the working controls
// (chart toggles, range buttons, table sort/search, province compare,
// dataset search, site search). No network: all data is imported from data.js.
import * as views from './views.js';
import { HEADLINES, PROVINCES, DATASETS, RELEASES } from './data.js';

const ROUTES = {
  '': views.viewHome,
  population: views.viewPopulation,
  economy: views.viewEconomy,
  labour: views.viewLabour,
  prices: views.viewPrices,
  regions: views.viewRegions,
  datasets: views.viewDatasets,
  about: views.viewAbout,
};

const TITLES = {
  '': 'NusaStat — Portal Statistik Indonesia',
  population: 'Population — NusaStat',
  economy: 'Economy — NusaStat',
  labour: 'Jobs & wages — NusaStat',
  prices: 'Prices & inflation — NusaStat',
  regions: 'Provinces — NusaStat',
  datasets: 'Datasets — NusaStat',
  about: 'About — NusaStat',
};

// Per-route UI state, kept while the visitor stays on the page.
const state = {
  population: { chart: 'line' },
  economy: { range: 'all' },
  prices: { sort: 'high' },
  regions: { q: '', sort: 'pop', a: 'West Java', b: 'Jakarta' },
  datasets: { q: '' },
};

const view = document.getElementById('view');
const nav = document.getElementById('nav');

function route() {
  const name = location.hash.replace(/^#\/?/, '').split('?')[0];
  const render = ROUTES[name] || views.viewHome;
  const key = ROUTES[name] ? name : '';
  view.innerHTML = render(state[key] || {});
  document.title = TITLES[key];
  nav.querySelectorAll('a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === `#/${key}`);
  });
  window.scrollTo(0, 0);
  wire(key);
}

// Site search: matches headlines, provinces, datasets and releases.
function searchSite(q) {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  const hits = [];
  HEADLINES.forEach((h) => {
    if ((h.label + h.value + h.note).toLowerCase().includes(needle)) {
      hits.push({ title: `${h.label}: ${h.value}`, text: h.note, href: h.route });
    }
  });
  PROVINCES.forEach((p) => {
    if (p.name.toLowerCase().includes(needle)) {
      hits.push({ title: `${p.name} — ${p.pop.toFixed(2)}m people`, text: `Capital ${p.capital}; density ${p.density.toLocaleString('en-US')} per km²`, href: '#/regions' });
    }
  });
  DATASETS.forEach((d) => {
    if (d.title.toLowerCase().includes(needle)) {
      hits.push({ title: d.title, text: `${d.rows} rows, updated ${d.updated}`, href: '#/datasets' });
    }
  });
  RELEASES.forEach((r) => {
    if (r.title.toLowerCase().includes(needle)) {
      hits.push({ title: r.title, text: `${r.date} — ${r.status}`, href: '#/datasets' });
    }
  });
  return hits.slice(0, 8);
}

function wire(key) {
  // Home search.
  const form = document.getElementById('hero-search');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = document.getElementById('q').value;
      const box = document.getElementById('search-results');
      const hits = searchSite(q);
      box.innerHTML = hits.length
        ? `<h3>${hits.length} result${hits.length > 1 ? 's' : ''} for “${q}”</h3><ul>` +
          hits.map((h) => `<li><a href="${h.href}"><strong>${h.title}</strong><span>${h.text}</span></a></li>`).join('') + '</ul>'
        : `<p>No results for “${q}”. Try “inflation”, “Java”, “exports” or “jobs”.</p>`;
    });
  }
  // Buttons that re-render with new state (chart type, year range, sort).
  view.querySelectorAll('[data-chart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.population.chart = btn.dataset.chart;
      route();
    });
  });
  view.querySelectorAll('[data-range]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.economy.range = btn.dataset.range;
      route();
    });
  });
  view.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (key === 'prices') state.prices.sort = btn.dataset.sort;
      if (key === 'regions') state.regions.sort = btn.dataset.sort;
      route();
    });
  });
  // Live search inputs re-render their lists without a page reload.
  const regionSearch = document.getElementById('region-search');
  if (regionSearch) {
    regionSearch.addEventListener('input', () => {
      state.regions.q = regionSearch.value;
      const keep = regionSearch.value;
      route();
      const again = document.getElementById('region-search');
      again.focus();
      again.setSelectionRange(keep.length, keep.length);
    });
  }
  const dsSearch = document.getElementById('ds-search');
  if (dsSearch) {
    dsSearch.addEventListener('input', () => {
      state.datasets.q = dsSearch.value;
      const keep = dsSearch.value;
      route();
      const again = document.getElementById('ds-search');
      again.focus();
      again.setSelectionRange(keep.length, keep.length);
    });
  }
  // Province compare selects.
  const cmpA = document.getElementById('cmp-a');
  const cmpB = document.getElementById('cmp-b');
  if (cmpA && cmpB) {
    cmpA.addEventListener('change', () => { state.regions.a = cmpA.value; route(); });
    cmpB.addEventListener('change', () => { state.regions.b = cmpB.value; route(); });
  }
}

document.getElementById('menu-toggle').addEventListener('click', () => {
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

window.addEventListener('hashchange', route);
route();
