const headerContainer: HTMLElement | null = document.getElementById("header");

export function renderHeader() {
  let headerWrapper = document.createElement("div");
  headerWrapper.classList.add("header-wrapper");
  headerWrapper.id = "header-wrapper";

  let inputContainer = document.createElement("div");
  inputContainer.classList.add("input-container");
  inputContainer.id = "input-container";

  let loginForm = document.createElement("form");
  loginForm.classList.add("login-form");
  loginForm.id = "login-form";

  let userNameInput = document.createElement("input");
  userNameInput.classList.add("user-name-input");
  userNameInput.id = "user-name-input";
  userNameInput.type = "text";
  userNameInput.placeholder = "Username";

  let passwordInput = document.createElement("input");
  passwordInput.classList.add("password-input");
  passwordInput.id = "password-input";
  passwordInput.type = "password";
  passwordInput.placeholder = "Password";

  let loginButton = document.createElement("button");
  loginButton.classList.add("login-button");
  loginButton.id = "login-button";
  loginButton.type = "submit";
  loginButton.innerText = "Login";

  loginButton.addEventListener("click", async function (event) {
    event.preventDefault();

    try {
      const username = userNameInput.value;
      const password = passwordInput.value;

      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, userPassword: password }),
      });

      if (response.status === 200) {
        localStorage.setItem("userName", username);
        renderHeaderLoggedIn();
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      console.error(err);
      alert(`Failed to log in`);
    }
  });

  headerContainer?.append(headerWrapper);
  headerWrapper.append(inputContainer);
  inputContainer.append(loginForm);
  loginForm.append(userNameInput);
  loginForm.append(passwordInput);
  loginForm.append(loginButton);
}

export function renderHeaderLoggedIn() {
  if (headerContainer) {
    headerContainer.innerHTML = "";
  }

  let headerWrapper = document.createElement("div");
  headerWrapper.classList.add("header-wrapper");
  headerWrapper.id = "header-wrapper";

  let loggedInContainer = document.createElement("div");
  loggedInContainer.classList.add("logged-in-container");
  loggedInContainer.id = "logged-in-container";

  let welcomeMessage = document.createElement("div");
  welcomeMessage.classList.add("welcome-message");
  welcomeMessage.id = "welcome-message";
  welcomeMessage.innerText = `Welcome, ${localStorage.getItem("userName")}`;

  let logoutButton = document.createElement("button");
  logoutButton.classList.add("logout-button");
  logoutButton.id = "logout-button";
  logoutButton.innerText = "Logout";

  logoutButton.addEventListener("click", async function (event) {
    event.preventDefault();
    localStorage.removeItem("userName");
    if (headerContainer) {
      headerContainer.innerHTML = "";
    }
    renderHeader();
  });

  headerContainer?.append(headerWrapper);
  headerWrapper.append(loggedInContainer);
  loggedInContainer.append(welcomeMessage);
  loggedInContainer.append(logoutButton);
}
