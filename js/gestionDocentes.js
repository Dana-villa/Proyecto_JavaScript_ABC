/**
 * Global Selectors & State
 */
const container = document.getElementById("docentesContainer");
const modal = document.getElementById("modalDocente");
const form = document.getElementById("formDocente");
const buscador = document.querySelector(".search-input");
const btnNuevo = document.getElementById("nuevoDocente");
const cerrarModal = document.getElementById("cerrarModal");

let docentes = [];

/**
 * Data Management
 */
async function cargarDocentes() {
  try {
    const res = await fetch("../json/profesores.json");
    if (!res.ok) throw new Error("No se pudo cargar el JSON");

    const jsonDocentes = await res.json();
    const guardados = JSON.parse(localStorage.getItem("docentes")) || [];

    // Merge JSON data with LocalStorage (avoiding duplicates by ID)
    docentes = [...jsonDocentes];
    guardados.forEach((d) => {
      if (!docentes.some((doc) => doc.id === d.id)) {
        docentes.push(d);
      }
    });

    guardarDatos();
    renderDocentes();
  } catch (error) {
    console.error("Error cargando JSON:", error);
  }
}

function guardarDatos() {
  localStorage.setItem("docentes", JSON.stringify(docentes));
}

/**
 * UI & Rendering
 */
function colorGenero(genero) {
  const g = genero?.toLowerCase();
  const colors = {
    hombre: "linear-gradient(135deg, #eef5ff, #dbe9ff)",
    mujer: "linear-gradient(135deg, #ffeef5, #ffd9e8)",
    no_binario: "linear-gradient(135deg, #f3ecff, #e4d6ff)",
  };

  return colors[g] || "#ffffff";
}

function renderDocentes(lista = docentes) {
  container.innerHTML = "";

  lista.forEach((doc) => {
    const article = document.createElement("article");
    article.classList.add("docente-card");
    article.style.background = colorGenero(doc.genero);

    article.innerHTML = `
      <h3>${doc.nombre}</h3>
      <p><strong>Especialidad:</strong> ${doc.especialidad}</p>
      <p><strong>Edad:</strong> ${doc.edad}</p>
      <p><strong>Email:</strong> ${doc.email || "-"}</p>
      <div class="card-acciones">
          <img src="../images/lapiz.webp" class="accion-icon editar" alt="Editar">
          <img src="../images/eliminar.webp" class="accion-icon eliminar" alt="Eliminar">
      </div>
    `;

    // Event listeners for actions
    article.querySelector(".editar").onclick = (e) => {
      e.stopPropagation();
      editarDocente(doc.id);
    };

    article.querySelector(".eliminar").onclick = (e) => {
      e.stopPropagation();
      eliminarDocente(doc.id);
    };

    container.appendChild(article);
  });
}

/**
 * Event Handlers
 */

// Search functionality
buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase().trim();
  const filtrados = docentes.filter(
    (doc) =>
      doc.nombre.toLowerCase().includes(texto) ||
      doc.especialidad.toLowerCase().includes(texto) ||
      (doc.email && doc.email.toLowerCase().includes(texto))
  );
  renderDocentes(filtrados);
});

// Modal controls
btnNuevo.onclick = () => {
  form.reset();
  const idInput = document.getElementById("docenteId");
  if (idInput) idInput.value = "";
  modal.classList.remove("hidden");
};

cerrarModal.onclick = () => modal.classList.add("hidden");

// Form submission (Create/Update)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const idInput = document.getElementById("docenteId").value;
  const nuevoDocente = {
    id: idInput ? Number(idInput) : Date.now(),
    nombre: document.getElementById("nombre").value,
    especialidad: document.getElementById("especialidad").value,
    edad: document.getElementById("edad").value,
    genero: document.getElementById("genero").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telefono").value,
  };

  if (idInput) {
    docentes = docentes.map((d) => (d.id === Number(idInput) ? nuevoDocente : d));
  } else {
    docentes.push(nuevoDocente);
  }

  guardarDatos();
  renderDocentes();
  modal.classList.add("hidden");
});

/**
 * CRUD Operations
 */
function editarDocente(id) {
  const doc = docentes.find((d) => d.id === id);
  if (!doc) return;

  document.getElementById("docenteId").value = doc.id;
  document.getElementById("nombre").value = doc.nombre;
  document.getElementById("especialidad").value = doc.especialidad;
  document.getElementById("edad").value = doc.edad;
  document.getElementById("genero").value = doc.genero;
  document.getElementById("email").value = doc.email || "";
  document.getElementById("telefono").value = doc.telefono || "";

  modal.classList.remove("hidden");
}

function eliminarDocente(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este docente?")) {
    docentes = docentes.filter((d) => d.id !== id);
    guardarDatos();
    renderDocentes();
  }
}

// Initialize
cargarDocentes();