function generateWinningNumber(){
  return Math.floor((Math.random() * 100) + 1);
}

var winningNumber = generateWinningNumber();
var playerGuess;
var numberOfTries = 5;
var previousGuesses = [];


$(document).ready(function(){

  $(".submit").on("click", playersGuessSubmission);

  $(".hint").on("click", function(){
    provideHint();
    });

  $(".retry").on("click", function(){
    playAgain();
  });


});


function playersGuessSubmission(){
  // console.log("winning number: ", winningNumber)
  // console.log(previousGuesses);

  playerGuess = parseInt($('#field1').val());

  if(previousGuesses.indexOf(playerGuess) !== -1){
    $(".playerFeedback2").text("You picked that number already!");
  } else {
    previousGuesses.push(playerGuess);          //GREAT SUCCESS... Now: find way to tell if user is hot or cold
    numberOfTries--;                            // AKA compare guess to winning and QUANTIFY DIFF AND SPIT MSG ACCORDINGLY
  }

  $('#field1').val('');

  checkGuess();

  $(".playerFeedback1").text("You have " + numberOfTries + " more tries remaining");

}


function checkGuess(){

  if(playerGuess === winningNumber){
    $(".playerFeedback3").text("YOU GUESSED IT, YOU WIN!!!");
  } else {
    lowerOrHigher();
  }
}


function lowerOrHigher(){
	var dif = playerGuess - winningNumber;
  var absDif = Math.abs(dif);

  var highOrLow;
  var outputString;

  if(dif < 0){
    highOrLow = "lower";
  } else {
    highOrLow = "higher";
  }

  if(absDif < 5){
    outputString = "You're red hot! Still " + highOrLow;
  } else if (absDif <= 10){
    outputString = "You're getting warmer... but still " + highOrLow;
  } else if (absDif > 10) {
    outputString = "You are cold, your guess is much " + highOrLow + " than the winning number!"
  }

  $(".playerFeedback4").text(outputString);
}


function createRandomHintArray(){
	var hintArray = [];
	var winningNum = winningNumber;
	hintArray.push(winningNum);

	while (hintArray.length < 15){
		var randomNum = Math.floor((Math.random() * 100));
		if(randomNum !== winningNum && hintArray.indexOf(randomNum) === -1){  // until the array is 15 numbers long, push a random number as long as that number is not the winning number or a duplicate
			hintArray.push(randomNum);
		}
	}

	var winningTakenOffShuffle = hintArray.splice(0,1);
	var randomSpot = Math.floor((Math.random() * 14));
	hintArray.splice(randomSpot,0, winningNum);

	return hintArray;

}


//Takes hint array created from createRandomHintArray() function and shaves it down according to
//How many tries are left. (tries * 3).  Randomly shuffles the order of previous hint array
//AND places winning number at random spot within that shaved array
function shaveHintArray(inputArray, triesLeft){
	var shavedArray = [];
	var desiredArrayLength = triesLeft * 3;

  var indexOfWinning = inputArray.indexOf(winningNumber);
	var winningTakenOut = inputArray.splice(indexOfWinning,1);

	var firstRandomIndexOutOfInput = Math.floor((Math.random() * inputArray.length));
	var firstRandomNumberOutOfInput = inputArray[firstRandomIndexOutOfInput];

  shavedArray.push(firstRandomNumberOutOfInput);
	while(shavedArray.length < desiredArrayLength-1){
		var randomIndexOutOfInput = Math.floor((Math.random() * inputArray.length));
		var randomNumberOutOfInput = inputArray[randomIndexOutOfInput];
			if(shavedArray.indexOf(randomNumberOutOfInput) === -1){
				shavedArray.push(randomNumberOutOfInput);
			}
	}
	var randomIndexToPlaceWinning = Math.floor((Math.random() * shavedArray.length));
	shavedArray.splice(randomIndexToPlaceWinning,0, winningTakenOut[0]);

	return shavedArray;
}



function provideHint(){

  var hintArray = createRandomHintArray();
  var outputText = "One of these numbers is the winning number: ";

  if(numberOfTries === 5){
    outputText+= hintArray;
  } else if (numberOfTries < 5){
    outputText+= shaveHintArray(hintArray, numberOfTries);
  }

  $(".hintFeeback").text(outputText);

}


function playAgain(){

  $(".hintFeeback").text("");
  $(".playerFeedback4").text(""); //lower or higher message
  $(".playerFeedback3").text(""); //check guess
  $(".playerFeedback2").text(""); //lower or higher message
  $(".playerFeedback1").text(""); //check guess
  numberOfTries = 5;
  previousGuesses = [];
  winningNumber = generateWinningNumber();

  alert("Game is now reset: LETS PLAY AGAIN!");

}


/* **** Event Listeners/Handlers ****  */
