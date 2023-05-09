import { renderHeader, renderHeaderLoggedIn } from "./header";

const name = localStorage.getItem("userName");
if (name) {
  renderHeaderLoggedIn();
} else {
  renderHeader();
}

// @ts-ignore
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
export { io };
export const socket = io("http://localhost:3000");
import { renderCards } from "./cards";
import { flipCards } from "./cards";
import { renderTasks } from "./tasks";
import { renderGuest } from "./createGuestInput";
import { renderResult } from "./left-container";
import { renderPointButtons } from "./pointButtons";
//import { showNumber } from "./pointButtons";
import { renderScore } from "./pointCalc";

socket.on("connect", () => {
  console.log("frontend");
});

renderCards();
flipCards();
renderTasks();
renderGuest();
renderResult();
renderPointButtons();
//showNumber();

const myScores = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

renderScore(myScores);
