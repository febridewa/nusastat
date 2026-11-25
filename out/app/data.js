// NusaStat data: every figure below is a published official figure, labelled
// with its source and year wherever it is shown. Sources: BPS (Statistics
// Indonesia), Bank Indonesia, Ministry of Finance, UNDP and the World Bank.
// Figures are rounded for display; exact values live in the CSV datasets.

export const SOURCES = {
  population: 'BPS, Population Census and mid-year estimates, 2024',
  gdp: 'BPS, National Accounts, 2024',
  labour: 'BPS, National Labour Force Survey (Sakernas), August 2024',
  prices: 'BPS, Consumer Price Index, December 2024',
  trade: 'BPS, Foreign Trade Statistics, 2024',
  hdi: 'BPS and UNDP, Human Development Report, 2024',
  poverty: 'BPS, Poverty Statistics, September 2024',
};

// Headline indicators shown on the dashboard.
export const HEADLINES = [
  { id: 'population', label: 'Population', value: '281.6m', change: '+0.68% on 2023', note: 'Mid-year estimate, 2024', source: SOURCES.population, route: '#/population' },
  { id: 'gdp', label: 'GDP', value: 'Rp 22,139tn', change: '+5.03% real growth', note: 'US$1.40 trillion, 2024', source: SOURCES.gdp, route: '#/economy' },
  { id: 'gdp-capita', label: 'GDP per capita', value: 'US$4,960', change: '+4.2% on 2023', note: 'Current prices, 2024', source: SOURCES.gdp, route: '#/economy' },
  { id: 'unemployment', label: 'Unemployment rate', value: '4.76%', change: '-0.21 pts on Aug 2023', note: 'Open unemployment, Aug 2024', source: SOURCES.labour, route: '#/labour' },
  { id: 'inflation', label: 'Inflation (year-on-year)', value: '1.57%', change: 'Within the 1.5–3.5% target', note: 'Consumer prices, Dec 2024', source: SOURCES.prices, route: '#/prices' },
  { id: 'poverty', label: 'Poverty rate', value: '8.57%', change: '-0.46 pts on Mar 2024', note: '24.06 million people, Sep 2024', source: SOURCES.poverty, route: '#/population' },
  { id: 'life', label: 'Life expectancy', value: '74.0 yrs', change: '+0.3 yrs on 2023', note: 'At birth, 2024', source: SOURCES.hdi, route: '#/population' },
  { id: 'hdi', label: 'Human Development Index', value: '0.739', change: 'High human development', note: 'UNDP scale 0–1, 2024', source: SOURCES.hdi, route: '#/about' },
];

// Population, millions, 2015-2024 (BPS mid-year estimates).
export const POPULATION_SERIES = [
  { year: 2015, value: 255.5 }, { year: 2016, value: 258.7 },
  { year: 2017, value: 261.9 }, { year: 2018, value: 265.0 },
  { year: 2019, value: 268.1 }, { year: 2020, value: 270.2 },
  { year: 2021, value: 272.2 }, { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 }, { year: 2024, value: 281.6 },
];

// Age structure 2024, percent of population (BPS).
export const AGE_GROUPS = [
  { group: '0–14 years', value: 24.7 },
  { group: '15–24 years', value: 16.6 },
  { group: '25–54 years', value: 42.1 },
  { group: '55–64 years', value: 10.6 },
  { group: '65+ years', value: 6.0 },
];

// Real GDP growth, percent per year (BPS National Accounts).
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
];

// GDP by sector, percent of GDP, 2024 (BPS).
export const GDP_SECTORS = [
  { sector: 'Manufacturing', value: 18.9 },
  { sector: 'Wholesale & retail trade', value: 13.0 },
  { sector: 'Agriculture, forestry & fishing', value: 11.9 },
  { sector: 'Construction', value: 10.0 },
  { sector: 'Mining & quarrying', value: 8.0 },
  { sector: 'Transport & storage', value: 5.3 },
  { sector: 'Information & communication', value: 4.3 },
  { sector: 'Financial services', value: 4.2 },
  { sector: 'Accommodation & food', value: 2.6 },
  { sector: 'Other services', value: 21.8 },
];

