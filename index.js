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
const setName = (variable) => {
  console.log(variable)
  let cap = variable[0].toUpperCase() + variable.slice(1, variable.length).toLowerCase();
  return (
    cap
  );
};
const initLoad = () => {
  const getName = localStorage.getItem('name')
  const getChips = localStorage.getItem('chips')
  if(getChips && getName) alert(`Welcome Back ${getName}!`)
  if (getName) {
    player.name = setName(getName);
  } else {
      let uName = prompt("May i know your name?");
      if (uName === "") {
        player.name = "You";
        alert(
          `Click on the Blackjack logo for info on the game.`
        );

      } else if (isNaN(uName)) {
        player.name = setName(uName);
        alert(`Welcome!, ${player.name}\nClick on the Blackjack logo for info on the game.`);
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
  console.log();

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
    messageEl.innerHTML = "You lost this game!⭕ ";
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
  if (player.chips < 400) {
    chip.classList.add("loss");
  }else
    chip.classList.remove("loss");
  
  if (player.chips < 0) {
    alert("oops! , You're out of Chips!");
    _continue();
  }  
}
let date = 5;
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
  alert("Hi there!\n- This is a simple game of blackjack that's played by drawing cards.\n- You're initially given a starting balance of $1000 which can increase or decrease depending on whether or not you successfully draw a blackjack\n- You win if you get a card combination that sums up to 21[Blackjack]! , and you lose if it exceeds it. wish you luck!\n- Click on your name to change it if you want.")
})
_name.addEventListener("click", () => {
  let ask = confirm("Do you want to change your name?")
  if (ask===true) {
    let newName = prompt("Enter Name");
    if (newName === "") {
      player.name = "You";
    } else if (isNaN(newName)) {
      player.name =
        setName(newName)
    } else if (!isNaN(newName)) {
      alert("Please enter a Valid name!");
    }
  }
  changeName()
})
const changeName = () => {
  storage();
  console.log(player.name)
  _name.textContent = player.name;
}