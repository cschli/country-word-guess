
//global variable
var wordGuess = "";


//object
var wordGuessGame = {
    wins: 0,
    losses: 0,
    lettersAlreadyGuessed: [],
    wordLines: [],
    guessesRemaining: 5,
    alphabetList: "abcdefghijklmnopqrstuvwxyz",
    wordArray: [
        "china", "usa", "canada", "italy", "england", "japan",
        "thailand", "germany", "nicaragua", "mexico", "brazil", "greenland", "russia", "bosnia",
        "india", "korea", "egypt", "mongolia", "chile", "france"
    ],
    randomizeWord: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    wordToGuess: function () {
        return this.randomizeWord(this.wordArray);
    },
    createWordLines: function (word) {
        this.wordLines = [];
        for (var i = 0; i < word.length; i++) {
            this.wordLines.push(" _ ");
        }
    },
    resetGame: function () {
        this.guessesRemaining = 5;
        this.lettersAlreadyGuessed = [];
        wordGuess = this.wordToGuess();
        this.createWordLines(wordGuess);
        document.getElementById("hangManGuesses").innerHTML = this.wordLines.join(" ");
        var headerText =
            "<p>Wins: " + this.wins + "</p>" +
            "<p>Losses: " + this.losses + "</p>" +
            "Press Any Key to Begin";
        document.getElementById("hangMan").innerHTML = headerText;
    },
    initalize: function () {
        wordGuess = this.wordToGuess();
        this.createWordLines(wordGuess);
        document.getElementById("hangManGuesses").innerHTML = this.wordLines.join(" ");
    },
    checkStatus: function () {
        //check if guessesRemaining is zero, if so, increase loss, alert player, and resetGame();
        if (this.guessesRemaining === 0) {
            this.losses++;
            alert("You lose, try again!");
            this.resetGame();
        }
        //if there are no more blank lines left, increase win counter, alert player, and resetGame();
        if (!this.wordLines.includes(" _ ")) {
            this.wins++;
            alert("Correct! The word is " + wordGuess + ". You win, play again!");
            this.resetGame();
        }
    },
    play: function (guess) {
        var charMatches = 0;
        var userGuess = guess.key.toLowerCase();
        if (this.alphabetList.includes(userGuess)) {
            document.getElementById("showAlert").innerHTML = "";
            //make sure the guess is not something already guessed, if it is, show said warning to player, then do nothing else
            if (this.lettersAlreadyGuessed.includes(userGuess)) {
                document.getElementById("showAlert").innerHTML = "You already guessed that character!";
                return;
            }
            //check if the userGuess matches one or more of the characters in the wordToGuess
            for (var i = 0; i < wordGuess.length; i++) {
                if (wordGuess[i] === userGuess) {
                    this.wordLines[i] = userGuess;
                    document.querySelector("#hangManGuesses").innerHTML = this.wordLines.join(" ");
                    charMatches++;
                }
            }
            //if there are no positive matches for character guessed, guessesRemaining drops by one
            if (charMatches === 0) {
                this.guessesRemaining--;
            }

            //add the userGuess to the letters already guessed list
            this.lettersAlreadyGuessed.push(userGuess);

            //if user decides to use shift key to guess a capital letter, do not prompt for valid letter
        } else if (guess.keyCode == "16") {
            //DO NOTHING
        } else {
            //prompt warning to player to enter valid letter
            document.getElementById("showAlert").innerHTML = "Please enter a valid letter";
        }
        if (this.alphabetList.includes(userGuess)) {
            var headerText =
                "<p>You chose the letter " + userGuess + ". </p>" +
                "<p>You have " + this.guessesRemaining + " guesses remaining. </p>" +
                "<p>You have guessed the following letters: " + this.lettersAlreadyGuessed + "</p>" +
                "<p>Wins: " + this.wins + "</p>" +
                "<p>Losses: " + this.losses + "</p>"
        } else {
            var headerText =
                "<p>You have " + this.guessesRemaining + " guesses remaining. </p>" +
                "<p>You have guessed the following letters: " + this.lettersAlreadyGuessed + "</p>" +
                "<p>Wins: " + this.wins + "</p>" +
                "<p>Losses: " + this.losses + "</p>"
        }
        //update headerText html element
        document.getElementById("hangMan").innerHTML = headerText;
    }
}

//main program section:
wordGuessGame.initalize();
document.onkeyup = function (guess) {
    wordGuessGame.play(guess);
    wordGuessGame.checkStatus();
}