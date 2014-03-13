x0game.display = (function() {
    var canvas, ctx,
        cols, rows,
        cursor,
        jewelSize,
        jewels,
        firstRun = true;

    function createBackground() {
        var background = document.createElement("canvas"),
            bgctx = background.getContext("2d");

        x0game.dom.addClass(background, "background");
        background.width = cols * jewelSize;
        background.height = rows * jewelSize;

        for (var x=0;x<cols;x++) {
            for (var y=0;y<cols;y++) {
                if ((x+y) % 2) {
                    bgctx.fillStyle = "rgba(225,235,255,0.15)";
                }
                else {
                    bgctx.fillStyle = "rgba(30,30,30,0.25)";
                }

                bgctx.fillRect(
                    x * jewelSize, y * jewelSize,
                    jewelSize, jewelSize
                );
            }
        }
        return background;
    }

    function setup() {
        var $ = x0game.dom.$,
            boardElement = $("#game-screen .game-board")[0];

        cols = x0game.settings.cols;
        rows = x0game.settings.rows;

        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        x0game.dom.addClass(canvas, "board");
        
        var rect = boardElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        jewelSize = rect.width / cols;

        console.log("jewel size="+rect.width+"/"+cols+"="+jewelSize);
        
        boardElement.appendChild(createBackground());
        boardElement.appendChild(canvas);
    }

    function initialize(callback) {
        if (firstRun) {
            console.log("x0game.display.initialize");
            setup();
            firstRun = false;
        } //else {
            callback();
        //}
    }

    function drawJewel(type, bx, by) {
        console.log("draw jewel type "+type+", x:y="+bx+":"+by);

        x = bx * jewelSize;
        y = by * jewelSize;

        switch (type) {
            case 0: drawJewelX(x, y); break;
            case 1: drawJewelO(x, y); break;
        }
    }

    function drawJewelX(x, y) {
        margin = jewelSize / 10;
        ctx.beginPath();
        ctx.moveTo(x + margin, y + margin);
        //ctx.lineTo(x + jewelSize - margin, y + margin);
        ctx.quadraticCurveTo(x + jewelSize/2, y + jewelSize/2, x + jewelSize - margin, y + margin);
        //ctx.lineTo(x + jewelSize - margin, y + jewelSize - margin);
        ctx.quadraticCurveTo(x + jewelSize/2, y + jewelSize/2, x + jewelSize - margin, y + jewelSize - margin);
        //ctx.lineTo(x + margin, y + jewelSize - margin);
        ctx.quadraticCurveTo(x + jewelSize/2, y + jewelSize/2, x + margin, y + jewelSize - margin);
        //ctx.closePath();
        ctx.quadraticCurveTo(x + jewelSize/2, y + jewelSize/2, x + margin, y + margin);

        ctx.shadowColor = "rgb(20, 20, 20)";
        ctx.shadowOffsetX = margin/2;
        ctx.shadowOffsetY = margin/2;
        ctx.shadowBlur = margin/2;

        ctx.fillStyle = "rgba(30, 200, 30, 0.5)";
        ctx.fill();

        ctx.strokeStyle = "rgb(20, 255, 20)";
        ctx.lineWidth = 2.0;
        ctx.shadowColor = "transparent";
        ctx.stroke();
    }

    function drawJewelO(x, y) {
        margin = jewelSize / 10;

        ctx.beginPath();
        ctx.arc(x + jewelSize/2, y + jewelSize/2, jewelSize/3,
            0, 2 * Math.PI, true);

        ctx.shadowColor = "rgb(20, 20, 20)";
        ctx.shadowOffsetX = margin/2;
        ctx.shadowOffsetY = margin/2;
        ctx.shadowBlur = margin/2;

        ctx.fillStyle = "rgba(200, 20, 30, 0.5)";
        ctx.fill();

        ctx.strokeStyle = "rgb(255, 20, 20)";
        ctx.lineWidth = 2.0;
        ctx.shadowColor = "transparent";
        ctx.stroke();
    }

    function redraw(newJewels, callback) {
        //console.log("x0game.display.redraw");

        var x, y;
        jewels = newJewels;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                drawJewel(jewels[x][y], x, y);
            }
        }
        callback();
        renderCursor();
    }

    function renderCursor() {
        if (!cursor) {
            return;
        }
        var x = cursor.x,
            y = cursor.y;

        clearCursor();

        if (cursor.selected) {
            ctx.save();
            ctx.globalCompositeOperation = "lighter";
            ctx.globalAlpha = 0.8;
            drawJewel(jewels[x][y], x, y);
            ctx.restore();
        }
        ctx.save();
        ctx.lineWidth = 0.05 * jewelSize;
        ctx.strokeStyle = "rgba(250,250,150,0.8)";
        ctx.strokeRect(
            (x + 0.05) * jewelSize, (y + 0.05) * jewelSize,
            0.9 * jewelSize, 0.9 * jewelSize
        );
        ctx.restore();
    }

    function moveJewels(movedJewels, callback) {
        var n = movedJewels.length,
            mover, i;
        for (i=0;i<n;i++) {
            mover = movedJewels[i];
            clearJewel(mover.fromX, mover.fromY);
        }
        for (i=0;i<n;i++) {
            mover = movedJewels[i];
            drawJewel(mover.type, mover.toX, mover.toY);
        }
        callback();
    }

    function removeJewels(removedJewels, callback) {
        var n = removedJewels.length;
        for (var i=0;i<n;i++) {
            clearJewel(removedJewels[i].x, removedJewels[i].y);
        }
        callback();
    }

    function clearCursor() {
        if (cursor) {
            var x = cursor.x,
                y = cursor.y;
            clearJewel(x, y);
            drawJewel(jewels[x][y], x, y);
        }
    }

    function setCursor(x, y, selected) {
        clearCursor();
        if (arguments.length > 0) {
            cursor = {
                x : x,
                y : y,
                selected : selected
            };
        } else {
            cursor = null;
        }
        renderCursor();
    }

    function clearJewel(x, y) {
        ctx.clearRect(
            x * jewelSize, y * jewelSize, jewelSize, jewelSize
        );
    }

    function endGame(result, callback) {
        //console.log("x0game.display.endGame");
        resultStr = "Draw";
        switch (result)
        {
        case x0game.gameStatus.NO_MOVES: resultStr = "Draw"; break;
        case x0game.gameStatus.USER_WON: resultStr = "You won!"; break;
        case x0game.gameStatus.MACHINE_WON: resultStr = "You lost :)"; break;
        default:
            alert("Illegal game status!");
        }
        alert("Game is over! " + resultStr);

        callback();
    }

    return {
        initialize : initialize,
        redraw : redraw,
        setCursor : setCursor,
        moveJewels : moveJewels,
        removeJewels : removeJewels,
        refill : redraw,
        endGame : endGame
    };
})();
