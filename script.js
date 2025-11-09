document.addEventListener('DOMContentLoaded', () => {

    /**
     * This function is called ONLY after the sidebar has been loaded.
     * It sets up all event listeners for the entire page's interactive elements.
     */
    function initializeAllInteractions() {

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
        } else {
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

        // --- NEW: Community Projects Tabs Logic ---
        const tabs = document.querySelectorAll(".tab-btn");
        const panels = document.querySelectorAll(".tab-panel");

        if (tabs.length > 0 && panels.length > 0) {
            tabs.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabs.forEach(b => b.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));

                    btn.classList.add('active');
                    const targetPanel = document.getElementById(btn.dataset.tab);
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                    }
                });
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
                    initializeAllInteractions();
                } else {
                     // If there's no placeholder, just initialize the page anyway
                     initializeAllInteractions();
                }
            })
            .catch(error => {
                // Still try to initialize the rest of the page even if sidebar fails
                initializeAllInteractions();
            });
    }
    // --- Fade-in on Scroll for Timeline Items ---
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a delay based on the item's index for a staggered effect
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 150); // 150ms delay between items
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => observer.observe(item));
}
// --- Fade-in on Scroll for CARDS ---
const cardItems = document.querySelectorAll('.card');

if (cardItems.length > 0) {
    const cardObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                cardObserver.unobserve(entry.target); // Stop watching it after it's visible
            }
        });
    }, { threshold: 0.1 }); // Triggers when 10% of the card is visible

    cardItems.forEach(card => cardObserver.observe(card));
}
    // --- START THE ENTIRE PROCESS ---
    loadSidebar();
});
