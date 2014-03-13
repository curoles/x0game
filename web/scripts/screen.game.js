x0game.screens["game-screen"] = (function() {
    var firstRun = true,
        paused,
        cursor;

    function startGame() {
        var board = x0game.board,
            display = x0game.display;

        board.initialize(function() {
            display.initialize(function() {
                console.log("display.initialize helper");
                cursor = {x:0, y:0, selected:false};
                display.redraw(board.getBoard(), function() {
                    // do nothing for now
                });
            });
        });
        paused = false;
        var overlay = x0game.dom.$("#game-screen .pause-overlay")[0];
        overlay.style.display = "none";
    }
    
    function setCursor(x, y, select) {
        cursor.x = x;
        cursor.y = y;
        cursor.selected = select;
        x0game.display.setCursor(x, y, select);
    }
    
    function selectJewel(x, y) {
        if (arguments.length === 0) {
            selectJewel(cursor.x, cursor.y);
            return;
        }

        x0game.board.setX(x, y, playBoardEvents);

        // move cursor
        if (cursor.selected) {
            var dx = Math.abs(x - cursor.x),
                dy = Math.abs(y - cursor.y),
                dist = dx + dy;

            if (dist) {
                setCursor(x, y, true);
            }

        } else {
            setCursor(x, y, true);
        }

    }

    function playBoardEvents(events) {
        var display = x0game.display;
        if (events.length > 0) {
            var boardEvent = events.shift(),
                next = function() {
                    playBoardEvents(events);
                };
            switch (boardEvent.type) {
                case "move" :
                    display.moveJewels(boardEvent.data, next);
                    break;
                case "remove" :
                    display.removeJewels(boardEvent.data, next);
                    break;
                case "refill" :
                    display.refill(boardEvent.data, next);
                    break;
                case "endgame" :
                    display.endGame(boardEvent.data, next);
                    break;
                default :
                    next();
                    break;
            }
        } else {
            display.redraw(x0game.board.getBoard(), function() {
                // good to go again
                console.log("playBoardEvents default");
            });
        }
    }

    function moveCursor(x, y) {
        var settings = x0game.settings;
        if (cursor.selected) {
            x += cursor.x;
            y += cursor.y;
            if (x >= 0 && x < settings.cols &&
                y >= 0 && y < settings.rows) {
                setCursor(x, y, true);
            }
        } else {
            x = (cursor.x + x + settings.cols) % settings.cols;
            y = (cursor.y + y + settings.rows) % settings.rows;
            setCursor(x, y, false);
        }
        console.log("Cursor position: " + x + ", " + y);
    }

    function moveUp() {
        moveCursor(0, -1);
    }

    function moveDown() {
        moveCursor(0, 1);
    }

    function moveLeft() {
        moveCursor(-1, 0);
    }

    function moveRight() {
        moveCursor(1, 0);
    }

    function pauseGame() {
        if (paused) {
            return; // do nothing if already paused
        }
        var dom = x0game.dom,
            overlay = dom.$("#game-screen .pause-overlay")[0];
        overlay.style.display = "block";
        paused = true;
    }

    function resumeGame() {
        var dom = x0game.dom,
            overlay = dom.$("#game-screen .pause-overlay")[0];
        overlay.style.display = "none";
        paused = false;
    }
    
    function exitGame() {
        pauseGame();
        var confirmed = window.confirm(
            "Do you want to return to the main menu?"
        );

        if (confirmed) {
            x0game.showScreen("main-menu");
        }
        else {
            resumeGame();
        }
    }

    function setup() {
        var dom = x0game.dom;
        dom.bind("footer button.exit", "click", exitGame);
        dom.bind("footer button.pause", "click", pauseGame);
        dom.bind(".pause-overlay", "click", resumeGame);

        var input = x0game.input;
        input.initialize();
        input.bind("selectJewel", selectJewel);
        input.bind("moveUp", moveUp);
        input.bind("moveDown", moveDown);
        input.bind("moveLeft", moveLeft);
        input.bind("moveRight", moveRight);
    }

    function run() {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        startGame();
    }

    return {
        run : run
    };
})();
