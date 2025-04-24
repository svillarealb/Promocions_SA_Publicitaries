let currentIndex = 0;
let projects = [];

fetch("/Promocions_SA_Publicitaries/PHP/carrusel.php")
  .then((res) => res.json())
  .then((data) => {
    if (data.length === 0) {
      document.getElementById("no-projects").style.display = "flex";
      return;
    }

    projects = data;
    renderCarousel();
    startAutoSlide();
  });

function renderCarousel() {
  const cardsContainer = document.getElementById("carousel-cards");
  cardsContainer.innerHTML = "";

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const card = document.createElement("div");
    card.className = "carousel-card";

    if (i === currentIndex) {
      card.classList.add("active");
    } else if (i === (currentIndex - 1 + projects.length) % projects.length) {
      card.classList.add("prev");
    } else if (i === (currentIndex + 1) % projects.length) {
      card.classList.add("next");
    }

    const img = document.createElement("img");
    img.src = project.imagen;
    img.alt = project.titulo;
    img.setAttribute("data-title", project.titulo);
    img.setAttribute("data-description", project.descripcion);

    // Obrir modal al fer clic
    img.addEventListener("click", () => {
      openCarruselModal(project.imagen, project.titulo, project.descripcion);
    });

    card.appendChild(img);
    cardsContainer.appendChild(card);
  }

  // Actualitza text
  document.getElementById("carousel-title").innerText = projects[currentIndex].titulo;
  document.getElementById("carousel-description").innerText = projects[currentIndex].descripcion;
}

// Botons de navegació
document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  updateCarousel("right");
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % projects.length;
  updateCarousel("left");
});

// Autoplay cada 10s
function startAutoSlide() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % projects.length;
    updateCarousel("left");
  }, 10000);
}

// Actualitza les targetes visualment
function updateCarousel(direction = null) {
  const cards = document.querySelectorAll(".carousel-card");
  if (cards.length === 0) return;

  cards.forEach(card => {
    card.classList.remove("prev", "active", "next", "slide-left", "slide-right");
  });

  const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
  const nextIndex = (currentIndex + 1) % cards.length;

  cards[prevIndex].classList.add("prev");
  cards[currentIndex].classList.add("active");
  cards[nextIndex].classList.add("next");

  if (direction === "left") {
    cards[currentIndex].classList.add("slide-left");
  } else if (direction === "right") {
    cards[currentIndex].classList.add("slide-right");
  }

  document.getElementById("carousel-title").innerText = projects[currentIndex].titulo;
  document.getElementById("carousel-description").innerText = projects[currentIndex].descripcion;
}

// Obrir el modal
function openCarruselModal(imgSrc, title, description) {
    if (!imgSrc) return;
  const modal = document.getElementById("modal-carrusel");
  const modalImg = document.getElementById("modal-carrusel-img");
  const modalTitle = document.getElementById("modal-carrusel-title");
  const modalDescription = document.getElementById("modal-carrusel-description");

  modal.style.display = "flex";
  modalImg.src = imgSrc;
  modalTitle.textContent = title;
  modalDescription.textContent = description;
}

// Tancar modal
document.querySelector(".modal-carrusel-close").addEventListener("click", () => {
  document.getElementById("modal-carrusel").style.display = "none";
});

window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal-carrusel");
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
