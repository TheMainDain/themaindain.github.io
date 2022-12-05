//createNewCard Passed
function createNewCard() {
  let cardElement = document.createElement("div");
	cardElement.classList.add("card");
	cardElement.innerHTML = `<div class="card-down"></div> <div class="card-up"></div>`;
  return cardElement;
}
createNewCardTest();

//appendNewCard Passed
function appendNewCard(parentElement) {
	let cardElement = createNewCard();
  parentElement.appendChild(cardElement);
	return cardElement;
}
appendNewCardTest();

//shuffleCard Passed
function shuffleCardImageClasses() {
	let cardClasses = ['image-1', 'image-1', 'image-2', 'image-2', 'image-3', 'image-3', 'image-4', 'image-4', 'image-5', 'image-5', 'image-6', 'image-6'];
 return _.shuffle(cardClasses);
}
shuffleCardImageClassesTest()

//createCards Passed 
function createCards(parentElement, shuffledImageClasses) {
  let cardObjectArray = [];
  for (let i = 0; i < 12; i++) {
    let newCard = appendNewCard(parentElement); 
    newCard.classList.add(shuffledImageClasses[i]);
    let newCardObject = {
      index: i,
      element: newCard, 
      imageClass: shuffledImageClasses[i],
    }
    cardObjectArray.push(newCardObject);
  }
  return cardObjectArray;
}
createCardsTest();

//doCardsMatch Passed
function doCardsMatch(cardObject1, cardObject2) {
  return (cardObject1.imageClass == cardObject2.imageClass);
}
doCardsMatchTest();


let counters = {};

//incrementCounter Passed
function incrementCounter(counterName, parentElement) {
  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
    }
	counters[counterName]++;
  parentElement.innerHTML = counters[counterName]; 
}
incrementCounterTest();


let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
	incrementCounter("flipped", document.getElementById("flip-count"));
	if (lastCardFlipped == null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }
  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return
  } else {
    incrementCounter("match", document.getElementById("match-count"))
  }
	incrementCounter("matches", document.getElementById("match-count"));
  lastCardFlipped.element.classList.add("border-glow");
	if(counters["matches"] == 6){
    winAudio.play();
  } else {
    matchAudio.play();
  }
  lastCardFlipped = null;
}


function resetGame() {
 let cardContainer = document.getElementById("card-container");
 while(cardContainer.firstChild){
   cardContainer.removeChild(cardContainer.firstChild);
  }
	
 let matches = document.getElementById("match-count"); 
 let flips = document.getElementById("flip-count"); 
 matches.innerHTML = "0"; 
 flips.innerHTML = "0";
 counters = {}; 
 lastCardFlipped = null;
 setUpGame();
}

setUpGame();