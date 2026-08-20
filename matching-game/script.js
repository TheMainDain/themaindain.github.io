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
  let cardClasses = [
    'image-1', 'image-1',
    'image-2', 'image-2',
    'image-3', 'image-3',
    'image-4', 'image-4',
    'image-5', 'image-5',
    'image-6', 'image-6'
  ];

  return _.shuffle(cardClasses);
}

shuffleCardImageClassesTest();


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
    };

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


// This function runs after a card has finished flipping.
function onCardFlipped(newlyFlippedCard) {

  // Increase the flip counter every time a card is revealed.
  incrementCounter(
    "flipped",
    document.getElementById("flip-count")
  );


  // If this is the first card, save it and wait for another card.
  if (lastCardFlipped == null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }


  // Compare the first flipped card with the second flipped card.
  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {

    // The cards do not match, so flip both cards back over.
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");

    lastCardFlipped = null;

    return;
  }


  // The cards matched, so increase the match counter.
  incrementCounter(
    "matches",
    document.getElementById("match-count")
  );


  // Add a visual effect to both matched cards.
  lastCardFlipped.element.classList.add("border-glow");
  newlyFlippedCard.element.classList.add("border-glow");

  lastCardFlipped.element.classList.add("matched");
  newlyFlippedCard.element.classList.add("matched");


  // Check whether all six pairs have been matched.
  if (counters["matches"] == 6) {

    // Play the winning sound.
    winAudio.play();

    // Display the victory screen after the final match animation.
    setTimeout(function() {
      document
        .getElementById("win-message")
        .classList
        .add("show");
    }, 700);

  } else {

    // Play the regular match sound.
    matchAudio.play();
  }


  // Clear the previous card so the player can start a new pair.
  lastCardFlipped = null;
}


// Reset the game back to its starting state.
function resetGame() {

  let cardContainer =
    document.getElementById("card-container");


  // Remove every existing card.
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }


  let matches =
    document.getElementById("match-count");

  let flips =
    document.getElementById("flip-count");


  // Reset the displayed counters.
  matches.innerHTML = "0";
  flips.innerHTML = "0";


  // Reset the JavaScript counters.
  counters = {};


  // Clear the previously flipped card.
  lastCardFlipped = null;


  // Hide the winning screen.
  document
    .getElementById("win-message")
    .classList
    .remove("show");


  // Build a new shuffled board.
  setUpGame();
}


// Start the game when the page first loads.
setUpGame();
