// MOCK DATA
const posts = [
    {
        id: 1,
        title: "Favoritos al título mundial: El análisis táctico",
        subtitle: "Un repaso profundo por las selecciones que prometen dominar el torneo.",
        date: "2026-05-10",
        tags: ["Previas", "Táctica"],
        content: `El mundial está a la vuelta de la esquina y los directores técnicos ya tienen sus pizarras totalmente preparadas. Analizamos el despliegue del último campeón que busca revalidar su corona con un sistema de presión alta y transiciones veloces.

        Por otro lado, los equipos sudamericanos apuestan por la tenencia de balón y el talento individual en el último tercio de la cancha. Se espera una batalla táctica sin precedentes en el mediocampo.
        
        Las transiciones de defensa a ataque serán la clave de bóveda de este torneo. Aquellos combinados capaces de replegarse con orden y castigar en pocos toques marcarán la diferencia en las fases eliminatorias.`
    },
    {
        id: 2,
        title: "La caída de un gigante en el Grupo B",
        subtitle: "Crónica de un partido histórico que rompe todos los pronósticos de la fase de clasificación.",
        date: "2026-05-12",
        tags: ["Grupos", "Crónicas"],
        content: `Nadie vio venir este resultado. En un partido vibrante de principio a fin, el combinado catalogado como la 'cenicienta' del grupo derrotó al tetracampeón con un contragolpe fulminante en el minuto 89.

        El planteamiento defensivo de la escuadra ganadora fue simplemente perfecto, cerrando todas las líneas de pase por dentro y forzando centros predecibles. El gigante herido ahora se ve obligado a ganar sus próximos dos partidos si no quiere regresar a casa temprano.
        
        Las caras de incredulidad en el estadio lo decían todo. Este hermoso deporte sigue demostrando que la historia en el papel no juega dentro del campo de juego.`
    },
    {
        id: 3,
        title: "10 curiosidades tecnológicas de los nuevos estadios",
        subtitle: "Desde césped retráctil inteligente hasta sistemas de climatización eco-sustentables.",
        date: "2026-05-13",
        tags: ["Curiosidades"],
        content: `La infraestructura de esta edición mundialista redefine lo que conocemos como un recinto deportivo moderno. Cada uno de los estadios cuenta con un sistema de enfriamiento localizado impulsado por energía solar que mantiene las tribunas a unos estables 21 grados centígrados.

        Además, los asientos incorporan sensores de comunicación de campo cercano (NFC) donde los aficionados pueden ordenar comida directo a su butaca o revisar repeticiones de jugadas polémicas en tiempo real a través de la red local del estadio. 
        
        Por si fuera poco, el agua utilizada para el mantenimiento y riego de los campos de juego proviene en un 90% de procesos de desalinización locales y filtrado avanzado de aguas residuales de las mismas instalaciones.`
    },
    {
        id: 4,
        title: "El perfil de Liam Rossi: La promesa oculta",
        subtitle: "De jugar en las calles de su ciudad natal a convertirse en el arma secreta de su selección.",
        date: "2026-05-14",
        tags: ["Curiosidades", "Previas"],
        content: `Con apenas 19 años de edad, Liam Rossi se ha ganado la titularidad y la emblemática camiseta número 10 de su país a base de desparpajo técnico, regate vertical letal y una lectura de juego impropia de su juventud.

        Su director técnico destaca principalmente su asombrosa fortaleza mental frente a la adversidad: 'No le teme al escenario ni a la presión de millones de personas observándolo'. Los ojeadores de los clubes más grandes de Europa ya se encuentran apostados en las cabinas de prensa siguiendo minuciosamente cada uno de sus movimientos. Este mundial puede ser el inicio de su consagración internacional.`
    },
    {
        id: 5,
        title: "Los sistemas defensivos que definirán el torneo",
        subtitle: "Por qué los bloques bajos y el marcaje mixto están ganando terreno en la élite internacional.",
        date: "2026-05-15",
        tags: ["Táctica", "Previas"],
        content: `En las últimas ligas internacionales se ha observado una notable tendencia hacia la solidez del bloque defensivo. Los entrenadores mundialistas coinciden en que la prioridad absoluta es no encajar goles tempranos en torneos de eliminación directa.

        Veremos planteamientos tácticos extremadamente rígidos en la fase de grupos, donde obtener un empate puede ser el boleto de entrada a los octavos de final. Las defensas de cinco hombres con carrileros de alta proyección serán la norma.`
    },
    {
        id: 6,
        title: "Grandes leyendas: El mundial que lo cambió todo",
        subtitle: "Crónica nostálgica de las mayores hazañas deportivas de la historia de la copa.",
        date: "2026-05-16",
        tags: ["Crónicas", "Grupos"],
        content: `Recordar es volver a vivir. Este artículo nos lleva en un viaje al pasado para recordar la mítica final donde se quebraron todos los récords de audiencia global. Aquellos astros del balón dejaron una huella imborrable que sirve de inspiración para las generaciones actuales.

        Hoy el juego es más físico y tecnológico, pero el espíritu competitivo y el romance que genera ver a un jugador eludir rivales en el césped sigue siendo exactamente el mismo.`
    }
];

