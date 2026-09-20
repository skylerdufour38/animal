const imagePool = {
  wolf: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=900&q=85',
  fox: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=900&q=85',
  deer: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=900&q=85',
  bear: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=900&q=85',
  chipmunk: 'https://images.unsplash.com/photo-1500479694472-551d1fb6258d?auto=format&fit=crop&w=900&q=85',
  bird: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=85',
  owl: 'https://images.unsplash.com/photo-1579658364502-1e4c9c5aa9b4?auto=format&fit=crop&w=900&q=85',
  insect: 'https://images.unsplash.com/photo-1559253664-ca249d4608c6?auto=format&fit=crop&w=900&q=85'
};
const audioPool = {
  wolf: 'https://actions.google.com/sounds/v1/animals/wolf_howl.ogg',
  fox: 'https://actions.google.com/sounds/v1/animals/fox_bark.ogg',
  bear: 'https://actions.google.com/sounds/v1/animals/bear_growl.ogg',
  deer: 'https://actions.google.com/sounds/v1/animals/deer.ogg'
};

const animals = [
  ['wolf','Gray Wolf','Canis lupus','Mammals','Upper Peninsula',"Michigan's largest native land predator. Wolves typically live in packs and have a strong, distinctive howl.",'A long, carrying howl'],
  ['fox','Red Fox','Vulpes vulpes','Mammals','Woodlands & fields','A clever, adaptable hunter found across Michigan’s forests, farms, and suburban edges.','A sharp bark and yelp'],
  ['deer','White-tailed Deer','Odocoileus virginianus','Mammals','Statewide',"Michigan's most familiar large mammal, named for the bright underside of its raised tail.",'A soft, nasal snort'],
  ['bear','Black Bear','Ursus americanus','Mammals','Northern forests',"Michigan's only bear species spends its summers roaming forests in search of berries, nuts, and insects.",'A low huff and woof'],
  ['chipmunk','Eastern Chipmunk','Tamias striatus','Mammals','Woodland edges','This tiny striped forager fills its cheek pouches with seeds before darting back to its burrow.','A quick, high chip'],
  ['squirrel','Red Squirrel','Tamiasciurus hudsonicus','Mammals','Conifer forests','An energetic guardian of the pine cone stash, often heard before it is spotted.','A chattering trill'],
  ['coyote','Coyote','Canis latrans','Mammals','Open country','Coyotes are resourceful, social hunters that have expanded into nearly every Michigan habitat.','A yip-heavy chorus'],
  ['raccoon','Northern Raccoon','Procyon lotor','Mammals','Rivers & neighborhoods','A nocturnal omnivore with nimble paws and a talent for thriving alongside people.','A chittering chatter'],
  ['bobcat','Bobcat','Lynx rufus','Mammals','Quiet forests','This secretive, short-tailed wild cat moves quietly through Michigan’s thick cover.','A growl and scream'],
  ['vole','Meadow Vole','Microtus pennsylvanicus','Mammals','Meadows & marshes','A small, grass-loving rodent that makes runways through meadow vegetation.','A quiet squeak'],
  ['moose','Moose','Alces alces','Mammals','Northern wetlands','The largest member of Michigan’s deer family, at home among quiet lakes and cedar swamps.','A deep, nasal moan'],
  ['loon','Common Loon','Gavia immer','Birds','Inland lakes','The haunting yodel of the common loon is one of Michigan’s most recognizable lake sounds.','A haunting yodel'],
  ['owl','Barred Owl','Strix varia','Birds','Mature forests','A patient nighttime hunter whose eight-note call sounds like a question: who-cooks-for-you?','A rolling hoot'],
  ['robin','American Robin','Turdus migratorius','Birds','Backyards & parks','One of Michigan’s earliest spring singers, with a clear, cheerful song at dawn.','A bright phrase of notes'],
  ['warbler','Yellow Warbler','Setophaga petechia','Birds','Shrublands','A tiny yellow songbird that sings from willow thickets near water.','Sweet-sweet-sweet song'],
  ['kingfisher','Belted Kingfisher','Megaceryle alcyon','Birds','Rivers & ponds','Watch for its rattling call as it patrols a waterway from a favorite perch.','A dry rattle'],
  ['sandhill','Sandhill Crane','Antigone canadensis','Birds','Wet meadows','A tall, elegant bird with a rolling call that can carry for miles across open marshes.','A rolling trumpeting call'],
  ['cicada','Dog-day Cicada','Neotibicen canicularis','Insects','Summer woodlands','Its electric summer chorus rises from the trees on the warmest afternoons.','A long electric buzz'],
  ['cricket','Field Cricket','Gryllus pennsylvanicus','Insects','Fields & lawns','Field crickets rub their wings together to make a familiar nighttime rhythm.','A steady chirp'],
  ['katydid','Common True Katydid','Pterophylla camellifolia','Insects','Leafy forests','Hidden in the canopy, katydids call on warm nights with a raspy, rhythmic song.','A repeated katy-did'],
  ['cicada2','Periodical Cicada','Magicicada septendecim','Insects','Southern woodlands','After years underground, periodical cicadas emerge together in a spectacular noisy chorus.','A rising chorus'],
  ['treefrog','Gray Treefrog','Hyla versicolor','Insects','Ponds & gardens','Though not an insect, this tiny amphibian earns a place in the night chorus with its musical trill.','A soft, pulsing trill']
].map(([id,name,scientificName,category,region,description,call]) => ({
  id,
  name,
  scientificName,
  category,
  region,
  description,
  call,
  image: imagePool[id] || imagePool[category === 'Birds' ? 'bird' : category === 'Insects' ? 'insect' : 'chipmunk'],
  hasAudio: Boolean(audioPool[id])
}));

