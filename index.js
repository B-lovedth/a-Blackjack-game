let firstCard;
let secondCard;
let cardArray = [];
let sum = 0;
let hasBlackjack = false;
let isAlive = false;
let timeleft;
const sumEl = document.querySelector("#sum-el"); 
const cardEl = document.querySelector("#card-el");
const messageEl = document.querySelector("#message-el");
const start = document.querySelector("#start");
const newGame = document.querySelector("#new");
const chip = document.querySelector("#chip");
const _name = document.querySelector("#name")
const head = document.querySelector("#head");
let player = {
  name: null,
  chips: null,
};
const initLoad = () => {
  const getName = localStorage.getItem('name')
  const getChips = localStorage.getItem('chips')
  if(getChips && getName) alert(`Welcome Back ${getName}`)
  if (getName) {
    player.name = getName
  } else {
      let uName = prompt("May i know your name?");
      if (uName === "") {
        uName = "You";
      } else if (isNaN(uName)) {
        alert(`Welcome!, ${uName}`);
        player.name = uName
      } else if (!isNaN(uName)) {
        alert("Please enter a Valid name!");
        location.reload();
    };
  }
  if (getChips) {
    player.chips = getChips;
  } else {
    player.chips = 1000;
  }
  _name.textContent = player.name;
  chip.textContent = player.chips;
  console.log(player.chips)
  console.log(player.name)
}
initLoad();


const storage = () => {
  localStorage.setItem("chips", player.chips)
  localStorage.setItem('name',player.name)
}

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
      timeleft = 3;
  cardEl.textContent = "Cards: "; // initializes text content as "Card:"
  // for (let i = 0; i < cardArray.length; i++) {
  //   cardEl.textContent += `${cardArray[i]} `; // concatenates all the elements in the array into a string
  for(let i in cardArray){ 
    cardEl.innerHTML += `<div class='card'><span>${cardArray[i]}</span></div> ` //refactored
  }
  sumEl.textContent = `Sum: ${sum}`; // displays the value of sum
  if (sum <= 20) {
    messageEl.textContent = "You can draw a new card!";
    isAlive = true;
    hasBlackjack = false;
  } else if (sum === 21) {
    messageEl.innerHTML = "You've got Blackjack!🃏🎉🎉";
    isAlive = true;
    hasBlackjack =true;
  } else {
    messageEl.innerHTML = "You are out of the game!👊🏻 ";
    isAlive = false;
    hasBlackjack = false;
    let downloadTimer = setInterval(function () {
      if (timeleft < 1) {
        reset();
        start.disabled = false;
        newGame.disabled = false;
        clearInterval(downloadTimer);
      } else {
        start.disabled = true;
        newGame.disabled = true;
        messageEl.textContent = `New game in ${timeleft}`;
        timeleft -= 1;
      }
    }, 800);
  }
  if (hasBlackjack === true) {
    player.chips += 100;
    _name.textContent = player.name;
    chip.textContent = player.chips;
  }
  if (isAlive === false) {
    player.chips -= 100;
    _name.textContent = player.name;
    chip.textContent = player.chips;
  }
  checkChips();
  storage()
};
const checkChips = () => {
  if (player.chips < 0) {
    alert("oops! , You're out of Chips!");
    _continue();
    chip.classList.add("loss");
  } else
    chip.classList.remove("loss");
    
}
const _continue = () => {
  const query = confirm("Do you want to start a new game?");
  if (query) {
    reset();
    localStorage.removeItem("chips");
    initLoad()
    checkChips()
  }
}
const reset = () => {
  firstCard = null;
  secondCard = null;
  cardArray = [];
  sum = 0;
  hasBlackjack = false;
  isAlive = false;
  cardEl.textContent = "Cards: ";
  messageEl.textContent = "Draw a card!";
  sumEl.textContent = `Sum:`; 
  // player.chips = 0;
  // playerEl.textContent = `${player.name}: $${player.chips}`;
  console.log("done");
};;;
start.addEventListener("click", () => {
  isAlive = true;
  firstCard = getRandomCard(); // invokes getRandomCard function
  secondCard = getRandomCard();
  cardArray = [firstCard, secondCard];
  sum = firstCard + secondCard;
  renderGame(); // invokes function
}) 

newGame.addEventListener("click", () => {
  if (isAlive === true && hasBlackjack === false) {
    let card = getRandomCard(); // assigns random value to card
    sum += card; //adds the card value to sum
    cardArray.push(card); // adds card to end of array
    renderGame();
  } // invokes function
})
head.addEventListener("click", () => {
  alert("You win if you get a combination of cards that sums up to 21[Blackjack]!\nand you lose if it exceeds it.\nwish you luck!")
})
