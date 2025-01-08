const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const socketIO = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // Adding a new user
  socket.on("newUser", (data) => {
    const newUser = { username: data, socketID: socket.id };
    users.push(newUser);
    socketIO.emit("newUserResponse", users);
  });

  // Handling incoming messages
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });
  socket.on("typing", (data) => {
    // Broadcast typing event to all clients except the sender
    socket.broadcast.emit("typingResponse", data);
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id); // Remove user based on socketID
    socketIO.emit("newUserResponse", users); // Emit updated user list
  });
});

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
