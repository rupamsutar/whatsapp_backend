let onlineUsers = [];

export default function(socket, io) {
    // user joins or opens the application
    socket.on("join", (user) => {
        socket.join(user);
        // add joined users to online users
        if (!onlineUsers.some((u) => u.userId === user)) {
            console.log(`user ${user} is now online !`);
            onlineUsers.push({
                userId: user,
                socketId: socket.id
            });
            console.log(onlineUsers);
        }

        // send online users to frontend;
        io.emit('get-online-users', onlineUsers);
    });

    // socket disconnect
    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        console.log("users has just disconnected");
        io.emit('get-online-users', onlineUsers);
    });

    socket.on("join conversation", (conversation) => {
        socket.join(conversation);
        console.log('user has joined a conversation :', conversation);
    });

    // send and receive message
    socket.on('send message', (message) => {
        let conversation = message.conversation;
        if(!conversation.users) return;
        
        conversation.users.forEach((user) => {
            if(user._id === message.sender._id) return;
            console.log("Message on backend", user._id);
            socket.in(user._id).emit("receive message", message);
        });
    });
}