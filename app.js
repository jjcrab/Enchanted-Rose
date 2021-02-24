//grab category and add eventlisteners so when click buttons computer will assign one random word(s) respectively
//randome word wont' repeat until the last one in category. After the last word is used, will start over get the random word from the original list again.

const charactersButton = document.querySelector('.characters');
const moviesButton = document.querySelector('.movies');
const princessesButton = document.querySelector('.princesses');
const countriesButton = document.querySelector('.countries');
const categoriesButtons = [
	charactersButton,
	moviesButton,
	princessesButton,
	countriesButton,
];
const categories = [
	{
		categoryButton: charactersButton,
		categoryData: characters,
		categoryDataHolder: duplicateCharacters,
	},
	{
		categoryButton: moviesButton,
		categoryData: movies,
		categoryDataHolder: duplicateMovies,
	},
	{
		categoryButton: princessesButton,
		categoryData: princesses,
		categoryDataHolder: duplicatePrincesses,
	},
	{
		categoryButton: countriesButton,
		categoryData: countries,
		categoryDataHolder: duplicateCountries,
	},
];
const chooseSaying = document.querySelector('.choosecategory');
const word = document.querySelector('.word');
const hiddenword = document.querySelector('.hiddenword');
const keyboard = document.querySelector('.keyboard');
const result = document.querySelector('.result');
let petalAmount = 7;
const correctLetterCount = {};
let sumCorrectFreq = 0;
const newGame = document.querySelector('.restart');
const keyboardletter = document.querySelectorAll('.keyboardletter');
const letterButton = keyboardletter;
let currentCategory = null;
let currentCategoryHolder = null;
const happening = document.querySelector('.happening');

//first game default
letterButton.forEach((button) => (button.disabled = true));
newGame.classList.add('noshow');
happening.classList.add('noshow');

//append event listener
categories.forEach((category) => {
	category.categoryButton.addEventListener('click', (event) => {
		event.preventDefault();
		appendWord(category.categoryData, category.categoryDataHolder);
		currentCategory = category.categoryData;
		currentCategoryHolder = category.categoryDataHolder;
		letterButton.forEach((button) => (button.disabled = false));
		//only the last clicked button will show the differnt change as the chosen category
		event.target.classList.add('categoryButtonColor');
		let noChosenCategory = categoriesButtons.filter((category) => {
			return category !== event.target;
		});
		noChosenCategory.forEach((noChosen) =>
			noChosen.classList.remove('categoryButtonColor')
		);
		newGame.classList.remove('noshow');
	});
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
					span.classList.add('letterShowup');
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
		categoriesButtons.forEach((button) => (button.disabled = true));
		happening.classList.remove('noshow');
		//counting petals left and game over condition and keyboard change color
		const letter = event.target.dataset.letter;
		const hiddenText = hiddenword.innerText;
		if (hiddenText == '') {
			letterButton.forEach((button) => (button.disabled = true));
		} else if (!hiddenText.includes(letter)) {
			event.target.classList.add('turngrey');
			if (petalAmount > 1) {
				petalAmount = petalAmount - 1;
				result.innerText = `${petalAmount} petals left.`;
				petalsArray[i].classList.add(petalsClassArray[i]);
				i++;
			} else if (petalAmount == 1) {
				result.innerText = `Game Over! Answer is: ${hiddenText}. Try Again!`;
				newGame.innerText = 'Try Again';
				petalsArray[i].classList.add(petalsClassArray[i]);
				letterButton.forEach((button) => (button.disabled = true));
				categoriesButtons.forEach((button) => (button.disabled = true));
			}
		} else {
			event.target.classList.add('turnred');
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
		if (
			hiddenText != '' &&
			sumCorrectFreq == filteredSpace.length &&
			petalAmount >= 1
		) {
			result.innerText = "You save Beast's Rose!";
			newGame.innerText = 'Play Next!';
			letterButton.forEach((button) => (button.disabled = true));
			categoriesButtons.forEach((button) => (button.disabled = true));
		}
	}
});

//reset button
newGame.addEventListener('click', (event) => {
	event.preventDefault();
	//text
	chooseSaying.style.display = 'inline';
	result.innerText = '';
	event.target.innerText = 'New Game';
	//keyboard
	letterButton.forEach((button) => {
		button.classList.add('keyboardreset');
		button.classList.remove('turnred');
		button.classList.remove('turngrey');
	});
	sumCorrectFreq = 0;
	petalAmount = 7;
	petalsArray.forEach((petal) => {
		petal.classList.remove(petal.classList[2]);
	});
	i = 0;
	appendWord(currentCategory, currentCategoryHolder);
	letterButton.forEach((button) => (button.disabled = false));
	categoriesButtons.forEach((button) => (button.disabled = false));
});
