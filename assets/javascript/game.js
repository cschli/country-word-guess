var guessesRemaining = 5;
var lettersAlreadyGuessed = [];
var wins = 0;
var losses = 0;
var alphabetArray = "abcdefghijklmnopqrstuvwxyz"
var wordArray = ["china", "usa", "canada", "italy", "england", "japan",
    "thailand", "germany", "nicaragua", "mexico", "brazil", "greenland", "russia", "bosnia",
    "india", "korea", "egypt", "mongolia", "chile", "france"]
var wordLines = [];

var wordToGuess = randomizeWord(wordArray);

function randomizeWord(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function createWordLines() {
    wordLines = [];
    for (var i = 0; i < wordToGuess.length; i++) {
        wordLines.push(" _ ");
    }
}

function resetGame() {
    guessesRemaining = 5;
    lettersAlreadyGuessed = [];
    wordToGuess = randomizeWord(wordArray);
    createWordLines();
    document.getElementById("hangManGuesses").innerHTML = wordLines.join(" ");
    var headerText =
        "<p>Wins: " + wins + "</p>" +
        "<p>Losses: " + losses + "</p>" +
        "Press Any Key to Begin";
    document.getElementById("hangMan").innerHTML = headerText;
}


//create the initial word lines for hangman
createWordLines();

//adds the underscores into the hangManGuesses div, gets rid of the comma separator by specifying with .join
document.getElementById("hangManGuesses").innerHTML = wordLines.join(" ");

document.onkeyup = function (guess) {

    //an internal private counter variable to check if the key had any matches
    var charMatches = 0;

    //Determines what key is pressed
    var userGuess = guess.key.toLowerCase();

    //First, make sure user pressed a valid letter for input before running block, else do an alert; ignore shift
    if (alphabetArray.includes(userGuess)) {
        document.getElementById("showAlert").innerHTML = "";
        //make sure the guess is not something already guessed, if it is, show said warning to player, then do nothing else
        if (lettersAlreadyGuessed.includes(userGuess)) {
            document.getElementById("showAlert").innerHTML = "You already guessed that character!";
            return;
        }
        //check if the userGuess matches one or more of the characters in the wordToGuess
        for (var i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === userGuess) {
                wordLines[i] = userGuess;
                document.querySelector("#hangManGuesses").innerHTML = wordLines.join(" ");
                charMatches++;
            }
        }
        //if there are no positive matches for character guessed, guessesRemaining drops by one
        if (charMatches === 0) {
            guessesRemaining--;
        }

        //add the userGuess to the letters already guessed list
        lettersAlreadyGuessed.push(userGuess);

    //if user decides to use shift key to guess a capital letter, do not prompt for valid letter
    } else if (guess.keyCode == "16") {
        //DO NOTHING
    } else {
        //prompt warning to player to enter valid letter
        document.getElementById("showAlert").innerHTML = "Please enter a valid letter";
    }

    //based on if valid entry or not, update headerText variable with proper information
    if (alphabetArray.includes(userGuess)) {
        var headerText =
            "<p>You chose the letter " + userGuess + ". </p>" +
            "<p>You have " + guessesRemaining + " guesses remaining. </p>" +
            "<p>You have guessed the following letters: " + lettersAlreadyGuessed + "</p>" +
            "<p>Wins: " + wins + "</p>" +
            "<p>Losses: " + losses + "</p>"
    } else {
        var headerText =
            "<p>You have " + guessesRemaining + " guesses remaining. </p>" +
            "<p>You have guessed the following letters: " + lettersAlreadyGuessed + "</p>" +
            "<p>Wins: " + wins + "</p>" +
            "<p>Losses: " + losses + "</p>"
    }
    //update headerText html element
    document.getElementById("hangMan").innerHTML = headerText;

    //check if guessesRemaining is zero, if so, increase loss, alert player, and resetGame();
    if (guessesRemaining === 0) {
        losses++;
        alert("You lose, try again!");
        resetGame();
    }

    //if there are no more blank lines left, increase win counter, alert player, and resetGame();
    if(!wordLines.includes(" _ ")) {
        wins++;
        alert("Correct! The word is " + wordToGuess + ". You win, play again!");
        resetGame();
    }

    

}