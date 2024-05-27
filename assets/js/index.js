// document.addEventListener("DOMContentLoaded", () => {
//   fetch("./assets/json/cards.json")
//     .then((response) => response.json())
//     .then((data) => loadCards(data))
//     .catch((error) =>
//       console.error("There was a problem with the fetch operation:", error)
//     );
// });

// Define a quantidade de cartas que tu quer que apareça no jogo
// o máximo é a quantidade de itens que tiver lá
// na /assets/json/cards.json
const reset_button = document.getElementById("reset_button");
const create_button = document.getElementById("create_button");
let gameOn = false;
let pairCount = 0;
let lockBoard = false;
let flippedCards = [];

function loadCards(data) {
  if (data.length < pairCount) {
    console.error(`Not enough cards to play the game (max ${data.length})`);
    return;
  }

  data.sort(() => Math.random() - 0.5);

  data = data.filter((card, index) => index < pairCount);

  data = data.concat(data);

  data.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("game_card");
    cardElement.classList.add("hidden");
    cardElement.style.backgroundImage = `url(${card.img})`;
    cardElement.setAttribute("data-name", card.name);
    cardElement.addEventListener("click", () => flipCard(cardElement));

    document.querySelector(".game_board").appendChild(cardElement);
    gameOn = true;
  });
}

function flipCard(card) {
  if (
    lockBoard ||
    card.classList.contains("cards-matched") ||
    flippedCards.includes(card)
  )
    return;

  card.classList.remove("hidden");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkCard();
  }
}

function checkCard() {
  const [cardOne, cardTwo] = flippedCards;
  if (cardOne.getAttribute("data-name") === cardTwo.getAttribute("data-name")) {
    cardOne.classList.add("cards-matched");
    cardTwo.classList.add("cards-matched");
    resetBoard();
  } else {
    lockBoard = true;
    setTimeout(() => {
      cardOne.classList.add("hidden");
      cardTwo.classList.add("hidden");
      resetBoard();
    }, 500);
  }
}

function resetBoard() {
  [flippedCards, lockBoard] = [[], false];
}

create_button.addEventListener("click", () => {
  console.log("button clicked");
  if (gameOn) return;

  const number = document.getElementById("number").value;

  pairCount = number;

  loadCards(cardsList);
});

reset_button.addEventListener("click", () => {
  if (gameOn === false) return;
  resetGame();
});

function resetGame() {
  const gameBoard = document.querySelector(".game_board");
  gameBoard.innerHTML = "";
  gameOn = false;
}
