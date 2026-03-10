const container = document.getElementById("estudianteContainer");
const modal = document.getElementById("modalEstudiante");
const form = document.getElementById("formEstudiante");
const buscador = document.querySelector(".search-input");
const btnNuevo = document.getElementById("nuevoEstudiante");
const cerrarModal = document.getElementById("cerrarModal");

let estudiantes = [];

async function cargarEstudiantes() {

    try {

        const res = await fetch("../json/estudiantes.json");

        if (!res.ok) {
            throw new Error("No se pudo cargar el JSON");
        }

        const jsonEstudiantes = await res.json();

        const guardados = JSON.parse(localStorage.getItem("estudiantes")) || [];

        estudiantes = [...jsonEstudiantes];

        guardados.forEach(d => {
            const existe = estudiantes.some(doc => doc.id === d.id);
            if(!existe){
                estudiantes.push(d);
            }
        });

        guardarDatos();
        renderEstudiantes();

    } catch (error) {
        console.error("Error cargando JSON:", error);
    }

}

function guardarDatos() {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

function colorGenero(genero){

    const g = genero?.toLowerCase();

    if(g === "hombre"){
        return "linear-gradient(135deg,#eef5ff,#dbe9ff)";
    }

    if(g === "mujer"){
        return "linear-gradient(135deg,#ffeef5,#ffd9e8)";
    }

    if(g === "no_binario"){
        return "linear-gradient(135deg,#f3ecff,#e4d6ff)";
    }

    return "#ffffff";
}

function renderEstudiantes(lista = estudiantes){

    container.innerHTML = "";

    lista.forEach(doc => {

        const article = document.createElement("article");
        article.classList.add("estudiante-card");

        article.style.background = colorGenero(doc.genero);

        article.innerHTML = `
            <h3>${doc.nombre}</h3>

            <p><strong>Identificación:</strong> ${doc.identificacion}</p>
            <p><strong>Edad:</strong> ${doc.edad}</p>
            <p><strong>Telefono:</strong> ${doc.telefono || "-"}</p>

            <div class="card-acciones">
                <img src="../images/lapiz.webp" class="accion-icon editar">
                <img src="../images/eliminar.webp" class="accion-icon eliminar">
            </div>
        `;

        const btnEditar = article.querySelector(".editar");
        const btnEliminar = article.querySelector(".eliminar");

        btnEditar.addEventListener("click", (e) => {
            e.stopPropagation();
            editarEstudiante(doc.id);
        });

        btnEliminar.addEventListener("click", (e) => {
            e.stopPropagation();
            eliminarEstudiante(doc.id);
        });

        container.appendChild(article);

    });

}

/* BUSCADOR */

buscador.addEventListener("input", () => {

    const texto = buscador.value.toLowerCase().trim();

    const filtrados = estudiantes.filter(doc =>
        doc.nombre.toLowerCase().includes(texto) ||
        doc.apellidos.toLowerCase().includes(texto) ||
        (doc.direccion.toLowerCase().includes(texto))
    );

    renderEstudiantes(filtrados);

});

btnNuevo.onclick = () => {

    form.reset();

    document.getElementById("estudianteId").value = "";

    modal.classList.remove("hidden");

};

cerrarModal.onclick = () => {
    modal.classList.add("hidden");
};

form.addEventListener("submit", e => {

    e.preventDefault();

    const id = document.getElementById("estudianteId").value;

    const estudiante = {

        id: id ? Number(id) : Date.now(),

        nombres: document.getElementById("nombres").value,

        apellidos: document.getElementById("apellidos").value,

        identificacion: document.getElementById("identificacion").value,

        edad: document.getElementById("edad").value,

        genero: document.getElementById("genero").value,

        direccion: document.getElementById("direccion").value,

        telefono: document.getElementById("telefono").value

    };

    if(id){

        estudiantes = estudiantes.map(d =>
            d.id === Number(id) ? estudiante : d
        );

    }else{

        estudiantes.push(estudiante);

    }

    guardarDatos();
    renderEstudiantes();

    modal.classList.add("hidden");

});

function editarEstudiante(id){

    const doc = estudiantes.find(d => d.id === id);
    if(!doc) return;

    document.getElementById("estudianteId").value = doc.id;
    document.getElementById("nombres").value = doc.nombres;
    document.getElementById("apellidos").value = doc.apellidos;
    document.getElementById("identificacion").value = doc.identificacion || "";
    document.getElementById("edad").value = doc.edad;
    document.getElementById("genero").value = doc.genero;
    document.getElementById("direccion").value = doc.direccion;
    document.getElementById("telefono").value = doc.telefono || "";

    modal.classList.remove("hidden");

}

function eliminarEstudiante(id){

    estudiantes = estudiantes.filter(d => d.id !== id);

    guardarDatos();
    renderEstudiantes();

}

cargarEstudiantes();