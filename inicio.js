const menuHamburguesa = document.querySelector('.menu_hamburguesa');
        const nav = document.querySelector('.nav');

        menuHamburguesa.addEventListener('click', () => {
            nav.classList.toggle('nav--active');
        });