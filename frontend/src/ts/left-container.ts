const tasksContainer: HTMLElement | null = document.getElementById("left-container");
import { socket } from "./main";



export function renderResult() {
    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-wrapper");
    taskWrapper.id = "task-wrapper";

    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container-left");

    const chatOutputBox = document.createElement("div");
    chatOutputBox.classList.add("chat-output-box1");

    tasksContainer?.append(taskWrapper);
    taskWrapper.append(chatContainer);
    chatContainer.append(chatOutputBox);

    const messagesUsed = JSON.parse(localStorage.getItem("chat-messages-used") || "[]");

    messagesUsed.forEach((msg: any) => {
        printData(msg.message, msg.id);
    });

    socket.on("use-message", (messageId: any) => {
        const chatMessageContainer = document.getElementById(messageId);
        if (chatMessageContainer) {
            chatOutputBox.appendChild(chatMessageContainer);
        }
    });
}

function printData(message: string, id: string) {
    const chatMessageContainer = document.createElement("div");
    chatMessageContainer.id = id;
    chatMessageContainer.classList.add("chat-message-container");

    const chatMessage = document.createElement("p");
    chatMessage.classList.add("chat-message");
    chatMessage.textContent = message;

    chatMessageContainer.appendChild(chatMessage);

    const chatOutputBox = document.querySelector(".chat-output-box1");
    if (chatOutputBox) {
        chatOutputBox.appendChild(chatMessageContainer);
    }
}
