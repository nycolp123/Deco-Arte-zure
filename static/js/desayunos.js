
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formularioDesayuno");
    const telefonoNegocio = "573114854958";

    // Filtrar desayunos por categoría.
    const filtros = document.querySelectorAll(".des-filtro");
    const productos = document.querySelectorAll(".des-producto");

    filtros.forEach(boton => {
        boton.addEventListener("click", () => {
            filtros.forEach(filtro => filtro.classList.remove("activo"));
            boton.classList.add("activo");

            const categoria = boton.dataset.filtro;

            productos.forEach(producto => {
                producto.hidden =
                    categoria !== "todos" &&
                    producto.dataset.categoria !== categoria;
            });
        });
    });

    // Elegir un desayuno desde su tarjeta.
    document.querySelectorAll(".des-elegir").forEach(boton => {
        boton.addEventListener("click", () => {
            const plan = boton.dataset.plan;
            const selector = document.getElementById("desPlan");

            const opcion = Array.from(selector.options).find(
                item => item.value === plan || item.text === plan
            );

            if (opcion) {
                selector.value = opcion.value;
            }

            document.getElementById("cotizacion-desayuno")
                .scrollIntoView({ behavior: "smooth" });
        });
    });

    // Evitar fechas anteriores a hoy.
    const campoFecha = document.getElementById("desFecha");
    const ahora = new Date();
    const fechaLocal = new Date(
        ahora.getTime() - ahora.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    campoFecha.min = fechaLocal;

    // Enviar solicitud de cotización a WhatsApp.
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        const nombre = document.getElementById("desNombre").value.trim();
        const telefono = document.getElementById("desTelefono").value.trim();
        const plan = document.getElementById("desPlan").value;
        const destinatario = document.getElementById("desDestinatario").value.trim() || "Por definir";
        const edad = document.getElementById("desEdad").value.trim() || "No indicada";
        const ocasion = document.getElementById("desOcasión").value || "Por definir";
        const fecha = campoFecha.value;
        const hora = document.getElementById("desHora").value || "Por acordar";
        const direccion = document.getElementById("desDireccion").value.trim() || "Por acordar";
        const presupuesto = document.getElementById("desPresupuesto").value || "Por definir";
        const mensaje = document.getElementById("desMensaje").value.trim() || "Sin dedicatoria";

        if (!nombre || !telefono || !plan || !fecha) {
            alert("Completa los campos obligatorios para continuar.");
            return;
        }

        const texto =
`¡Hola, Deco Arte Zure! 💗 Quiero cotizar un desayuno sorpresa.

DATOS DE QUIEN REALIZA EL PEDIDO
Nombre: ${nombre}
Teléfono: ${telefono}

DETALLES DEL DESAYUNO
Desayuno elegido: ${plan}
Para quién es: ${destinatario}
Edad: ${edad}
Ocasión: ${ocasion}
Fecha de entrega: ${fecha}
Hora aproximada: ${hora}
Dirección: ${direccion}
Presupuesto: ${presupuesto}

DEDICATORIA Y PERSONALIZACIÓN
${mensaje}

Por favor, envíenme información sobre lo que incluye, el precio final y la disponibilidad. ¡Muchas gracias!`;

        const enlace = `https://wa.me/${telefonoNegocio}?text=${encodeURIComponent(texto)}`;
        window.open(enlace, "_blank");
    });
});
