const tasksContainer: HTMLElement | null = document.getElementById("left-container");
import { socket } from "./main";

const messagesUsed = JSON.parse(localStorage.getItem("chat-messages-used") || "[]");

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

    messagesUsed.forEach((msg: any) => {
        printData(msg.message, msg.id, msg.value);
    });

    socket.on("use-message", (messageId: any) => {
        const chatMessageContainer = document.getElementById(messageId);
        if (chatMessageContainer) {
            chatOutputBox.appendChild(chatMessageContainer);
        }
    });
}

function printData(message: string, id: string, value: string) {
    const container = document.createElement("div");
    container.id = id;
    container.classList.add("chat-message-container");

    const taskValue = document.createElement("p");
    taskValue.classList.add("chat-message");
    taskValue.textContent = message;

    const valueElement = document.createElement("p");
    valueElement.classList.add("task-value");
    valueElement.textContent = value;

    const divContainer = document.createElement("div");
    divContainer.classList.add("chat-message-d");

    let valueInput = document.createElement("input");
    valueInput.classList.add("valueInput");
    valueInput.type = "text";
    valueInput.placeholder = "Värde";

    let saveButton = document.createElement("button");
    saveButton.classList.add("save-button");
    saveButton.innerText = "Spara";

    saveButton.addEventListener("click", () => {
        messagesUsed.forEach((msg: any) => {
            if (msg.id === id) {
                msg.value = valueInput.value;
                valueElement.textContent = valueInput.value; // update value element with new value
                return;
            }
        });
        localStorage.setItem("chat-messages-used", JSON.stringify(messagesUsed));
        console.log(messagesUsed);
        valueInput.value = "";
    });

    valueInput.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) { // Enter key
            event.preventDefault();
            saveButton.click(); // simulate click event on save button
        }
    });

    container.appendChild(taskValue);
    divContainer.append(valueElement);
    taskValue.append(divContainer);
    divContainer.append(valueInput)
    divContainer.append(saveButton);

    const chatOutputBox = document.querySelector(".chat-output-box1");
    if (chatOutputBox) {
        chatOutputBox.appendChild(container);
    }
}

