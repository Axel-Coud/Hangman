const readline = require('readline');

// Initialisation du jeu par un pick random du mot à deviner à l'aide d'un Math.random() sur une base prédeterminée de mots disponibles.
const words = ["hangman", "test", "surement", "asterix", "calcul", "framboise"];
let word = words[Math.floor(Math.random() * words.length)];
let guessWord = word.replace(/[a-z]/gi, "_");
console.log(word.split(""));
console.log();
// let exist = word.split("").some((elt) => {return elt === "a"});
// if (exist === true) {
// 	for (let i = 0; i < word.length; i++) {
// 		if (word[i] === "a") {
// 			guessWord = guessWord.split("");
// 			guessWord[i] = "a";
// 			guessWord = guessWord.join("");
// 		}
// 	}
// }

console.log(guessWord);
const rl = readline.createInterface(process.stdin, process.stdout);
 
rl.question(`Here is the word : ${guessWord} guess the remaining letters, you have 5 chances ! >`, (guess) => {
	let exist = word.split("").some((elt) => {return elt === guess});
	if (exist === true) {
		for (let i = 0; i < word.length; i++) {
			if (word[i] === guess) {
				guessWord = guessWord.split("");
				guessWord[i] = guess;	
				guessWord = guessWord.join("");
			}
		} console.log(`Congratulation, this word contains the letter "${guess}" !`);

	} else {
		console.log(`There is no "${guess}" in ${guessWord} !`);	
	}

	rl.close();
})