
// @ts-ignore
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
export { io };
export const socket = io("http://localhost:3000");
import { renderHeader } from "./header";
import { renderCards } from "./cards";
import { flipCards } from "./cards";
import { renderTasks } from "./tasks";
import { renderGuest } from "./createGuestInput";

socket.on("connect", () => {
    console.log("frontend");
});

renderCards();
flipCards();
renderHeader();
renderTasks();
renderGuest();