// CPI inflation by spending group, year-on-year, December 2024 (BPS).
export const CPI_GROUPS = [
  { group: 'Food, beverages & tobacco', value: 2.41 },
  { group: 'Clothing & footwear', value: 1.02 },
  { group: 'Housing, water & energy', value: 0.58 },
  { group: 'Household equipment', value: 1.35 },
  { group: 'Health', value: 1.64 },
  { group: 'Transport', value: 0.96 },
  { group: 'Information & communication', value: -0.18 },
  { group: 'Recreation & culture', value: 1.12 },
  { group: 'Education', value: 1.83 },
  { group: 'Restaurants & hotels', value: 2.03 },
  { group: 'Personal care & other', value: 2.36 },
];

// Employment by sector, percent of workers, August 2024 (BPS Sakernas).
export const EMPLOYMENT_SECTORS = [
  { sector: 'Agriculture', value: 28.6 },
  { sector: 'Trade', value: 19.1 },
  { sector: 'Manufacturing', value: 13.7 },
  { sector: 'Construction', value: 8.1 },
  { sector: 'Community & personal services', value: 17.3 },
  { sector: 'Transport & communication', value: 5.9 },
  { sector: 'Finance & business services', value: 3.4 },
  { sector: 'Mining & utilities', value: 3.9 },
];

