document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LOADER & ENTER BUTTON LOGIC ---
    const loader = document.getElementById('loader');
    const enterButton = document.getElementById('enter-button');
    const pageContent = document.getElementById('page-content');

    if (enterButton) {
        enterButton.addEventListener('click', () => {
            loader.style.opacity = '0';
            // Wait for fade out animation to finish before hiding
            setTimeout(() => {
                loader.style.display = 'none';
                pageContent.classList.remove('hidden');
            }, 500);
        });
    }

    // --- 2. SIDEBAR NAVIGATION LOGIC ---
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarLinks = document.querySelectorAll('#sidebar a');

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


    // --- 3. FADE-IN ON SCROLL ANIMATION ---
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    cards.forEach(card => {
        observer.observe(card);
    });


    // --- 4. CUSTOM CURSOR LOGIC ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    window.addEventListener('mousemove', e => {
        if (cursorDot && cursorCircle) {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorCircle.style.left = `${e.clientX}px`;
            cursorCircle.style.top = `${e.clientY}px`;
        }
    });
    
    document.body.addEventListener('mouseleave', () => {
        if (cursorCircle) {
            cursorCircle.classList.add('is-hidden');
        }
    });

    document.body.addEventListener('mouseenter', () => {
        if (cursorCircle) {
            cursorCircle.classList.remove('is-hidden');
        }
    });
});
