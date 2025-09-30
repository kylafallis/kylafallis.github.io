document.addEventListener('DOMContentLoaded', () => {

    /**
     * This function is called ONLY after the sidebar has been loaded.
     * It sets up all event listeners for the entire page's interactive elements.
     */
    function initializeAllInteractions() {
        console.log("Initializing all page interactions...");

        // --- Sidebar Toggle Logic ---
        const menuIcon = document.getElementById('menu-icon');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        if (menuIcon && sidebar && overlay) {
            const toggleSidebar = () => {
                sidebar.classList.toggle('is-open');
                overlay.classList.toggle('is-visible');
            };
            menuIcon.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);
            console.log("Sidebar toggle initialized.");
        } else {
            console.error("Could not find one or more sidebar components (menu, sidebar, overlay).");
        }

        // --- Dropdown Menu Logic ---
        if (sidebar) {
            sidebar.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent page from jumping
                    const parentDropdown = toggle.closest('.dropdown');
                    if (parentDropdown) {
                        parentDropdown.classList.toggle('open');
                    }
                });
            });
            console.log("Dropdown toggles initialized.");
        }

        // --- Close sidebar when a non-dropdown link is clicked ---
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
            console.log("Loader button initialized.");
        }
        
        // --- Smooth Scrolling for Anchor Links ---
        document.querySelectorAll('a[href*="#"]').forEach(anchor => {
             anchor.addEventListener('click', function (e) {
                 const href = this.getAttribute('href');
                 const isSamePageAnchor = href.startsWith('#') || (href.startsWith('/#')) || (href.startsWith('index.html#'));

                 if (isSamePageAnchor) {
                     e.preventDefault();
                     const targetId = href.substring(href.indexOf('#') + 1);
                     const targetElement = document.getElementById(targetId);
                     if (targetElement) {
                         targetElement.scrollIntoView({ behavior: 'smooth' });
                     }
                 }
             });
        });
        
        // --- Scroll Arrow Animation ---
        const scrollArrow = document.querySelector('.scroll-arrow');
        if (scrollArrow) {
            window.addEventListener('scroll', () => {
                const welcomeScreen = document.getElementById('welcome-grid');
                if (!welcomeScreen) return;
                
                const scrollableHeight = welcomeScreen.offsetHeight - window.innerHeight;
                if (window.scrollY < scrollableHeight && scrollableHeight > 0) {
                    const scrollPercent = window.scrollY / scrollableHeight;
                    const newHeight = 30 + (30 * scrollPercent);
                    scrollArrow.style.height = `${newHeight}px`;
                } else if (window.scrollY >= scrollableHeight) {
                    scrollArrow.style.height = `60px`;
                }
            });
        }
    }

    /**
     * Main function that starts everything.
     * It fetches sidebar.html and injects it into the placeholder.
     */
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
                    console.log("Sidebar HTML loaded successfully.");
                    // IMPORTANT: Initialize interactions AFTER the HTML is loaded.
                    initializeAllInteractions();
                } else {
                     console.error("Sidebar placeholder not found on this page.");
                     // If there's no placeholder, just initialize the page anyway
                     initializeAllInteractions();
                }
            })
            .catch(error => {
                console.error("Could not load sidebar:", error);
                // Still try to initialize the rest of the page even if sidebar fails
                initializeAllInteractions();
            });
    }

    // --- START THE ENTIRE PROCESS ---
    loadSidebar();
});
