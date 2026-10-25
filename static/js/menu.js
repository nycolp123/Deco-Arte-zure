
document.addEventListener("DOMContentLoaded", () => {

    const botonMenu = document.getElementById("botonMenu");
    const navegacion = document.getElementById("navegacion");
    const volverArriba = document.getElementById("volverArriba");

    if (botonMenu && navegacion) {

        botonMenu.addEventListener("click", () => {

            const abierto = navegacion.classList.toggle("abierto");

            botonMenu.setAttribute("aria-expanded", abierto);

            botonMenu.textContent = abierto ? "×" : "☰";

        });

        navegacion.querySelectorAll("a").forEach(enlace => {

            enlace.addEventListener("click", () => {

                navegacion.classList.remove("abierto");

                botonMenu.setAttribute("aria-expanded", "false");

                botonMenu.textContent = "☰";

            });

        });

    }

    if (volverArriba) {

        window.addEventListener("scroll", () => {

            volverArriba.classList.toggle(
                "visible",
                window.scrollY > 400
            );

        });

        volverArriba.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});
