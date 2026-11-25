// Hand-rolled SVG charts: no library, no network. Every chart is drawn from
// the data arrays in data.js and labelled with values, so it reads even
// without interaction. Colours come from the site palette in style.css.

const INK = '#12333a';
const TEAL = '#0e7a6d';
const AMBER = '#e8a13c';
const MUTED = '#5d6f73';
const GRID = '#dbe4e4';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
}

// Line chart with labelled points. points: [{year, value}], yLabel, format.
export function lineChart(points, opts = {}) {
  const w = 720, h = 320, padL = 56, padR = 16, padT = 18, padB = 34;
  const max = niceMax(Math.max(...points.map((p) => p.value)) * 1.05);
  const min = Math.min(0, Math.min(...points.map((p) => p.value)));
  const x = (i) => padL + (i * (w - padL - padR)) / (points.length - 1);
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const fmt = opts.format || ((v) => String(v));
  let ticks = '';
  for (let t = 0; t <= 4; t++) {
    const v = min + ((max - min) * t) / 4;
    ticks += `<line x1="${padL}" y1="${y(v)}" x2="${w - padR}" y2="${y(v)}" stroke="${GRID}"/>` +
      `<text x="${padL - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(fmt(v))}</text>`;
  }
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${path} L${x(points.length - 1).toFixed(1)},${y(min)} L${x(0).toFixed(1)},${y(min)} Z`;
  const dots = points.map((p, i) =>
    `<circle cx="${x(i)}" cy="${y(p.value)}" r="4" fill="#fff" stroke="${TEAL}" stroke-width="2.5"><title>${p.year}: ${fmt(p.value)}</title></circle>` +
    `<text x="${x(i)}" y="${y(p.value) - 10}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${esc(fmt(p.value))}</text>`).join('');
  const labels = points.map((p, i) =>
    `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${p.year}</text>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Line chart')}" class="chart">${ticks}` +
    `<path d="${area}" fill="${TEAL}" opacity="0.08"/><path d="${path}" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round"/>` +
    `${dots}${labels}</svg>`;
}

// Vertical bar chart. bars: [{label, value}], format.
export function barChart(bars, opts = {}) {
  const w = 720, h = 340, padL = 56, padR = 16, padT = 26, padB = 58;
  const max = niceMax(Math.max(...bars.map((b) => b.value)) * 1.08);
  const min = Math.min(0, Math.min(...bars.map((b) => b.value)));
  const slot = (w - padL - padR) / bars.length;
  const bw = Math.min(52, slot * 0.62);
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const fmt = opts.format || ((v) => String(v));
  let ticks = '';
  for (let t = 0; t <= 4; t++) {
    const v = min + ((max - min) * t) / 4;
    ticks += `<line x1="${padL}" y1="${y(v)}" x2="${w - padR}" y2="${y(v)}" stroke="${GRID}"/>` +
      `<text x="${padL - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(fmt(v))}</text>`;
  }
  const cols = bars.map((b, i) => {
    const label = b.label ?? b.year;
    const cx = padL + slot * i + slot / 2;
    const top = y(Math.max(b.value, 0));
    const base = y(Math.min(b.value, 0));
    const neg = b.value < 0;
    return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw}" height="${Math.max(1, base - top).toFixed(1)}" rx="4" fill="${neg ? '#c0533f' : i % 2 ? TEAL : '#159a87'}"><title>${esc(label)}: ${fmt(b.value)}</title></rect>` +
      `<text x="${cx}" y="${(top - 7).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${esc(fmt(b.value))}</text>` +
      `<text x="${cx}" y="${h - 34}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(label)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Bar chart')}" class="chart">${ticks}${cols}</svg>`;
}

// Horizontal bar chart, best for ranked lists. bars: [{label, value}].
export function hbarChart(bars, opts = {}) {
  const rowH = 34, padL = 190, padR = 64, padT = 8;
  const h = padT + bars.length * rowH + 12;
  const w = 720;
  const max = Math.max(...bars.map((b) => b.value));
  const fmt = opts.format || ((v) => String(v));
  const rows = bars.map((b, i) => {
    const yTop = padT + i * rowH + 4;
    const bw = ((w - padL - padR) * b.value) / max;
    return `<text x="${padL - 10}" y="${yTop + 15}" text-anchor="end" font-size="12" fill="${INK}">${esc(b.label)}</text>` +
      `<rect x="${padL}" y="${yTop}" width="${Math.max(2, bw).toFixed(1)}" height="20" rx="4" fill="${i < 3 ? AMBER : TEAL}"><title>${esc(b.label)}: ${fmt(b.value)}</title></rect>` +
      `<text x="${padL + bw + 8}" y="${yTop + 15}" font-size="12" font-weight="600" fill="${INK}">${esc(fmt(b.value))}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Horizontal bar chart')}" class="chart">${rows}</svg>`;
}

// Donut chart with a centre total. slices: [{label, value}].
export function donutChart(slices, opts = {}) {
  const w = 360, h = 360, cx = 180, cy = 180, r = 130, inner = 82;
  const total = slices.reduce((a, s) => a + s.value, 0);
  const palette = ['#0e7a6d', '#159a87', '#e8a13c', '#2b6cb0', '#7a5fb0', '#c0533f', '#5d6f73', '#9db8b4'];
  let a0 = -Math.PI / 2;
  let paths = '';
  slices.forEach((s, i) => {
    const a1 = a0 + (s.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    paths += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z" fill="${palette[i % palette.length]}"><title>${esc(s.label)}: ${s.value}%</title></path>`;
    a0 = a1;
  });
  const legend = slices.map((s, i) =>
    `<span class="legend-item"><span class="swatch" style="background:${palette[i % palette.length]}"></span>${esc(s.label)} — <strong>${s.value}%</strong></span>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.label || 'Donut chart')}" class="chart donut">${paths}` +
    `<text x="${cx}" y="${cy - 6}" text-anchor="middle" font-size="30" font-weight="700" fill="${INK}">${esc(opts.centre || '100%')}</text>` +
    `<text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${MUTED}">${esc(opts.centreLabel || 'of GDP')}</text></svg>` +
    `<div class="legend">${legend}</div></div>`;
}
