



const eachCube = document.getElementsByClassName("square-down") ;
const eachRow = document.getElementById("table-square");
const trackScore = document.getElementById("userScore");

//When a use clicks then this calls the desired function

eachRow.addEventListener('click', showCard);
var imageClicked ;
var previousClicked = undefined;
var imageClicked = undefined;
var score = 0
var clickedImage = undefined;
var theImage;
var historicImage = undefined;
var clickTarget;
var previousClickedEvent;

function showCard(event) {
	console.log(previousClicked);
	clickTarget = event;
	clickedImage = clickTarget.target.src;
	theImage = clickedImage.endsWith("square.png");
	imageClicked = clickTarget.target.className;
	
	if (theImage === true) {
		imageShower(imageClicked);

		compareImage();
		} else {
		console.log("You can not doble click image");
	}
	previousClickedEvent = clickTarget;
	console.log(previousClicked);

}


// This function below takes 2 arguments from the showCard function and then shows and hides the image that are clicked on.

function imageShower(imageClicked) {
	if (imageClicked == "image-one square-down") {
			clickTarget.target.src = "img/icons/one.png";
		} else if (imageClicked == "image-two square-down") {
			clickTarget.target.src = "img/icons/two.png";
		}else if (imageClicked == "image-three square-down") {
			clickTarget.target.src = "img/icons/three.png";
		}else if (imageClicked == "image-four square-down") {
			clickTarget.target.src = "img/icons/four.png";
		}else if (imageClicked == "image-five square-down") {
			clickTarget.target.src = "img/icons/five.png";
		}else if (imageClicked == "image-six square-down") {
			clickTarget.target.src = "img/icons/six.png";
		}else if (imageClicked == "image-seven square-down") {
			clickTarget.target.src = "img/icons/seven.png";
		}else clickTarget.target.src = "img/icons/eight.png";
}


// This function compares the previously clicked image and 
// compares it to the one just clicked to see if they match

function compareImage() {
	if (previousClicked == undefined) {
		console.log("Nothing previous");;
		previousClicked = imageClicked;
	} else if (previousClicked == imageClicked) {
		console.log("Hooray!!");
		score = score + 1;
		trackScore.innerHTML = score;
		previousClicked = undefined ;
		imageClicked = undefined ;
	} else if (previousClicked != imageClicked) {
		console.log("boooooo!!") ;
		historicImage = previousClicked
		console.log(clickedImage);
		turnReset();
		// setTimeout(turnReset, 500);
		previousClicked = undefined ;
		imageClicked = undefined ;
	} else console.log("ERROR");
		
}


function turnReset() {
	clickTarget.target.src = "img/square.png";
	previousClickedEvent.target.src = "img/square.png";
	
}


function scoreTracker() {

}





// CODE FOR THE SLIDER

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
slider.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    slider.innerHTML = this.value;
    theValue = this.value
    if (theValue == 1) {
    	// console.log("less");
    	var i;
    	for (i = 0; i < eachCube.length; i++) {
    		eachCube[i].style.backgroundColor = "#ffffff";
		}
    } else if (theValue == 2){
    	// console.log("more");
    	for (i = 0; i < eachCube.length; i++) {
    		eachCube[i].style.backgroundColor = "#D1CE87";
		}
    } else if (theValue == 3){
    	for (i = 0; i < eachCube.length; i++) {
    		eachCube[i].style.backgroundColor = "#93D187";
		}
    } else {
    	for (i = 0; i < eachCube.length; i++) {
    		eachCube[i].style.backgroundColor = "#87CBD1";
    	}
    }   
}

//END OF SLIDER CODE



var resetButton = document.getElementById("resetGame");






