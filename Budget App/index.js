const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");


tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        // Using the tab.dataset.tabTarget the corresponding tabContent is fetched
        const target = document.querySelector(tab.dataset.tabTarget);

        // Remove active class from all tabContents
        tabContents.forEach((tabContent) => {
            tabContent.classList.remove('active')
        })
        // Remove active class from all tabs as well
        tabs.forEach((tab) => {
            tab.classList.remove('active')
        })

        // Now make the current tab which is being clicked active
        tab.classList.add('active');

        // Also make the tabContent active
        target.classList.add('active');
    });
})