const tasksContainer: HTMLElement | null = document.getElementById("middle-container");
import { socket } from "./main";

export function renderHeading() {
    const headerContainer = document.createElement("div");
    headerContainer.classList.add("headerContainer");

    const headingElement = document.createElement("h1");
    headingElement.classList.add("heading");

    const savedHeading = localStorage.getItem("chat-heading");
    if (savedHeading) {
        headingElement.textContent = savedHeading;
    }

    headerContainer.appendChild(headingElement);
    tasksContainer?.appendChild(headerContainer);

    socket.on("use-message", (msg: any) => {
        if (msg) {
            headingElement.textContent = msg.message;
            localStorage.setItem("chat-heading", msg.message);
        }
    });
}