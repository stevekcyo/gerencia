const silabo = {
    1: {
        titulo: "Unidad I: Administración en la Nube",
        archivos: [
            { sem: "Semana 1", desc: "La información en la empresa: Sistemas de Información, Tipos y Componentes esenciales. Estrategia: Aprendizaje basado en problemas." },
            { sem: "Semana 2", desc: "Computación en la nube. Estrategia: Modelos de Despliegue." },
            { sem: "Semana 3", desc: "Administración en la nube. Estrategia: Funciones y Tecnología de soporte." },
            { sem: "Semana 4", desc: "Infraestructura de TI: Componentes esenciales y Tipos de infraestructura de TI. Hito: Ingreso de notas al sistema de la Unidad I." }
        ],
        trabajos: [
            { tarea: "Evidencia de Conocimiento 1", desc: "Saberes teóricos aplicados mediante pruebas escritas o cuestionarios (Ponderado: 10% de la unidad)." },
            { tarea: "Evidencia de Desempeño 1", desc: "Habilidades prácticas evaluadas a través de la participación activa y presentaciones orales en clase." },
            { tarea: "Evidencia de Producto 1", desc: "Entregable práctico inicial: Informe técnico enfocado en la administración empresarial en entornos de nube." }
        ]
    },
    2: {
        titulo: "Unidad II: Aplicaciones Empresariales",
        archivos: [
            { sem: "Semana 5", desc: "Los sistemas de información en los negocios: Fundamentos de inteligencia de negocios, gestión de bases de datos y administración integrada de la información." },
            { sem: "Semana 6", desc: "Diseño de la Estructura Informática Integral de los Sistemas de Información Gerencial. Estrategia: Tres Planos (EPS)." },
            { sem: "Semana 7", desc: "Aplicaciones empresariales y EAS (Enterprise Application Software). Usos comunes y análisis de tipologías clave: CRM, SCM, ERP, SIG." },
            { sem: "Semana 8", desc: "Gestión de aplicaciones críticas para la nube híbrida: Software de nube híbrida diseñado para un negocio inteligente. Hito: Ingreso de notas al sistema de la Unidad II." }
        ],
        trabajos: [
            { tarea: "Evidencia de Conocimiento 2", desc: "Pruebas escritas/cuestionarios de control sobre la estructura integral y software EAS (Ponderado: 15% de la unidad)." },
            { tarea: "Evidencia de Desempeño 2", desc: "Exposición grupal de la arquitectura lógica planteada sobre los tres planos (EPS) para el control organizacional." },
            { tarea: "Evidencia de Producto 2", desc: "Diseño y documentación técnica de la estructura informática integral adaptada a un caso de negocio." }
        ]
    },
    3: {
        titulo: "Unidad III: Infraestructura TI",
        archivos: [
            { sem: "Semana 9", desc: "Gobierno de TI: Alineamiento estratégico de TI con los objetivos del negocio, creación sostenible de valor y gestión integral de procesos corporativos." },
            { sem: "Semana 10", desc: "Gestión de servicios de TI: Fundamentos y diseño de la Estrategia del servicio." },
            { sem: "Semana 11", desc: "Diseño del servicio TI y planes de Transición efectiva del servicio hacia producción." },
            { sem: "Semana 12", desc: "Gestión del cambio, administración del conocimiento, control de Eventos, incidencias, problemas y mesa de Centro de servicio. Hito: Ingreso de notas al sistema de la Unidad III." }
        ],
        trabajos: [
            { tarea: "Evidencia de Conocimiento 3", desc: "Evaluación escrita sobre marcos de Gobierno de TI, alineamiento y gestión de servicios (Ponderado: 20% de la unidad)." },
            { tarea: "Evidencia de Desempeño 3", desc: "Simulación de control y resolución de incidencias/problemas aplicando metodologías de gestión de servicios." },
            { tarea: "Evidencia de Producto 3", desc: "Plan integral de Gobierno de TI y catálogo estructurado de servicios para la optimización de la infraestructura empresarial." }
        ]
    },
    4: {
        titulo: "Unidad IV: Desarrollo de Sistemas",
        archivos: [
            { sem: "Semana 13", desc: "El ciclo de vida del desarrollo de sistemas (SDLC) y revisión exhaustiva de Metodologías ágiles y tradicionales para el Desarrollo de Sistemas de Información." },
            { sem: "Semana 14", desc: "Estrategias de Implementación de sistemas de información: Migración, pruebas de aceptación, despliegue y puesta en marcha." },
            { sem: "Semana 15", desc: "Elaboración e integración del proyecto práctico final de sistemas de información aplicado directamente dentro de una empresa real." },
            { sem: "Semana 16", desc: "Sustentación y Exposición del proyecto práctico final ante el docente. Hito: Evaluación de desempeño final (EDF) e ingreso de notas de cierre de semestre." }
        ],
        trabajos: [
            { tarea: "Evidencia de Conocimiento 4", desc: "Evaluación teórica sobre metodologías de desarrollo e implementación de sistemas (Ponderado: 25% de la unidad)." },
            { tarea: "Evidencia de Desempeño Final", desc: "Sustentación formal, defensa técnica y demostración del software e informes de la solución empresarial diseñada (Ponderado general: 30%)." },
            { tarea: "Evidencia de Producto Final", desc: "Entregable final: Repositorio de código, documentación técnica del ciclo de vida y reporte de implementación en la organización objetivo." }
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
    if (!data) return;

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

    // Actualizar Estado Activo del Menú
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        item.classList.toggle('active', (index + 1) === id);
    });
}
