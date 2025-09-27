document.addEventListener('DOMContentLoaded', function() {

    // --- Logic for the Enter Button ---
    const loader = document.getElementById('loader');
    const enterButton = document.getElementById('enter-button');
    const pageContent = document.getElementById('page-content');
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                pageContent.classList.remove('hidden');
            }, 500);
        });
    }
document.addEventListener('DOMContentLoaded', () => {
    // This function fetches the sidebar content and injects it into the page
    function loadSidebar() {
        fetch('/sidebar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Sidebar not found at /sidebar.html');
                }
                return response.text();
            })
            .then(html => {
                const placeholder = document.getElementById('sidebar-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = html;
                }
                // Once the sidebar is loaded, set up all the interactive parts of the page
                initializePageInteractions();
            })
            .catch(error => {
                console.error("Could not load sidebar:", error);
            });
    }

    // This function contains all the logic for making the page interactive
    function initializePageInteractions() {
        const menuIcon = document.getElementById('menu-icon');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        if (menuIcon && sidebar && overlay) {
            // --- Main Sidebar Toggle Logic ---
            const toggleSidebar = () => {
                sidebar.classList.toggle('is-open');
                overlay.classList.toggle('is-visible');
            };
            menuIcon.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);

            // --- Dropdown Menu Logic ---
            sidebar.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent page from jumping
                    const parentDropdown = toggle.parentElement;
                    parentDropdown.classList.toggle('open');
                });
            });

            // --- Close sidebar when a non-dropdown link is clicked ---
            sidebar.querySelectorAll('a').forEach(link => {
                if (!link.classList.contains('dropdown-toggle')) {
                    link.addEventListener('click', () => {
                        if (sidebar.classList.contains('is-open')) {
                           toggleSidebar();
                        }
                    });
                }
            });
        }

        // --- Loader Logic (only runs if on the homepage) ---
        const loader = document.getElementById('loader');
        if (loader) {
            const enterButton = document.getElementById('enter-button');
            const pageContent = document.getElementById('page-content');
            enterButton.addEventListener('click', () => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    pageContent.classList.remove('hidden');
                }, 500);
            });
        }

        // --- Smooth Scrolling for Anchor Links ---
         document.querySelectorAll('a[href^="/index.html#"], a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                const targetId = href.split('#')[1];
                
                // If on a different page, go to index.html first then scroll
                if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
                    window.location.href = '/index.html#' + targetId;
                    return;
                }

                e.preventDefault();
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });


        // --- Scroll Arrow Animation (only runs if on the homepage) ---
        const scrollArrow = document.querySelector('.scroll-arrow');
        if (scrollArrow) {
            window.addEventListener('scroll', () => {
                const welcomeScreen = document.getElementById('welcome-grid');
                if (!welcomeScreen) return;
                const scrollableHeight = welcomeScreen.offsetHeight;
                if (window.scrollY < scrollableHeight) {
                    const scrollPercent = Math.min(window.scrollY / (scrollableHeight - window.innerHeight), 1);
                    const newHeight = 30 + (30 * scrollPercent);
                    scrollArrow.style.height = `${newHeight}px`;
                }
            });
        }
    }

    // Start the process by loading the sidebar
    loadSidebar();
});


