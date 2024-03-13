const gameContainer = document.getElementById("game");
let numberOfClicks = 0; //to keep track of number of clicked cards
let firstCard = null;
let secondCard = null;
let preventClick= false;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1 because array will become shorter once colors match
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    const divColor = newDiv.classList.add(color); // give it a class attribute for the value we are looping over
    newDiv.addEventListener("click", handleCardClick);// call a function handleCardClick when a div is clicked on
    gameContainer.append(newDiv);    
  }
}

function handleCardClick(event) {
  if (event.target.classList.contains('is-flipped')) return; 
  let currentCard = event.target;

  currentCard.style.backgroundColor = currentCard.classList; //setting card color to class list


  if (firstCard === null || secondCard === null) { 
      currentCard.classList.add('is-flipped');//if first and second card have no value, flipped class will be added 
      firstCard = firstCard || currentCard;  //if first card has no value, the first card equals itself and the current card
      secondCard = currentCard === firstCard ? null : currentCard; //if the current card equals the first card, then second card is null, if not second card equals current card
    }
    numberOfClicks += 2; //tracking number of clicks


    if(firstCard !== null && secondCard !== null) { //if first card and second card both have a value, prevent other cards from being clicked
      preventClick = false;

      if(firstCard.className === secondCard.className) { //if both card class names match, reset card value to null
        firstCard = null;
        secondCard = null;
        preventClick = false;
      } else {
      setTimeout(function() { // remove flipped status, change background to white and reset card values to null
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        firstCard.style.backgroundColor = 'white';
        secondCard.style.backgroundColor = 'white';
        firstCard = null;
        secondCard = null;
        preventClick = false;
      },1000)
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);


//Create a click function that changes a div to the same color as its class name
//If preventClick is false, return 
//If class name contains flipped, then return
//Add class name of flipped the divs
//If class name has flipped, return nothing

//If firstCard and secondCard aren't assigned a value, add class of flipped 
    //firstCard will equal itself and also the current card if it does't have a value yet
    //if firstCard already has a value, then secondCard will be the second card and also the currentCard
    //after firstCard and secondCard have a value, preventClick will be true so only two cards are clicked and first and second will be null again

//If firstCard and secondCard have same lassName, 
  //numberOfClicks should increase by 1 
  //firstCard and secondCard are set back to null, so two new cards can be clicked
  //preventClick is false

 //Else setTimeout fucntion is made
  //firstCard and secondCard background color are set to nothing
  // flipped is removed from classList 
  //firstCard and secondCard are set to null
  //preventClick is false
  //after 1000ms


  //I had to make sure the actual card classes were being compared by className and not classList and not the DOM elements themselves