// CONTROL DE ESTADO LOCAL ENCAPSULADO (State Pattern)
const state = {
    currentFilterTag: "",  
    currentSearchQuery: "", 
    currentArticleId: null,
    lastFocusedCard: null
}; 

// SELECTORES DEL DOM
const postsGrid = document.getElementById("posts-grid");
const chipsContainer = document.getElementById("chips-container");
const searchInput = document.getElementById("search-input");
const homeView = document.getElementById("home-view");
const detailView = document.getElementById("detail-view");
const controlsSection = document.getElementById("controls-section");
const articleContent = document.getElementById("article-content");

const backBtn = document.getElementById("back-btn");
const prevPostBtn = document.getElementById("prev-post-btn");
const nextPostBtn = document.getElementById("next-post-btn");
const relatedPostsGrid = document.getElementById("related-posts-grid");

// UTILIDADES Y CÁLCULOS
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const totalWords = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(totalWords / wordsPerMinute);
    return `${readingTime} min de lectura`;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// FACTORY PATTERN: Constructor seguro de tarjetas para evitar redundancia y XSS
function createPostCard(post, isRelatedView = false) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    card.setAttribute("data-id", post.id);

    // Contenedor superior
    const cardTop = document.createElement("div");
    cardTop.className = "card-top";

    // Meta datos
    const cardMeta = document.createElement("div");
    cardMeta.className = "card-meta";
    
    const dateSpan = document.createElement("span");
    dateSpan.textContent = formatDate(post.date);
    cardMeta.appendChild(dateSpan);

    if (!isRelatedView) {
        const dotSpan = document.createElement("span");
        dotSpan.className = "card-meta-dot";
        const timeSpan = document.createElement("span");
        timeSpan.textContent = calculateReadingTime(post.content);
        cardMeta.appendChild(dotSpan);
        cardMeta.appendChild(timeSpan);
    }
    cardTop.appendChild(cardMeta);

    // Título (Jerarquía semántica controlada)
    const titleNode = document.createElement(isRelatedView ? "h4" : "h3");
    titleNode.className = "card-title";
    titleNode.textContent = post.title;
    cardTop.appendChild(titleNode);

    // Subtítulo / Extracto
    if (!isRelatedView) {
        const excerptNode = document.createElement("p");
        excerptNode.className = "card-excerpt";
        excerptNode.textContent = post.subtitle;
        cardTop.appendChild(excerptNode);
    }
    card.appendChild(cardTop);

    // Etiquetas / Tags
    const tagsContainer = document.createElement("div");
    tagsContainer.className = "card-tags";
    post.tags.forEach(tag => {
        const tagSpan = document.createElement("span");
        tagSpan.className = "tag";
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
    });
    card.appendChild(tagsContainer);

    // Escuchadores de eventos para navegación accesible
    const openCard = () => {
        if (!isRelatedView) {
            state.lastFocusedCard = card;
        }
        showDetail(post.id);
    };

    card.addEventListener("click", openCard);
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openCard();
        }
    });

    return card;
}

// RENDERIZADORES
function renderChips() {
    const uniqueTags = new Set();
    posts.forEach(post => post.tags.forEach(tag => uniqueTags.add(tag)));

    // Usar fragmento de DOM para repintar eficientemente
    const fragment = document.createDocumentFragment();

    // Crear botón "Todos"
    const allBtn = document.createElement("button");
    allBtn.className = `chip ${state.currentFilterTag === "" ? "active" : ""}`;
    allBtn.textContent = "Todos";
    allBtn.setAttribute("role", "tab");
    allBtn.setAttribute("aria-selected", state.currentFilterTag === "" ? "true" : "false");
    allBtn.addEventListener("click", () => handleTagFilter(""));
    fragment.appendChild(allBtn);

    // Crear botones de categorías
    uniqueTags.forEach(tag => {
        const btn = document.createElement("button");
        const isActive = state.currentFilterTag === tag;
        btn.className = `chip ${isActive ? "active" : ""}`;
        btn.textContent = tag;
        btn.setAttribute("role", "tab");
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
        btn.addEventListener("click", () => handleTagFilter(tag));
        fragment.appendChild(btn);
    });

    chipsContainer.innerHTML = "";
    chipsContainer.appendChild(fragment);
}

function handleTagFilter(tag) {
    state.currentFilterTag = tag;
    renderChips(); 
    renderHome();
}

