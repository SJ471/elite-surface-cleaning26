const year = document.getElementById("year");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const projectTabs = document.querySelectorAll(".project-tab");
const projectPanels = document.querySelectorAll(".project-panel");

year.textContent = new Date().getFullYear();

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  document.body.classList.toggle("menu-open", isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.querySelectorAll(".comparison").forEach((comparison) => {
  const slider = comparison.querySelector('input[type="range"]');

  const updateComparison = () => {
    comparison.style.setProperty("--position", `${slider.value}%`);
  };

  slider.addEventListener("input", updateComparison);
  updateComparison();
});

function showProject(selectedTab) {
  const targetId = selectedTab.dataset.project;

  projectTabs.forEach((tab) => {
    const selected = tab === selectedTab;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  projectPanels.forEach((panel) => {
    const selected = panel.id === targetId;
    panel.classList.toggle("active", selected);
    panel.hidden = !selected;
  });

  selectedTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

projectTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => showProject(tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + projectTabs.length) % projectTabs.length;
    projectTabs[nextIndex].focus();
    showProject(projectTabs[nextIndex]);
  });
});
