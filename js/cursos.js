/**
 * Constantes y Selectores
 */
const STORAGE_KEY = "courses";

const nodes = {
    grid: document.querySelector(".cursos-grid"),
    form: document.querySelector("#courseForm"),
    totalCursos: document.querySelector(".course"),
    formContainer: document.querySelector(".form-container"),
    lessonsContainer: document.querySelector("#lessonsContainer"),
    formTitle: document.querySelector("#courseForm h2"),
    btnCrear: document.querySelector(".btn-crear-curso"),
    btnClose: document.querySelector(".close-btn"),
    btnSubmit: document.querySelector(".submit-btn"),
    btnAddLesson: document.getElementById("addLessonBtn")
};

let state = {
    editMode: false,
    editId: null
};

/**
 * Inicialización
 */
document.addEventListener('DOMContentLoaded', renderCards);

/**
 * Lógica de Almacenamiento
 */
const storage = {
    get: () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
    set: (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
};

/**
 * Renderizado de Interfaz
 */
function renderCards() {
    const courses = storage.get();
    nodes.grid.innerHTML = "";
    nodes.totalCursos.textContent = `(${courses.length})`;

    courses.forEach(course => {
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

        // Event Delegation manual por cada card para mantener la estructura original
        article.querySelector(".editar").onclick = () => prepararEdicion(course.id);
        article.querySelector(".eliminar").onclick = () => eliminarCurso(course.id);

        nodes.grid.appendChild(article);
    });
}

/**
 * Gestión de Lecciones (UI)
 */
function agregarCamposLeccion(data = {}, index = null) {
    const num = index ?? (nodes.lessonsContainer.querySelectorAll(".lesson-card").length + 1);
    const div = document.createElement("div");
    div.classList.add("lesson-card");
    
    div.innerHTML = `
        <h4>Lección ${num}</h4>
        <input type="text" name="lessonTitle" placeholder="Título" value="${data.title || ''}" required>
        <textarea name="lessonContent" placeholder="Contenido">${data.content || ''}</textarea>
        <input type="url" name="lessonVideo" placeholder="URL Video" value="${data.video || ''}">
        <button type="button" class="remove-lesson">Eliminar Lección</button>
    `;

    div.querySelector(".remove-lesson").onclick = () => div.remove();
    nodes.lessonsContainer.appendChild(div);
}

/**
 * Acciones de Formulario
 */
function abrirFormulario(isEdit = false, course = null) {
    state.editMode = isEdit;
    state.editId = isEdit ? course.id : null;
    
    nodes.form.reset();
    nodes.lessonsContainer.innerHTML = "";
    nodes.formTitle.textContent = isEdit ? "Editar Curso" : "Crear Nuevo Curso";

    if (isEdit && course) {
        nodes.form.title.value = course.title;
        nodes.form.shortDescription.value = course.shortDescription;
        nodes.form.longDescription.value = course.longDescription || "";
        nodes.form.banner.value = course.banner || "";
        
        const lessons = course.lessons?.length ? course.lessons : [{}];
        lessons.forEach((l, i) => agregarCamposLeccion(l, i + 1));
    } else {
        agregarCamposLeccion();
    }

    nodes.formContainer.classList.add("active");
}

function cerrarFormulario() {
    nodes.formContainer.classList.remove("active");
    nodes.form.reset();
}

/**
 * Operaciones CRUD
 */
async function saveCourse() {
    const formData = new FormData(nodes.form);
    const courses = storage.get();
    const lessonTitles = formData.getAll("lessonTitle");
    const lessonContents = formData.getAll("lessonContent");
    const lessonVideos = formData.getAll("lessonVideo");

    const lessons = lessonTitles.map((title, i) => ({
        title,
        content: lessonContents[i],
        video: lessonVideos[i]
    }));

    const courseData = {
        id: state.editMode ? state.editId : Date.now(),
        title: formData.get("title"),
        shortDescription: formData.get("shortDescription"),
        longDescription: formData.get("longDescription"),
        banner: formData.get("banner"),
        lessons
    };

    const newCourses = state.editMode 
        ? courses.map(c => c.id === state.editId ? courseData : c)
        : [...courses, courseData];

    storage.set(newCourses);
    alert(state.editMode ? "Curso actualizado con éxito" : "Curso creado con éxito");
    
    cerrarFormulario();
    renderCards();
}

function prepararEdicion(id) {
    const course = storage.get().find(c => c.id == id);
    if (course) abrirFormulario(true, course);
}

function eliminarCurso(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este curso?")) {
        const filtered = storage.get().filter(c => c.id != id);
        storage.set(filtered);
        renderCards();
    }
}

/**
 * Event listeners
 */
nodes.btnCrear.addEventListener("click", () => abrirFormulario(false));

nodes.btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    cerrarFormulario();
});

nodes.formContainer.addEventListener("click", (e) => {    if (e.target === nodes.formContainer) {
        cerrarFormulario();
    }
});

nodes.btnAddLesson.addEventListener("click", () => agregarCamposLeccion());

nodes.btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    nodes.form.checkValidity() ? saveCourse() : nodes.form.reportValidity();
});