var x0game = {};

importScripts("board.js");

addEventListener("message", function(event) {
    var board = x0game.board,
        message = event.data;

    switch (message.command) {
        case "initialize" :
            x0game.settings = message.data;
            board.initialize(callback);
            break;
        case "swap" :
            board.swap(
                message.data.x1,
                message.data.y1,
                message.data.x2,
                message.data.y2,
                callback
            );
            break;
    }

    function callback(data) {
        postMessage({
            id : message.id,
            data : data,
            jewels : board.getBoard()
        });
    }

}, false);
