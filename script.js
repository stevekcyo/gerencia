const silabo = {
    1: {
        titulo: "Unidad I: Administración en la Nube",
        archivos: [
            { sem: "Semana 1", desc: "Sistemas de Información y Tipos [cite: 34]" },
            { sem: "Semana 2", desc: "Computación en la nube y Modelos de Despliegue [cite: 34]" },
            { sem: "Semana 3", desc: "Administración en la nube: Funciones y Tecnología [cite: 34]" },
            { sem: "Semana 4", desc: "Infraestructura de TI y Componentes [cite: 34]" }
        ],
        trabajos: [
            { tarea: "Tarea 1", desc: "Definir clases de computación y administración en la nube [cite: 34]" }
        ]
    },
    2: {
        titulo: "Unidad II: Aplicaciones Empresariales",
        archivos: [
            { sem: "Semana 5", desc: "Fundamentos de Inteligencia de Negocios y Bases de Datos [cite: 38]" }
        ],
        trabajos: [
            { tarea: "Trabajo Grupal", desc: "Elaboración de estructura informática para una empresa [cite: 38]" }
        ]
    }
};

function iniciarPagina() {
    const progress = document.getElementById('progress-bar');
    progress.style.width = '100%';

    setTimeout(() => {
        document.getElementById('loader').style.transform = 'translateY(-100%)';
        document.getElementById('app').style.opacity = '1';
        cambiarUnidad(1);
    }, 1800);
}

function cambiarUnidad(id) {
    const data = silabo[id];
    document.getElementById('view-title').innerText = data.titulo;

    // Render Archivos
    let archHTML = '';
    data.archivos.forEach(a => {
        archHTML += `<div class="list-item"><b>${a.sem}</b> ${a.desc}</div>`;
    });
    document.getElementById('archivos-list').innerHTML = archHTML;

    // Render Trabajos
    let trabHTML = '';
    data.trabajos.forEach(t => {
        trabHTML += `<div class="list-item"><b>${t.tarea}</b> ${t.desc}</div>`;
    });
    document.getElementById('trabajos-list').innerHTML = trabHTML;

    // Actualizar Menú
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        item.classList.toggle('active', (index + 1) === id);
    });
}
