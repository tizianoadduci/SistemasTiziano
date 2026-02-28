/* ========================================
   SISTEMAS TIZIANO — Interactive Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCursorGlow();
    initNavbar();
    initMobileMenu();
    initLogoAnimation();
    initScrollReveal();
    initCountUp();
    initSmoothScroll();
});

/* --- Floating Particles (Antigravity Effect) --- */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    const PARTICLE_COUNT = 60;
    let mouse = { x: -1000, y: -1000 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3 - 0.15; // slight upward drift = antigravity
            this.opacity = Math.random() * 0.5 + 0.1;
            this.flickerSpeed = Math.random() * 0.02 + 0.005;
            this.flickerOffset = Math.random() * Math.PI * 2;
            this.hue = Math.random() > 0.7 ? 45 : 195; // gold or blue tint
        }

        update(time) {
            // Antigravity float
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse repulsion
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.x += (dx / dist) * force * 2;
                this.y += (dy / dist) * force * 2;
            }

            // Flicker
            this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(time * this.flickerSpeed + this.flickerOffset));

            // Wrap around
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
            if (this.y < -10) this.y = canvas.height + 10;
            if (this.y > canvas.height + 10) this.y = -10;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            if (this.hue === 45) {
                ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.currentOpacity})`;
            } else {
                ctx.fillStyle = `hsla(${this.hue}, 80%, 55%, ${this.currentOpacity * 0.6})`;
            }
            ctx.fill();

            // Glow for larger particles
            if (this.size > 1.5) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.currentOpacity * 0.1})`;
                ctx.fill();
            }
        }
    }

    // Create particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    // Draw connections between nearby particles
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const opacity = (1 - dist / 120) * 0.08;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update(time);
            p.draw();
        });
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
}

/* --- Cursor Glow --- */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        // Smooth follow with lerp
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        glow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
        requestAnimationFrame(animateGlow);
    }
    requestAnimationFrame(animateGlow);

    // Hide on mobile
    if ('ontouchstart' in window) {
        glow.style.display = 'none';
    }
}

/* --- Navbar Scroll --- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* --- Logo Animation Sequence --- */
function initLogoAnimation() {
    const step1 = document.getElementById('logo-step-1');
    const step2 = document.getElementById('logo-step-2');
    const boltZ = document.getElementById('bolt-z');
    const fullName = document.getElementById('logo-full-name');
    const underline = document.getElementById('logo-underline');
    const boltFinal = document.getElementById('bolt-final');
    const tagline = document.getElementById('hero-tagline');
    const subtitle = document.getElementById('hero-subtitle');
    const ctas = document.getElementById('hero-ctas');

    if (!step1 || !step2) return;

    // Timeline
    const timeline = [
        // Step 1: Show "Ti⚡iano"
        { delay: 300, action: () => step1.classList.add('active') },
        // Step 2: Spin the bolt to look like a Z
        {
            delay: 1500, action: () => {
                boltZ.classList.add('spin-z');
            }
        },
        // Step 3: Flash the bolt and fade out step 1
        {
            delay: 2500, action: () => {
                boltZ.classList.add('flash');
            }
        },
        // Step 4: Transition to full name
        {
            delay: 3300, action: () => {
                step1.classList.remove('active');
                step2.classList.add('active');
                fullName.classList.add('visible');
            }
        },
        // Step 5: Underline animates from left to right
        {
            delay: 4000, action: () => {
                underline.classList.add('animate');
            }
        },
        // Step 6: Bolt appears at the right
        {
            delay: 4900, action: () => {
                boltFinal.classList.add('visible');
            }
        },
        // Step 7: Show tagline, subtitle, CTAs
        {
            delay: 5300, action: () => {
                tagline.classList.add('visible');
                subtitle.classList.add('visible');
                ctas.classList.add('visible');
            }
        },
    ];

    timeline.forEach(item => {
        setTimeout(item.action, item.delay);
    });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* --- Count Up Animation --- */
function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                let current = 0;
                const increment = target / 40;
                const duration = 1500;
                const stepTime = duration / 40;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    el.textContent = Math.round(current);
                }, stepTime);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const pos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });
}