function renderHome() {
    postsGrid.innerHTML = "";

    const filteredPosts = posts.filter(post => {
        const matchesTag = state.currentFilterTag === "" || post.tags.includes(state.currentFilterTag);
        const matchesSearch = post.title.toLowerCase().includes(state.currentSearchQuery.toLowerCase()) ||
                              post.tags.some(tag => tag.toLowerCase().includes(state.currentSearchQuery.toLowerCase()));
        return matchesTag && matchesSearch;
    });

    if (filteredPosts.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.style.gridColumn = "1/-1";
        emptyState.style.textAlign = "center";
        emptyState.style.padding = "40px 0";
        emptyState.style.color = "var(--text-muted)";
        
        const text = document.createElement("p");
        text.style.fontSize = "1.1rem";
        text.textContent = "No se encontraron artículos que coincidan con tu búsqueda.";
        
        emptyState.appendChild(text);
        postsGrid.appendChild(emptyState);
        return;
    }

    const fragment = document.createDocumentFragment();
    filteredPosts.forEach(post => {
        const cardElement = createPostCard(post, false);
        fragment.appendChild(cardElement);
    });
    postsGrid.appendChild(fragment);
}

function showDetail(id) {
    state.currentArticleId = id;
    const postIndex = posts.findIndex(p => p.id === id);
    const post = posts[postIndex];

    if (!post) return;

    homeView.classList.add("hidden");
    controlsSection.classList.add("hidden");
    detailView.classList.remove("hidden");

    // Limpiar contenido previo de manera segura
    articleContent.innerHTML = "";

    // Armar Cabecera semántica
    const header = document.createElement("header");
    header.className = "article-header";

    const titleNode = document.createElement("h2");
    titleNode.className = "article-title";
    titleNode.textContent = post.title;
    header.appendChild(titleNode);

    const metaInfo = document.createElement("div");
    metaInfo.className = "article-meta-info";
    metaInfo.innerHTML = `Publicado el <strong>${formatDate(post.date)}</strong> <span style="color: var(--border);">|</span> Enfoque: <strong>${calculateReadingTime(post.content)}</strong>`;
    header.appendChild(metaInfo);
    articleContent.appendChild(header);

    // Cuerpo protector anti-XSS usando fragmentación controlada de párrafos literales
    const bodyContainer = document.createElement("div");
    bodyContainer.className = "article-body";
    post.content.split('\n\n').forEach(paragraphText => {
        if (paragraphText.trim()) {
            const p = document.createElement("p");
            p.textContent = paragraphText.trim();
            bodyContainer.appendChild(p);
        }
    });
    articleContent.appendChild(bodyContainer);

    // Zona inferior de etiquetas del post
    const footerTags = document.createElement("div");
    footerTags.className = "card-tags";
    footerTags.style.marginTop = "30px";
    post.tags.forEach(t => {
        const s = document.createElement("span");
        s.className = "tag";
        s.textContent = t;
        footerTags.appendChild(s);
    });
    articleContent.appendChild(footerTags);

    // Estado navegadores secuenciales
    prevPostBtn.disabled = postIndex === 0;
    nextPostBtn.disabled = postIndex === posts.length - 1;

    renderRelatedPosts(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Enfocar el contenedor de detalle para iniciar lectura con teclado de forma fluida
    backBtn.focus();
}

function renderRelatedPosts(currentPost) {
    relatedPostsGrid.innerHTML = "";

    const related = posts.filter(post => {
        if (post.id === currentPost.id) return false;
        return post.tags.some(tag => currentPost.tags.includes(tag));
    }).slice(0, 3);

    if (related.length === 0) {
        const noRelated = document.createElement("p");
        noRelated.style.color = "var(--text-muted)";
        noRelated.style.fontSize = "0.95rem";
        noRelated.style.fontStyle = "italic";
        noRelated.style.gridColumn = "1/-1";
        noRelated.textContent = "No hay artículos relacionados disponibles para esta categoría.";
        relatedPostsGrid.appendChild(noRelated);
        return;
    }

    const fragment = document.createDocumentFragment();
    related.forEach(post => {
        const relatedCard = createPostCard(post, true);
        fragment.appendChild(relatedCard);
    });
    relatedPostsGrid.appendChild(fragment);
}

function showHome() {
    detailView.classList.add("hidden");
    homeView.classList.remove("hidden");
    controlsSection.classList.remove("hidden");
    state.currentArticleId = null;
    renderHome();

    // RESTAURACIÓN DE FOCO: Si venimos de presionar una tarjeta, le devolvemos la selección por teclado
    if (state.lastFocusedCard) {
        state.lastFocusedCard.focus();
    }
}

// ESCUCHADORES DE EVENTOS
searchInput.addEventListener("input", (e) => {
    state.currentSearchQuery = e.target.value;
    renderHome();
});

backBtn.addEventListener("click", showHome);

prevPostBtn.addEventListener("click", () => {
    const currentIndex = posts.findIndex(p => p.id === state.currentArticleId);
    if (currentIndex > 0) showDetail(posts[currentIndex - 1].id);
});

nextPostBtn.addEventListener("click", () => {
    const currentIndex = posts.findIndex(p => p.id === state.currentArticleId);
    if (currentIndex < posts.length - 1) showDetail(posts[currentIndex + 1].id);
});

// INICIALIZACIÓN
renderChips();
renderHome();
