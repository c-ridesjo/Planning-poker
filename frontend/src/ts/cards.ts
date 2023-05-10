import { Socket } from "./main";
const renderedCards: string[] = [];

export function initCards(socket: Socket) {
  socket.on("userDisconnected", (username: string) => {
    let cardWrapper = document.getElementById(`card_wrapper_${username}`);
    if (cardWrapper) {
      cardWrapper.remove();
    }
  });

  socket.on("guestEvent", (guestUser: string) => {
    console.log(`guest user ${guestUser} joined`);

    let oldCard = document.getElementById(`card_${guestUser}`);
    if (oldCard) {
      oldCard.remove();
    }

    renderCards(guestUser);

    if (!renderedCards.includes(guestUser)) {
      renderedCards.push(guestUser);
    }
  });

  socket.on("flipEvent", () => {
    flipCards(socket);
  });

  socket.on("updateCardState", (cardId: string, isFlipped: boolean) => {
    let card = document.getElementById(cardId);
    if (card) {
      if (isFlipped) {
        card.classList.add("is_flipped");
      } else {
        card.classList.remove("is_flipped");
      }
    }
  });

  socket.on(
    "initialUsers",
    (users: { [key: string]: { name: string; cardState?: boolean } }) => {
      Object.values(users).forEach((user) => {
        if (!renderedCards.includes(user.name)) {
          renderedCards.push(user.name);
          renderCards(user.name);
          let card = document.getElementById(`card_${user.name}`);
          if (card && user.cardState) {
            card.classList.add("is_flipped");
          }
        }
      });
    }
  );
}

export function renderCards(guestUser: string) {
  let oldCardWrapper = document.getElementById(`card_wrapper_${guestUser}`);
  if (oldCardWrapper) {
    oldCardWrapper.remove();
  }

  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card_wrapper");
  cardWrapper.id = `card_wrapper_${guestUser}`;

  let card = document.createElement("div");
  card.classList.add("card");
  card.id = `card_${guestUser}`;

  let cardFront = document.createElement("div");
  cardFront.classList.add("card_face");
  cardFront.classList.add("card_face_front");

  let cardBack = document.createElement("div");
  cardBack.classList.add("card_face");
  cardBack.classList.add("card_face_back");
  cardBack.id = "card_face_back";    

  cardWrapper.appendChild(card);
  card.appendChild(cardFront);
  card.appendChild(cardBack);

  let cardHolderName = document.createElement("div");
  cardHolderName.classList.add("card_holder_name");
  cardHolderName.innerHTML = "<span>" + guestUser + "</span>";

  cardWrapper.appendChild(cardHolderName);

  let cardContainer: HTMLElement | null =
    document.getElementById("middle-container");
  cardContainer?.append(cardWrapper);
}

export function flipCards(socket: Socket) {
  let cards = document.querySelectorAll(".card");
  [...cards].forEach((card) => {
    let isFlipped = card.classList.contains("is_flipped");
    socket.emit("updateCardState", card.id, !isFlipped);
  });
}

export function renderFlipButton(socket: Socket) {
  let cardContainer: HTMLElement | null =
    document.getElementById("middle-container");

  let flipButton = document.createElement("button");
  flipButton.classList.add("flipBtn");
  flipButton.id = "flipBtn";
  flipButton.innerText = "Vänd kort";

  cardContainer?.append(flipButton);

  flipButton.addEventListener("click", function () {
    socket.emit("flipEvent");
  });
}
