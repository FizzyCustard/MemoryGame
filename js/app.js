



const eachCube = document.getElementsByClassName("square-down") ;
const eachRow = document.getElementById("table-square");


//When a use clicks then this calls the desired function
eachRow.addEventListener('click', showCard);


function showCard(event) {
	console.log(event.target.src);
	if (event.target.src === "file:///Users/nelarifi/Dropbox/Courses/udacity/memory-game/img/square.png") {
		event.target.src = "img/squaremouse.png"
	} else {
		event.target.src = "img/square.png"
	}
	
}




// CODE FOR THE SLIDER

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    theValue = this.value
    var cubeColor = document.getElementsByClassName("square-down")
    if (theValue <= 50 && theValue > 25) {
    	// console.log("less");
    	var i;
    	for (i = 0; i < cubeColor.length; i++) {
    		cubeColor[i].style.backgroundColor = "#D1CE87";
		}
    } else if (theValue <= 25){
    	// console.log("more");
    	for (i = 0; i < cubeColor.length; i++) {
    		cubeColor[i].style.backgroundColor = "#D19987";
		}
    } else if (theValue >= 50 && theValue < 75){
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

