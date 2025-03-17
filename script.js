document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    const emailLogin = document.getElementById('emailLoginInput');
    const passwordLogin = document.getElementById('passwordLoginInput');
    const loginBtn = document.getElementById('loginBtn');

    const emailRegister = document.getElementById('emailRegisterInput');
    const passwordRegister = document.getElementById('passwordRegisterInput');
    const passwordConfirmRegister = document.getElementById('confirmPasswordInput');
    const registerBtn = document.getElementById('registerBtn');

    const cardTemplate = document.getElementById('card-template');
    const cardContainer = document.getElementById('products');
    const cardData = [
        { img1: 'res/keyboard1.webp', img2: 'res/keyboard1.1.webp', title: 'Minlio98 Pro', desc: 'Механика; Hotswap; Cherry Red', price: 'от 17000 ₽' },
        { img1: 'res/keyboard2.webp', img2: 'res/keyboard2.1.webp', title: 'Sakura R2 108', desc: 'Механика; Hotswap; Kailh Silent', price: 'от 17300 ₽' },
    ];

    cardData.forEach(data => {
        const clone = cardTemplate.content.cloneNode(true);
        const card = clone.querySelector('.card');
        card.querySelector('#img-1').src = data.img1;
        card.querySelector('#img-1').alt = data.title;
        card.querySelector('#img-2').src = data.img2;
        card.querySelector('#img-2').alt = '${data.title} hover';
        card.querySelector('#title').textContent = data.title;
        card.querySelector('#desc').textContent = data.desc;
        card.querySelector('#price').textContent = data.price;
        cardContainer.appendChild(clone);
    });

    const brandTemplate = document.querySelector('#brand-template');
    const brandsContainer = document.querySelector('#brands-container');
    const brandData = [
        {
          logoSrc: 'res/varmilo.webp',
          title: 'Varmilo',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nulla. Corporis quod, voluptatum nisi reiciendis laborum libero reprehenderit saepe possimus officiis sed in ipsa exercitationem voluptas. Asperiores dolor voluptatum numquam.',
        },
        {
          logoSrc: 'res/akko.png',
          title: 'Akko',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nulla. Corporis quod, voluptatum nisi reiciendis laborum libero reprehenderit saepe possimus officiis sed in ipsa exercitationem voluptas. Asperiores dolor voluptatum numquam.',
        },
        {
          logoSrc: 'res/leopold.webp',
          title: 'Leopold',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, nulla.',
        },
    ];

    brandData.forEach((data, index) => {
        const clone = brandTemplate.content.cloneNode(true);
        const brand = clone.querySelector('.brand');

        if (index % 2 === 1) {
            brand.classList.add('second');
        }

        brand.querySelector('.brand-logo').src = data.logoSrc;
        brand.querySelector('.brand-logo').alt = data.title;
        brand.querySelector('.brand-title').textContent = data.title;
        brand.querySelector('.brand-desc').textContent = data.desc;

        brandsContainer.appendChild(clone);
    });

    hamburger.addEventListener('click', (e) => {
        if (window.innerWidth <= 910) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navMenu.classList.add('non-active');
                hamburger.classList.toggle('clicked');
            } else {
                navMenu.classList.remove('non-active');
                navMenu.classList.add('active');
                hamburger.classList.toggle('clicked')
            }
        }
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);

        if (window.innerWidth <= 910 && !isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navMenu.classList.add('non-active');
            hamburger.classList.toggle('clicked');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 910) {
            navMenu.classList.remove('active', 'non-active');
            hamburger.classList.remove('clicked');
        } else if (!navMenu.classList.contains('active')) {
            navMenu.classList.add('non-active');
        }
    });

    if (window.innerWidth <= 910 && !navMenu.classList.contains('active')) {
        navMenu.classList.add('non-active');
    }

    emailLogin.addEventListener('input', () => {
        toggleDisabledForButton(emailLogin, passwordLogin, loginBtn);        
    });

    passwordLogin.addEventListener('input', () => {
        toggleDisabledForButton(emailLogin, passwordLogin, loginBtn);
    });
    
    emailRegister.addEventListener('input', () => {
        toggleDisabledForButton(emailRegister, passwordRegister, registerBtn, passwordConfirmRegister);
    });

    passwordRegister.addEventListener('input', () => {
        toggleDisabledForButton(emailRegister, passwordRegister, registerBtn, passwordConfirmRegister);
    })

    passwordConfirmRegister.addEventListener('input', () => {
        toggleDisabledForButton(emailRegister, passwordRegister, registerBtn, passwordConfirmRegister);
    });

    
});

function toggleDisabledForButton(emailInput, passwordInput, buttonToToggle, passwordConfirmInput = null) {
    const confirmPasswordLength = passwordConfirmInput ? passwordConfirmInput.value.length : 5;
    if (emailInput.value.length < 2 || !emailInput.value.includes('@') || passwordInput.value.length < 5 || confirmPasswordLength < 5) {
        buttonToToggle.classList.add('disabled');
    } else {
        buttonToToggle.classList.remove('disabled');
    }
}

