//grab category and add eventlisteners so when click buttons computer will assign one random word(s) respectively
//randome word wont' repeat until the last one in category. After the last word is used, will start over get the random word from the original list again.

const charactersButton = document.querySelector('.characters');
const movieButton = document.querySelector('.movies');
const princessesButton = document.querySelector('.princesses');
const countriesButton = document.querySelector('.countries');
const chooseSaying = document.querySelector('.choosecategory');
const word = document.querySelector('.word');
const hiddenword = document.querySelector('.hiddenword');
const keyboard = document.querySelector('.keyboard');
const result = document.querySelector('.result');
let petalAmount = 7;

charactersButton.addEventListener('click', () => {
	appendWord(characters, duplicateCharacters);
});
movieButton.addEventListener('click', (event) => {
	appendWord(movies, duplicateMovies);
});
princessesButton.addEventListener('click', (event) => {
	appendWord(princesses, duplicatePrincesses);
});
countriesButton.addEventListener('click', (event) => {
	appendWord(countries, duplicateCountries);
});

//assign norepeat word(s)
function assignAWord(arr, newArr) {
	if (arr.length == 1) {
		rword = arr.pop();
		newArr.push(rword);
		arr = [...newArr];
		newArr = [];
		return [arr, newArr, rword];
	} else {
		let randomIndex = Math.floor(Math.random() * arr.length);
		rword = arr[randomIndex];
		newArr.push(rword);
		arr.splice(arr.indexOf(rword), 1);
		return [arr, newArr, rword];
	}
}
//append word(s) and differentiate letter and spaces
function appendWord(arr, newArr) {
	chooseSaying.style.display = 'none';
	hiddenword.innerText = ' ';
	let assignedWord = assignAWord(arr, newArr)[2];
	const wordArr = assignedWord.split('');
	wordArr.forEach((letter) => {
		const span = document.createElement('span');
		span.innerText = letter;
		hiddenword.appendChild(span);
		if (letter == ' ') {
			span.classList.add('nounderline');
		} else {
			span.classList.add('underline');
		}
		keyboard.addEventListener('click', (event) => {
			const letter = event.target.dataset.letter;
			if (span.innerText == letter) {
				span.classList.add('showup');
				event.target.classList.add('turnred');
			}
			if (span.innerText !== letter) {
				event.target.classList.add('turngrey');
			}
		});
	});
	word.appendChild(hiddenword);
	hiddenword.classList.add('hidden');
}

keyboard.addEventListener('click', (event) => {
	const letter = event.target.dataset.letter;
	const hiddenText = hiddenword.innerText;
	if (!hiddenText.includes(letter)) {
		if (petalAmount > 1) {
			petalAmount = petalAmount - 1;
			result.innerText = `${petalAmount} petals left.`;
		} else if (petalAmount == 1) {
			result.innerText = 'Game Over! Try Again!';
		}
	} else {
		result.innerText = `${petalAmount} petals left.`;
	}
});

// if(hiddenword.innerText.includes())
