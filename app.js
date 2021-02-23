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
const correctLetterCount = {};
let sumCorrectFreq = 0;
const playAgain = document.querySelector('.restart');
const keyboardletter = document.querySelectorAll('.keyboardletter');

charactersButton.addEventListener('click', (event) => {
	event.preventDefault();
	appendWord(characters, duplicateCharacters);
});
movieButton.addEventListener('click', (event) => {
	event.preventDefault();
	appendWord(movies, duplicateMovies);
});
princessesButton.addEventListener('click', (event) => {
	event.preventDefault();
	appendWord(princesses, duplicatePrincesses);
});
countriesButton.addEventListener('click', (event) => {
	event.preventDefault();
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
	console.log(assignedWord);
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

		//keyboard button - show right letter in the space
		keyboard.addEventListener('click', (event) => {
			event.preventDefault();
			if (event.target.classList.contains('keyboardletter')) {
				const letter = event.target.dataset.letter;
				if (span.innerText == letter) {
					span.classList.add('showup');
				}
			}
		});

		word.appendChild(hiddenword);
		hiddenword.classList.add('hidden');
	});
}

//Showing result and finish game condition
keyboard.addEventListener('click', (event) => {
	event.preventDefault();
	if (event.target.classList.contains('keyboardletter')) {
		//counting petals left and game over condition and keyboard change color
		const letter = event.target.dataset.letter;
		const hiddenText = hiddenword.innerText;
		if (!hiddenText.includes(letter)) {
			event.target.classList.add('turngrey');
			console.log(event.target);
			if (petalAmount > 1) {
				petalAmount = petalAmount - 1;
				result.innerText = `${petalAmount} petals left.`;
				petal0.classList.add('petal0Fall');
			} else if (petalAmount == 1) {
				result.innerText = `Game Over! Answer is: ${hiddenText}. Try Again!`;
				playAgain.classList.remove('cssreset');
			}
		} else {
			event.target.classList.add('turnred');
			console.log(event.target);
			result.innerText = `${petalAmount} petals left.`;
		}
		//winning condition
		const hiddenTextArr = hiddenText.split('');
		const filteredSpace = hiddenTextArr.filter((noSpace) => {
			return noSpace != ' ';
		});
		const letterCount = filteredSpace.reduce((letterObj, letter) => {
			if (!letterObj[letter]) {
				letterObj[letter] = 1;
			} else {
				letterObj[letter]++;
			}
			return letterObj;
		}, {});

		if (letterCount[letter]) {
			correctLetterCount[letter] = letterCount[letter];
			sumCorrectFreq = sumCorrectFreq + correctLetterCount[letter];
		}
		const rightLetterAmount = Object.keys(correctLetterCount).length;
		if (sumCorrectFreq == filteredSpace.length && petalAmount >= 1) {
			result.innerText = "You save Beast's Rose!";
			playAgain.innerText = 'Play Next!';
			playAgain.classList.remove('cssreset');
		}
	}
});

playAgain.addEventListener('click', (event) => {
	event.preventDefault();
	//text
	chooseSaying.style.display = 'inline';
	hiddenword.innerText = ' ';
	result.innerText = '';
	event.target.classList.add('cssreset');
	//keyboard
	const letterButton = keyboardletter;
	letterButton.forEach((button) => {
		button.classList.add('keyboardreset');
		button.classList.remove('turnred');
		button.classList.remove('turngrey');
	});
	console.log(letterButton);
	sumCorrectFreq = 0;
	petalAmount = 7;
});
