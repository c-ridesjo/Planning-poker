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
