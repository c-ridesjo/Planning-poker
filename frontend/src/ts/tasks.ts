const tasksContainer: HTMLElement | null =
  document.getElementById("right-container");
import { socket } from "./main";

export function renderTasks() {
  let taskWrapper = document.createElement("div");
  taskWrapper.classList.add("task-wrapper");
  taskWrapper.id = "task-wrapper";

  let header = document.createElement("div");
  header.classList.add("headerTask");
  header.innerText = "kommande frågor";

  let chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container");

  let chatHeader = document.createElement("h2");
  chatHeader.innerText = "Kommande frågor";

  let chatOutputBox = document.createElement("div");
  chatOutputBox.classList.add("chat-output-box");

  let chatInputContainer = document.createElement("div");
  chatInputContainer.classList.add("input-container");
  chatInputContainer.id = "input-container";

  let chatMessageInput = document.createElement("input");
  chatMessageInput.classList.add("chat-message-input");
  chatMessageInput.id = "chat-message-input";
  chatMessageInput.type = "text";
  chatMessageInput.placeholder = "Type your message here";

  let chatSendButton = document.createElement("button");
  chatSendButton.classList.add("chat-send-button");
  chatSendButton.id = "chat-send-button";
  chatSendButton.type = "button";
  chatSendButton.innerText = "Send";

  const userName = localStorage.getItem("userName");

  if (userName !== "admin") {
    chatMessageInput.disabled = true;
    chatSendButton.disabled = true;
  }

  chatInputContainer.append(chatMessageInput);
  chatInputContainer.append(chatSendButton);

  tasksContainer?.append(taskWrapper);
  taskWrapper.append(chatContainer);
  chatContainer.append(chatHeader);
  chatContainer.append(chatOutputBox);
  chatContainer.append(chatInputContainer);

  // Retrieve chat messages from local storage and display them in the chat window
  let messages = JSON.parse(localStorage.getItem("chat-messages") || "[]");

  messages.forEach((msg: any) => {
    addMessageToChat(msg.message, msg.id, chatOutputBox);
  });

  chatMessageInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      chatSendButton.click();
      checkAdminUser();
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
      socket.emit("task-event", { message: message, id: messageId });
    }
  });
  socket.on("use-message", (msg: any) => {
    const chatMessageContainer = document.getElementById(msg.id);
    if (chatMessageContainer) {
      chatMessageContainer.remove();
    }
  });

  socket.on("delete-message", (messageId: any) => {
    const chatMessageContainer = document.getElementById(messageId);
    if (chatMessageContainer) {
      chatMessageContainer.remove();
    }
  });

  socket.on("task-event", (msg: any) => {
    console.log(msg.message, msg.id);
    if (msg) {
      addMessageToChat(msg.message, msg.id, chatOutputBox);
    }
  });
}

export function addMessageToChat(
  message: any,
  messageId: any,
  chatOutputBox: HTMLElement
) {
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
    console.log("från tasks: " + message + " " + messageId);
    const value = " ";

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
        JSON.stringify(
          [messageObj].concat(
            JSON.parse(localStorage.getItem("chat-messages-used") || "[]")
          )
        )
      );
      localStorage.setItem("chat-messages", JSON.stringify(messages));
    }

    // Get the updated messages from localStorage
    const updatedMessages = JSON.parse(
      localStorage.getItem("chat-messages") || "[]"
    );

    socket.emit("use-message", {
      message: message,
      id: messageId,
      value: value,
      messages: updatedMessages,
    });
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

  const userName = localStorage.getItem("userName");

  if (userName !== "admin") {
    useButton.disabled = true;
    deleteButton.disabled = true;
  }

  chatOutputBox.append(chatMessageContainer);
  chatMessageContainer.append(chatMessage);
  chatMessageContainer.append(useButton);
  chatMessageContainer.append(deleteButton);
}

export function checkAdminUser() {
  const userName = localStorage.getItem("userName");
  const useButton = document.querySelector(".use-button") as HTMLButtonElement;
  const deleteButton = document.querySelector(
    ".delete-button"
  ) as HTMLButtonElement;

  if (userName === "admin") {
    useButton.disabled = false;
    deleteButton.disabled = false;
  }
}
