import { socket } from "./main";
import { currentUser } from "./currentUser";

const cardContainer: HTMLElement | null =
  document.getElementById("middle-container");

export function renderPointButtons() {
  let pointButtonWrapper = document.createElement("div");
  pointButtonWrapper.classList.add("point-button-wrapper");
  pointButtonWrapper.id = "point-button-wrapper";

  let pointButtonOne = document.createElement("button");
  pointButtonOne.classList.add("point-button");
  pointButtonOne.id = "point-button";
  pointButtonOne.innerText = "1";
  pointButtonOne.addEventListener("click", () => {
    socket.emit("voteEvent", { username: currentUser.username, vote: "1" });
  });

  let pointButtonTwo = document.createElement("button");
  pointButtonTwo.classList.add("point-button");
  pointButtonTwo.id = "point-button";
  pointButtonTwo.innerText = "2";
  pointButtonTwo.addEventListener("click", () => {
    socket.emit("voteEvent", { username: currentUser.username, vote: "2" });
  });

  let pointButtonThree = document.createElement("button");
  pointButtonThree.classList.add("point-button");
  pointButtonThree.id = "point-button";
  pointButtonThree.innerText = "3";
  pointButtonThree.addEventListener("click", () => {
    socket.emit("voteEvent", { username: currentUser.username, vote: "3" });
  });

  let pointButtonFive = document.createElement("button");
  pointButtonFive.classList.add("point-button");
  pointButtonFive.id = "point-button";
  pointButtonFive.innerText = "5";
  pointButtonFive.addEventListener("click", () => {
    socket.emit("voteEvent", { username: currentUser.username, vote: "5" });
  });

  let pointButtonEight = document.createElement("button");
  pointButtonEight.classList.add("point-button");
  pointButtonEight.id = "point-button";
  pointButtonEight.innerText = "8";
  pointButtonEight.addEventListener("click", () => {
    socket.emit("voteEvent", { username: currentUser.username, vote: "8" });
  });

  cardContainer?.append(pointButtonWrapper);
  pointButtonWrapper.appendChild(pointButtonOne);
  pointButtonWrapper.appendChild(pointButtonTwo);
  pointButtonWrapper.appendChild(pointButtonThree);
  pointButtonWrapper.appendChild(pointButtonFive);
  pointButtonWrapper.appendChild(pointButtonEight);
}
