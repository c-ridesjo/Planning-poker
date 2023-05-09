import { socket } from "./main";

export function renderGuest() {
  let inputContainer = document.createElement("div");
  inputContainer.classList.add("guestInputContainer");
  inputContainer.id = "guestInputContainer";

  let loginForm = document.createElement("form");
  loginForm.classList.add("guestForm");
  loginForm.id = "guestForm";

  let userNameInput = document.createElement("input");
  userNameInput.classList.add("guestInput");
  userNameInput.id = "guestInput";
  userNameInput.type = "text";
  userNameInput.placeholder = "Smeknamn";

  let loginButton = document.createElement("button");
  loginButton.classList.add("nextBtn");
  loginButton.id = "nextBtn";
  loginButton.type = "submit";
  loginButton.innerText = "Fortsätt";

  const guestContainer: HTMLElement | null = document.getElementById("guest");
  guestContainer?.append(inputContainer);
  inputContainer.append(loginForm);
  loginForm.append(userNameInput);
  loginForm.append(loginButton);

  loginButton.addEventListener("click", async function (e) {
    e.preventDefault();

    let guestUser = userNameInput.value;

    if (guestUser) {
      userNameInput.value = "";
      socket.emit("guestEvent", guestUser);
    }
  });
}
