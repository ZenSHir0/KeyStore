import { cardData } from "./data.js";
import { brandData } from "./data.js";

document.addEventListener('DOMContentLoaded', () => {
    const emailLogin = document.getElementById('emailLoginInput');
    const passwordLogin = document.getElementById('passwordLoginInput');
    const loginBtn = document.getElementById('loginBtn');

    const emailRegister = document.getElementById('emailRegisterInput');
    const passwordRegister = document.getElementById('passwordRegisterInput');
    const passwordConfirmRegister = document.getElementById('confirmPasswordInput');
    const registerBtn = document.getElementById('registerBtn');

    createKeyboardCards();
    brandArticlesFill();
    resizeHandler();

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

function createKeyboardCards() {
    const cardTemplate = document.getElementById('card-template');
    const cardContainer = document.getElementById('products');
    
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
}

function brandArticlesFill() {
    const brandTemplate = document.querySelector('#brand-template');
    const brandsContainer = document.querySelector('#brands-container');

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
}

function resizeHandler() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    //set default state when display resize bigger
    window.addEventListener('resize', () => {
        if (window.innerWidth > 910) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('clicked');
        }
    });

    //hamburger icon click make menu appear
    hamburger.addEventListener('click', (e) => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('clicked');
        e.stopPropagation();
    });
    
    //closing menu when click
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.toggle('clicked');
        }
    });
}