const tasksContainer: HTMLElement | null = document.getElementById("left-container");
import { socket } from "./main";

export function renderResult() {
    let taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-wrapper");
    taskWrapper.id = "task-wrapper";

    let chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container-left");

    let chatOutputBox = document.createElement("div");
    chatOutputBox.classList.add("chat-output-box1");

    tasksContainer?.append(taskWrapper);
    taskWrapper.append(chatContainer);
    chatContainer.append(chatOutputBox);

    socket.on("use-message", (messageId: any) => {
        const chatMessageContainer = document.getElementById(messageId);
        if (chatMessageContainer) {
            chatOutputBox.appendChild(chatMessageContainer);
        }
    });
}
