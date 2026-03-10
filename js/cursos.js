const grid = document.querySelector(".cursos-grid");
const form = document.querySelector("#courseForm");
const total_cursos = document.querySelector(".course");
const formContainer = document.querySelector(".form-container");
const lessonsContainer = document.querySelector("#lessonsContainer");

let editMode = false;
let editId = null;

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

async function saveCourse() {
    const formData = new FormData(form);
    
    const courseData = {
        title: formData.get("title"),
        shortDescription: formData.get("shortDescription"),
        longDescription: formData.get("longDescription"),
        banner: formData.get("banner"),
        lessons: [] 
    };

    const lessonTitles = formData.getAll("lessonTitle");
    const lessonContents = formData.getAll("lessonContent");
    const lessonVideos = formData.getAll("lessonVideo");

    lessonTitles.forEach((title, index) => {
        courseData.lessons.push({
            title: title,
            content: lessonContents[index],
            video: lessonVideos[index]
        });
    });

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    if (editMode) {
        courses = courses.map(c => 
            c.id === editId ? { ...courseData, id: editId } : c
        );
        alert("Curso actualizado con éxito");
    } else {
        courseData.id = Date.now(); 
        courses.push(courseData);
        alert("Curso creado con éxito");
    }

    localStorage.setItem('courses', JSON.stringify(courses));
    cerrarFormulario();
    renderCards();
}

function prepararEdicion(id) {
    const courses = JSON.parse(localStorage.getItem("courses"));
    const course = courses.find(c => c.id == id);

    if (course) {
        editMode = true;
        editId = id;
        
        form.title.value = course.title;
        form.shortDescription.value = course.shortDescription;
        form.longDescription.value = course.longDescription || "";
        form.banner.value = course.banner || "";

        lessonsContainer.innerHTML = "";
        if (course.lessons && course.lessons.length > 0) {
            course.lessons.forEach((lesson, index) => {
                agregarCamposLeccion(lesson, index + 1);
            });
        } else {
            agregarCamposLeccion(); 
        }

        form.querySelector("h2").textContent = "Editar Curso";
        formContainer.classList.add("active");
    }
}

function agregarCamposLeccion(data = {}, num = 1) {
    const div = document.createElement("div");
    div.classList.add("lesson-card");
    div.innerHTML = `
        <h4>Lección ${num}</h4>
        <input type="text" name="lessonTitle" placeholder="Título" value="${data.title || ''}" required>
        <textarea name="lessonContent" placeholder="Contenido">${data.content || ''}</textarea>
        <input type="url" name="lessonVideo" placeholder="URL Video" value="${data.video || ''}">
        <button type="button" class="remove-lesson" onclick="this.parentElement.remove()">Eliminar Lección</button>
    `;
    lessonsContainer.appendChild(div);
}

document.getElementById("addLessonBtn").addEventListener("click", () => {
    const num = lessonsContainer.querySelectorAll(".lesson-card").length + 1;
    agregarCamposLeccion({}, num);
});

function eliminarCurso(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este curso?")) {
        let courses = JSON.parse(localStorage.getItem("courses"));
        courses = courses.filter(c => c.id != id);
        localStorage.setItem('courses', JSON.stringify(courses));
        renderCards();
    }
}

document.querySelector(".btn-crear-curso").addEventListener("click", () => {
    editMode = false;
    editId = null;
    form.reset();
    lessonsContainer.innerHTML = "";
    agregarCamposLeccion();
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

document.querySelector(".submit-btn").addEventListener("click", function(e) {
    e.preventDefault();
    if (form.checkValidity()) {
        saveCourse();
    } else {
        form.reportValidity();
    }
});