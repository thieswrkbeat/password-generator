import { PasswordGenerator } from "./generatepassword.js";

let currentPassword = '';
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
    } else if (
      element.type === 'range' || 
      element.type === 'text' || 
      element.type === 'number'
    ) {
      controlValues[element.name] = element.value;
    }
  }

  return controlValues;
};

function animatePassword(passwordString) {
  if (typeof passwordString !== 'string') {
    console.error('Parameter ist kein String');
    return;
  }

  // Beispielanimation - hier kannst du beliebige Effekte hinzufügen
  passwordString.split('').forEach((char, index) => {
    console.log(`Zeichen ${index}: ${char}`);
  });

  // "Kopieren" Button erzeugen
  const existingCopyed = document.querySelector('#copyed');
  if (existingCopyed) existingCopyed.remove();

  const copyed = document.createElement('div');
  copyed.textContent = 'Kopieren';
  copyed.id = 'copyed';
  copyed.className = 'copyed';

  copyed.style.cursor = 'pointer';
  copyed.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordString)
      .then(() => alert('Passwort kopiert!'))
      .catch(() => alert('Kopieren fehlgeschlagen!'));
  });

  passwordContainer.appendChild(copyed);
}

const setCurrentPassword = (config) => {
  config.length = parseInt(config.length, 10) || 45;

  currentPassword = passwordGenerator.getPassword(config);

  passwordContainer.textContent = currentPassword;
  lengthContainer.textContent = config.length;

  animatePassword(currentPassword);
};

// Event Listener für Formular (submit und change)
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

// Slider - Wertanzeige synchronisieren
const lengthSlider = document.querySelector('#length');
const lengthDisplay = document.querySelector('#length-value');

lengthSlider.addEventListener('input', () => {
  lengthDisplay.textContent = lengthSlider.value;
});
