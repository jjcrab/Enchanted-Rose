const petal0 = document.querySelector('.petal0');
const petal1 = document.querySelector('.petal1');
const petal2 = document.querySelector('.petal2');
const petal3 = document.querySelector('.petal3');
const petal4 = document.querySelector('.petal4');
const petal5 = document.querySelector('.petal5');
const petal6 = document.querySelector('.petal6');

const petalsArray = [petal0, petal1, petal2, petal3, petal4, petal5, petal6];
const petalsClassArray = [
	'petal0Fall',
	'petal1Fall',
	'petal2Fall',
	'petal3Fall',
	'petal4Fall',
	'petal5Fall',
	'petal6Fall',
];
let i = 0;

const petalNumber = document.querySelector('.petalnumber');
const scoreNumber = document.querySelector('.scorenumber');

let score = 0;

//about game modal
const aboutGame = document.getElementById('aboutGame');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close');

aboutGame.addEventListener('click', () => (modal.style.display = 'block'));
closeModal.addEventListener('click', () => (modal.style.display = 'none'));
