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

    // --- Logic for the Sidebar Navigation Menu ---
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarLinks = document.querySelectorAll('#sidebar a:not(.dropdown-toggle)'); // Exclude dropdown toggles from closing the sidebar instantly

    const closeSidebar = () => {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('is-visible');
    };

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            sidebar.classList.toggle('is-open');
            overlay.classList.toggle('is-visible');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // --- NEW: LOGIC FOR SIDEBAR DROPDOWNS ---
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent link from navigating
            const parentLi = this.parentElement;
            parentLi.classList.toggle('active');
        });
    });

    // --- Logic for Fade-in on Scroll Animation ---
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1
    });
    cards.forEach(card => {
        observer.observe(card);
    });

});
