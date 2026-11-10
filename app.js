const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Ouvrir le menu" : "Fermer le menu");
  primaryNav.classList.toggle("is-open", !isExpanded);
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    primaryNav.classList.remove("is-open");
  }
});

document.querySelector("#year").textContent = String(new Date().getFullYear());

const menuSearch = document.querySelector("#menu-search");
const menuFilters = [...document.querySelectorAll(".menu-filter")];
const menuGroups = [...document.querySelectorAll(".menu-group")];
const menuResult = document.querySelector("#menu-result");
const menuEmpty = document.querySelector("#menu-empty");
let activeMenuCategory = "all";

function normalizeText(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
}

function filterMenu() {
  const searchTerm = normalizeText(menuSearch.value.trim());
  let visibleCount = 0;

  menuGroups.forEach((group) => {
    let groupCount = 0;
    const categoryMatches = activeMenuCategory === "all" || group.dataset.menuCategory === activeMenuCategory;

    group.querySelectorAll(".menu-item").forEach((item) => {
      const matches = categoryMatches && normalizeText(item.textContent).includes(searchTerm);
      item.hidden = !matches;
      if (matches) {
        groupCount += 1;
        visibleCount += 1;
      }
    });

    group.hidden = groupCount === 0;
  });

  menuResult.textContent = `${visibleCount} ${visibleCount > 1 ? "articles affichés" : "article affiché"}`;
  menuEmpty.hidden = visibleCount > 0;
}

menuFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    activeMenuCategory = filter.dataset.menuFilter;
    menuFilters.forEach((button) => {
      const isActive = button === filter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    filterMenu();
  });
});
menuSearch.addEventListener("input", filterMenu);
filterMenu();

const reservationForm = document.querySelector("#reservation-form");
const reservationLocation = document.querySelector("#reservation-location");
const reservationDate = document.querySelector("#reservation-date");
const reservationStatus = document.querySelector("#reservation-status");
const localToday = new Date();
reservationDate.min = [
  localToday.getFullYear(),
  String(localToday.getMonth() + 1).padStart(2, "0"),
  String(localToday.getDate()).padStart(2, "0"),
].join("-");

reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;

  const formData = new FormData(reservationForm);
  const locations = {
    lome: { label: "Lomé — Hanoukopé", whatsapp: "22879519797" },
    cotonou: { label: "Cotonou — Haie Vive", whatsapp: "2290198314314" },
  };
  const selectedLocation = locations[formData.get("location")];
  const date = new Date(`${formData.get("date")}T12:00:00`);
  const formattedDate = new Intl.DateTimeFormat("fr-FR", { dateStyle: "full" }).format(date);
  const message = [
    `Bonjour 3.14 Atelier ${selectedLocation.label}, je souhaite réserver une table.`,
    `Date : ${formattedDate}`,
    `Heure : ${formData.get("time")}`,
    `Nombre de personnes : ${formData.get("guests")}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/${selectedLocation.whatsapp}?text=${encodeURIComponent(message)}`;
  const whatsappWindow = window.open(whatsappUrl, "_blank");
  if (whatsappWindow) whatsappWindow.opener = null;

  reservationStatus.replaceChildren(
    document.createTextNode("Votre message de réservation est prêt. Si WhatsApp ne s'est pas ouvert, "),
  );
  const fallbackLink = document.createElement("a");
  fallbackLink.href = whatsappUrl;
  fallbackLink.target = "_blank";
  fallbackLink.rel = "noopener noreferrer";
  fallbackLink.textContent = "ouvrir WhatsApp";
  reservationStatus.append(fallbackLink, document.createTextNode("."));
  reservationStatus.hidden = false;
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("figure img");
const lightboxCaption = lightbox.querySelector("figcaption");
const lightboxCount = lightbox.querySelector(".lightbox-count");
let activeImageIndex = 0;
let previouslyFocusedElement = null;

function showGalleryImage(index) {
  activeImageIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[activeImageIndex];
  lightboxImage.src = item.dataset.image;
  lightboxImage.alt = item.querySelector("img").alt;
  lightboxCaption.textContent = item.dataset.caption;
  lightboxCount.textContent = `${activeImageIndex + 1} / ${galleryItems.length}`;
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    previouslyFocusedElement = item;
    showGalleryImage(index);
    lightbox.showModal();
  });
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showGalleryImage(activeImageIndex - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showGalleryImage(activeImageIndex + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => previouslyFocusedElement?.focus());
document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;
  if (event.key === "Escape") {
    event.preventDefault();
    lightbox.close();
    return;
  }
  if (event.key === "ArrowLeft") showGalleryImage(activeImageIndex - 1);
  if (event.key === "ArrowRight") showGalleryImage(activeImageIndex + 1);
});
