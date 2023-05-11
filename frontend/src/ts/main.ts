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
import { initCards, renderFlipButton } from "./cards";

const name = localStorage.getItem("userName");
if (name) {
  renderHeaderLoggedIn();
} else {
  renderHeader();
}

adminLogedIn();
renderHeading()
renderScoreContainer();
renderTasks();
//renderGuest();
renderResult();
renderPointButtons();
initCards(socket);

// const myScores = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

// renderTestCalc();

renderFlipButton(socket);

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
    console.log("Guest inloggad")
    renderGuest(socket);
   
  }
}