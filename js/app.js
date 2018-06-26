const eachRow = document.getElementById("table-square");
const trackScore = document.getElementById("userScore");


let previousClicked; //this stores the previous mouse click event so that a comparison can be made to the next click
let imageClicked; // this is the mouse event for the mouse event that just happened which can be compared with previousClicked
let score = 0; //counts the score of the user 1 point per pair turned over
let clickTarget; //Global varaible that us used in multiple functions to store the click target
let previousClickedEvent;
let flippedCards = [];
let thing;

let isClickable = true;
randomiseSquares(); //this on load randoimses the cards in the game so it is ready to play straight away

eachRow.addEventListener('click', showCard);


let starCounter = 5;
function rating() {

    if (score === 20) {
        document.getElementsByClassName("star")[0].style.display = "none";
        starCounter--;
    } else if (score === 25) {
        document.getElementsByClassName("star")[1].style.display = "none";
        starCounter--;
    } else if (score === 35) {
        document.getElementsByClassName("star")[2].style.display = "none";
        starCounter--;
    } else if (score === 40) {
        document.getElementsByClassName("star")[3].style.display = "none";
        starCounter--;
    }
}


//code for the timer below

let seconds = "00"; //seconds used in the timer
let tens = "00"; //micro seconds of the timer
const appendSeconds = document.getElementById("seconds"); //apending the html with the seconds seconds
const appendTens = document.getElementById("tens"); //apending the html with the micro seconds

let Interval;
let timerCheck = true; //this is used in the show card function and stores if the timer is running.

function timerStop() {
    clearInterval(Interval);
}

function timerReset() {
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    timerCheck = true;
}


function startTimer() {
    // TODO: padStart() method would clean this up a lot need to investigate 
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


//This is the fuyntion that runs when the user clicks on a given tile
function showCard(event) {
    //First i check to see if the gaming area is clickable this stops the user clicking more than twice which can cause issues.
    if (isClickable) {
        //If the timer isnt running this means the games hasnt started so we start the timer and get the game going
        if (timerCheck) {
            clearInterval(Interval);
            Interval = setInterval(startTimer, 10);
            timerCheck = false;
        }

        clickTarget = event;
        const clickedImage = clickTarget.target.src; //this is to help with the comparing of what the user clicked on
        const theImage = clickedImage.endsWith("square.png"); //This is used for knowing if the users card needs turning over or not
        imageClicked = clickTarget.target.dataset.imagetype; //This is how pairs of cards are compared using the dataset.imagetype property 

        if (theImage) {
            imageShower(imageClicked);
            flippedCards.push(event); //correct pairs are stored in an array
            compareImage();
        }

        winCheck(); //has the user won yet basiclly waiting for the array to hit 16 and above.
        previousClickedEvent = clickTarget; //final thing in the function is to store the clicked event to this variable so that a comparision can be made
    }

}


// This function below takes 2 arguments from the showCard function and then shows and hides the image that are clicked on.
//each image tile is assigend a letter a-h by the randomiseSquares funtion this is then used here to compare and check what the user has clicked on
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
    } else console.error("Issue with imageShower function");

}

// This function compares the previously clicked image and compares it to the one just clicked to see if they match
//if the images match then the user gains a point using the addPoint function. If they make a mistake then the user mistake funtion is called.
function compareImage() {
    if (previousClicked == undefined) {
        previousClicked = imageClicked;
    } else if (previousClicked == imageClicked) {
        addPoint();
    } else if (previousClicked != imageClicked) {
        userMistake();
    } else console.error("with compareImage function");

}

//Function runs when a user clicks 2 wrong cards flips them back over and then pops the last 2 events out of the flipped cards array.
function userMistake() {
    //TODO: need to change the name of the varialbbe thing as not very discriptive. 
    thing = previousClickedEvent; //this is for the delayed turnReset funtion to run and flip the incorrect images over
    isClickable = false;
    setTimeout(turnReset, 800);
    clearClicked(); //setts previous and imageclicked back to undefined
    removeLastFlipped(); //pops 2 events out of flipped cards array
    addPoint();
}

//FOR WHEN THE USER SELECTS 2 CORRENT CARDS
function addPoint() {
    score = score + 1;
    trackScore.innerHTML = score;
    clearClicked();
    rating();
}


//MAKES A PREVIOUS CLICKED AND CURRENT CLICKED CARDS TURN BACK OVER
function turnReset() {
    clickTarget.target.src = "img/square.png";
    thing.target.src = "img/square.png";
    isClickable = true;
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


//FUNCTION THAT COMPLETELY RESETS GAME
//This funtion is used from the index.html file 
function gameReset() {
    //below loop flips all the cards back over
    for (let i = 15; i >= 0; i--) {
        document.getElementsByClassName("square")[i].src = "img/square.png";
    }
    //makes the stars visible again
    for (let i = 3; i >= 0; i--) {
        document.getElementsByClassName("star")[i].style.display = "";
    }
    //removes all items from the flippedCards array
    let flippedArray = flippedCards.length - 1;
    for (let i = flippedArray; i >= 0; i--) {
        flippedCards.pop();
    }

    score = 0; //sets score back to zero
    trackScore.innerHTML = score; //adds the score back into the html
    timerReset();
    randomiseSquares();
}


//THIS FUNCTION SETS A RANDOM LETTER DATASET OF BETWEEN A-H FOR THE RANDOMISING
function randomiseSquares() {
    const imageDataSet = "abcdefghabcdefgh"; //there are 16 cards so we need 8 pairs hence a-h
    let possible = imageDataSet
    for (let i = 15; i >= 0; i--) {
        let choosenLetter = possible.charAt(Math.floor(Math.random() * possible.length));
        possible = possible.replace((choosenLetter), ("")); //removes the letter that was used out of the possible string so that they dont get pulled multiple times
        document.getElementsByClassName("square")[i].dataset.imagetype = "" + choosenLetter; //assigns the dataset imagetype property to each tile.
    }
}



//FUNCTION THAT CHECKS IS THE USER HAS WON
function winCheck() {
    //here we look for the flippedCards array to equal 16 and above that lets us know that the game is over and the user has won.
    if (flippedCards.length >= 16) {
        timerStop();
        //TODO: need to fix this little hack becuase my image flip is asynchronous which is causing some issues 
        winnerModal();
    }
}


// When the user clicks on the button, open the modal 
// btn.onclick = 
const modal = document.getElementById("myModal");
const modalX = document.getElementById("close"); //for the cross to close the modal pop up


modalX.addEventListener('click', closeModal); // When the user clicks on <span> (x), close the modal

function winnerModal() {
    // Get the modal
    let modal = document.getElementById('myModal');
    let modalContent = document.getElementById("modal-info");
    modal.style.display = "block";
    modalContent.innerHTML = "Great work you won!!! In a time of " + seconds + "." + tens + " seconds. With a " + starCounter + " star rating!";

}

function closeModal() {
    //TODO make this function work so that when you click outside of the pop up you can close the modal
    // if (event.target == modal) {
    //     modal.style.display = "none"; 
    // } else 
    modal.style.display = "none"; // When the user clicks on <span> (x), close the modal
    gameReset();
}