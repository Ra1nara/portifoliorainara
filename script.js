/* =========================================================
   RAINARADEV — SCRIPT PRINCIPAL
   ========================================================= */

/* =========================================================
   1. FUNDO ESPACIAL — THREE.JS
   ========================================================= */

const starContainer = document.getElementById("canvas-container");

if (starContainer && typeof THREE !== "undefined") {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 1.5)
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    starContainer.appendChild(renderer.domElement);

    /* Estrelas */

    const geometry = new THREE.BufferGeometry();

    // Menos estrelas em telas pequenas
    const count = window.innerWidth < 768 ? 2500 : 4000;

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 5;
    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
        size: 0.003,
        color: 0xaaccff,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });

    const starField = new THREE.Points(
        geometry,
        material
    );

    scene.add(starField);

    /* Animação */

    let animationFrame;

    function animate() {
        animationFrame = requestAnimationFrame(animate);

        starField.rotation.x -= 0.0003;
        starField.rotation.y -= 0.0003;

        renderer.render(scene, camera);
    }

    animate();

    /* Responsividade */

    window.addEventListener("resize", () => {
        camera.aspect =
            window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    });

    /* Respeita usuários que preferem menos movimento */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {
        cancelAnimationFrame(animationFrame);
        starField.rotation.x = 0;
        starField.rotation.y = 0;
        renderer.render(scene, camera);
    }
}


/* =========================================================
   2. MENU MOBILE
   ========================================================= */

const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        const isOpen =
            menuBtn.classList.toggle("active");

        nav.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );
    });

    /* Fecha o menu ao clicar em um link */

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            menuBtn.classList.remove("active");
            nav.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );
        });

    });

}


/* =========================================================
   3. SCROLL SUAVE
   ========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =========================================================
   4. CARROSSEL DE PROJETOS
   ========================================================= */

function iniciarCarrossel(carrosselElement) {

    const container =
        carrosselElement.querySelector(
            ".carousel-track"
        );

    const items =
        carrosselElement.querySelectorAll(
            ".carousel-track img"
        );

    const prevBtn =
        carrosselElement.querySelector(
            ".prev-btn"
        );

    const nextBtn =
        carrosselElement.querySelector(
            ".next-btn"
        );

    if (
        !container ||
        items.length === 0
    ) {
        return;
    }

    let currentIndex = 0;

    function showItem(index) {

        currentIndex = index;

        container.style.transform =
            `translateX(-${index * 100}%)`;

    }

    /* Botão anterior */

    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            () => {

                const newIndex =
                    currentIndex > 0
                        ? currentIndex - 1
                        : items.length - 1;

                showItem(newIndex);

            }
        );

    }

    /* Próximo */

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                const newIndex =
                    currentIndex <
                    items.length - 1
                        ? currentIndex + 1
                        : 0;

                showItem(newIndex);

            }
        );

    }

}


/* Inicializa todos os carrosséis */

document
    .querySelectorAll(".carousel-container")
    .forEach(carrossel => {

        iniciarCarrossel(carrossel);

    });


/* =========================================================
   5. ANIMAÇÃO DOS CARDS AO ENTRAR NA TELA
   ========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".service-card, .project-panel, .process-card, .about-content"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    animatedElements.forEach(element => {

        observer.observe(element);

    });

} else {

    /* Fallback para navegadores antigos */

    animatedElements.forEach(element => {

        element.classList.add("show");

    });

}


/* =========================================================
   6. ANO AUTOMÁTICO
   ========================================================= */

const yearSpan =
    document.getElementById("year");

if (yearSpan) {

    yearSpan.textContent =
        new Date().getFullYear();

}


/* =========================================================
   7. BOTÃO VOLTAR AO TOPO
   ========================================================= */

const toTopBtn =
    document.querySelector(".to-top");

if (toTopBtn) {

    toTopBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   8. WHATSAPP — CTA
   ========================================================= */

const whatsappLinks =
    document.querySelectorAll(
        '[data-whatsapp]'
    );

whatsappLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            /*
             * Não precisamos fazer nada aqui.
             * O href do HTML controla o redirecionamento.
             * Este listener existe apenas para futuras
             * métricas/conversões.
             */

        }
    );

});


/* =========================================================
   9. ESC — FECHAR MENU MOBILE
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            nav &&
            nav.classList.contains("active")
        ) {

            nav.classList.remove("active");

            if (menuBtn) {

                menuBtn.classList.remove(
                    "active"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);


/* =========================================================
   10. HEADER — EFEITO AO ROLAR
   ========================================================= */

const header =
    document.querySelector("header");

if (header) {

    let lastScroll = 0;

    window.addEventListener(
        "scroll",
        () => {

            const currentScroll =
                window.scrollY;

            if (currentScroll > 30) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

            lastScroll = currentScroll;

        },
        {
            passive: true
        }
    );

}