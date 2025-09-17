document.addEventListener('DOMContentLoaded', function() {

    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarLinks = document.querySelectorAll('#sidebar a');

    // This single function will open OR close the sidebar
    function toggleSidebar() {
        // The .toggle() method adds the class if it's not there, and removes it if it is.
        sidebar.classList.toggle('is-open');
        overlay.classList.toggle('is-visible');
    }

    // When you click the menu icon, toggle the sidebar
    menuIcon.addEventListener('click', toggleSidebar);

    // When you click the overlay, close the sidebar
    overlay.addEventListener('click', toggleSidebar);

    // When you click any link in the sidebar, close the sidebar
    sidebarLinks.forEach(link => {
        link.addEventListener('click', toggleSidebar);
    });

});
