document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
navToggle.addEventListener('click', () => navList.classList.toggle('open'));

fetch('aktuality.json')
  .then(res => res.json())
  .then(data => {
    data.sort((a, b) => new Date(b.datum) - new Date(a.datum));
    const container = document.getElementById('aktualityList');
    container.innerHTML = '';
    if (data.length === 0) {
      container.innerHTML = '<p>Zatím žádné aktuality.</p>';
      return;
    }
    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      const datum = new Date(item.datum).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
      card.innerHTML = `
        <span class="date">${datum}</span>
        <h3>${item.nadpis}</h3>
        <p>${item.text}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(() => {
    document.getElementById('aktualityList').innerHTML = '<p>Aktuality se nepodařilo načíst.</p>';
  });
