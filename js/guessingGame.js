function generateWinningNumber(){
  return Math.floor((Math.random() * 100) + 1);
}

var winningNumber = generateWinningNumber();
// console.log("Winning number: " + winningNumber);   //YES


$(document).ready(function(){

var playerGuess;


  $(".submit").on("click", function(){
    playerGuess = playersGuessSubmission();
    $('#field1').val('');
    console.log(playerGuess);
    var difference = Math.abs(playerGuess - winningNumber);
    console.log(difference);
  });

  $(".hint").on("click", function(){
    $(".playerFeedback").toggle().text("Here is your hint!");   // hint button toggles text at bottom
		});

  $(".retry").on("click", function(){
    // checkGuess();
  });


});


// Fetch the Players Guess
function playersGuessSubmission(){
  var element = document.getElementById("field1");
  return Number(element.value);
}

// Check if the Player's Guess is the winning number

function checkGuess(){

  console.log("FML");

  // if(playerGuess === winningNumber){
  //   console.log("YOU GUESSED IT, YOU WIN!!!");
  // } else {
  //   // player must try again...
  //   console.log("NOPE... TRY AGAIN");
  // }
}



// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
	// add code here
}

// Create a provide hint button that provides additional clues to the "Player"
function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again
function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */
