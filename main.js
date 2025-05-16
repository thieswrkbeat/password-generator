import { PasswordGenerator } from "./generatepassword.js";

let currentPassword = [];
const controlsContainer = document.querySelector('#controls');
const passwordContainer = document.querySelector('#password');
const lengthContainer = document.querySelector('#length-value');
const passwordGenerator = new PasswordGenerator();

const getFormValues = (event) => {
  const controls = event.currentTarget.elements;
  if (!controls) {
    console.error('No form elements found!');
    return {};
  }

  let controlValues = {};

  for (let i = 0; i < controls.length; i++) {
    const element = controls[i];
    if (!element.name) continue;

    if (element.type === 'checkbox') {
      controlValues[element.name] = element.checked;
    } else if (element.type === 'range' || element.type === 'text' || element.type === 'number') {
      controlValues[element.name] = element.value;
    }
  }

  return controlValues;
};


const setCurrentPassword = (config) => {
  // Länge als Zahl sicherstellen
  config.length = parseInt(config.length, 10) || 45;

  currentPassword = passwordGenerator.getPassword(config);
  passwordContainer.textContent = currentPassword;
  lengthContainer.textContent = config.length;
};

controlsContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  const config = getFormValues(event);
  setCurrentPassword(config);
});

controlsContainer.addEventListener('change', (event) => {
  event.preventDefault();
  const config = getFormValues(event);
  setCurrentPassword(config);
});

// ... dein bisheriger Code ...

const lengthSlider = document.querySelector('#length');
const lengthDisplay = document.querySelector('#length-value');

lengthSlider.addEventListener('input', () => {
  lengthDisplay.textContent = lengthSlider.value;
});

