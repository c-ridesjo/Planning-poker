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
    const container = document.createElement("div");
    container.id = id;
    container.classList.add("chat-message-container");

    const taskValue = document.createElement("p");
    taskValue.classList.add("chat-message");
    taskValue.textContent = message;

    const divContainer = document.createElement("div");
    taskValue.classList.add("chat-message-d");

    let valueInput = document.createElement("input");
    valueInput.classList.add("valueInput");
    valueInput.type = "text";
    valueInput.placeholder = "Värde";


    let saveButton = document.createElement("button");
    saveButton.classList.add("save-button");
    saveButton.innerText = "Spara";

    saveButton.addEventListener("click", () => {
        console.log(valueInput.value);
    });

    container.appendChild(taskValue);
    taskValue.append(divContainer);
    divContainer.append(valueInput)
    divContainer.append(saveButton);

    const chatOutputBox = document.querySelector(".chat-output-box1");
    if (chatOutputBox) {

        chatOutputBox.appendChild(container);
    }
}
