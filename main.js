let currentPassword = '';
let clipboardState = false;

const passwordContainer = document.querySelector('#password');
const lengthSlider = document.querySelector('#length');
const lengthDisplay = document.querySelector('#length-value');
const controlsForm = document.querySelector('#controls');

// Simpler Passwort-Generator
const generatePassword = (length = 45) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Länge live aktualisieren
lengthSlider.addEventListener('input', () => {
  lengthDisplay.textContent = lengthSlider.value;
});

// Passwort generieren
controlsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const length = parseInt(lengthSlider.value, 10);
  currentPassword = generatePassword(length);
  updatePasswordDisplay();
});

// Kopieren-Funktion
const copyToClipboard = () => {
  if (clipboardState || !currentPassword) return;

  clipboardState = true;
  navigator.clipboard.writeText(currentPassword).then(() => {
    const cta = document.querySelector('#copyed');
    if (cta) {
      cta.classList.add('copyed-done');
      cta.textContent = 'Passwort kopiert!';
      setTimeout(() => {
        cta.classList.remove('copyed-done');
        cta.textContent = 'Kopieren';
        clipboardState = false;
      }, 1500);
    }
  });
};

// Anzeige aktualisieren
const updatePasswordDisplay = () => {
  passwordContainer.innerHTML = ''; // leeren
  const pwText = document.createElement('div');
  pwText.textContent = currentPassword;
  passwordContainer.appendChild(pwText);

  const copyButton = document.createElement('div');
  copyButton.id = 'copyed';
  copyButton.className = 'copyed';
  copyButton.textContent = 'Kopieren';
  copyButton.addEventListener('click', copyToClipboard);
  passwordContainer.appendChild(copyButton);
};
