import { PasswordGenerator } from "./generatepassword.js";

let currentPassword = [];
const controlsContainer = document.querySelector('#controls');
const passwordContainer = document.querySelector('#password');
const lengthContainer = document.querySelector('#length-value');
const passwordGenerator = new PasswordGenerator();

const getRandomCharacter = () => {
    return Math.random().toString(16).substr(2, 1);
};

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Beispiel-Konfiguration – passe diese an, falls du Formelemente nutzt
const getConfigFromControls = () => {
    return {
        length: 45,
        specialCharacters: true,
        numbers: true,
        letters: true,
        localSpecialCharacters: false
    };
};

const setCurrentPassword = () => {
    const config = getConfigFromControls();
    currentPassword = passwordGenerator.getPassword(config);
    passwordContainer.textContent = currentPassword; // oder .innerText
    lengthContainer.textContent = currentPassword.length;
};

// Event Listener außerhalb der Funktion platzieren!
controlsContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    setCurrentPassword();
});

controlsContainer.addEventListener('change', (event) => {
    event.preventDefault();
    setCurrentPassword();
});