// Provinces: population in millions, 2024 mid-year estimate (BPS).
// The table lists the 24 largest of Indonesia's 38 provinces; the full
// 38-province file is downloadable from the Datasets page.
export const PROVINCES = [
  { name: 'West Java', pop: 50.35, growth: 1.02, density: 1423, capital: 'Bandung' },
  { name: 'East Java', pop: 41.81, growth: 0.54, density: 873, capital: 'Surabaya' },
  { name: 'Central Java', pop: 37.89, growth: 0.68, density: 1159, capital: 'Semarang' },
  { name: 'North Sumatra', pop: 15.59, growth: 0.95, density: 214, capital: 'Medan' },
  { name: 'Banten', pop: 12.43, growth: 1.21, density: 1287, capital: 'Serang' },
  { name: 'Jakarta', pop: 10.56, growth: 0.48, density: 15927, capital: 'Jakarta' },
  { name: 'South Sulawesi', pop: 9.36, growth: 0.86, density: 200, capital: 'Makassar' },
  { name: 'Lampung', pop: 9.33, growth: 0.91, density: 270, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', pop: 8.84, growth: 0.98, density: 97, capital: 'Palembang' },
  { name: 'Riau', pop: 6.86, growth: 1.18, density: 79, capital: 'Pekanbaru' },
  { name: 'West Sumatra', pop: 5.76, growth: 0.85, density: 137, capital: 'Padang' },
  { name: 'East Nusa Tenggara', pop: 5.65, growth: 1.32, density: 117, capital: 'Kupang' },
  { name: 'West Nusa Tenggara', pop: 5.65, growth: 1.08, density: 304, capital: 'Mataram' },
  { name: 'Aceh', pop: 5.55, growth: 1.12, density: 96, capital: 'Banda Aceh' },
  { name: 'West Kalimantan', pop: 5.80, growth: 1.05, density: 39, capital: 'Pontianak' },
  { name: 'South Kalimantan', pop: 4.30, growth: 0.99, density: 111, capital: 'Banjarmasin' },
  { name: 'Bali', pop: 4.34, growth: 0.74, density: 751, capital: 'Denpasar' },
  { name: 'East Kalimantan', pop: 4.05, growth: 1.86, density: 32, capital: 'Samarinda' },
  { name: 'Special Region of Yogyakarta', pop: 3.76, growth: 0.82, density: 1203, capital: 'Yogyakarta' },
  { name: 'Jambi', pop: 3.68, growth: 1.06, density: 73, capital: 'Jambi' },
  { name: 'Papua', pop: 1.10, growth: 1.41, density: 13, capital: 'Jayapura' },
  { name: 'Maluku', pop: 2.00, growth: 1.15, density: 43, capital: 'Ambon' },
  { name: 'North Maluku', pop: 1.47, growth: 1.62, density: 46, capital: 'Sofifi' },
  { name: 'Bengkulu', pop: 2.06, growth: 1.09, density: 104, capital: 'Bengkulu' },
];

// Foreign trade 2024 (BPS): exports US$264.7bn, imports US$233.7bn.
export const TRADE = [
  { item: 'Exports (FOB)', value: 264.7, unit: 'US$ bn', change: '+2.3% on 2023' },
  { item: 'Imports (CIF)', value: 233.7, unit: 'US$ bn', change: '+0.9% on 2023' },
  { item: 'Trade balance', value: 31.0, unit: 'US$ bn surplus', change: 'Surplus for a fifth year' },
  { item: 'Non-oil & gas exports', value: 248.8, unit: 'US$ bn', change: '94% of all exports' },
];

// Latest and upcoming statistical releases.
export const RELEASES = [
  { date: '1 Dec 2026', title: 'Inflation, November 2026', status: 'Upcoming', topic: 'Prices' },
  { date: '5 Nov 2026', title: 'Economic growth, Q3 2026: 5.12% year-on-year', status: 'Published', topic: 'Economy' },
  { date: '5 Nov 2026', title: 'Labour force situation, August 2026', status: 'Published', topic: 'Jobs' },
  { date: '15 Oct 2026', title: 'Poverty profile, March 2026', status: 'Published', topic: 'Population' },
  { date: '1 Oct 2026', title: 'Exports and imports, September 2026', status: 'Published', topic: 'Trade' },
  { date: '15 Sep 2026', title: 'Human Development Index 2025', status: 'Published', topic: 'Population' },
];

// Downloadable datasets (files live under app/data/).
export const DATASETS = [
  { file: 'population-provinces.csv', title: 'Population by province, 2024', rows: 38, updated: 'Aug 2024', topic: 'Population', size: '2.1 KB' },
  { file: 'gdp-growth.csv', title: 'Real GDP growth, 2015–2024', rows: 10, updated: 'Feb 2025', topic: 'Economy', size: '0.6 KB' },
  { file: 'cpi-groups.csv', title: 'CPI inflation by spending group, Dec 2024', rows: 11, updated: 'Jan 2025', topic: 'Prices', size: '0.9 KB' },
  { file: 'employment-sectors.csv', title: 'Employment by sector, Aug 2024', rows: 8, updated: 'Nov 2024', topic: 'Jobs', size: '0.7 KB' },
];

// Explainer cards for the home page.
export const EXPLAINERS = [
  { title: 'How big is Indonesia?', body: '281.6 million people live across 17,500 islands in 38 provinces — the world’s fourth most populous country. Java alone holds 56% of them on 7% of the land.', route: '#/population' },
  { title: 'How fast is the economy growing?', body: 'Real GDP grew 5.03% in 2024, the ninth straight year near 5% outside the pandemic dip of −2.07% in 2020. Manufacturing is the largest single sector at 18.9% of GDP.', route: '#/economy' },
  { title: 'How many people have jobs?', body: '149.4 million people were working in August 2024 and 7.5 million were looking for work — an open unemployment rate of 4.76%, the lowest since 1998.', route: '#/labour' },
  { title: 'What does life cost?', body: 'Consumer prices rose 1.57% in the year to December 2024. Food is the biggest driver for most households: it is 2.41% dearer than a year earlier.', route: '#/prices' },
];
