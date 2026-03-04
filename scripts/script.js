const contenedor_modal = document.querySelector('.grid-cursos');
const cursos = [
  { 
    clase: "Curso de Desarrollo Web", 
    descripcion: "Introducción a HTML, CSS y fundamentos digitales.",
    descripcionDetallada: "Aprende a estructurar sitios web desde cero con HTML5, aplicar estilos modernos con CSS3 y desplegar tu primer proyecto en la nube."
  },
  { 
    clase: "Curso de Diseño UX", 
    descripcion: "Principios básicos de experiencia de usuario.",
    descripcionDetallada: "Domina metodologías de investigación, creación de wireframes y prototipado interactivo para diseñar productos centrados en el usuario."
  },
  { 
    clase: "Curso de JavaScript", 
    descripcion: "Interactividad y lógica en la web.",
    descripcionDetallada: "Profundiza en la manipulación del DOM, funciones asíncronas, ES6+ y cómo conectar tus aplicaciones con APIs externas."
  },
  { 
    clase: "Curso de Bases de Datos", 
    descripcion: "Modelado y consultas SQL básicas.",
    descripcionDetallada: "Entiende el diseño relacional, normalización de datos y escritura de queries complejas para gestionar información de forma eficiente."
  },
  { 
    clase: "Curso de Python", 
    descripcion: "Programación desde cero.",
    descripcionDetallada: "Iníciate en la lógica de programación usando Python, cubriendo desde variables y ciclos hasta el manejo de librerías para automatización."
  },
  { 
    clase: "Curso de Marketing Digital", 
    descripcion: "Estrategias digitales modernas.",
    descripcionDetallada: "Aprende SEO, SEM, gestión de redes sociales y análisis de métricas para potenciar el crecimiento de marcas en el entorno digital."
  },
  { 
    clase: "Curso de Ciberseguridad", 
    descripcion: "Fundamentos de seguridad informática.",
    descripcionDetallada: "Conoce las amenazas más comunes, protocolos de red seguros, encriptación y mejores prácticas para proteger activos digitales."
  },
  { 
    clase: "Curso de Inteligencia Artificial", 
    descripcion: "Conceptos básicos de IA y machine learning.",
    descripcionDetallada: "Explora el funcionamiento de los algoritmos de aprendizaje automático, procesamiento de lenguaje natural y el impacto de la IA generativa."
  }
];

function loadClases() {
    
    localStorage.setItem('usuarios', JSON.stringify(cursos));
    let misCursos = JSON.parse(localStorage.getItem('usuarios'));
    
    
    
    misCursos.forEach(clases => {
        const nombre = clases.clase
        const descripcion = clases.descripcion
        const descripcionD = clases.descripcionDetallada
        document.getElementById("idCursos").innerHTML += `
            <article class="tarjeta-cursos" data-name="${nombre}" data-description="${descripcionD}">
                <img src="#" alt="${nombre}">
                <h3>${nombre}</h3>
                <p>${descripcion}</p>
            </article>
        `;
    });
}

loadClases()

document.getElementById("idCursos").addEventListener('click', (e) => {
    const card = e.target.closest('.tarjeta-cursos');
    
    if (card) {
        const nombre = card.getAttribute('data-name');
        const descripcion = card.getAttribute('data-description');
        openModal(nombre, descripcion);
    }
});

/* Modal Handlers */
function openModal(nombre, descripcion) {
    const content = document.getElementById("cuerpoModal") 
    content.innerHTML =`
        <h2>${nombre}</h2>
        <p>${descripcion}</p>

        <div class="contenedor-video">
            <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/KnCMAKrINMg" 
                title="Video del curso"
                frameborder="0"
                allowfullscreen>
            </iframe>
        </div>
    `;
    document.getElementById("modal-curso").classList.add("active")
};

function closeModal() {
    document.getElementById("modal-curso").classList.remove("active");
    document.getElementById("cuerpoModal").innerHTML = "";
};