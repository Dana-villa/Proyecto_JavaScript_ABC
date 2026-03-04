const grid = document.querySelector(".grid-cursos");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalBanner = document.getElementById("modal-banner");
const modalLessons = document.getElementById("modal-lessons");
const closeBtn = document.querySelector(".close-modal");

let modules = [];

fetch("../json/modules.json")
    .then(res => res.json())
    .then(data => {
        modules = data;
        renderCards();
    })
    .catch(error => console.error("Error cargando JSON:", error));

function renderCards() {
    modules.forEach(module => {
        const article = document.createElement("article");
        article.classList.add("tarjeta-cursos");

        article.innerHTML = `
            <img src="../${module.banner}" alt="${module.title}">
            <h3>${module.title}</h3>
            <p>${module.shortDescription}</p>
        `;

        article.addEventListener("click", () => openModal(module));

        grid.appendChild(article);
    });
}

function openModal(module) {
    document.body.classList.add("modal-open");
    modalTitle.textContent = module.title;
    modalDescription.textContent = module.longDescription;
    modalBanner.src = "../" + module.banner;

    modalLessons.innerHTML = "";

    module.lessons.forEach(lesson => {
        const lessonDiv = document.createElement("div");
        lessonDiv.classList.add("lesson");

        lessonDiv.innerHTML = `
            <details>
                <summary>${lesson.title}</summary>
                <p>${lesson.content}</p>
                <iframe width="100%" height="315"
                    src="${lesson.video}"
                    frameborder="0"
                    allowfullscreen>
                </iframe>
            </details>
        `;

        modalLessons.appendChild(lessonDiv);
    });

    modal.classList.remove("hidden");
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
    modalLessons.innerHTML = "";
}