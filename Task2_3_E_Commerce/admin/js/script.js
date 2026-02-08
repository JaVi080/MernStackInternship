
// basic js 
// for display cureent date
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}
// toggle func for mobile responsiveness
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    updateDate();
});

document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        document.querySelectorAll('.sidebar-nav a').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});
