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

const maxCards = 12;

function loadCards(data) {
  if (data.length < maxCards) {
    console.error(`Not enough cards to play the game (max ${data.length})`);
    return;
  }
  data = data.filter((card, index) => index < maxCards);

  data = data.concat(data);

  data.sort(() => Math.random() - 0.5);

  data.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("game_card");
    cardElement.classList.add("hidden");
    cardElement.style.backgroundImage = `url(${card.img})`;
    cardElement.setAttribute("data-name", card.name);
    cardElement.addEventListener("click", () => flipCard(cardElement));

    document.querySelector(".game_board").appendChild(cardElement);
  });
}

function flipCard(card) {
  card.classList.remove("hidden");
}

loadCards(cardsList);
