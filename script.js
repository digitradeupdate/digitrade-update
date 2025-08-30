// ---- SAMPLE DATA ----
const onlineWorks = [
  { title: "Aiki 1", short: "Short bayani 1", full: "Cikakken bayani na aikin 1", img:"https://via.placeholder.com/300x150" },
  { title: "Aiki 2", short: "Short bayani 2", full: "Cikakken bayani na aikin 2", img:"https://via.placeholder.com/300x150" }
];

const miningWorks = [
  { title: "Mining 1", short: "Short bayani Mining 1", full: "Cikakken bayani Mining 1", img:"https://via.placeholder.com/300x150" },
  { title: "Mining 2", short: "Short bayani Mining 2", full: "Cikakken bayani Mining 2", img:"https://via.placeholder.com/300x150" }
];

const tradingWorks = [
  { title: "Trading 1", short: "Short bayani Trading 1", full: "Cikakken bayani Trading 1", img:"https://via.placeholder.com/300x150" },
  { title: "Trading 2", short: "Short bayani Trading 2", full: "Cikakken bayani Trading 2", img:"https://via.placeholder.com/300x150" }
];

// ---- RENDER CARDS ----
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderCards(containerSelector, items) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = items.map(item => `
    <div class="card">
      <img src="${item.img}" alt="${escapeHtml(item.title)}">
      <h3>${escapeHtml(item.title)}</h3>
      <p class="card-short">${escapeHtml(item.short)}</p>
      <p class="card-full" style="display:none;">${escapeHtml(item.full)}</p>
      <button class="toggle-btn">Ƙara Bayani</button>
    </div>
  `).join('');

  // attach toggle events
  container.querySelectorAll('.card').forEach(card => {
    const btn = card.querySelector('.toggle-btn');
    const full = card.querySelector('.card-full');
    const short = card.querySelector('.card-short');
    btn.addEventListener('click', () => {
      if (full.style.display === 'none') {
        full.style.display = 'block';
        short.style.display = 'none';
        btn.textContent = "Rufe Bayani";
      } else {
        full.style.display = 'none';
        short.style.display = 'block';
        btn.textContent = "Ƙara Bayani";
      }
    });
  });
}

// Render sections
renderCards("#online-works .cards-container", onlineWorks);
renderCards("#mining .cards-container", miningWorks);
renderCards("#trading .cards-container", tradingWorks);

// ---- NAVIGATION ----
document.querySelectorAll('#side-nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- COMMENTS ----
const form = document.getElementById('commentForm');
const commentsList = document.getElementById('commentsList');

function loadComments() {
  const data = JSON.parse(localStorage.getItem('digitrade_comments') || '[]');
  commentsList.innerHTML = data.map(c => `
    <div class="comment">
      <strong>${escapeHtml(c.name)}</strong>
      <p>${escapeHtml(c.text)}</p>
      <small>${new Date(c.time).toLocaleString()}</small>
    </div>`).join('');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const text = document.getElementById('comment').value.trim();
  if (!name || !text) return;
  const existing = JSON.parse(localStorage.getItem('digitrade_comments') || '[]');
  existing.unshift({ name, text, time: Date.now() });
  localStorage.setItem('digitrade_comments', JSON.stringify(existing.slice(0, 50)));
  form.reset();
  loadComments();
});

loadComments();