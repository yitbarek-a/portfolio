// Load project data dynamically
fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    const gallery = document.getElementById('project-gallery');
    const filters = document.getElementById('project-filters');
    let activeFilter = 'all';

    // Build filter buttons
    const tags = ['all', ...new Set(data.flatMap(p => p.tags))];
    tags.forEach(tag => {
      const btn = document.createElement('button');
      btn.textContent = tag;
      btn.className = 'filter-btn';
      btn.addEventListener('click', () => {
        activeFilter = tag;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects();
      });
      if(tag === 'all') btn.classList.add('active');
      filters.appendChild(btn);
    });

    function renderProjects() {
      gallery.innerHTML = '';
      const filtered = activeFilter === 'all' ? data : data.filter(p => p.tags.includes(activeFilter));
      filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <h3 class="font-semibold text-lg text-blue-900">${project.title}</h3>
          <p class="text-sm mt-1">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
        `;
        gallery.appendChild(card);
      });
    }

    renderProjects();
  })
  .catch(err => console.error('Error loading projects:', err));
