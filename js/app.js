/*
 * Create a list that holds all of your cards
 */
 //const cardsList = [fa-diamond, fa-diamond, fa-paper-plane-o, fa-paper-plane-o, fa-anchor, fa-anchor, fa-bolt, fa-bolt, fa-cube, fa-cube, fa-leaf, fa-leaf, fa-bicycle, fa-bicycle, fa-bomb,fa-bomb];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
ShuffleCards();
function ShuffleCards(){
	const cardsList = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];
	shuffle(cardsList);
	const cards = document.querySelectorAll('.card');
	for(let i=0; i<cards.length; i++){
		cards[i].firstElementChild.classList= "fa "+cardsList[i];
	}
}
// resetting the cards
function resetCards(){
	openCardsList = [];
	matchedCounter = 0;
	const cards = document.querySelectorAll('.card');
	for(let i = 0; i<cards.length; i++){
		cards[i].className = "card";
	}
	ShuffleCards();
}
//resetting moves and stars
function restMovesAndStars(){
	movesCounter = 0;
	document.querySelector('.moves').textContent = movesCounter;
	const oStars = document.querySelectorAll('.fa-star-o');
	for(let i=0; i<oStars.length; i++){
		oStars[i].className = "fa fa-star";
	}
}

//restarting the game
function restartGame(){
	resetCards();
	restMovesAndStars();
	if(document.querySelector('.messege').classList.contains('show')){
		document.querySelector('.messege').classList.remove('show');
	}
}


//Handle clicks
let openCardsList = [];
let movesCounter = 0;
let matchedCounter = 0;
function handleClick(evt){
	if(evt.target.className === "card"){
		if(openCardsList.length < 2){
			displaySymbol(evt);
			addCardToList(evt);
			if (openCardsList.length > 1){
				if (openCardsList[0].classList[1] === openCardsList[1].classList[1]){
					match();
					matchedCounter++;
					if (matchedCounter === 8){
						setTimeout(won, 600);
					}
				}else{
					mismatch();
					setTimeout(hide, 600);
				}
			}
			movesIncermentor();
		}
	}
} 

//display the card's symbol
function displaySymbol(evt){
	evt.target.classList.add('open');
	evt.target.classList.add('show');
} 

//Add add the card to a *list* of "open" cards
function addCardToList(evt){
	openCardsList.push(evt.target.firstElementChild);
}

//if the cards do match, lock the cards in the open position
function match(){
	openCardsList[0].parentElement.classList.add('match');
	openCardsList[1].parentElement.classList.add('match');
	//If cards match remove them from the list - reinitialize the list-
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

//increment the move counter and display it on the page
function movesIncermentor(){
	movesCounter++;
	document.querySelector('.moves').textContent = movesCounter;
	if(movesCounter === 24){
		document.querySelectorAll('.fa-star')[2].className = "fa fa-star-o";
	}else if(movesCounter === 32){
		document.querySelectorAll('.fa-star')[1].className = "fa fa-star-o";
	}
}

//display a message with the final score
function won(){
	document.querySelector('.messege').classList.add('show');
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
const restart = document.querySelectorAll('.restart');
for(let k=0; k<restart.length; k++){
	restart[k].addEventListener('click', restartGame);
}

