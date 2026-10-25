
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formularioExperiencia");
    const telefonoNegocio = "573114854958";

    // Los botones de los combos seleccionan automáticamente
    // el tipo de experiencia en el formulario.
    document.querySelectorAll("[data-plan]").forEach(boton => {
        boton.addEventListener("click", () => {
            const plan = boton.dataset.plan;
            const selector = document.getElementById("expTipo");

            const opciones = Array.from(selector.options);
            const opcion = opciones.find(item =>
                item.text.toLowerCase().includes(plan.toLowerCase())
            );

            if (opcion) {
                selector.value = opcion.value;
            }
        });
    });

    // Envío de la solicitud de cotización a WhatsApp.
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        const nombre = document.getElementById("expNombre").value.trim();
        const telefono = document.getElementById("expTelefono").value.trim();
        const tipo = document.getElementById("expTipo").value;
        const personas = document.getElementById("expPersonas").value;
        const fecha = document.getElementById("expFecha").value;
        const presupuesto = document.getElementById("expPresupuesto").value || "Por definir";
        const detalles = document.getElementById("expDetalles").value.trim() || "Sin detalles adicionales";

        if (!nombre || !telefono || !tipo || !personas || !fecha) {
            alert("Por favor completa los datos obligatorios.");
            return;
        }

        const mensaje =
`¡Hola, Deco Arte Zure! 🌿

Quiero solicitar una cotización para una experiencia.

DATOS DEL CLIENTE
Nombre: ${nombre}
Teléfono: ${telefono}

MI EXPERIENCIA
Tipo de plan: ${tipo}
Número de personas: ${personas}
Fecha deseada: ${fecha}
Presupuesto aproximado: ${presupuesto}

DETALLES
${detalles}

Me gustaría conocer la disponibilidad y recibir información sobre los paquetes. ¡Muchas gracias! 💗`;

        const enlace = `https://wa.me/${telefonoNegocio}?text=${encodeURIComponent(mensaje)}`;
        window.open(enlace, "_blank");
    });

    // Evita que se puedan seleccionar fechas anteriores.
    const fecha = document.getElementById("expFecha");
    const hoy = new Date();
    const fechaLocal = new Date(hoy.getTime() - hoy.getTimezoneOffset() * 60000)
        .toISOString().split("T")[0];

    fecha.min = fechaLocal;
});
