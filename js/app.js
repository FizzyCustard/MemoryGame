const eachCube = document.getElementsByClassName("square");
const eachRow = document.getElementById("table-square");
const trackScore = document.getElementById("userScore");
const feedback = document.getElementById("userFeedback");
const winnerModal = document.getElementById("winner-text");

let isClickable = true;

eachRow.addEventListener('click', showCard);
let previousClicked = undefined;
let imageClicked = undefined;
let score = 0
let theImage;
let clickTarget;
let previousClickedEvent;
let flippedCards = [];
let thing;

// CODE FOR THE SLIDER

// let slider = document.getElementById("myRange");
// let output = document.getElementById("demo");
// slider.innerHTML = slider.value; // Display the default slider value

// // Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//     slider.innerHTML = this.value;
//     theValue = this.value
//     if (theValue == 1) {
//         let i;
//         for (i = 0; i < eachCube.length; i++) {
//             eachCube[i].style.backgroundColor = "#ffffff";
//         }
//     } else if (theValue == 2) {
//         for (i = 0; i < eachCube.length; i++) {
//             eachCube[i].style.backgroundColor = "#DCDC1A";
//         }
//     } else if (theValue == 3) {
//         for (i = 0; i < eachCube.length; i++) {
//             eachCube[i].style.backgroundColor = "#32D333";
//         }
//     } else {
//         for (i = 0; i < eachCube.length; i++) {
//             eachCube[i].style.backgroundColor = "#300B39";
//         }
//     }
// }

//END OF SLIDER CODE

// CODE FOR THE RATING SYSTEM

let starRating = document.getElementById("star-rating");
let starRatingImages = starRating.getElementsByTagName("img");
let starCheck;

function rating() {

    // let makeStar = document.createElement("IMG");
    // makeStar.setAttribute("src", "img/star.png");
    // makeStar.setAttribute("alt", "Stars for the rating system");
    if (seconds < 15) {
        console.log("5 star")
    } else if (seconds <= 25) {
        document.getElementsByClassName("star")[0].style.display = "none";
        console.log("down to 4 star")
    } else if (seconds <= 45) {
        document.getElementsByClassName("star")[1].style.display = "none";
        console.log("down to 3 star")
    } else if (seconds <= 60) {
        document.getElementsByClassName("star")[2].style.display = "none";
        console.log("down to 2 star")
    } else if (seconds <= 70) {
        document.getElementsByClassName("star")[3].style.display = "none";
        console.log("down to 1 star")
        // starRating.appendChild(makeStar);
    } else {
        console.log("staying on current star");
        clearInterval(starCheck);
    }
}


//code for the timer

let seconds = 00;
let tens = 00;
const appendTens = document.getElementById("tens")
const appendSeconds = document.getElementById("seconds")
const buttonStart = document.getElementById('button-start');
const buttonStop = document.getElementById('button-stop');
const buttonReset = document.getElementById('button-reset');
let Interval;
let timerCheck = 0

function timerStop() {
    clearInterval(Interval);
}

function timerReset() {
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    timerCheck = 0
}


function startTimer() {
    tens++;
    if (tens < 9) {
        appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9) {
        appendTens.innerHTML = tens;
    }

    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }

}


//TIMER CODE END

function showCard(event) {
    // feedback.innerHTML = "";
    if (isClickable === true) {
		
		if (timerCheck === 0) {
	    randomiseSquares()
	    clearInterval(Interval);
	    Interval = setInterval(startTimer, 10);
	    console.log("Starting timer")
	    timerCheck++
	    starCheck = setInterval(rating, 4500);
	    }

	    clickTarget = event;
	    clickedImage = clickTarget.target.src;
	    theImage = clickedImage.endsWith("square.png");
	    imageClicked = clickTarget.target.dataset.imagetype;

	    if (theImage === true) {
	        imageShower(imageClicked);
	        flippedCards.push(event);
	        compareImage();
	    } else {
	        console.log("You can not double click image");
	    }
	    previousClickedEvent = clickTarget;


	    winCheck();	
    }
    
}


// This function below takes 2 arguments from the showCard function and then shows and hides the image that are clicked on.

