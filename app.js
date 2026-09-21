const apps = [
  { name: 'Animal Sounds', bundleId: 'com.smartbabyapps.animalsounds', version: '2.0', platform: 'iOS', minimumOS: '3.1', file: 'Animal Sounds 2.0.ipa' },
  { name: 'SoundTouch', bundleId: 'com.yourcompany.SoundTouch', version: '1.4', platform: 'iOS', minimumOS: '3.0', file: 'SoundTouch 1.4.ipa' },
  { name: 'Tozzle', bundleId: 'com.nodeflexion.Tozzle', version: '3.7', platform: 'iOS', minimumOS: '3.1.3', file: 'Tozzle 3.7.ipa' },
  { name: 'AutismXpress', bundleId: 'X7WS995LSR.com.StudioEmotion.AutismXpress', version: '1.0', platform: 'iOS', minimumOS: '3.1.2', file: 'AutismXpress 1.0.ipa' },
  { name: 'Lunchbox', bundleId: 'com.thup.MonkeyPreschool', version: '1.4', platform: 'iOS', minimumOS: '3.0', file: 'Lunchbox 1.4.ipa' },
  { name: 'Peek-a-Zoo', bundleId: 'com.duckduckmoosedesign.peekazoo', version: '1.1.1', platform: 'iOS', minimumOS: '3.0', file: 'Peek-a-Zoo 1.1.1.ipa' },
  { name: 'Michigan Nature Sounds', bundleId: 'com.yourcompany.MichiganNatureSounds', version: '1.0', platform: 'iOS', minimumOS: '3.0', file: 'Michigan Nature Sounds 1.0.ipa' },
  { name: 'Peek-a-Zoo', bundleId: 'com.tbd.pazCLL', version: '1.0', platform: 'iOS', minimumOS: '3.0', file: 'Peek-a-Zoo 1.0.ipa' },
  { name: 'Artsee', bundleId: 'com.britejar.artsee', version: '1.1', platform: 'iOS', minimumOS: '2.2', file: 'Artsee 1.1.ipa' },
  { name: 'Angry Birds', bundleId: 'com.rovio.AngryBirdsHalloween', version: '1.5.3', platform: 'iOS', minimumOS: '3.0', file: 'Angry Birds 1.5.3.ipa' },
  { name: 'Farm Flip Fun', bundleId: 'lv.yapp.farmflipfun', version: '1.0', platform: 'iOS', minimumOS: '3.0', file: 'Farm Flip Fun 1.0.ipa' },
  { name: 'Farm Story', bundleId: 'com.teamlava.farmstory', version: '1.2', platform: 'iOS', minimumOS: '3.0', file: 'Farm Story 1.2.ipa' },
  { name: 'Stickers', bundleId: 'com.nightanddaystudios.ericcarlestickers', version: '1.0', platform: 'iOS', minimumOS: '5.0', file: 'Stickers 1.0.ipa' },
  { name: 'Forest', bundleId: 'com.nightanddaystudios.peekabooforest', version: '1.1.0', platform: 'iOS', minimumOS: '3.1.3', file: 'Forest 1.1.0.ipa' },
  { name: 'Virtuoso', bundleId: 'com.peterb.virtuosopianofree', version: '3.1.2', platform: 'iOS', minimumOS: '4.0', file: 'Virtuoso 3.1.2.ipa' },
  { name: 'ABC Tracer', bundleId: 'com.appzoo.ABCTracer', version: '1.8', platform: 'iOS', minimumOS: '2.2.1', file: 'ABC Tracer 1.8.ipa' },
  { name: 'Peek Wild', bundleId: 'com.nightanddaystudios.peekaboowild', version: '2.0.1', platform: 'iOS', minimumOS: '3.1.3', file: 'Peek Wild 2.0.1.ipa' },
  { name: 'Peekaboo', bundleId: 'com.nightanddaystudios.peekaboobarn', version: '2.0', platform: 'iOS', minimumOS: '2.2', file: 'Peekaboo 2.0.ipa' },
  { name: 'Finding Sight', bundleId: 'my.finding3', version: '2.1', platform: 'iOS', minimumOS: '3.2', file: 'Finding Sight 2.1.ipa' },
  { name: 'ArtikPix', bundleId: 'com.rinnapps.artikpix.iap', version: '1.2.4', platform: 'iOS', minimumOS: '3.1', file: 'ArtikPix 1.2.4.ipa' }
];

const state = {
  query: '',
  minOS: 'all',
  sort: 'name',
  selected: null
};

const searchInput = document.getElementById('searchInput');
const minOsFilter = document.getElementById('minOsFilter');
const sortFilter = document.getElementById('sortFilter');
const resetButton = document.getElementById('resetFilters');
const appList = document.getElementById('appList');
const appDetail = document.getElementById('appDetail');
const resultsBadge = document.getElementById('resultsBadge');
const statsCount = document.getElementById('statsCount');
const statsMin = document.getElementById('statsMin');
const statsLatest = document.getElementById('statsLatest');

function normalizeOS(rawValue) {
  const cleaned = String(rawValue || '').replace('iOS ', '').trim();
  const parts = cleaned.split('.').map(Number);
  while (parts.length < 3) parts.push(0);
  return parts[0] + (parts[1] / 10) + (parts[2] / 100);
}

function compareVersions(a, b) {
  return normalizeOS(a) - normalizeOS(b);
}

function getFilteredApps() {
  const query = state.query.trim().toLowerCase();
  const filtered = apps.filter((app) => {
    const matchesQuery = !query ||
      app.name.toLowerCase().includes(query) ||
      app.bundleId.toLowerCase().includes(query) ||
      app.file.toLowerCase().includes(query);

    const matchesOS = state.minOS === 'all' || compareVersions(app.minimumOS, state.minOS) >= 0;
    return matchesQuery && matchesOS;
  });

  filtered.sort((a, b) => {
    if (state.sort === 'version') return compareVersions(b.version, a.version);
    if (state.sort === 'ios') return compareVersions(a.minimumOS, b.minimumOS);
    return a.name.localeCompare(b.name);
  });

  return filtered;
}

function renderStats(list) {
  statsCount.textContent = String(list.length);
  if (!list.length) {
    statsMin.textContent = '0';
    statsLatest.textContent = '0';
    return;
  }

  const minVersion = Math.min(...list.map((app) => normalizeOS(app.minimumOS)));
  statsMin.textContent = minVersion.toFixed(1).replace('.0', '');
  statsLatest.textContent = list.reduce((max, current) => compareVersions(current.version, max.version) > 0 ? current : max, list[0]).version;
}

function renderList() {
  const visible = getFilteredApps();
  resultsBadge.textContent = `${visible.length} result${visible.length === 1 ? '' : 's'}`;
  renderStats(visible);

  if (!visible.length) {
    appList.innerHTML = '<div class="empty-state">No apps match the current search and filter settings.</div>';
    appDetail.innerHTML = '<div class="empty-state">Select an app to inspect metadata and download options.</div>';
    return;
  }

  if (!state.selected || !visible.some((app) => app.name === state.selected.name && app.bundleId === state.selected.bundleId)) {
    state.selected = visible[0];
  }

  appList.innerHTML = visible.map((app) => {
    const selectedClass = app.name === state.selected.name && app.bundleId === state.selected.bundleId ? 'selected' : '';
    return `
      <button class="app-card ${selectedClass}" type="button" data-name="${app.name}" data-bundle="${app.bundleId}">
        <div class="app-card-top">
          <div class="app-icon">${app.name.charAt(0).toUpperCase()}</div>
          <span class="app-version">v${app.version}</span>
        </div>
        <h3>${app.name}</h3>
        <div class="meta-line">
          <span>iOS</span>
          <strong>${app.minimumOS}+</strong>
        </div>
        <div class="meta-line">
          <span>Bundle</span>
          <strong>${app.bundleId}</strong>
        </div>
      </button>
    `;
  }).join('');

  appList.querySelectorAll('.app-card').forEach((button) => {
    button.addEventListener('click', () => {
      const app = visible.find((entry) => entry.name === button.dataset.name && entry.bundleId === button.dataset.bundle);
      if (app) {
        state.selected = app;
        renderList();
      }
    });
  });

  renderDetail();
}

function renderDetail() {
  const app = state.selected;

  if (!app) {
    appDetail.innerHTML = '<div class="empty-state">No app selected.</div>';
    return;
  }

  appDetail.innerHTML = `
    <div class="detail-card">
      <div class="detail-header">
        <div>
          <p class="eyebrow">Selected app</p>
          <h3>${app.name}</h3>
          <div class="bundle-label">${app.bundleId}</div>
        </div>
        <span class="detail-badge">v${app.version}</span>
      </div>

      <div class="detail-grid">
        <div class="detail-item">
          <span>Platform</span>
          <strong>${app.platform}</strong>
        </div>
        <div class="detail-item">
          <span>Minimum OS</span>
          <strong>iOS ${app.minimumOS}</strong>
        </div>
        <div class="detail-item">
          <span>Version</span>
          <strong>${app.version}</strong>
        </div>
        <div class="detail-item">
          <span>Archive File</span>
          <strong>${app.file}</strong>
        </div>
      </div>

      <a class="download-button" href="ipa/${encodeURIComponent(app.file)}" download="${app.file}">Download IPA</a>
    </div>
  `;
}

searchInput.addEventListener('input', (event) => {
  state.query = event.target.value;
  renderList();
});

minOsFilter.addEventListener('change', (event) => {
  state.minOS = event.target.value;
  renderList();
});

sortFilter.addEventListener('change', (event) => {
  state.sort = event.target.value;
  renderList();
});

resetButton.addEventListener('click', () => {
  state.query = '';
  state.minOS = 'all';
  state.sort = 'name';
  searchInput.value = '';
  minOsFilter.value = 'all';
  sortFilter.value = 'name';
  renderList();
});

renderList();
