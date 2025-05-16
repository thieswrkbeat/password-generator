import { PasswordGenerator } from './generatepassword.js';

let currentPassword = [];
let clipboardState = false;

const controlsContainer = document.querySelector('#controls');
const passwordContainer = document.querySelector('#password');
const lengthContainer = document.querySelector('#length-value');
const passwordGenerator = new PasswordGenerator();

const getRandomCharacter = () => {
	return Math.random().toString(16).substr(2, 1);
};

const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};

const animatePassword = () => {
	passwordContainer.innerHTML = '';
	const passwordElements = document.createElement('div');
	passwordElements.setAttribute('class', 'characters');

	currentPassword.forEach((character, index) => {
		const characterElement = document.createElement('div');
		characterElement.setAttribute('class', 'character');
		characterElement.setAttribute('id', `character-${index}`);
		characterElement.setAttribute('data-character', character);
        passwordContainer.innerHTML = '';
		passwordElements.appendChild(characterElement);
	});

	passwordContainer.appendChild(passwordElements);

	const copyed = document.createElement('div');
	copyed.innerHTML = 'Kopieren';
	copyed.setAttribute('id', 'copyed');
	copyed.setAttribute('class', 'copyed');
	passwordContainer.appendChild(copyed);

	document.querySelectorAll('.character').forEach((char) => {
		animateCharacter(char);
	});
};

const animateCharacter = (element) => {
	setTimeout(() => {
		element.classList.add('show');
		setTimeout(() => {
			element.classList.add('animate');
			const maxTicker = getRandomNumber(5, 15);
			let ticker = 0;
			const letterAnimation = setInterval(() => {
				element.innerHTML = getRandomCharacter();
				if (ticker === maxTicker) {
					element.classList.remove('animate');
					element.classList.add('done');
					element.innerHTML = element.dataset.character;
					clearInterval(letterAnimation);
				}
				ticker++;
			}, 50);
		}, getRandomNumber(0, 150));
	}, getRandomNumber(0, 150));
};

const copyToClipboard = () => {
	if (!clipboardState) {
		clipboardState = true;
		navigator.clipboard.writeText(currentPassword.join('')).then(() => {
			const cta = document.querySelector('#copyed');
			cta.classList.add('copyed-done');
			cta.innerHTML = 'Passwort kopiert!';
			setTimeout(() => {
				cta.classList.remove('copyed-done');
				clipboardState = false;
			}, 500);
		});
	}
};

const setCurrentPassword = (controls) => {
	currentPassword = passwordGenerator.getPassword(controls).split('');
	animatePassword();
};

const getFormValues = ($event) => {
	let controlValues = {};
	Object.keys($event.currentTarget.elements).forEach((key) => {
		let element = $event.currentTarget.elements[key];
		if (element.type === 'checkbox') {
			controlValues[element.name] = element.checked;
		}
		if (element.type === 'range') {
			controlValues[element.name] = +element.value;
			lengthContainer.innerHTML = +element.value;
		}
	});
	return controlValues;
};

setCurrentPassword({
	length: 45,
	specialCharacters: true,
	numbers: true,
	letters: true,
	lockedSpecialCharacters: false,
});

passwordContainer.addEventListener('click', copyToClipboard);

controlsContainer.addEventListener('submit', ($event) => {
	$event.preventDefault();
	setCurrentPassword(getFormValues($event));
});

controlsContainer.addEventListener('change', ($event) => {
	$event.preventDefault();
	setCurrentPassword(getFormValues($event));
});

controlsContainer.addEventListener('input', ($event) => {
	$event.preventDefault();
	getFormValues($event);
});
