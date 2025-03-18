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
        {
            img1: 'https://cdn.shopify.com/s/files/1/0638/1420/5659/files/109.png?v=1711520208',
            img2: 'https://cdn.shopify.com/s/files/1/0638/1420/5659/files/109_81e037c1-c711-48f2-8d0f-4429886b7f7b.png?v=1711520238',
            title: 'Moonlight 88/109',
            desc: 'Механика; No Hotswap; EC Iris, EC Sakura, EC Rose',
            price: 'от 9078 ₽'
        },
        {
            img1: 'https://cdn.shopify.com/s/files/1/0638/1420/5659/files/3_89214f38-9675-447a-bd18-82998b5fa90a.jpg?v=1706518055',
            img2: 'https://cdn.shopify.com/s/files/1/0638/1420/5659/files/4_33c437b7-7b6e-4a8e-8f73-aae5f3f37786.jpg?v=1706522249',
            title: 'Aurora 87108109',
            desc: 'Механика; Hotswap; Kailh Prestige Silent',
            price: 'от 15810 ₽'
        }
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

