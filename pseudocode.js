// console.log('hello');
/*
//choose one catigory and computer will randomly assign one word in that catigory.
//the assigned word(s) will be hidden, if multiple words, then each word will be seperate by "|"
//choose one letter from the keyboard, if the letter in the word(s), will show in the right spot and that letter will turn light red, otherwrise the letter will turn grey.
//if player guess the right letter, nothing will change; if player guess the wrong letter, under"what's happening" will show "${amount} of petals left" which means how many chances left for that word(s).
//if guess 7 times still don't have all the correct letter, will prompt "Game Over" and "try again"
//if have all the correct letter less than 7 times, will promt "You help the Beast save the rose!" and "next word(s)"
//next round if player don't choose category then will still be the same category and assign a different word(s); if player choose another category then will assign a word(s) from different category.
//each round should assign a different word(s)
*/

//grab category and add eventlisteners so when click buttons computer will assign one random word(s) respectively
const charactersButton = document.querySelector('.characters');
const movieButton = document.querySelector('.movies');
const princessesButton = document.querySelector('.princesses');
const countriesButton = document.querySelector('.countries');
const hiddenword = document.querySelector('.hiddenword');
const wordSpace = document.createElement('div');

charactersButton.addEventListener('click', (event) => {
	const randomWord = assignAWord(characters, duplicateCharacters);
	let assignedWord = randomWord[2];
	wordSpace.innerHTML = assignedWord;
	hiddenword.appendChild(wordSpace);
});
// movieButton.addEventListener('click', (event) => {
// 	const movie = getRandomWord(movies);
// });
// princessesButton.addEventListener('click', (event) => {
// 	const princess = getRandomWord(princesses);
// });
// countriesButton.addEventListener('click', (event) => {
// 	const country = getRandomWord(countries);
// });
// function getRandomWord(arr) {
// 	let randomIndex = Math.floor(Math.random() * arr.length);
// 	return arr[randomIndex];
// }
// function preventDuplicate(arr, word, newArr) {
// 	newArr.push(word);
// 	arr.splice(arr.indexOf(word), 1);

// console.log(arr, newArr);
// }
function assignAWord(arr, newArr) {
	if (arr.length == 1) {
		rword = arr.pop();
		newArr.push(rword);
		arr = [...newArr];
		newArr = [];
		return [arr, newArr, rword];
	} else {
		// rword = getRandomWord(arr);
		// preventDuplicate(arr, rword, newArr);
		// return [arr, newArr, rword];
		let randomIndex = Math.floor(Math.random() * arr.length);
		rword = arr[randomIndex];
		newArr.push(rword);
		arr.splice(arr.indexOf(rword), 1);
		return [arr, newArr, rword];
	}
	// hiddenword.appendChild(wordSpace)
}

//testing
let test = [2, 7, 9, 10];
let newTes = [];
console.log(test, newTes);
//1
res = assignAWord(test, newTes);
test = res[0];
newTes = res[1];
random = res[2];
console.log(test, newTes, random);
//2
res = assignAWord(test, newTes);
test = res[0];
newTes = res[1];
console.log(test, newTes);
//3
res = assignAWord(test, newTes);
test = res[0];
newTes = res[1];
console.log(test, newTes);
//4
res = assignAWord(test, newTes);
test = res[0];
newTes = res[1];
console.log(test, newTes);

res = assignAWord(test, newTes);
test = res[0];
newTes = res[1];
console.log(test, newTes);
// assignAWord(test, newTes);
// // //2 2
// console.log(test, newTes);
// assignAWord(test, newTes);
// // //1 3
// console.log(test, newTes);

// assignAWord(test, newTes);
// // //assignedWrod = 9; newTes should have 4 numbers; test should have 4 number; and then newTes should become empty and there is a consolelog of this
// console.log(test, newTes);

// assignAWord(test, newTes);

// console.log(test, newTes);
// assignAWord(test, newTes);
// console.log(test, newTes);
