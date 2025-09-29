document.addEventListener('DOMContentLoaded', () => {

    /**
     * This function is called after the sidebar has been loaded into the page.
     * It sets up all the event listeners for the sidebar's interactive elements.
     */
    function initializeSidebarInteractions() {
        const menuIcon = document.getElementById('menu-icon');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        if (!menuIcon || !sidebar || !overlay) {
            console.error("Sidebar core components (menu icon, sidebar, overlay) not found.");
            return;
        }

        // --- Main Sidebar Toggle Logic ---
        const toggleSidebar = () => {
            sidebar.classList.toggle('is-open');
            overlay.classList.toggle('is-visible');
        };
        menuIcon.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);

        // --- CORRECTED DROPDOWN LOGIC ---
        const dropdownToggles = sidebar.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault(); // Prevents the link from navigating
                const parentDropdown = toggle.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.classList.toggle('open'); // Toggles the 'open' class on the LI element
                }
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

    /**
     * This function contains all the logic for page elements that are NOT in the sidebar.
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

        // --- Fade-in on Scroll for Cards ---
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });
        cards.forEach(card => observer.observe(card));

           // --- Community Projects Tabs ---
const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");

if (tabs.length && panels.length) {
    tabs.forEach(btn => {
        btn.addEventListener("click", () => {
            // Reset active states
            tabs.forEach(b => b.classList.remove("active"));
            panels.forEach(p => p.classList.remove("active"));

            // Activate clicked tab + corresponding panel
            btn.classList.add("active");
            const targetPanel = document.getElementById(btn.dataset.tab);
            if (targetPanel) {
                targetPanel.classList.add("active");
            }
        });
    });
    }

    /**
     * This is the main function that starts everything.
     * It fetches the sidebar.html content and injects it into the placeholder.
     */
    function loadSidebarAndInitialize() {
        fetch('/sidebar.html')
            .then(response => {
                if (!response.ok) { throw new Error('Sidebar.html not found.'); }
                return response.text();
            })
            .then(html => {
                const placeholder = document.getElementById('sidebar-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = html;
                    // IMPORTANT: Initialize sidebar interactions AFTER the HTML is loaded.
                    initializeSidebarInteractions();
                }
            })
            .catch(error => {
                console.error("Could not load sidebar:", error);
                // Still try to initialize sidebar interactions in case the HTML is static
                initializeSidebarInteractions();
            });
    }

    // --- START THE PROCESS ---
    loadSidebarAndInitialize();
    initializePageInteractions();
});

