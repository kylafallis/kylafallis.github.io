// Wait until the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Get the elements for the menu icon, sidebar, and close button
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const sidebarLinks = document.querySelectorAll('#sidebar a');

    // Function to open the sidebar
    function openSidebar() {
        sidebar.style.transform = 'translateX(0)';
    }

    // Function to close the sidebar
    function closeSidebar() {
        sidebar.style.transform = 'translateX(-100%)';
    }

    // Event listener for the menu icon to open the sidebar
    menuIcon.addEventListener('click', openSidebar);

    // Event listener for the close button to close the sidebar
    closeBtn.addEventListener('click', closeSidebar);

    // Add event listeners to all sidebar links to close the sidebar on click
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

});
