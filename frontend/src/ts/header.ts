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

  headerContainer?.append(headerWrapper);
  headerWrapper.append(inputContainer);
  inputContainer.append(loginForm);
  loginForm.append(userNameInput);
  loginForm.append(passwordInput);
  loginForm.append(loginButton);
}
