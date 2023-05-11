// @ts-ignore
import { io, Socket } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
export { io, Socket };
export const socket = io("http://localhost:3000");
import { renderTasks } from "./tasks";
import { renderGuest } from "./createGuestInput";
import { renderResult } from "./left-container";
import { renderPointButtons } from "./pointButtons";
import { renderScoreContainer } from "./pointCalc";
import { renderHeader, renderHeaderLoggedIn } from "./header";
import { renderHeading } from "./heading";
import { initCards } from "./cards";
import { renderAdminBar } from "./adminBar";

const name = localStorage.getItem("userName");
if (name) {
  renderHeaderLoggedIn();
  renderAdminBar();
} else {
  renderHeader();
}

adminLogedIn();
renderHeading();
renderScoreContainer();
renderTasks();
renderResult();
renderPointButtons();
initCards(socket);

socket.on("connect", () => {
  initCards(socket);
  console.log("frontend");
});

socket.on("scoreUpdate", (score: number) => {
  let scoreElement = document.getElementById("score")!;
  scoreElement.innerText = `Score: ${score}`;
});

function adminLogedIn() {
  if (name === "admin") {
    // if (name.value === '' || name.value.length < 2) {
  } else {
    console.log("Guest inloggad");
    renderGuest(socket);
  }
}
