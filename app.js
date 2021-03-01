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
const blankSpaces = document.querySelector('.blankspaces');
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
categoriesButtons.forEach((button) => button.classList.add('buttonHover'));
newGame.classList.add('noshow');
happening.classList.add('noshow');

//append event listener
categories.forEach((category) => {
	category.categoryButton.addEventListener('click', (event) => {
		event.preventDefault();
		appendWord(category.categoryData, category.categoryDataHolder);
		currentCategory = category.categoryData;
		currentCategoryHolder = category.categoryDataHolder;
		letterButton.forEach((button) => {
			button.disabled = false;
			button.classList.add('buttonHover');
		});
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
  // refill the array when the last one assigned
  if (arr.length == 1) {
    rword = arr.pop();
    newArr.push(rword);

    // Here is where the problems begin...
    // I think your intention was to loop over the entire newArr
    // which now has all of the words in it and put them back into the
    // original array.
    // The problem is that you're using pop and that mutates your array so:
    // 1. the length of newArr is not stable (it changes as you pop elements off)
    // 2. you're emptying newArr which probably wasn't your intention since there's one
    // more word to play.
    for (let i = 0; i < newArr.length; i++) {
      arr.push(newArr.pop());
    }
    return [arr, newArr, rword];
  } else {
    let randomIndex = Math.floor(Math.random() * arr.length);
    rword = arr[randomIndex];
    newArr.push(rword);
    arr.splice(arr.indexOf(rword), 1);
    return [arr, newArr, rword];
  }

  // But that's not the only problem leading to your bug...
  // It's also because your code has a WET problem
  // You're using the variables currentCategory and currentCategoryHolder
  // only when you run the newGame button (everywhere else, the code is
  // using some arrays that you pass around).  These variables are set
  // ONCE when the category button is clicked, so if the user doesn't change
  // categories, they are never updated.
}
// To fix your bug, rewrite the assignAWord function:

// 1. Check if the arr.length is 0 (why do this on 1? instead just refill when it's empty)
// 2. If it's empty, copy the newArr to arr and set the length of newArr to 0
// 3. Set currentCategory = arr;
// 4. Set currentCategoryHolder = newArr;
// 5. Then run your code that gets the randomIndex etc.
// STEP 5 always runs.  It's not an else any more.
// So, the new function looks like this instead of the code you have:

/*
function assignAWord(arr, newArr) {
  if (arr.length === 0) {
    arr = [...newArr] // this is a helpful shortcut to copy all elements from an array
    newArr.length = 0 // empty the newArr
    currentCategory = arr; // point currentCategory to arr
    currentCategoryHolder = newArr; // point currentCategoryHolder to newArr
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  rword = arr[randomIndex];
  newArr.push(rword);
  arr.splice(arr.indexOf(rword), 1);
  return [arr, newArr, rword];
}
*/
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
		blankSpaces.appendChild(hiddenword);
		hiddenword.classList.add('hidden');
	});
}

//Showing result and finish game condition
keyboard.addEventListener('click', (event) => {
	event.preventDefault();
	if (event.target.classList.contains('keyboardletter')) {
		categoriesButtons.forEach((button) => {
			button.disabled = true;
			button.classList.remove('buttonHover');
		});
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
				petalNumber.innerText = `${petalAmount}`;
				petalsArray[i].classList.add(petalsClassArray[i]);
				i++;
			} else if (petalAmount == 1) {
				result.innerText = `Game Over! Answer is: ${hiddenText}. Try Again!`;
				petalNumber.innerText = `${petalAmount - 1}`;
				newGame.innerText = 'Try Again';
				petalsArray[i].classList.add(petalsClassArray[i]);
				letterButton.forEach((button) => {
					button.disabled = true;
					button.classList.remove('buttonHover');
				});
				categoriesButtons.forEach((button) => {
					button.disabled = true;
					button.classList.remove('buttonHover');
				});
			}
		} else {
			event.target.classList.add('turnred');
			result.innerText = `${petalAmount} petals left.`;
			petalNumber.innerText = `${petalAmount}`;
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
			result.innerText = `You save ${petalAmount} petal(s) for the Beast!`;
			console.log(`${petalAmount * 10}`);
			score = score + petalAmount * 10;
			scoreNumber.innerText = `${score}`;

			newGame.innerText = 'Play Next!';
			letterButton.forEach((button) => {
				button.disabled = true;
				button.classList.remove('buttonHover');
			});
			categoriesButtons.forEach((button) => {
				button.disabled = true;
				button.classList.remove('buttonHover');
			});
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
	categoriesButtons.forEach((button) => {
		button.disabled = false;
		button.classList.add('buttonHover');
	});
	petalNumber.innerText = '';
});
