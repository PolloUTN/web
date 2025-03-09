document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.querySelector(".carousel-button.prev");
    const nextButton = document.querySelector(".carousel-button.next");

    let currentIndex = 0;
    const slidesToShow = 3;
    const totalSlides = slides.length;

    slides.forEach((slide) => {
        slide.style.flex = `0 0 ${100 / slidesToShow}%`;
    });

  // Posición del carousel
    function updateCarousel(direction) {
        const offset = -(currentIndex * (100 / slidesToShow));
        slides.forEach((slide, index) => {
            if (index >= currentIndex && index < currentIndex + slidesToShow) {
                slide.style.display = "block";
                slide.style.flex = `0 0 ${100 / slidesToShow}%`;
              // Aplicar la animación según la dirección
                if (direction === 1) {
                    slide.classList.add("slide-in-right");
                } else if (direction === -1) {
                    slide.classList.add("slide-in-left");
                }
            } else {
                slide.style.display = "none";
              // Remover las clases de animación para los slides que no se muestran
                slide.classList.remove("slide-in-right", "slide-in-left");
            }
        });
    }

    function moveSlides(direction) {
        const maxIndex = totalSlides - slidesToShow;

        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = maxIndex;
        } else if (currentIndex > maxIndex) {
            currentIndex = 0;
        }

        updateCarousel(direction);
    }

  // Botones
    prevButton.addEventListener("click", () => moveSlides(-1));
    nextButton.addEventListener("click", () => moveSlides(1));

  updateCarousel(0); // Inicializar el carrusel sin animación
});