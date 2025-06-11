document.addEventListener("DOMContentLoaded", () => {
  cargarServicios();
  cargarProyectos();
  configurarFormulario();
});

function cargarServicios() {
  const servicios = [
    {
      titulo: "Construcción de Obras",
      imagen: "assets/servicios/construccion.jpg",
      descripcion: "Diseño y ejecución de obras civiles."
    },
    {
      titulo: "Asesoría Académica",
      imagen: "assets/servicios/asesoria.jpg",
      descripcion: "Asesoramiento en tesis y trabajos académicos."
    }
    // Puedes agregar más servicios aquí
  ];

  const contenedor = document.getElementById("servicios-lista");
  contenedor.innerHTML = ""; // Limpiar antes de renderizar

  servicios.forEach(({ titulo, imagen, descripcion }) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "col-md-4 mb-4";

    tarjeta.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <img src="${imagen}" class="card-img-top" alt="${titulo}">
        <div class="card-body">
          <h5 class="card-title">${titulo}</h5>
          <p class="card-text">${descripcion}</p>
        </div>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });
}

function cargarProyectos() {
  fetch("proyectos.json")
    .then(respuesta => {
      if (!respuesta.ok) throw new Error("No se pudo cargar el archivo");
      return respuesta.json();
    })
    .then(proyectos => {
      const contenedor = document.getElementById("lista-proyectos");
      contenedor.innerHTML = ""; // Limpiar antes de renderizar

      proyectos.forEach(({ nombre, imagen, descripcion }) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "col-md-4 mb-4";

        tarjeta.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <img src="${imagen}" class="card-img-top" alt="${nombre}">
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">${descripcion}</p>
            </div>
          </div>
        `;

        contenedor.appendChild(tarjeta);
      });
    })
    .catch(error => {
      console.error("Error al cargar proyectos:", error);
      const contenedor = document.getElementById("lista-proyectos");
      contenedor.innerHTML = `<div class="alert alert-danger">No se pudieron cargar los proyectos.</div>`;
    });
}

function configurarFormulario() {
  const formulario = document.getElementById("form-contacto");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const [inputNombre, inputEmail, selectServicio, textareaMensaje] = formulario.elements;
    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const servicio = selectServicio.value;
    const mensaje = textareaMensaje.value.trim();

    if (!nombre || !email || !servicio || !mensaje) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    emailjs.send("service_2nbqzqt", "template_m7o8rb9", {
      from_name: nombre,
      from_email: email,
      servicio: servicio,
      message: mensaje
    })
    .then(() => {
      alert("✅ Mensaje enviado correctamente.");
      formulario.reset();
    })
    .catch((error) => {
      console.error("❌ Fallo al enviar:", error);
      alert("Ocurrió un error al enviar el mensaje. Intente más tarde.");
    });
  });
}
