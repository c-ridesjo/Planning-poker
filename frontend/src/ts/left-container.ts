import { flipCards } from "./cards";

const tasksContainer: HTMLElement | null =
  document.getElementById("left-container");
import { socket } from "./main";

const messagesUsed = JSON.parse(
  localStorage.getItem("chat-messages-used") || "[]"
);

export function renderResult() {
  const taskWrapper = document.createElement("div");
  taskWrapper.classList.add("task-wrapper");
  taskWrapper.id = "task-wrapper";

  const chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container-left");

  const chatOutputBox = document.createElement("div");
  chatOutputBox.classList.add("chat-output-box1");

  const headerTask = document.createElement("div");
  headerTask.classList.add("headerTask");
  const headerText = document.createElement("h2");
  headerText.textContent = "Besvarade frågor";
  headerTask.appendChild(headerText);

  tasksContainer?.append(taskWrapper);
  taskWrapper.append(chatContainer);
  chatContainer.append(chatOutputBox);
  chatOutputBox.append(headerTask);

  socket.on("use-message", (msg: any) => {
    if (msg) {
      messagesUsed.push(msg); // add new message to array
      printData(msg.message, msg.id, msg.value, chatOutputBox);
      localStorage.setItem("chat-messages-used", JSON.stringify(messagesUsed)); // update local storage
    }
  });

  messagesUsed.forEach((msg: any) => {
    printData(msg.message, msg.id, msg.value, chatOutputBox);
  });

  socket.on("input-value", (msg: any) => {
    console.log("frontend: " + msg.value);

    if (msg.value) {
      // Update the value in the UI
      const valueElement = document
        .getElementById(msg.id)
        ?.querySelector(".task-value");
      if (valueElement) {
        valueElement.textContent = msg.value;
      }
    }
  });
}

export function printData(
  message: string,
  id: string,
  value: string,
  chatOutputBox: HTMLElement
) {
  // Create containerTop div if it doesn't exist
  let containerTop = chatOutputBox.querySelector(".containerTop");
  if (!containerTop) {
    containerTop = document.createElement("div");
    containerTop.classList.add("containerTop");
    chatOutputBox.appendChild(containerTop);
  }

  const container = document.createElement("div");
  container.id = id;
  container.classList.add("chat-message-container");

  const taskValue = document.createElement("p");
  taskValue.classList.add("chat-message");
  taskValue.textContent = "Fråga: " + message;

  const valueElement = document.createElement("p");
  valueElement.classList.add("task-value");
  valueElement.textContent = "Värde: " + value;

  const divContainer = document.createElement("div");
  divContainer.classList.add("chat-message-d");

  let valueInput = document.createElement("input");
  valueInput.classList.add("valueInput");
  valueInput.type = "text";
  valueInput.placeholder = "Värde";

  let saveButton = document.createElement("button");
  saveButton.classList.add("save-button");
  saveButton.innerText = "Spara";

  const userName = localStorage.getItem("userName");
  if (userName !== "admin") {
    valueInput.style.display = "none";
    saveButton.style.display = "none";
  }

  saveButton.addEventListener("click", () => {
    messagesUsed.forEach((msg: any) => {
      if (msg.id === id) {
        msg.value = valueInput.value;
        valueElement.textContent = valueInput.value; // update value element with new value
        socket.emit("input-value", msg);
        console.log(msg);
        flipCards(socket);
        socket.emit("resetEvent");

        let scoreContainer = document.getElementById("score");
        if (scoreContainer) {
          scoreContainer.innerHTML = "";
        }

        return;
      }
    });
    localStorage.setItem("chat-messages-used", JSON.stringify(messagesUsed));
    console.log(messagesUsed);

    // Hide input and button
    valueInput.style.display = "none";
    saveButton.style.display = "none";

    valueInput.value = "";
  });

  valueInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      // Enter key
      event.preventDefault();
      saveButton.click(); // simulate click event on save button
    }
  });
  containerTop.appendChild(container);
  container.appendChild(taskValue);
  divContainer.appendChild(valueElement);
  divContainer.appendChild(valueInput);
  divContainer.appendChild(saveButton);
  taskValue.appendChild(divContainer);

}

