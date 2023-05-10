var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tasksRouter = require("./routes/tasks");

var app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

const users = {};

io.on("connection", function (socket) {
  console.log("user connected");
  console.log(socket.id);

  let username;

  socket.on("login", (user) => {
    username = user.name;
  });

  socket.emit("initialUsers", users);

  socket.on("guestEvent", (message) => {
    console.log("User logged in");
    users[socket.id] = { name: message, cardState: false };
    io.emit("guestEvent", message);
  });

  socket.on("updateCardState", (cardId, isFlipped) => {
    console.log("updateCardState for card:", cardId);
    if (users[socket.id]) {
      users[socket.id].cardState = isFlipped;
    }
    io.emit("updateCardState", cardId, isFlipped);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    const disconnectedUser = users[socket.id];
    if (disconnectedUser) {
      io.emit("userDisconnected", disconnectedUser.name);
      delete users[socket.id];
    }
  });

  socket.on("task-event", (msg) => {
    console.log("received message:", msg.message, msg.id);
    io.emit("task-event", msg);
  });



  socket.on("use-message", (msg) => {
    console.log("backend: " + + msg.message);
    io.emit("use-message", msg);
  });

  socket.on("delete-message", (messageId) => {
    console.log("Deleted: ", messageId);
    io.emit("delete-message", messageId);
  });

  socket.on("flipEvent", () => {
    console.log("Received flip event");
    io.emit("flipEvent");
  });

  socket.on("voteEvent", (data) => {
    console.log("Received vote event", data.username, data.vote);
    io.sockets.emit("voteEvent", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    const disconnectedUser = users[socket.id];
    if (disconnectedUser) {
      io.emit("userDisconnected", disconnectedUser.name);
      delete users[socket.id];
    }
  });

  socket.on("scoreEvent", (score) => {
    socket.broadcast.emit("scoreUpdate", score);
  });
});

module.exports = { app: app, server: server };
