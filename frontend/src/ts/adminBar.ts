import { socket } from "./main";
import { Socket } from "./main";
import { flipCards, renderFlipButton } from "./cards";

const mainContainer: HTMLElement | null = document.getElementById("admin-bar");

export function renderAdminBar() {
  let bar = document.createElement("div");
  bar.id = "bar";
  bar.className = "bar";
  mainContainer?.appendChild(bar);

  let guestInputContainer = document.getElementById("guestInputContainer");
  if (guestInputContainer) {
    guestInputContainer.remove();
  }

  renderFlipButton(socket);
  renderResetButton(socket);
}

export function renderResetButton(socket: Socket) {
  const barContainer: HTMLElement | null = document.getElementById("bar");

  let resetButton = document.createElement("button");
  resetButton.classList.add("flipBtn");
  resetButton.id = "resetBtn";
  resetButton.innerText = "Reset";

  barContainer?.append(resetButton);

  resetButton.addEventListener("click", function () {
    flipCards(socket);
    socket.emit("resetEvent");
  });
}
