module.exports = function(socket) {
  // Broadcast a user's message to other users.
  socket.on("send:message", function (message) {
    socket.broadcast.emit("send:message", {
      text: message.text
    });
  });
};
