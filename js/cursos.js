const grid = document.querySelector(".cursos-grid");
const total_cursos = document.querySelector(".metric-number-course")



fetch("../json/modules.json")
    .then(res => res.json())
    .then(data => {
        modules = data;
        total_cursos.textContent = `(${data.length})`
        renderCards();
    })
    .catch(error => console.error("Error cargando JSON:", error));

let modules = [];

function renderCards(list = modules) {
    grid.innerHTML = ""
    list.forEach(module => {
        const article = document.createElement("article");
        article.classList.add("curso-card");

        article.innerHTML = `
            <h3>${module.title}</h3>
            <p>${module.shortDescription}</p>
            <div class="card-acciones">
                <img src="../images/ojo.webp" class="accion-icon">
                <img src="../images/lapiz.webp" class="accion-icon">
                <img src="../images/eliminar.webp" class="accion-icon">
            </div>

        `;

        article.addEventListener("click", () => openModal(module));

        grid.appendChild(article);
    });
}


const form = document.querySelector("#courseForm")
function submitCourse(){
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    localStorage.setItem('formSnapshot', JSON.stringify(data))
    console.table(localStorage)
}

document.querySelector(".btn-crear-curso").addEventListener("click", () => {
    
    document.querySelector(".form-container").classList.add("active")
    document.querySelector(".submit-btn").addEventListener("submit", function(e){
        e.preventDefault();
        submitCourse();
    })
})
document.querySelector(".close-btn").addEventListener("click", () => {
    document.querySelector(".form-container").classList.remove("active")
    
})

console.table(localStorage)