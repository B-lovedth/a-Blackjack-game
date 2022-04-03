/** @format */

let firstCard;
let secondCard;
let cardArray = [];
let sum = 0;
let hasBlackjack = false;
let isAlive = false;
const sumEl = document.getElementById("sum-el"); // stores the object from the HTMl doc
const cardEl = document.querySelector("#card-el");
const messageEl = document.getElementById("message-el");
let player = {
  name: "Great",
  chips: 0,
};

let playerEl = document.getElementById("player-el");
playerEl.textContent = `${player.name}: $${player.chips}`;

const getRandomCard = () => {
  let myRand = Math.floor(Math.random() * 13) + 1; // generates random number from 1 to 13
  // if(myRand === 1){return 11}
  // else if(myRand===11||myRand===12||myRand===13){return 10}
  // else{return myRand}
  switch (myRand) {
    case 1:
      return 11;
    case 11:
      return 10;
    case 12:
      return 10;
    case 13:
      return 10;
    default:
      return myRand;
      //i used switch statment cause i can lol
  }
};
const renderGame = () => {
  cardEl.textContent = "Card: "; // initializes text content as "Card:"
  for (let i = 0; i < cardArray.length; i++) {
    cardEl.textContent += `${cardArray[i]} `; // concatenates all the elements in the array into a string
  }
  sumEl.textContent = `Sum: ${sum}`; // displays the value of sum
  if (sum <= 20) {
    messageEl.textContent = "Do you want to draw a new card?";
    isAlive = true;
    hasBlackjack = false;
  } else if (sum === 21) {
    messageEl.textContent = "You've got Blackjack!";
    isAlive = true;
    hasBlackjack = true;
  } else {
    messageEl.textContent = "You are out of the game! ";
    isAlive = false;
    hasBlackjack = false;
  }

  if (hasBlackjack === true) {
    player.chips += 100;
    playerEl.textContent = player.name + ": $" + player.chips;
  }
  if (isAlive === false) {
    player.chips -= 100;
    playerEl.textContent = player.name + ": $" + player.chips;
  }
};

const startGame = () => {
  isAlive = true;
  firstCard = getRandomCard(); // invokes getRandomCard function
  secondCard = getRandomCard();
  cardArray = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame(); // invokes function
};

const newCard = () => {
  if (isAlive === true && hasBlackjack === false) {
    let card = getRandomCard(); // assigns random value to card
    sum += card; //adds the card value to sum
    cardArray.push(card); // adds card to end of array
    renderGame();
  } // invokes function
};
