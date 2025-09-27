document.addEventListener('DOMContentLoaded', () => {

    /**
     * Fetches the sidebar.html content and injects it into the placeholder.
     * This is the first step.
     */
    function loadSidebar() {
        console.log("Attempting to load sidebar.html...");
        fetch('/sidebar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok. Status: ' + response.status);
                }
                return response.text();
            })
            .then(html => {
                const placeholder = document.getElementById('sidebar-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = html;
                    console.log("SUCCESS: sidebar.html was loaded into the placeholder.");
                    // Now that the sidebar HTML exists, we can make it interactive.
                    initializeSidebarInteractions();
                } else {
                    console.error("CRITICAL ERROR: Could not find #sidebar-placeholder div on the page.");
                }
            })
            .catch(error => {
                console.error("CRITICAL ERROR fetching sidebar.html:", error);
            });
    }

    /**
     * Sets up the event listeners for the sidebar, overlay, and dropdowns.
     * This function ONLY runs after the sidebar has been successfully loaded.
     */
    function initializeSidebarInteractions() {
        const menuIcon = document.getElementById('menu-icon');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        if (!menuIcon || !sidebar || !overlay) {
            console.error("Error: Could not find one or more essential sidebar elements (#menu-icon, #sidebar, #overlay).");
            return;
        }

        // --- Main Sidebar Toggle Logic ---
        const toggleSidebar = () => {
            sidebar.classList.toggle('is-open');
            overlay.classList.toggle('is-visible');
        };
        menuIcon.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);
        console.log("Main sidebar toggle functionality is active.");

        // --- Dropdown Menu Logic ---
        const dropdownToggles = sidebar.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault(); // Stop the link from trying to navigate
                const parentDropdown = toggle.parentElement; // This should be the <li class="dropdown">
                if(parentDropdown) {
                    parentDropdown.classList.toggle('open');
                }
            });
        });
        console.log(`Found and attached ${dropdownToggles.length} dropdown toggles.`);

        // --- Close sidebar when a final link (not a dropdown) is clicked ---
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

    /**
     * Initializes interactions that are NOT dependent on the sidebar.
     */
    function initializePageInteractions() {
        // --- Loader Logic ---
        const loader = document.getElementById('loader');
        if (loader) {
            const enterButton = document.getElementById('enter-button');
            const pageContent = document.getElementById('page-content');
            if (enterButton && pageContent) {
                enterButton.addEventListener('click', () => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        pageContent.classList.remove('hidden');
                    }, 500);
                });
            }
        }

        // --- Smooth Scrolling for Anchor Links ---
        document.querySelectorAll('a[href^="/index.html#"], a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                const targetId = href.split('#')[1];
                
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

        // --- Scroll Arrow Animation ---
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
    
    // --- START THE PROCESS ---
    loadSidebar();
    initializePageInteractions();
});

