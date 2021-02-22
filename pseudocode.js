// console.log('hello');
/*
//choose one catigory and computer will randomly assign one word in that catigory.
//the assigned word(s) will be hidden, if multiple words, then each word will be seperate by space without underline.
//choose one letter from the keyboard, if the letter in the word(s), will show in the right spot and that letter will turn light red, otherwrise the letter will turn grey.
//if player guess the right letter, nothing will change; if player guess the wrong letter, under"what's happening" will show "${amount} of petals left" which means how many chances left for that word(s).
//if guess 7 times still don't have all the correct letter, will prompt "Game Over" and "try again"
//if have all the correct letter less than 7 times, will promt "You help the Beast save the rose!" and "next word(s)"
//reset
//next round if player don't choose category then will still be the same category and assign a different word(s); if player choose another category then will assign a word(s) from different category.
//each round should assign a different word(s)
*/

// for (let i = 0; i < wordArr.length; i++) {
// 	const span = document.createElement('span');
// 	span.innerText = wordArr[i];
// 	hiddenword.appendChild(span);
// 	if (wordArr[i] == ' ') {
// 		span.classList.add('nounderline');
// 	} else {
// 		span.classList.add('underline');
// 	}
// }

//reset button
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

//next round if player don't choose category then will still be the same category and assign a different word(s); if player choose another category then will assign a word(s) from different category.
