
// @ts-ignore
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

export const socket = io("http://localhost:3000");
import { renderHeader } from "./header";
import { renderGuest } from "./createGuestInput";

renderHeader();
renderGuest();


