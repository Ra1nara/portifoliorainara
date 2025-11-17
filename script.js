/* =========================================
   1. FUNDO ESPACIAL (THREE.JS)
   ========================================= */
const starContainer = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// Câmera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

// Renderizador
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

if (starContainer) {
    starContainer.appendChild(renderer.domElement);
}

// --- CRIANDO AS ESTRELAS ---
const geometry = new THREE.BufferGeometry();
const count = 5000;
const positions = new Float32Array(count * 3);

for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 5; 
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    size: 0.003,
    color: 0xaaccff,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true
});

const starField = new THREE.Points(geometry, material);
scene.add(starField);

// --- ANIMAÇÃO ---
function animate() {
    requestAnimationFrame(animate);
    starField.rotation.x -= 0.0005;
    starField.rotation.y -= 0.0005;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

/* =========================================
   2. FUNCIONALIDADES DO SITE
   ========================================= */

// Menu Mobile
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

// Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            if(nav.classList.contains('active')){
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            }
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }); 
});

// Carrossel de Projetos (Função Única)
function iniciarCarrossel(carrosselElement) {
    const container = carrosselElement.querySelector('.carousel-track');
    const items = carrosselElement.querySelectorAll('.carousel-track img');
    const prevBtn = carrosselElement.querySelector('.prev-btn');
    const nextBtn = carrosselElement.querySelector('.next-btn');

    let currentIndex = 0;

    function showItem(index) {
        container.style.transform = `translateX(${-index * 100}%)`;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            showItem(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            showItem(currentIndex);
        });
    }
}

// Ativa todos os carrosséis
document.querySelectorAll('.carousel-container').forEach(c => iniciarCarrossel(c));

// Ano automático
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Botão Voltar ao Topo
const toTopBtn = document.querySelector('.to-top');
if (toTopBtn) {
    toTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* =========================================
   3. ANIMAÇÃO SCROLL REVEAL (SERVIÇOS E PROJETOS)
   ========================================= */

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

// Observa Serviços e Projetos
document.querySelectorAll('.service-card, .project-panel').forEach((el) => {
    observer.observe(el);
});

// Scroll Suave para Links Internos (COM FECHAMENTO DO MENU)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Se o menu mobile estiver aberto, fecha ele
            if(nav.classList.contains('active')){
                menuBtn.classList.remove('active');
                nav.classList.remove('active');
            }
            
            // Pequeno delay para permitir que o menu comece a fechar antes de rolar
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300); // 300ms de espera
        }
    }); 
});