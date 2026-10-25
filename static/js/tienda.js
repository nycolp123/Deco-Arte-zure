
document.addEventListener("DOMContentLoaded", () => {
    const WHATSAPP = "573114854958";

    let carrito = JSON.parse(localStorage.getItem("carritoDecoArte")) || [];
    let datosPedido = null;

    const panel = document.getElementById("panelCarrito");
    const fondo = document.getElementById("fondoCarrito");
    const listaCarrito = document.getElementById("productosCarrito");
    const contador = document.getElementById("contadorCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    const formatoPrecio = (valor) =>
        "$" + Number(valor).toLocaleString("es-CO");

    function guardarCarrito() {
        localStorage.setItem("carritoDecoArte", JSON.stringify(carrito));
    }

    function calcularTotal() {
        return carrito.reduce((total, producto) => {
            return total + producto.precio * producto.cantidad;
        }, 0);
    }

    function actualizarCarrito() {
        const cantidad = carrito.reduce((total, producto) => {
            return total + producto.cantidad;
        }, 0);

        contador.textContent = cantidad;
        totalCarrito.textContent = formatoPrecio(calcularTotal());

        if (carrito.length === 0) {
            listaCarrito.innerHTML =
                '<p class="carrito-vacio">Tu carrito está vacío. ¡Agrega tus productos favoritos!</p>';
        } else {
            listaCarrito.innerHTML = carrito.map(producto => `
                <article class="carrito-producto">
                    <div>
                        <h3>${producto.nombre}</h3>
                        <p>${formatoPrecio(producto.precio)}</p>
                        <div class="cantidad-control">
                            <button type="button" data-accion="restar" data-id="${producto.id}">−</button>
                            <span>${producto.cantidad}</span>
                            <button type="button" data-accion="sumar" data-id="${producto.id}">+</button>
                        </div>
                    </div>
                    <button type="button" class="eliminar-producto"
                        data-accion="eliminar" data-id="${producto.id}">Eliminar</button>
                </article>
            `).join("");
        }

        guardarCarrito();
    }

    function abrirPanel() {
        panel.classList.add("carrito-abierto");
        fondo.classList.add("fondo-visible");
        document.body.classList.add("sin-desplazamiento");
    }

    function cerrarPanel() {
        panel.classList.remove("carrito-abierto");
        fondo.classList.remove("fondo-visible");
        document.body.classList.remove("sin-desplazamiento");
    }

    document.querySelectorAll(".agregar-producto").forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.dataset.id;
            const producto = carrito.find(item => item.id === id);

            if (producto) {
                producto.cantidad++;
            } else {
                carrito.push({
                    id,
                    nombre: boton.dataset.nombre,
                    precio: Number(boton.dataset.precio),
                    cantidad: 1
                });
            }

            actualizarCarrito();
            boton.textContent = "¡Agregado! ✓";
            setTimeout(() => boton.textContent = "Agregar al carrito", 1200);
        });
    });

    document.getElementById("abrirCarrito").addEventListener("click", abrirPanel);
    document.getElementById("cerrarCarrito").addEventListener("click", cerrarPanel);
    fondo.addEventListener("click", cerrarPanel);

    listaCarrito.addEventListener("click", evento => {
        const boton = evento.target.closest("button[data-accion]");
        if (!boton) return;

        const producto = carrito.find(item => item.id === boton.dataset.id);
        if (!producto) return;

        if (boton.dataset.accion === "sumar") producto.cantidad++;
        if (boton.dataset.accion === "restar") producto.cantidad--;
        if (boton.dataset.accion === "eliminar") producto.cantidad = 0;

        carrito = carrito.filter(item => item.cantidad > 0);
        actualizarCarrito();
    });

    document.querySelectorAll(".tienda-categorias button").forEach(boton => {
        boton.addEventListener("click", () => {
            document.querySelectorAll(".tienda-categorias button")
                .forEach(item => item.classList.remove("categoria-activa"));

            boton.classList.add("categoria-activa");

            const categoria = boton.dataset.categoria;

            document.querySelectorAll(".producto").forEach(producto => {
                producto.hidden = categoria !== "todos" &&
                    producto.dataset.categoria !== categoria;
            });
        });
    });

    document.getElementById("irAlPedido").addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Primero agrega al menos un producto al carrito.");
            return;
        }

        cerrarPanel();
        document.getElementById("seccionPedido").classList.add("seccion-visible");
        document.getElementById("seccionPedido").scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("formularioPedido").addEventListener("submit", evento => {
        evento.preventDefault();

        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        datosPedido = {
            nombre: document.getElementById("nombreCliente").value.trim(),
            telefono: document.getElementById("telefonoCliente").value.trim(),
            direccion: document.getElementById("direccionCliente").value.trim(),
            fecha: document.getElementById("fechaPedido").value || "Por acordar",
            mensaje: document.getElementById("mensajePedido").value.trim()
        };

        if (!datosPedido.nombre || !datosPedido.telefono || !datosPedido.direccion) {
            alert("Completa tu nombre, teléfono y dirección.");
            return;
        }

        document.getElementById("totalPago").textContent =
            formatoPrecio(calcularTotal());

        document.getElementById("seccionPago").classList.add("seccion-visible");
        document.getElementById("seccionPago").scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("enviarWhatsApp").addEventListener("click", () => {
        if (!datosPedido || carrito.length === 0) {
            alert("Completa primero los datos de tu pedido.");
            return;
        }

        const detalle = carrito.map(producto =>
            `• ${producto.nombre} x${producto.cantidad} - ${formatoPrecio(producto.precio * producto.cantidad)}`
        ).join("\n");

        const mensaje =
`¡Hola, Deco Arte Zure! 💗 Quiero realizar este pedido:

${detalle}

TOTAL: ${formatoPrecio(calcularTotal())}

DATOS DEL CLIENTE
Nombre: ${datosPedido.nombre}
Teléfono: ${datosPedido.telefono}
Dirección: ${datosPedido.direccion}
Fecha deseada: ${datosPedido.fecha}
Dedicatoria o indicaciones: ${datosPedido.mensaje || "Ninguna"}

Ya realicé el pago por QR. Adjunto el comprobante en este chat, por favor confirmar mi pedido.`;

        const enlace = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(enlace, "_blank");

        // No vaciamos el carrito: el pedido aún debe ser confirmado.
    });

    actualizarCarrito();
});
