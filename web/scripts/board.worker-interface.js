x0game.board = (function() {
    var worker,
        rows, cols,
        jewels,
        messageCount,
        callbacks;

    // run Chrome with --allow-file-access-from-files
    function initialize(callback) {
        //console.log("x0game.board.initialize;"+callback);
        rows = x0game.settings.rows;
        cols = x0game.settings.cols;
        messageCount = 0;
        callbacks = [];
        worker = new Worker("scripts/board.worker.js");
        //console.log("worker created"+worker);
        x0game.dom.bind(worker, "message", messageHandler);
        post("initialize", x0game.settings, callback);
    }

    function post(command, data, callback) {
        callbacks[messageCount] = callback;
        worker.postMessage({
            id : messageCount,
            command : command,
            data : data
        });
        messageCount++;
    }

    function setX(x, y, callback) {
        post("setX", {
            x : x,
            y : y
        }, callback);
    }

    function messageHandler(event) {
        var message = event.data;

        // uncomment to log worker messages
        //console.log("message:"+message.id+";"+message.data);

        jewels = message.jewels;

        if (callbacks[message.id]) {
            callbacks[message.id](message.data);
            delete callbacks[message.id];
        }
    }


    function getJewel(x, y) {
        if (x < 0 || x > cols-1 || y < 0 || y > rows-1) {
            return -1;
        } else {
            return jewels[x][y];
        }
    }

    // create a copy of the jewel board
    function getBoard() {
        var copy = [],
            x;
        for (x = 0; x < cols; x++) {
            copy[x] = jewels[x].slice(0);
        }
        return copy;
    }

    function print() {
        var str = "";
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                str += getJewel(x, y) + " ";
            }
            str += "\r\n";
        }
        console.log(str);
    }

    return {
        initialize : initialize,
        setX : setX,
        getBoard : getBoard,
        print : print
    };

})();
