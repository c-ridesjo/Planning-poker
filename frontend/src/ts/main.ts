import { renderHeader, renderHeaderLoggedIn } from "./header";

const name = localStorage.getItem("userName");
if (name) {
  renderHeaderLoggedIn();
} else {
  renderHeader();
}
