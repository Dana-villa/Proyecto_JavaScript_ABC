const container = document.getElementById("alumnosContainer");
const modal = document.getElementById("modalAlumno");
const form = document.getElementById("formAlumno");
const buscador = document.querySelector(".search-input");
const btnNuevo = document.getElementById("nuevoAlumno");
const cerrarModal = document.getElementById("cerrarModal");

let alumnos = [];

async function cargarAlumnos() {
    try {
        // Asegúrate de tener este archivo o ajusta la ruta
        const res = await fetch("../json/alumnos.json");
        const jsonAlumnos = res.ok ? await res.json() : [];
        
        const guardados = JSON.parse(localStorage.getItem("alumnos")) || [];

        alumnos = [...jsonAlumnos];
        guardados.forEach((a) => {
            if (!alumnos.some((alu) => alu.id === a.id)) {
                alumnos.push(a);
            }
        });

        guardarDatos();
        renderAlumnos();
    } catch (error) {
        console.error("Error cargando alumnos:", error);
    }
}

function guardarDatos() {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
}

function colorGenero(genero) {
    const g = genero?.toLowerCase();
    const colors = {
        hombre: "linear-gradient(135deg, #eef5ff, #dbe9ff)",
        mujer: "linear-gradient(135deg, #ffeef5, #ffd9e8)",
        no_binario: "linear-gradient(135deg, #f3ecff, #e4d6ff)",
    };
    return colors[g] || "#ffffff";
}

function renderAlumnos(lista = alumnos) {
    container.innerHTML = "";
    lista.forEach((alu) => {
        const article = document.createElement("article");
        article.classList.add("docente-card"); // Reutilizamos clase CSS
        article.style.background = colorGenero(alu.genero);

        article.innerHTML = `
            <h3>${alu.nombre}</h3>
            <p><strong>Grado:</strong> ${alu.grado}</p>
            <p><strong>Edad:</strong> ${alu.edad}</p>
            <p><strong>Email:</strong> ${alu.email || "-"}</p>
            <div class="card-acciones">
                <img src="../images/lapiz.webp" class="accion-icon editar" alt="Editar">
                <img src="../images/eliminar.webp" class="accion-icon eliminar" alt="Eliminar">
            </div>
        `;

        article.querySelector(".editar").onclick = () => editarAlumno(alu.id);
        article.querySelector(".eliminar").onclick = () => eliminarAlumno(alu.id);

        container.appendChild(article);
    });
}

// Buscador
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase().trim();
    const filtrados = alumnos.filter(alu => 
        alu.nombre.toLowerCase().includes(texto) || 
        alu.grado.toLowerCase().includes(texto)
    );
    renderAlumnos(filtrados);
});

// CRUD
btnNuevo.onclick = () => {
    form.reset();
    document.getElementById("alumnoId").value = "";
    modal.classList.remove("hidden");
};

cerrarModal.onclick = () => modal.classList.add("hidden");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const idInput = document.getElementById("alumnoId").value;
    
    const nuevoAlumno = {
        id: idInput ? Number(idInput) : Date.now(),
        nombre: document.getElementById("nombre").value,
        grado: document.getElementById("grado").value,
        edad: document.getElementById("edad").value,
        genero: document.getElementById("genero").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
    };

    if (idInput) {
        alumnos = alumnos.map(a => a.id === Number(idInput) ? nuevoAlumno : a);
    } else {
        alumnos.push(nuevoAlumno);
    }

    guardarDatos();
    renderAlumnos();
    modal.classList.add("hidden");
});

function editarAlumno(id) {
    const alu = alumnos.find(a => a.id === id);
    if (!alu) return;

    document.getElementById("alumnoId").value = alu.id;
    document.getElementById("nombre").value = alu.nombre;
    document.getElementById("grado").value = alu.grado;
    document.getElementById("edad").value = alu.edad;
    document.getElementById("genero").value = alu.genero;
    document.getElementById("email").value = alu.email || "";
    document.getElementById("telefono").value = alu.telefono || "";

    modal.classList.remove("hidden");
}

function eliminarAlumno(id) {
    if (confirm("¿Eliminar este alumno?")) {
        alumnos = alumnos.filter(a => a.id !== id);
        guardarDatos();
        renderAlumnos();
    }
}

cargarAlumnos();