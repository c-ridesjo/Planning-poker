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


    // Retrieve chat messages from local storage and display them in the chat window
    let messages = JSON.parse(localStorage.getItem("chat-messages") || "[]");
    messages.forEach((msg: any) => {
        addMessageToChat(msg.message, msg.id, false);
    });


    function addMessageToChat(message: any, messageId: any, isNewMessage: boolean = true) {
        let chatMessageContainer = document.createElement("div");
        chatMessageContainer.classList.add("chat-message-container");
        chatMessageContainer.id = messageId;

        let chatMessage = document.createElement("div");
        chatMessage.classList.add("chat-message");
        chatMessage.innerText = message;

        let useButton = document.createElement("button");
        useButton.classList.add("use-button");
        useButton.innerText = "Använd";

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerText = "Radera";

        if (isNewMessage) {
            // Store the message in local storage
            let messages = JSON.parse(localStorage.getItem("chat-messages") || "[]");
            messages.push({ id: messageId, message: message });
            localStorage.setItem("chat-messages", JSON.stringify(messages));
        }

        deleteButton.addEventListener("click", () => {
            const messageId = chatMessageContainer.id;
            socket.emit("delete-message", messageId);
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

