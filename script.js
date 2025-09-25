document.addEventListener('DOMContentLoaded', function() {

    // --- Original Sidebar Logic ---
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarLinks = document.querySelectorAll('#sidebar a');

    function toggleSidebar() {
        sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
    }

    menuIcon.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
    sidebarLinks.forEach(link => {
        link.addEventListener('click', toggleSidebar);
    });

    // --- 3. Fade-in on Scroll Animation ---
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the card is visible
    });

    cards.forEach(card => {
        observer.observe(card);
    });

    // --- 4. Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');

    window.addEventListener('mousemove', e => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorCircle.style.left = `${e.clientX - 15}px`; /* Offset to center */
        cursorCircle.style.top = `${e.clientY - 15}px`; /* Offset to center */
    });
    
    document.body.addEventListener('mouseleave', () => {
        cursorCircle.classList.add('is-hidden');
    });

    document.body.addEventListener('mouseenter', () => {
        cursorCircle.classList.remove('is-hidden');
    });
    // This function runs once the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- Code for the Enter Button ---
    const enterButton = document.getElementById('enter-button');
    const loader = document.getElementById('loader');
    const pageContent = document.getElementById('page-content');

    // Check if the enter button exists on the page
    if (enterButton) {
        enterButton.addEventListener('click', function() {
            // Fade out the loader screen
            loader.style.opacity = '0';

            // After 500ms, hide the loader and show the main content
            setTimeout(function() {
                loader.style.display = 'none';
                pageContent.classList.remove('hidden');
            }, 500); 
        });
    }
});

});
