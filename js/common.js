document.addEventListener('DOMContentLoaded', () => {

    const burger = document.querySelector('.burger'),
            navMenu = document.querySelector('.header-nav');
        
    
    burger.addEventListener('click', () => {
        if (burger.classList.contains('burger-active')) {
            burger.classList.remove('burger-active');
            navMenu.classList.remove('header-nav-active');

        } else {
            burger.classList.add('burger-active');
            navMenu.classList.add('header-nav-active');

        }
    });

    const screenWidth = window.screen.width,
        screenHeight = window.screen.height;

    if (screenWidth <= 992) {
        const navLinks = document.querySelectorAll('li.menu-item-has-children > div');

        navLinks.forEach((elem) => {
            elem.addEventListener('click', () => {

                if (elem.parentElement.classList.contains('link-active')) {
                    elem.parentElement.classList.remove('link-active');
                } else {
                    elem.parentElement.classList.add('link-active');
                }
            });
        });
    } 


});