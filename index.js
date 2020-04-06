/**
 * @fileoverview Server side script for the chat used in the Twijj project for SENG 513 at the University of Calgary.
 */
const http = require('http').createServer();
const io = require('socket.io')(http);

/**
 * Creates a message object for the user and text specified.
 *
 * @param {string} streamid The id of the stream where the message was created
 * @param {string} userid   The id of the user that created the message
 * @param {string} username The username of the user
 * @param {string} msg      The message text
 * @returns {{text: string, timestamp: Date, user_id: string, username: string}} A message object
 */
function createMessage(streamid, userid, username, msg) {
    const date = new Date();

    const message = {
        streamid: streamid,
        text: msg,
        timestamp: date,
        userid: userid,
        username: username
    };

    return message;
}

/**
 * Gets the number of connections that are in a particular room.
 *
 * @param {string} streamid The desired stream
 * @returns {number} The number of users connected to the stream
 */
function numberOfViewers(streamid) {
    const room = io.sockets.adapter.rooms[streamid];
    const count = (room && room.length) || 0;
    return count;
}

/**
 * Sockets connect to a room for a given stream.
 */
io.on("connection", function (socket) {
    let streamid = socket.handshake.query && socket.handshake.query.streamid;
    let userid, username;

    socket.join(streamid);
    io.to(streamid).emit('viewer count', numberOfViewers(streamid));
    console.log(`CONNECT: Viewer connected to stream ${streamid}`);

    socket.on('signed in', function(user_info) {
        userid = user_info.user_id;
        username = user_info.username;
    });

    socket.on('signed out', function() {
        userid = undefined;
        username = undefined;
    })

    socket.on('new message', function(msg) {
        if (msg === '' || !userid || !username) return;

        // let first_char = msg.charAt(0);

        // if (first_char === '/') {
        //     executeCommand(msg, user, socket);
        // }

        let message = createMessage(streamid, userid, username, msg);
        io.to(streamid).emit('new message', message);

        console.log(`MESSAGE: ${message.timestamp}: ${message.streamid}: ${message.username}: ${message.text}`);
    });

    socket.on('disconnect', function() {
        console.log(`DISCONNECT: Viewer disconnected from stream ${streamid}`);
        io.to(streamid).emit('viewer count', numberOfViewers(streamid));
    });
});

http.listen(8001, function() {
    console.log('listening on *:8001');
});
