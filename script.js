document.addEventListener('DOMContentLoaded', () => {

    // --- PART 1: PAGE TRANSITION (ANIMATE-OUT ON LOAD) ---
    // This runs immediately to set up the page load animation.
    const body = document.body;
    body.classList.add('is-loading'); // Start with lines on-screen
    
    window.addEventListener('load', () => {
        body.classList.add('is-loaded'); // Trigger the "animate-out"
        
        setTimeout(() => {
            const overlay = document.getElementById('page-transition-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        }, 1000); // 1s = 0.6s transition + 0.4s delay
    });

    function initializeAllInteractions() {

        // --- Handle Anchor Scroll on Page Load ---
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1); // Get "contact"
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Wait for the page transition to finish (1s)
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 1000); // This MUST match your transition-out time
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
                     if (targetId) { // Check if targetId is not empty
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

        // --- Project List Accordion Logic ---
        const projectItems = document.querySelectorAll('.project-list-item');
        projectItems.forEach(item => {
            const title = item.querySelector('h3');
            if (title) {
                title.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    const isOpen = item.classList.contains('active');
                    projectItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    if (!isOpen) {
                        item.classList.add('active');
                    }
                });
            }
            
            // --- THIS BLOCK IS NOW FIXED ---
            const description = item.querySelector('p');
            if(description) {
                description.addEventListener('click', (e) => {
                    e.preventDefault(); // Stop the parent <a> from firing
                    e.stopPropagation(); // Stop the click from bubbling to the <h3>
                    
                    // Manually trigger the transition
                    body.classList.add('is-transitioning'); 
                    
                    // Wait for animation, then go to the link
                    setTimeout(() => {
                        window.location.href = item.getAttribute('href');
                    }, 1000); 
                });
                description.style.cursor = 'pointer'; 
            }
        });

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
            updateCardStack(0); // Initialize the first card
        }

        // --- Fade-in on Scroll for Timeline Items ---
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

            // 1. IGNORE special links
            if (href.startsWith('http') || 
                href.startsWith('//') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') ||
                link.classList.contains('dropdown-toggle') || 
                link.target === '_blank') 
            {
                return; // Do nothing
            }

            // 2. IGNORE simple same-page anchors
            if (href.startsWith('#')) {
                return; // Do nothing, let smooth-scroll handle it
            }

            // 3. If it's a real page-to-page link, add the transition
            link.addEventListener('click', (e) => {
                e.preventDefault(); 
                body.classList.add('is-transitioning'); 
                
                setTimeout(() => {
                    window.location.href = href;
                }, 1000); 
            });
        });

    } // --- End of initializeAllInteractions ---


    // --- PART 3: SIDEBAR LOADER FUNCTION ---
    // This function fetches the sidebar and then calls initializeAllInteractions
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
                // Still initialize the rest of the page
                initializeAllInteractions();
            });
    }

    // --- PART 4: START THE ENTIRE PROCESS ---
    loadSidebar();

});