const list = document.querySelector('#species-list');
const detail = document.querySelector('#species-detail');
const count = document.querySelector('#species-count');
let selectedCategory = 'Mammals';
let selectedId = 'wolf';
let isPlaying = false;
let isMuted = false;
let activeAudio;

function categoryAnimals() { return animals.filter((animal) => animal.category === selectedCategory); }

function renderList() {
  const visible = categoryAnimals();
  count.textContent = visible.length;
  list.innerHTML = visible.map((animal, index) => `
    <button class="species-item ${animal.id === selectedId ? 'active' : ''}" type="button" data-id="${animal.id}">
      <img class="species-thumb" src="${animal.image}" alt="" />
      <span><span class="species-name">${animal.name}</span><span class="species-latin">${animal.scientificName}</span></span>
      <span class="item-arrow" aria-hidden="true">${index === 0 ? '↗' : '›'}</span>
    </button>`).join('');
  list.querySelectorAll('.species-item').forEach((button) => button.addEventListener('click', () => {
    selectedId = button.dataset.id;
    isPlaying = false;
    renderList();
    renderDetail();
  }));
}

function renderDetail() {
  const animal = animals.find((entry) => entry.id === selectedId) || categoryAnimals()[0];
  if (!animal) return;
  const audioLabel = animal.hasAudio ? (isPlaying ? '❚❚ Pause' : '▶ Play sound') : 'Sound coming soon';
  detail.innerHTML = `
    <div class="detail-image" style="background-image:url('${animal.image}')"><span class="detail-index">${String(animals.indexOf(animal) + 1).padStart(2, '0')} / ${String(animals.length).padStart(2, '0')}</span></div>
    <div class="detail-copy"><p class="eyebrow">${animal.region}</p><h3>${animal.name}</h3><p class="latin">${animal.scientificName}</p><p class="description">${animal.description}</p><div class="call-note">Signature call<strong>${animal.call}</strong></div><div class="sound-wave ${isPlaying ? '' : 'paused'}" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="audio-controls"><button class="play-button" type="button" aria-pressed="${isPlaying}" ${animal.hasAudio ? '' : 'disabled'}>${audioLabel}</button><button class="volume-button" type="button" aria-label="${isMuted ? 'Turn sound on' : 'Mute sound'}" aria-pressed="${isMuted}">${isMuted ? '◌' : '◖'}</button><button class="next-button" type="button" aria-label="Next animal">→</button></div></div>`;
  detail.querySelector('.play-button').addEventListener('click', () => {
    if (!animal.hasAudio) return;
    if (activeAudio) activeAudio.pause();
    if (!isPlaying && audioPool[animal.id]) {
      activeAudio = new Audio(audioPool[animal.id]);
      activeAudio.volume = isMuted ? 0 : 1;
      activeAudio.addEventListener('ended', () => { isPlaying = false; renderDetail(); }, { once: true });
      activeAudio.play().then(() => {
        isPlaying = true;
        renderDetail();
      }).catch(() => {
        isPlaying = false;
        renderDetail();
      });
      return;
    }
    isPlaying = !isPlaying;
    renderDetail();
  });
  detail.querySelector('.volume-button').addEventListener('click', () => {
    isMuted = !isMuted;
    if (activeAudio) activeAudio.volume = isMuted ? 0 : 1;
    renderDetail();
  });
  detail.querySelector('.next-button').addEventListener('click', nextAnimal);
}

function nextAnimal() {
  const visible = categoryAnimals();
  const nextIndex = (visible.findIndex((animal) => animal.id === selectedId) + 1) % visible.length;
  if (activeAudio) activeAudio.pause();
  selectedId = visible[nextIndex].id;
  isPlaying = false;
  renderList();
  renderDetail();
}

document.querySelectorAll('.category-tab').forEach((tab) => tab.addEventListener('click', () => {
  selectedCategory = tab.dataset.category;
  selectedId = categoryAnimals()[0]?.id;
  document.querySelectorAll('.category-tab').forEach((item) => { item.classList.toggle('active', item === tab); item.setAttribute('aria-selected', item === tab); });
  renderList();
  renderDetail();
}));

document.querySelector('.sound-toggle').addEventListener('click', (event) => {
  const button = event.currentTarget;
  const enabled = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', enabled);
  button.innerHTML = enabled ? '<span aria-hidden="true">◉</span> Ambient on' : '<span aria-hidden="true">◌</span> Ambient sound';
});

renderList();
renderDetail();