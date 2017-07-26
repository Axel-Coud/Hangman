const readline = require('readline'); // Require du module readline pour intéragir avec le prompt via les input qu'on enverra et les output qu'on recevra.

// Initialisation du jeu par un pick random du mot à deviner à l'aide d'un Math.random() sur une base prédeterminée de mots disponibles.
const words   = ["pendu", "chaise", "chaussure", "armoire", "calcul", "framboise", "lampe", "carotte", "crayon", "anticonstitutionnellement"];
let word      = words[Math.floor(Math.random() * words.length)];
let guessWord = word.replace(/[a-z]/gi, "_");
let count     = 6;
// Présentation des règles.
console.log(`

You started a Hangman round. \nHere are the rules :
You have to guess which letters the word possesses,
You can guess only one letter per try,
You can fail ${count} time,
There is no special characters nor capital letters(will count as a bad guess !),
There is only french words to guess,

Good luck !

`);	


const rl = readline.createInterface(process.stdin, process.stdout);
// Création d'une interface software/prompt grace à la méthode createInterface de l'objet readline.


let hangman = () => {
	rl.question(`The word is : "${guessWord.split("").join(" ")}" guess the remaining letters ! \n>>>`, (guess) => {
		let exist = word.split("").some((elt) => {return elt === guess});

		if (guess === "exit") {
			console.log("See you soon\n");
			return rl.close();
		} else if (exist === true) {
			if (guessWord.split("").some((elt) => {return elt === guess}) === true) {
				console.log("You already gave this answer !\n\n");
				return hangman()
			}
			for (let i = 0; i < word.length; i++) {
				if (word[i] === guess) {
					guessWord = guessWord.split("");
					guessWord[i] = guess;	
					guessWord = guessWord.join("");
				}
			} console.log(`Congratulation, this word contains the letter "${guess}" !\n\n\n`);
		} else {
			count--;
			if (guess.length !== 1 || guess.match(/[a-z]/) === null) {
				console.log(`"${guess}" is an invalid entry !`);
			} else {
				console.log(`There is no "${guess}" !`);	
			}
			console.log(`You have ${count} chances left\n\n`);
			if (count === 0) {
				console.log(`The word was ${word}.`);
				console.log(`			     
_________
|/      |
|      (_)
|      \\|/
|       |
|      / \\
|
|___

It was your last chance, the word was "${word}", may the hanged rest in peace.\n`);
				return rl.close();
			}
		}

		if (guessWord.match(/[_]/g) === null) {
			console.log(`You won ! The word was "${word}", no one will have to be hanged today. \n`);
			return rl.close();
		}
		hangman(); // appel de la fonction à l'intérieur d'elle meme(Récursivité).
	});
};

hangman();
// Lancement de la fonction récursive hangman() qui ne s'arretera pas tant que certaines conditions sont vérifiés.