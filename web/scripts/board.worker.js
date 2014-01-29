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
        case "setX" :
            board.setX(
                message.data.x,
                message.data.y,
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
