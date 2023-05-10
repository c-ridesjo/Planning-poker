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
        addMessageToChat(msg.message, msg.id, chatOutputBox);
    });

    chatMessageInput.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            chatSendButton.click();
        }
    });

    chatSendButton.addEventListener("click", () => {
        const message = chatMessageInput.value;
        if (message) {
            chatMessageInput.value = "";
            let messages = JSON.parse(localStorage.getItem("chat-messages") || "[]");
            const messageId = new Date().getTime().toString();
            messages.push({ id: messageId, message: message });
            localStorage.setItem("chat-messages", JSON.stringify(messages));
            socket.emit('task-event', { message: message, id: messageId });

        }
    });



    socket.on("delete-message", (messageId: any) => {
        const chatMessageContainer = document.getElementById(messageId);
        if (chatMessageContainer) {
            chatMessageContainer.remove();
        }
    });


    socket.on('task-event', (msg: any) => {
        console.log(msg.message, msg.id);
        if (msg) {
            addMessageToChat(msg.message, msg.id, chatOutputBox);
        }
    });

}

export function addMessageToChat(message: any, messageId: any, chatOutputBox: HTMLElement) {
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
        console.log("från tasks: " + message + " " + messageId)
        socket.emit('use-message', { message: message, id: messageId });

        // Retrieve the messages from localStorage
        let messages = JSON.parse(localStorage.getItem("chat-messages") || "[]");
        // Find the message in the array by its id
        const index = messages.findIndex((msg: any) => msg.id === messageId);
        if (index > -1) {
            const messageObj = messages[index];
            messages.splice(index, 1);
            // Store the updated messages array in localStorage
            localStorage.setItem(
                "chat-messages-used",
                JSON.stringify([messageObj].concat(JSON.parse(localStorage.getItem("chat-messages-used") || "[]")))
            );
            localStorage.setItem("chat-messages", JSON.stringify(messages));
        }
        // Remove the chat message container from the DOM
        chatMessageContainer.remove();
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerText = "Radera";

    deleteButton.addEventListener("click", () => {
        const messageId = chatMessageContainer.id;
        // Remove the message from local storage
        let messages = JSON.parse(localStorage.getItem("chat-messages") || "[]");
        messages = messages.filter((msg: any) => msg.id !== messageId);
        localStorage.setItem("chat-messages", JSON.stringify(messages));

        // Emit delete message event to the server
        socket.emit("delete-message", messageId);

        // Remove the chat message container from the DOM
        //chatMessageContainer.remove();
    });

    chatOutputBox.append(chatMessageContainer);
    chatMessageContainer.append(chatMessage);
    chatMessageContainer.append(useButton);
    chatMessageContainer.append(deleteButton);
}
