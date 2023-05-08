const tasksContainer: HTMLElement | null = document.getElementById("right-container");
import { socket } from "./main";

export function renderTasks() {
    let taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-wrapper");
    taskWrapper.id = "task-wrapper";

    let chatContainer = document.createElement("div");
    chatContainer.classList.add("chat-container");

    let chatOutputBox = document.createElement("div");
    chatOutputBox.classList.add("chat-output-box");

    let chatInputContainer = document.createElement("div");
    chatInputContainer.classList.add("input-container");

    let chatMessageInput = document.createElement("input");
    chatMessageInput.classList.add("chat-message-input");
    chatMessageInput.type = "text";
    chatMessageInput.placeholder = "Type your message here";

    let chatSendButton = document.createElement("button");
    chatSendButton.classList.add("chat-send-button");
    chatSendButton.type = "button";
    chatSendButton.innerText = "Send";

    tasksContainer?.append(taskWrapper);
    taskWrapper.append(chatContainer);
    chatContainer.append(chatOutputBox);
    chatContainer.append(chatInputContainer);
    chatInputContainer.append(chatMessageInput);
    chatInputContainer.append(chatSendButton);


    function addMessageToChat(message: any, messageId: any) {
        let chatMessageContainer = document.createElement("div");
        chatMessageContainer.classList.add("chat-message-container");
        chatMessageContainer.id = messageId;

        let chatMessage = document.createElement("div");
        chatMessage.classList.add("chat-message");
        chatMessage.innerText = message;

        let useButton = document.createElement("button");
        useButton.classList.add("use-button");
        useButton.innerText = "Använd";

        useButton.addEventListener("click", () => {
            const messageId = chatMessageContainer.id;
            socket.emit("use-message", messageId);
        });


        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerText = "Radera";

        deleteButton.addEventListener("click", () => {
            const messageId = chatMessageContainer.id;
            socket.emit("delete-message", messageId);
            chatMessageContainer.remove();
        });

        chatOutputBox.append(chatMessageContainer);
        chatMessageContainer.append(chatMessage);
        chatMessageContainer.append(useButton);
        chatMessageContainer.append(deleteButton);
    }



    chatMessageInput.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) { // 13 is the key code for the "Enter" key
            event.preventDefault(); // prevent the default behavior of the "Enter" key, which is to insert a new line
            chatSendButton.click(); // trigger a click event on the send button to send the message
        }
    });


    chatSendButton.addEventListener("click", () => {
        const message = chatMessageInput.value;
        console.log(chatMessageInput.value);
        if (message) {
            chatMessageInput.value = "";
            socket.emit('task-event', message)

        }

    });


    socket.on("use-message", (messageId: any) => {
        const chatMessageContainer = document.getElementById(messageId);
        if (chatMessageContainer) {

        }
    });

    socket.on("delete-message", (messageId: any) => {
        const chatMessageContainer = document.getElementById(messageId);
        if (chatMessageContainer) {
            chatMessageContainer.remove();
        }
    });


    socket.on('chat message', (message: any, messageId: any) => {
        addMessageToChat(message, messageId);
    });

}

