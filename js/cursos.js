const grid = document.querySelector(".cursos-grid");
const form = document.querySelector("#courseForm");
const total_cursos = document.querySelector(".course");
const formContainer = document.querySelector(".form-container");

// Variable para saber si estamos editando o creando
let editMode = false;
let editId = null;

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', renderCards);

function renderCards() {
    grid.innerHTML = "";
    const dataList = JSON.parse(localStorage.getItem("courses")) || [];
    total_cursos.textContent = `(${dataList.length})`;

    dataList.forEach(course => {
        const article = document.createElement("article");
        article.classList.add("curso-card");
        article.innerHTML = `
            <div class="card-header">
                <span class="curso-codigo codigo-azul">ID: ${course.id}</span>
            </div>
            <h3 class="curso-titulo">${course.title}</h3>
            <p class="curso-descripcion">${course.shortDescription}</p>
            <div class="card-acciones">
                <img src="../images/ojo.webp" class="accion-icon ver" title="Ver">
                <img src="../images/lapiz.webp" class="accion-icon editar" title="Editar">
                <img src="../images/eliminar.webp" class="accion-icon eliminar" title="Eliminar">
            </div>
        `;

        // Eventos de botones
        article.querySelector(".editar").addEventListener("click", (e) => {
            e.stopPropagation();
            prepararEdicion(course.id);
        });

        article.querySelector(".eliminar").addEventListener("click", (e) => {
            e.stopPropagation();
            eliminarCurso(course.id);
        });

        grid.appendChild(article);
    });
}

// --- FUNCIÓN GUARDAR (CREAR Y EDITAR) ---
async function saveCourse() {
    const formData = new FormData(form);
    const courseData = Object.fromEntries(formData.entries());
    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    if (editMode) {
        // Actualizar curso existente
        courses = courses.map(c => 
            c.id === editId ? { ...c, ...courseData, id: editId } : c
        );
        alert("Curso actualizado con éxito");
    } else {
        // Crear nuevo (asignamos ID basado en timestamp para que sea único)
        courseData.id = Date.now(); 
        courses.push(courseData);
        alert("Curso creado con éxito");
    }

    localStorage.setItem('courses', JSON.stringify(courses));
    cerrarFormulario();
    renderCards();
}

// --- FUNCIÓN EDITAR (PREPARAR FORMULARIO) ---
function prepararEdicion(id) {
    const courses = JSON.parse(localStorage.getItem("courses"));
    const course = courses.find(c => c.id == id);

    if (course) {
        editMode = true;
        editId = id;
        
        // Rellenar el formulario
        form.title.value = course.title;
        form.shortDescription.value = course.shortDescription;
        form.longDescription.value = course.longDescription || "";
        form.banner.value = course.banner || "";

        form.querySelector("h2").textContent = "Editar Curso";
        formContainer.classList.add("active");
    }
}

// --- FUNCIÓN ELIMINAR ---
function eliminarCurso(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este curso?")) {
        let courses = JSON.parse(localStorage.getItem("courses"));
        courses = courses.filter(c => c.id != id);
        localStorage.setItem('courses', JSON.stringify(courses));
        renderCards();
    }
}

// --- CONTROL DE UI ---
document.querySelector(".btn-crear-curso").addEventListener("click", () => {
    editMode = false;
    editId = null;
    form.reset();
    form.querySelector("h2").textContent = "Crear Nuevo Curso";
    formContainer.classList.add("active");
});

document.querySelector(".close-btn").addEventListener("click", (e) => {
    e.preventDefault();
    cerrarFormulario();
});

function cerrarFormulario() {
    formContainer.classList.remove("active");
    form.reset();
}

// Evento del botón enviar del formulario
document.querySelector(".submit-btn").addEventListener("click", function(e) {
    e.preventDefault();
    if (form.checkValidity()) {
        saveCourse();
    } else {
        form.reportValidity();
    }
});