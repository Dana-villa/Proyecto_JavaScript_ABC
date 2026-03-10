const searchInput = document.querySelector(".search-input");
const grid = document.querySelector(".grid-cursos");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalBanner = document.getElementById("modal-banner");
const modalLessons = document.getElementById("modal-lessons");
const closeBtn = document.querySelector(".close-modal");

let modules = JSON.parse(localStorage.getItem("courses")) || getJson();

async function getJson() {
    const response = await fetch('./json/modules.json')
    const data = await response.json()
    return data
    
}

document.addEventListener('DOMContentLoaded', () => {
    if (modules.length === 0) {
        grid.innerHTML = "<p>No hay cursos disponibles actualmente.</p>";
    } else {
        renderCards(modules);
    }
});

function renderCards(list = modules) {
    grid.innerHTML = "";

    list.forEach(module => {
        const article = document.createElement("article");
        article.classList.add("tarjeta-cursos");

        const bannerPath = module.banner.startsWith('http') ? module.banner : `../${module.banner}`;

        article.innerHTML = `
            <img src="${bannerPath}" alt="${module.title}" onerror="this.src='../images/placeholder.webp'">
            <h3>${module.title}</h3>
            <p>${module.shortDescription}</p>
        `;

        article.addEventListener("click", () => openModal(module));
        grid.appendChild(article);
    });
}

searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase().trim();

    const filteredModules = modules.filter(module =>
        module.title.toLowerCase().includes(searchTerm) || 
        module.shortDescription.toLowerCase().includes(searchTerm)
    );

    renderCards(filteredModules);
});

function openModal(module) {
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
    
    modalTitle.textContent = module.title;
    modalDescription.textContent = module.longDescription || "Sin descripción disponible.";
    
    const bannerPath = module.banner.startsWith('http') ? module.banner : `../${module.banner}`;
    modalBanner.src = bannerPath;

    modalLessons.innerHTML = "";

    if (module.lessons && Array.isArray(module.lessons)) {
        module.lessons.forEach(lesson => {
            const lessonDiv = document.createElement("div");
            lessonDiv.classList.add("lesson");

            lessonDiv.innerHTML = `
                <details>
                    <summary>${lesson.title}</summary>
                    <div class="lesson-content">
                        <p>${lesson.content}</p>
                        ${lesson.video ? `
                        <iframe width="100%" height="315"
                            src="${lesson.video.replace("watch?v=", "embed/")}" 
                            frameborder="0"
                            allowfullscreen>
                        </iframe>` : ''}
                    </div>
                </details>
            `;
            modalLessons.appendChild(lessonDiv);
        });
    } else {
        modalLessons.innerHTML = "<p>Este curso aún no tiene lecciones cargadas.</p>";
    }

    modal.classList.remove("hidden");
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
    document.documentElement.classList.remove("modal-open");
    modalLessons.innerHTML = "";
}