function imageShower(imageClicked) {
    if (imageClicked == "a") {
        clickTarget.target.src = "img/icons/one.png";
    } else if (imageClicked == "b") {
        clickTarget.target.src = "img/icons/two.png";
    } else if (imageClicked == "c") {
        clickTarget.target.src = "img/icons/three.png";
    } else if (imageClicked == "d") {
        clickTarget.target.src = "img/icons/four.png";
    } else if (imageClicked == "e") {
        clickTarget.target.src = "img/icons/five.png";
    } else if (imageClicked == "f") {
        clickTarget.target.src = "img/icons/six.png";
    } else if (imageClicked == "g") {
        clickTarget.target.src = "img/icons/seven.png";
    } else if (imageClicked == "h") {
        clickTarget.target.src = "img/icons/eight.png";
    } else console.log("Issue with imageShower function")

}


// This function compares the previously clicked image and 
// compares it to the one just clicked to see if they match

function compareImage() {
    if (previousClicked == undefined) {
        previousClicked = imageClicked;
    } else if (previousClicked == imageClicked) {
        addPoint();
    } else if (previousClicked != imageClicked) {
        userMistake();
    } else console.log("ERROR");

}

//Function runs when a user clicks 2 wrong cards
function userMistake() {
    thing = previousClickedEvent; //this is for the delayed turnReset funtion to run
    //TODO make the time out work at the minute if the user clicks too fast they can cause a third card to be flipped.
    isClickable = false;
    setTimeout(turnReset, 800);
    // turnReset();
    clearClicked();
    removeLastFlipped();
    addPoint();
}

//FOR WHEN THE USER SELECTS 2 CORRENT CARDS
function addPoint() {
    score = score + 1;
    trackScore.innerHTML = score;
    clearClicked();
}


//MAKES A PREVIOUS CLICKED AND CURRENT CLICKED CARDS TURN BACK OVER
function turnReset() {
    clickTarget.target.src = "img/square.png";
    thing.target.src = "img/square.png";
    isClickable = true;
    // feedback.innerHTML = "";

}


//THIS CLEARS THE VARAIBLES USED AFTER EACH MOVE OF 2
function clearClicked() {
    previousClicked = undefined;
    imageClicked = undefined;
}


//REMOVES LAST 2 ITEMS FROM THE FLIPPED ARRAY
function removeLastFlipped() {
    flippedCards.pop();
    flippedCards.pop();
}


//LOOP THAT FLIPS ALL CARDS BACK OVER TO RESET GAME
function gameReset() {
    //below loop flipps all the cards back over
    for (let i = 15; i >= 0; i--) {
        document.getElementsByClassName("square")[i].src = "img/square.png";
    }
    //makes the stars visible again
    for (let i = 3; i >= 0; i--) {
        document.getElementsByClassName("star")[i].style.display = "";
    }

    let flippedArray = flippedCards.length - 1;
    for (i = flippedArray ; i >= 0 ; i--) {
    	flippedCards[i].pop();
    }

    score = 0;
    trackScore.innerHTML = score;
    timerReset();
    clearInterval(starCheck);
}


//THIS FUNCTION SETS A RANDOM LETTER DATASET OF BETWEEN A-H FOR THE RANDOMISING
function randomiseSquares() {
    const imageDataSet = "abcdefghabcdefgh";
    let possible = imageDataSet
    for (i = 15; i >= 0; i--) {
        let choosenLetter = possible.charAt(Math.floor(Math.random() * possible.length))
        // console.log(choosenLetter)
        possible = possible.replace((choosenLetter), (""))
        document.getElementsByClassName("square")[i].dataset.imagetype = "" + choosenLetter;
    }
}



//FUNCTION THAT CHECKS IS THE USER HAS WON
function winCheck() {
    if (flippedCards.length == 16) {
        console.log("WINNER");
        timerStop();
        //TODO: need to fix this little hack becuase my image flip is asynchronous which is causing some issues 
        winnerModal.innerHTML = "  Great work you won!!! In a time of " + seconds + "." + tens + " seconds. And only " + score + " moves!";
        $('#winnerModal').modal();
        clearInterval(starCheck);
    }
}