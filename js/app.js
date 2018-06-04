



const eachCube = document.getElementsByClassName("square-down") ;
const eachRow = document.getElementById("table-square");
const trackScore = document.getElementById("userScore")

//When a use clicks then this calls the desired function

eachRow.addEventListener('click', showCard);
var imageClicked ;
var previousClicked = null;
var imageClicked;
var score = 0

function showCard(event) {
	const clickedImage = event.target.src;
	const theImage = clickedImage.endsWith("square.png");
	imageClicked = event.target.className
	
	if (theImage === true) {
		imageShower(clickedImage, imageClicked);
		} else {
		event.target.src = "img/square.png";
	}
	compareImage();

}

// This function compares the previously clicked image and 
// compares it to the one just clicked to see if they match

function compareImage() {
	if (previousClicked == undefined) {
		console.log("Nothing previous");
	} else if (previousClicked == imageClicked) {
		console.log("Hooray!!");
		score = score + 1;
		trackScore.innerHTML = score;
		previousClicked = undefined ;
		imageClicked = undefined ;
	} else console.log("boooooo!!") ;
		previousClicked = undefined ;
		imageClicked = undefined ;


}


function scoreTracker() {

}



// This function below takes 2 arguments from the showCard function and then shows and hides the image that are clicked on.

function imageShower(clickedImage, imageClicked) {
	if (imageClicked == "image-one square-down") {
			event.target.src = "img/icons/one.png";
		} else if (imageClicked == "image-two square-down") {
			event.target.src = "img/icons/two.png";
		}else if (imageClicked == "image-three square-down") {
			event.target.src = "img/icons/three.png";
		}else if (imageClicked == "image-four square-down") {
			event.target.src = "img/icons/four.png";
		}else if (imageClicked == "image-five square-down") {
			event.target.src = "img/icons/five.png";
		}else if (imageClicked == "image-six square-down") {
			event.target.src = "img/icons/six.png";
		}else if (imageClicked == "image-seven square-down") {
			event.target.src = "img/icons/seven.png";
		}else event.target.src = "img/icons/eight.png";
}




// CODE FOR THE SLIDER

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
slider.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    slider.innerHTML = this.value;
    theValue = this.value
    var cubeColor = document.getElementsByClassName("square-down")
    if (theValue == 1) {
    	// console.log("less");
    	var i;
    	for (i = 0; i < cubeColor.length; i++) {
    		cubeColor[i].style.backgroundColor = "#ffffff";
		}
    } else if (theValue == 2){
    	// console.log("more");
    	for (i = 0; i < cubeColor.length; i++) {
    		cubeColor[i].style.backgroundColor = "#D1CE87";
		}
    } else if (theValue == 3){
    	for (i = 0; i < cubeColor.length; i++) {
    		cubeColor[i].style.backgroundColor = "#93D187";
		}
    } else {
    	for (i = 0; i < cubeColor.length; i++) {
    		cubeColor[i].style.backgroundColor = "#87CBD1";
    	}
    }   
}

//END OF SLIDER CODE

