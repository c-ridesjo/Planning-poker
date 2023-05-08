var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();
const connection = require("./conn");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tasksRouter = require("./routes/tasks");

var app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {

    cors: {

        origin: 'http://localhost:5173',

        methods: ['GET', 'POST']

    }

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




io.on("connection", function (socket) {


    console.log("user connected")
    console.log(socket.id)

    // socket.emit("socket connected", socket.id)


    socket.on("disconnect", function () {
        console.log("user disconected")

    })

    socket.on('task-event', (message) => {
        console.log('received message:', message);
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("use-message", (messageId) => {
        io.emit("use-message", messageId);
    });

    socket.on("delete-message", (messageId) => {
        io.emit("delete-message", messageId);
    });


})

module.exports = { app: app, server: server };
