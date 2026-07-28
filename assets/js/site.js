(function () {
  const CATEGORY_LABELS = {
    play: "Play",
    workshop: "Workshop",
    home: "Home",
    tech: "Tech",
  };

  const grid = document.getElementById("project-grid");
  const resultCount = document.getElementById("result-count");
  const noResults = document.getElementById("no-results");
  const searchInput = document.getElementById("project-search");
  const sortSelect = document.getElementById("project-sort");
  const chips = document.querySelectorAll(".chip");

  let projects = [];
  let activeCategory = "all";

  function render() {
    const query = searchInput.value.trim().toLowerCase();

    let filtered = projects.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query) ||
        (p.summary && p.summary.toLowerCase().includes(query));
      return matchesCategory && matchesQuery;
    });

    if (sortSelect.value === "recent") {
      filtered = filtered.slice().sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : -1));
    } else {
      filtered = filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
    }

    grid.innerHTML = filtered
      .map((p) => {
        const label = CATEGORY_LABELS[p.category] || p.category;
        return `
          <article class="project-card">
            <a href="projects/${p.slug}/">
              <img src="${p.thumb}" alt="${p.title}" loading="lazy">
              <div class="card-body">
                <span class="card-category">${label}</span>
                <h3>${p.title}</h3>
              </div>
            </a>
          </article>
        `;
      })
      .join("");

    resultCount.textContent = `Showing ${filtered.length} of ${projects.length} projects`;
    noResults.hidden = filtered.length !== 0;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      activeCategory = chip.dataset.category;
      render();
    });
  });

  searchInput.addEventListener("input", render);
  sortSelect.addEventListener("change", render);

  const urlCategory = new URLSearchParams(window.location.search).get("category");
  if (urlCategory) {
    const matchingChip = Array.from(chips).find((chip) => chip.dataset.category === urlCategory);
    if (matchingChip) {
      chips.forEach((c) => c.classList.remove("is-active"));
      matchingChip.classList.add("is-active");
      activeCategory = urlCategory;
    }
  }

  fetch("data/projects.json")
    .then((res) => res.json())
    .then((data) => {
      projects = data;
      render();
    });
})();
