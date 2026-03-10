/**
 * Configuración y Selectores
 */
const nodes = {
    searchInput: document.querySelector(".search-input"),
    grid: document.querySelector(".grid-cursos"),
    modal: document.getElementById("modal"),
    modalTitle: document.getElementById("modal-title"),
    modalDescription: document.getElementById("modal-description"),
    modalBanner: document.getElementById("modal-banner"),
    modalLessons: document.getElementById("modal-lessons"),
    closeBtn: document.querySelector(".close-modal")
};

// Carga inicial de datos
const modules = JSON.parse(localStorage.getItem("courses")) || [];

/**
 * Inicialización
 */
document.addEventListener('DOMContentLoaded', () => {
    if (modules.length === 0) {
        nodes.grid.innerHTML = "<p>No hay cursos disponibles actualmente.</p>";
        return;
    }
    renderCards(modules);
});

/**
 * Utilidades de Formateo
 */
const utils = {
    getBannerPath: (path) => {
        if (!path) return '../images/placeholder.webp';
        return path.startsWith('http') ? path : `../${path}`;
    },
    formatYoutubeUrl: (url) => {
        if (!url) return '';
        return url.replace("watch?v=", "embed/");
    }
};

/**
 * Renderizado de Cursos
 */
function renderCards(list = []) {
    nodes.grid.innerHTML = "";

    list.forEach(module => {
        const article = document.createElement("article");
        article.classList.add("tarjeta-cursos");

        article.innerHTML = `
            <img src="${utils.getBannerPath(module.banner)}" 
                 alt="${module.title}" 
                 onerror="this.src='../images/placeholder.webp'">
            <h3>${module.title}</h3>
            <p>${module.shortDescription}</p>
        `;

        article.onclick = () => openModal(module);
        nodes.grid.appendChild(article);
    });
}

/**
 * Lógica del Modal
 */
function openModal(module) {
    const { title, longDescription, banner, lessons } = module;

    // Bloquear scroll
    [document.documentElement, document.body].forEach(el => el.classList.add("modal-open"));
    
    nodes.modalTitle.textContent = title;
    nodes.modalDescription.textContent = longDescription || "Sin descripción disponible.";
    nodes.modalBanner.src = utils.getBannerPath(banner);
    nodes.modalLessons.innerHTML = "";

    if (lessons?.length) {
        lessons.forEach(lesson => {
            const lessonDiv = document.createElement("div");
            lessonDiv.classList.add("lesson");
            lessonDiv.innerHTML = `
                <details>
                    <summary>${lesson.title}</summary>
                    <div class="lesson-content">
                        <p>${lesson.content}</p>
                        ${lesson.video ? `
                            <iframe width="100%" height="315"
                                src="${utils.formatYoutubeUrl(lesson.video)}" 
                                frameborder="0" allowfullscreen>
                            </iframe>` : ''}
                    </div>
                </details>
            `;
            nodes.modalLessons.appendChild(lessonDiv);
        });
    } else {
        nodes.modalLessons.innerHTML = "<p>Este curso aún no tiene lecciones cargadas.</p>";
    }

    nodes.modal.classList.remove("hidden");
}

function closeModal() {
    nodes.modal.classList.add("hidden");
    [document.documentElement, document.body].forEach(el => el.classList.remove("modal-open"));
    nodes.modalLessons.innerHTML = "";
}

/**
 * Listeners de Eventos
 */

// Filtrado de búsqueda
nodes.searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    const filtered = modules.filter(({ title, shortDescription }) => 
        title.toLowerCase().includes(searchTerm) || 
        shortDescription.toLowerCase().includes(searchTerm)
    );

    renderCards(filtered);
});

// Control de cierre de modal
nodes.closeBtn.onclick = closeModal;

nodes.modal.onclick = (e) => {
    if (e.target === nodes.modal) closeModal();
};