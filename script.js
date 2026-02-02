document.addEventListener('DOMContentLoaded', () => {

    // --- PART 1: PAGE TRANSITION (ANIMATE-OUT ON LOAD) ---
    const body = document.body;
    body.classList.add('is-loading');
    
    window.addEventListener('load', () => {
        body.classList.add('is-loaded');
        
        setTimeout(() => {
            const overlay = document.getElementById('page-transition-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        }, 1000);
    });

    
    // --- PART 2: INTERACTION INITIALIZER FUNCTION ---
    function initializeAllInteractions() {

        // --- Handle Anchor Scroll on Page Load ---
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 1000);
            }
        }

        // --- Sidebar Toggle Logic ---
        const menuIcon = document.getElementById('menu-icon');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        if (menuIcon && sidebar && overlay) {
            const toggleSidebar = () => {
                const isOpen = sidebar.classList.toggle('is-open');
                overlay.classList.toggle('is-visible');
                menuIcon.setAttribute('aria-expanded', isOpen);
            };
            menuIcon.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);
        }

        // --- Sidebar Dropdown Menu Logic ---
        if (sidebar) {
            sidebar.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    const parentDropdown = toggle.closest('.dropdown');
                    if (parentDropdown) {
                        parentDropdown.classList.toggle('open');
                    }
                });
            });
        }

        // --- Sidebar Close on Link Click ---
        if (sidebar) {
            sidebar.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
                link.addEventListener('click', () => {
                    if (sidebar.classList.contains('is-open')) {
                        sidebar.classList.remove('is-open');
                        overlay.classList.remove('is-visible');
                    }
                });
            });
        }
        
        // --- Loader & Enter Button Logic ---
        const loader = document.getElementById('loader');
        const enterButton = document.getElementById('enter-button');
        const pageContent = document.getElementById('page-content');
        if (loader && enterButton && pageContent) {
            enterButton.addEventListener('click', () => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    pageContent.classList.remove('hidden');
                }, 500);
            });
        }
        
        // --- Smooth Scrolling for Anchor Links ---
        document.querySelectorAll('a[href*="#"]').forEach(anchor => {
             anchor.addEventListener('click', function (e) {
                 const href = this.getAttribute('href');
                 const isSamePageAnchor = href.startsWith('#') || href.includes('index.html#');

                 if (isSamePageAnchor) {
                     const targetId = href.substring(href.indexOf('#') + 1);
                     if (targetId) {
                        e.preventDefault();
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                     }
                 }
             });
        });
        
        // --- Scroll Arrow Animation ---
        const scrollArrow = document.querySelector('.scroll-arrow');
        
        if (scrollArrow) {
            const baseHeight = 30; 
            const maxHeight = 60;  
            const scrollRange = window.innerHeight; 

            window.addEventListener('scroll', () => {
                const scrollPercent = Math.min(1.0, window.scrollY / scrollRange);
                const heightChange = (maxHeight - baseHeight) * scrollPercent;
                const newHeight = baseHeight + heightChange;

                scrollArrow.style.height = `${newHeight}px`;
            });
        }

        // --- Community Card Shuffle Logic ---
        const navItems = document.querySelectorAll('.community-nav-item');
        const cards = document.querySelectorAll('.shuffle-card');

        function updateCardStack(activeIndex) {
            cards.forEach((card, i) => {
                card.classList.remove('active', 'next-1', 'next-2');
                
                if (i === activeIndex) {
                    card.classList.add('active');
                } else if (i === (activeIndex + 1) % cards.length) {
                    card.classList.add('next-1');
                } else if (i === (activeIndex + 2) % cards.length) {
                    card.classList.add('next-2');
                }
            });
        }

        if (navItems.length > 0 && cards.length > 0) {
            navItems.forEach((item, index) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    navItems.forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');
                    updateCardStack(index);
                });
            });
            updateCardStack(0);
        }

        // --- Fade-in on Scroll for Timeline Items (on sub-pages) ---
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems.length > 0) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, index * 150); 
                    }
                });
            }, { threshold: 0.1 });
            timelineItems.forEach(item => observer.observe(item));
        }

        // --- PAGE TRANSITION (ANIMATE-IN ON CLICK) ---
        const allLinks = document.querySelectorAll('a[href]');

        allLinks.forEach(link => {
            const href = link.getAttribute('href');

            if (!href || 
                href.startsWith('http') || 
                href.startsWith('//') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') ||
                link.classList.contains('dropdown-toggle') || 
                link.target === '_blank') 
            {
                return;
            }

            if (href.startsWith('#')) {
                return;
            }

            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                body.classList.add('is-transitioning'); 
                
                setTimeout(() => {
                    window.location.href = href;
                }, 1000); 
            });
        });
        
        // ============================================
        // === NEW AWARD-WINNING FEATURES START HERE ===
        // ============================================
        
        // --- 1. LENIS SMOOTH SCROLL IMPLEMENTATION ---
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        
        // --- 2. SCROLL-TRIGGERED PARALLAX ---
        const parallaxElements = document.querySelectorAll('.parallax-element');
        const parallaxBg = document.querySelector('.parallax-bg');
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            // Background parallax
            if (parallaxBg) {
                parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            // Element parallax
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.3;
                const rect = el.getBoundingClientRect();
                const elementTop = rect.top + window.pageYOffset;
                const elementVisible = elementTop < (window.pageYOffset + window.innerHeight);
                
                if (elementVisible) {
                    const yPos = -(scrolled - elementTop) * parseFloat(speed);
                    el.style.transform = `translateY(${yPos}px)`;
                }
            });
        }
        
        // Use RAF for smooth parallax
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // --- 3. VANILLA TILT FOR 3D EFFECTS ---
        const tiltCards = document.querySelectorAll('.tilt-card');
        
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(tiltCards, {
                max: 8,                    // Maximum tilt rotation (degrees)
                speed: 400,                // Speed of the enter/exit transition
                glare: true,               // Enable glare effect
                'max-glare': 0.3,          // Maximum glare opacity
                gyroscope: true,           // Enable gyroscope on mobile
                perspective: 1000,         // Transform perspective
                scale: 1.02,               // Scale on hover
                transition: true,          // Set a transition on enter/exit
                reset: true,               // Reset on mouse leave
                easing: "cubic-bezier(.03,.98,.52,.99)"
            });
        }
        
        
        // --- 5. SCROLL-TRIGGERED FADE-IN ANIMATIONS ---
        const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Clean up will-change after animation
                    setTimeout(() => {
                        entry.target.classList.add('animation-complete');
                    }, 1000);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(el => {
            el.classList.add('will-animate');
            fadeObserver.observe(el);
        });
        
        // --- 6. PERFORMANCE: Reduce motion for users who prefer it ---
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable tilt
            tiltCards.forEach(card => {
                if (card.vanillaTilt) {
                    card.vanillaTilt.destroy();
                }
            });
            
            // Disable magnetic buttons
            magneticButtons.forEach(button => {
                button.style.transform = 'none';
            });
        }
        
        // --- 7. SMOOTH CURSOR MOVEMENT (Optional Enhancement) ---
        let cursor = { x: 0, y: 0 };
        let mouse = { x: 0, y: 0 };
        
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        // Smooth cursor following (used internally for calculations)
        function updateCursor() {
            cursor.x += (mouse.x - cursor.x) * 0.15;
            cursor.y += (mouse.y - cursor.y) * 0.15;
            requestAnimationFrame(updateCursor);
        }
        updateCursor();
        
        // --- 8. LAZY LOAD OPTIMIZATION ---
        // Add intersection observer for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));

    } // --- End of initializeAllInteractions ---


    // --- PART 3: SIDEBAR LOADER FUNCTION ---
    function loadSidebar() {
        fetch('/sidebar.html')
            .then(response => {
                if (!response.ok) { throw new Error('sidebar.html not found.'); }
                return response.text();
            })
            .then(html => {
                const placeholder = document.getElementById('sidebar-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = html;
                }
                initializeAllInteractions(); 
            })
            .catch(error => {
                console.error(error);
                initializeAllInteractions();
            });
    }

    // --- PART 4: START THE ENTIRE PROCESS ---
    loadSidebar();

});