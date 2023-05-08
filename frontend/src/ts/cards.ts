const cardContainer: HTMLElement | null = document.getElementById("middle-container");

export function renderCards() {
  let cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card_wrapper");
  cardWrapper.id = "card_wrapper";
  
  let card = document.createElement("div");
  card.classList.add("card");
  card.id = "card";

  let cardFront = document.createElement("div");
  cardFront.classList.add("card_face")
  cardFront.classList.add("card_face_front");
  cardFront.id = "card_face_front";

  let cardBack = document.createElement("div"); 
  cardBack.classList.add("card_face")
  cardBack.classList.add("card_face_back");
  cardBack.id = "card_face_back";
  console.log('test');

  cardContainer?.append(cardWrapper);
  cardWrapper.appendChild(card);
  card.appendChild(cardFront);
  card.appendChild(cardBack);
}

  export function flipCards() {
  const cards = document.querySelectorAll('.card');          
    [...cards].forEach((card)=>{
    card.addEventListener( 'click', function() {
        card.classList.toggle('is_flipped');
    });
  });
}   
