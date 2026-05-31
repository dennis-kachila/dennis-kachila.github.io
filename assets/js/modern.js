document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3D Tilt Effect for Hero Image Frame
    const container = document.querySelector('.hero-image-container');
    const frame = document.querySelector('.hero-image-frame-container');
    
    if (container && frame) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 10; // max 10 degrees
            const rotateY = ((x - centerX) / centerX) * 10; // max 10 degrees
            
            frame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        container.addEventListener('mouseleave', () => {
            frame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            frame.style.transition = 'transform 0.5s ease';
        });

        container.addEventListener('mouseenter', () => {
            frame.style.transition = 'transform 0.1s ease';
        });
    }

    // Theme Toggle Click Handler
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Lightbox Modal Logic
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox) {
        // Find all gallery and portfolio cards
        const cards = document.querySelectorAll('.gallery-card, .portfolio-card');
        
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                // If user clicked a button/link inside a card, do not open the lightbox
                if (e.target.closest('a') || e.target.closest('button')) {
                    return;
                }

                const imgElement = card.querySelector('img');
                const imgSrc = imgElement ? imgElement.getAttribute('src') : '';
                
                let tagText = card.getAttribute('data-tag') || '';
                let titleText = card.getAttribute('data-title') || '';
                let descText = card.getAttribute('data-desc') || '';
                
                if (!tagText) {
                    const tagEl = card.querySelector('.gallery-card-tag, .portfolio-tag');
                    tagText = tagEl ? tagEl.textContent.trim() : '';
                }
                if (!titleText) {
                    const titleEl = card.querySelector('h4, .portfolio-title');
                    titleText = titleEl ? titleEl.textContent.trim() : '';
                }
                if (!descText) {
                    const descEl = card.querySelector('p');
                    descText = descEl ? descEl.textContent.trim() : '';
                }
                
                lightboxImg.setAttribute('src', imgSrc);
                lightboxImg.setAttribute('alt', titleText);
                lightboxTag.textContent = tagText;
                lightboxTitle.textContent = titleText;
                lightboxDesc.textContent = descText;
                
                const lightboxHireBtn = document.getElementById('lightbox-hire-btn');
                if (lightboxHireBtn) {
                    lightboxHireBtn.setAttribute('href', `hire.html?project=${encodeURIComponent(titleText)}`);
                }
                
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // FAQ Toggle Logic
    const faqToggleBtn = document.getElementById('faq-toggle-btn');
    const faqContainer = document.getElementById('faq-content-wrapper');

    if (faqToggleBtn && faqContainer) {
        faqToggleBtn.addEventListener('click', () => {
            const isActive = faqContainer.classList.contains('active');
            if (isActive) {
                faqContainer.classList.remove('active');
                faqToggleBtn.innerHTML = '<i class="fas fa-question-circle"></i> Show FAQs';
            } else {
                faqContainer.classList.add('active');
                faqToggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Hide FAQs';
                setTimeout(() => {
                    faqContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 200);
            }
        });
    }

    // Mobile Hamburger Menu Drawer Logic
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isMenuOpen = navLinks.classList.contains('active');
            if (isMenuOpen) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            } else {
                navLinks.classList.add('active');
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden'; // prevent scrolling behind active drawer
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            });
        });
    }

    // ── Portfolio Image Slideshows ──────────────────────────────────────────
    function initPortfolioSlideshows() {
        document.querySelectorAll('.portfolio-slideshow').forEach(slideshow => {
            const slides = slideshow.querySelectorAll('.portfolio-slide');
            const dotsContainer = slideshow.querySelector('.slideshow-dots');
            if (!slides.length || !dotsContainer) return;

            // Build dot indicators
            slides.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.classList.add('slideshow-dot');
                if (i === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            });

            let current = 0;
            const dots = dotsContainer.querySelectorAll('.slideshow-dot');

            function goTo(index) {
                slides[current].classList.remove('active');
                dots[current].classList.remove('active');
                current = (index + slides.length) % slides.length;
                slides[current].classList.add('active');
                dots[current].classList.add('active');
            }

            // Auto-advance every 4 seconds
            setInterval(() => goTo(current + 1), 4000);
        });
    }

    initPortfolioSlideshows();

    // ── Animated Stats Counters ─────────────────────────────────────────────
    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOut cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => observer.observe(el));
    }
});
