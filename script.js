// Funcionalidad del modal para las imágenes
function openModal(imageSrc, title, description) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");

  modalImage.src = `assets/img/${imageSrc}`;
  modalTitle.textContent = title;
  modalDescription.textContent = description;

  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevenir scroll cuando el modal está abierto
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Restaurar scroll
}

// Cerrar modal al hacer clic fuera de la imagen
window.onclick = function (event) {
  const modal = document.getElementById("imageModal");
  if (event.target == modal) {
    closeModal();
  }
};

// Cerrar modal con la tecla Escape
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Funcionalidad del formulario de contacto
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;

  // Simular envío del formulario
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Enviando...";
  submitBtn.disabled = true;

  // Simular una llamada a API (en un caso real, aquí iría el código para enviar el email)
  setTimeout(() => {
    alert(
      `¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente. Me pondré en contacto contigo pronto.`
    );

    // Resetear formulario
    e.target.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// Smooth scrolling para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Efecto de parallax para la sección hero (opcional)
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (hero && heroContent) {
    const rate = scrolled * -0.5;
    heroContent.style.transform = `translateY(${rate}px)`;
  }
});

// Animación al cargar la página
window.addEventListener("load", function () {
  // Animar elementos al hacer scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar elementos para animación
  document
    .querySelectorAll(".gallery-item, .about-content, .contact-content")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
});

// Funcionalidad para mostrar información adicional de las obras
const artworks = {
  "Diana_V1.jpg": {
    title: "Diana",
    description:
      "Una representación mitológica que captura la esencia de la diosa de la caza y la naturaleza. Esta obra explora la conexión entre lo divino y lo terrenal.",
    technique: "Acrílico sobre lienzo",
    size: "60x80 cm",
    year: "2024",
  },
  "Quijote_V1.jpg": {
    title: "Quijote",
    description:
      "Inspirado en el ingenioso hidalgo, una obra que representa la lucha contra molinos de viento y la búsqueda de ideales. Una metáfora de la perseverancia.",
    technique: "Óleo sobre lienzo",
    size: "50x70 cm",
    year: "2024",
  },
  "Reloj_V1.jpg": {
    title: "Reloj",
    description:
      "Una reflexión sobre el tiempo y su paso inexorable, capturando la esencia del momento presente y la importancia de vivir el ahora.",
    technique: "Técnica mixta",
    size: "40x60 cm",
    year: "2024",
  },
};

// Mejorar la funcionalidad del modal con información detallada
function openModal(imageSrc, title, description) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");

  const artwork = artworks[imageSrc] || { title, description };

  modalImage.src = `assets/img/${imageSrc}`;
  modalTitle.textContent = artwork.title;
  modalDescription.textContent = artwork.description;

  // Agregar información adicional si está disponible
  if (artwork.technique || artwork.size || artwork.year) {
    let additionalInfo = '<div class="artwork-details">';
    if (artwork.technique)
      additionalInfo += `<p><strong>Técnica:</strong> ${artwork.technique}</p>`;
    if (artwork.size)
      additionalInfo += `<p><strong>Dimensiones:</strong> ${artwork.size}</p>`;
    if (artwork.year)
      additionalInfo += `<p><strong>Año:</strong> ${artwork.year}</p>`;
    additionalInfo += "</div>";

    modalDescription.innerHTML = artwork.description + additionalInfo;
  }

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Theme switcher
const themeSwitch = document.getElementById('checkbox');
const body = document.body;

// Apply the cached theme on reload
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === 'dark-mode') {
        themeSwitch.checked = true;
    }
} else {
    body.classList.add('light-mode');
}

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});
