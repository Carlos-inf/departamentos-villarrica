/* ==========================================================================
   LÓGICA DE CARRUSELES (Departamentos)
   ========================================================================== */
const departamentos = document.querySelectorAll(".espacio-carrusel");

departamentos.forEach((depto) => {
    const btnLeft = depto.querySelector(".btn-left"),
          btnRight = depto.querySelector(".btn-right"),
          slider = depto.querySelector(".carrusel"),
          sliderSection = depto.querySelectorAll(".slider-section"),
          contenedor = depto.querySelector(".contenedor-carrusel");

    let counter = 0;
    const size = 100; // Porcentaje de desplazamiento

    function updateSlider() {
        slider.style.transform = `translateX(-${counter * size}%)`;
    }

    function moveToRight() {
        if (counter >= sliderSection.length - 1) {
            counter = 0;
            // Quitamos transición para un salto instantáneo al inicio
            slider.style.transition = "none";
            updateSlider();
            // Forzamos un reflow para que el navegador capte el cambio
            setTimeout(() => {
                slider.style.transition = "transform ease .6s";
            }, 50);
        } else {
            slider.style.transition = "transform ease .6s";
            counter++;
            updateSlider();
        }
    }

    function moveToLeft() {
        if (counter <= 0) {
            counter = sliderSection.length - 1;
            slider.style.transition = "none";
            updateSlider();
            setTimeout(() => {
                slider.style.transition = "transform ease .6s";
            }, 50);
        } else {
            slider.style.transition = "transform ease .6s";
            counter--;
            updateSlider();
        }
    }

    // Eventos
    btnRight.addEventListener("click", moveToRight);
    btnLeft.addEventListener("click", moveToLeft);

    // Autoplay
    let autoPlay = setInterval(moveToRight, 5000); // 5 segundos para que de tiempo a ver la foto

    // Pausa al pasar el mouse
    contenedor.addEventListener("mouseenter", () => clearInterval(autoPlay));
    contenedor.addEventListener("mouseleave", () => {
        autoPlay = setInterval(moveToRight, 5000);
    });
});

/* ==========================================================================
   VISOR DE IMÁGENES (Áreas Comunes)
   ========================================================================== */
function ampliarImagen(elemento) {
    const modal = document.getElementById("visor-modal");
    const imgAmpliada = document.getElementById("img-ampliada");
    const captionText = document.getElementById("caption");

    if (modal && imgAmpliada) {
        modal.style.display = "flex";
        imgAmpliada.src = elemento.src;
        captionText.innerHTML = elemento.alt || "Galería Villarrica";
        document.body.style.overflow = "hidden"; // Evita scroll de fondo
    }
}

// Cerrar Modal (Delegación de eventos)
document.addEventListener("click", function (e) {
    const modal = document.getElementById("visor-modal");
    if (!modal) return;

    if (e.target.id === "visor-modal" || e.target.classList.contains("cerrar")) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Devuelve el scroll
    }
});

// Cerrar con Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const modal = document.getElementById("visor-modal");
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
});