/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//Handle clicks
let openCardsList = [];
function handleClick(evt){
	if(evt.target.className === "card"){
		displaySymbol(evt);
		addCardToList(evt);
		if (openCardsList.length > 1){
			if (openCardsList[0].classList[1] === openCardsList[1].classList[1]){
				match();
			}else{
				mismatch();
				setTimeout(hide, 600);
			}
		}
	}
} 

//display the card's symbol
function displaySymbol(evt){
	evt.target.classList.add('open', 'show');
} 

//Add add the card to a *list* of "open" cards
function addCardToList(evt){
	openCardsList.push(evt.target.firstElementChild);
}

//if the cards do match, lock the cards in the open position
function match(){
	openCardsList[0].parentElement.classList = "card match";
	openCardsList[1].parentElement.classList = "card match";
	//If crda match remove them from the list - reinitialize the list-
	openCardsList = [];
}

// function to change the color of the card if mismatched
function mismatch(){
	openCardsList[0].parentElement.classList = "card mismatch";
	openCardsList[1].parentElement.classList = "card mismatch";
}

//hide the card's symbol
function hide(){
	openCardsList[0].parentElement.classList = "card";
	openCardsList[1].parentElement.classList = "card";
	openCardsList = [];
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const deck = document.querySelector('.deck');
 deck.addEventListener('click', handleClick);
