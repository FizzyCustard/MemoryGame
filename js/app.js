const eachCube = document.getElementsByClassName("square-down");
const eachRow = document.getElementById("table-square");
const trackScore = document.getElementById("userScore");
const feedback = document.getElementById("userFeedback");
const winnerModal = document.getElementById("winner-text");

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

let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
slider.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    slider.innerHTML = this.value;
    theValue = this.value
    if (theValue == 1) {
        let i;
        for (i = 0; i < eachCube.length; i++) {
            eachCube[i].style.backgroundColor = "#ffffff";
        }
    } else if (theValue == 2) {
        for (i = 0; i < eachCube.length; i++) {
            eachCube[i].style.backgroundColor = "#DCDC1A";
        }
    } else if (theValue == 3) {
        for (i = 0; i < eachCube.length; i++) {
            eachCube[i].style.backgroundColor = "#32D333";
        }
    } else {
        for (i = 0; i < eachCube.length; i++) {
            eachCube[i].style.backgroundColor = "#300B39";
        }
    }
}

//END OF SLIDER CODE


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
    
    clickTarget = event;
    clickedImage = clickTarget.target.src;
    theImage = clickedImage.endsWith("square.png");
    imageClicked = clickTarget.target.className;

    if (theImage === true) {
        imageShower(imageClicked);
        flippedCards.push(event);
        compareImage();
    } else {
        console.log("You can not double click image");
    }
    previousClickedEvent = clickTarget;


    if (timerCheck === 0) {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
        console.log("Starting timer")
        timerCheck++
    }

    winCheck();
}


// This function below takes 2 arguments from the showCard function and then shows and hides the image that are clicked on.

function imageShower(imageClicked) {
    if (imageClicked == "image-one square-down") {
        clickTarget.target.src = "img/icons/one.png";
    } else if (imageClicked == "image-two square-down") {
        clickTarget.target.src = "img/icons/two.png";
    } else if (imageClicked == "image-three square-down") {
        clickTarget.target.src = "img/icons/three.png";
    } else if (imageClicked == "image-four square-down") {
        clickTarget.target.src = "img/icons/four.png";
    } else if (imageClicked == "image-five square-down") {
        clickTarget.target.src = "img/icons/five.png";
    } else if (imageClicked == "image-six square-down") {
        clickTarget.target.src = "img/icons/six.png";
    } else if (imageClicked == "image-seven square-down") {
        clickTarget.target.src = "img/icons/seven.png";
    } else clickTarget.target.src = "img/icons/eight.png";
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
    thing = previousClickedEvent; //this is for the delayed flip funtion to run
    setTimeout(turnReset, 800);
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
    for (let i = flippedCards.length - 1; i >= 0; i--) {
        flippedCards[i].target.src = "img/square.png";
    }
    score = 0;
    trackScore.innerHTML = score;
}


//FUNCTION THAT CHECKS IS THE USER HAS WON
function winCheck() {
    if (flippedCards.length == 16) {
        console.log("WINNER");
        timerStop();
        //TODO: need to fix this little hack becuase my image flip is asynchronous which is causing some issues 
        winnerModal.innerHTML = "Great work you won!!! In a time of " + seconds + "." + tens;
        $('#myModal').modal();
    }
}


