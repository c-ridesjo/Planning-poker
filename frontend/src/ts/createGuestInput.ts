const guestContainer: HTMLElement | null = document.getElementById("guest");

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
  
    guestContainer?.append(inputContainer);
    inputContainer.append(loginForm);
    loginForm.append(userNameInput);
    loginForm.append(loginButton);
  }