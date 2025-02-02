const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (for simplicity)
  },
});

const users = {}; // Store users' socket IDs by their user IDs
// Handle new connections
io.on("connection", (socket) => {
  console.log(
    "New client connected: ",
    socket.id,
    new Date().toLocaleTimeString()
  );

  socket.on("register", (user) => {
    const { id } = user;

    if (users[id]) {
      console.log("\nUser already register...");
      return;
    }

    users[id] = { ...user, conversations: [] };

    console.log(
      `\nUser ${user.name} registered with socket ID ${
        user.id
      }, \n\n${JSON.stringify(users[user.id])}`
    );
  });

  // Handle sending a message from one user to another
  socket.on("send_message", ({ toUserId, message }) => {
    const targetSocketId = users[toUserId];

    // Emit the message to the target user
    if (targetSocketId) {
      io.to(targetSocketId).emit("receive_message", message);
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Remove the user from the `users` list when they disconnect
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
