document.addEventListener("DOMContentLoaded", function() {
    let menuBurger = document.querySelector('.header__menuBurger');
    let hiddenNavigation = document.querySelector('.header__navigation');

    /**
     * Affichage de la navigation au clic
     */
    menuBurger.addEventListener('click', function () {
        if(menuBurger.classList.contains('visible')) {
            hiddenNavigation.classList.remove('visible');
            menuBurger.classList.remove('visible');
            document.body.style.overflow = 'visible';
            document.body.style.height = 'auto';
        }
        else
        {
            hiddenNavigation.classList.add('visible');
            menuBurger.classList.add('visible');
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        }
    });
});