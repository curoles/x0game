x0game.board = (function() {
    var settings,
        jewels,
        cols,
        rows;

    function initialize(callback) {
        //console.log("board.initialize");
        settings = x0game.settings;
        cols = settings.cols;
        rows = settings.rows;
        fillBoard();
        if (callback) {
            callback();
        }
    }

    function fillBoard() {
        var x, y,
            type;
        jewels = [];

        for (x = 0; x < cols; x++) {
            jewels[x] = [];
            for (y = 0; y < rows; y++) {
                type = -1 ; // no mark, field is available
                jewels[x][y] = type;
            }
        }

    }

/*
    function randomJewel() {
        return Math.floor(Math.random() * 2);
    }
*/
    function getJewel(x, y) {
        if (x < 0 || x > cols-1 || y < 0 || y > rows-1) {
            return -2;
        } else {
            return jewels[x][y];
        }
    }

    // if possible, set X at x:y and
    // calls the callback function with list of board events
    function setX(x, y, callback) {
        var current;
        var events;

        //console.log("board.setX "+x+":"+y+", cb="+callback);

        current = getJewel(x , y);

        if (current === -2) {
            // illegal position
        }
        else if (current == -1) {
            jewels[x][y] = 0; // set X

            game_status = checkGameOver();

            if (game_status != 0/*PLAYING*/) {
                stopGame(game_status, callback);
            }
            else
            {
                makeNextMove(x, y); // set O
                game_status = checkGameOver();
                if (game_status != 0/*PLAYING*/) {
                    stopGame(game_status, callback);
                }
                else {
                    callback([]);
                }
            }
        }
    }

    function checkGameOver() {
        result = 0; // PLAYING
        free = 0;
        X_x_strike = [0,0,0]; O_x_strike = [0,0,0];
        X_y_strike = 0; O_y_strike = 0;
        X_diag_strike = 0; O_diag_strike = 0;
        X_diag2_strike = 0; O_diag2_strike = 0;

        for (x = 0; x < cols; x++) {
            X_y_strike = 0; O_y_strike = 0;
            for (y = 0; y < rows; y++) {
                type = jewels[x][y];
                if (type === -1) {
                    free++;
                }
                else if (type == 0) {
                    X_y_strike++;
                    X_x_strike[y]++;
                    if (x == y) {X_diag_strike++;}
                    if (x == (2-y)) {X_diag2_strike++;}
                }
                else if (type == 1) {
                    O_y_strike++;
                    O_x_strike[y]++;
                    if (x == y) {O_diag_strike++;}
                    if (x == (2-y)) {O_diag2_strike++;}
                }
            }

            if (X_y_strike === 3 || X_diag_strike === 3 || X_diag2_strike === 3
            || X_x_strike[0] === 3 || X_x_strike[1] === 3 || X_x_strike[2] === 3) {
                result = 2; //USER_WON
                break;
            }
            else if (O_y_strike === 3 || O_diag_strike === 3 || O_diag2_strike === 3
            || O_x_strike[0] === 3|| O_x_strike[1] === 3|| O_x_strike[2] === 3) {
                result = 3; //MACHINE_WON
                break;
            }

        }


        if (result != 2 && result != 3 && free === 0) {
            result = 1; //NO_MOVES
        }

        return result;
    }

    function stopGame(game_status, callback) {
        events = [];

        events.push({
            type : "refill",
            data : getBoard()
        });

        events.push({
            type : "endgame",
            data : game_status
        });

        fillBoard();
        events.push({
            type : "refill",
            data : getBoard()
        });

        callback(events);
    }

    function makeNextMove(xX, yX) {
        var pos = {valid: false};
        var moveNum = getNumMarks(0);

        if (moveNum == 1) {
            pos = makeFirstMove();
        }
        else {
            nextMoveWins = evaluate(1/*O*/);
            if (nextMoveWins.danger) {
                pos = {valid: true, x: nextMoveWins.x, y: nextMoveWins.y};
            }
            else {
                evaluation = evaluate(0/*X*/);
                if (evaluation.danger === true) {
                    pos = preventStrike(evaluation);
                }
                else {
                    pos = makeDumbMove();
                }
            }
        }

        if (pos.valid) {
            jewels[pos.x][pos.y] = 1; // set O mark
        }
    }

    function makeDumbMove() {
        V = false;
        X = -1; //Math.floor(Math.random()*3);
        Y = -1; //Math.floor(Math.random()*3);

        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                type = jewels[x][y];
                if (type == -1) {
                    V = true; X = x; Y = y;
                    break;
                }
            }
            if (V) break;
        }

        return {valid: V, x: X, y: Y};
    }

    // Get number of marks (moves) on the board
    function getNumMarks(type) {
        var n = 0;

        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                if (jewels[x][y] == type) {
                    n++;
                }
            }
        }

        return n;
    }

    function makeFirstMove() {
        V = false;
        X = -1;
        Y = -1;

        if (jewels[1][1] == -1) { // centre is available
            V = true; X = 1; Y = 1;
        }
        else { // set mark in any available corner
            for (x = 0; x < cols; x+=2) {
                for (y = 0; y < rows; y+=2) {
                    type = jewels[x][y];
                    if (type == -1) {
                        V = true; X = x; Y = y;
                        break;
                    }
                }
                if (V) break;
            }
        }

        return {valid: V, x: X, y: Y};
    }


    function evaluate(type) {
        var danger = false, X = -1, Y = -1;

        for (x = 0; x < cols; x++) {
            for (y = 0; y < rows; y++) {
                it = jewels[x][y];
                if (it != type) continue;
                right = jewels[(x+1)%cols][y];
                down = jewels[x][(y+1)%rows];

                if (it == down && jewels[x][(y+2)%rows] === -1) {
                    danger = true; X = x; Y = (y + 2)%rows;
                    break;
                }
                else if (it == right && jewels[(x+2)%cols][y] === -1) {
                    danger = true; X = (x + 2)%cols; Y = y;
                    break;
                }
                else {

                    if (x == y) {
                        next = jewels[(x+1)%cols][(y+1)%rows];
                        other = jewels[(x+2)%cols][(y+2)%rows];

                        if (it == next && other === -1) {
                            danger = true; X = (x + 2)%cols; Y = (y + 2)%rows;
                            break;
                        }
                    }

                    if (x == 2-y) {
                        next = jewels[(x-1+cols)%cols][(y+1)%rows];
                        other = jewels[(x-2+cols)%cols][(y+2)%rows];

                        if (it == next && other === -1) {
                            danger = true; X = (x - 2 + cols)%cols; Y = (y + 2)%rows;
                            break;
                        }
                    }
                }
            }
            if (danger) break;
        }

        return {danger: danger, x: X, y: Y};
    }

    function preventStrike(evaluation) {
        return {valid: true, x: evaluation.x, y: evaluation.y};
    }

/*
    // returns the number jewels in the longest chain
    // that includes (x,y)
    function checkChain(x, y) {
        var type = getJewel(x, y),
            left = 0, right = 0,
            down = 0, up = 0;
        // look right
        while (type === getJewel(x + right + 1, y)) {
            right++;
        }
        // look left
        while (type === getJewel(x - left - 1, y)) {
            left++;
        }
        // look up
        while (type === getJewel(x, y + up + 1)) {
            up++;
        }
        // look down
        while (type === getJewel(x, y - down - 1)) {
            down++;
        }
        return Math.max(left + 1 + right, up + 1 + down);
    }
*/
/*
    // returns true if (x1,y1) can be swapped with (x2,y2)
    // to form a new match
    function canSwap(x1, y1, x2, y2) {
        var type1 = getJewel(x1,y1),
            type2 = getJewel(x2,y2),
            chain;

        if (!isAdjacent(x1, y1, x2, y2)) {
            return false;
        }

        // temporarily swap jewels
        jewels[x1][y1] = type2;
        jewels[x2][y2] = type1;

        chain = (checkChain(x2, y2) > 2 || 
                 checkChain(x1, y1) > 2);

        // swap back
        jewels[x1][y1] = type1;
        jewels[x2][y2] = type2;

        return chain;
    }
*/

/*
    // returns true if (x1,y1) is adjacent to (x2,y2)
    function isAdjacent(x1, y1, x2, y2) {
        var dx = Math.abs(x1 - x2),
            dy = Math.abs(y1 - y2);
        return (dx + dy === 1);
    }
*/

/*
    // returns a two-dimensional map of chain-lengths
    function getChains() {
        var x, y,
            chains = [];

        for (x = 0; x < cols; x++) {
            chains[x] = [];
            for (y = 0; y < rows; y++) {
                chains[x][y] = checkChain(x, y);
            }
        }
        return chains;
    }
*/
/*
    function check(events) {
        var chains = getChains(), 
            hadChains = false, score = 0,
            removed = [], moved = [], gaps = [],
            x, y;

        for (x = 0; x < cols; x++) {
            gaps[x] = 0;
            for (y = rows-1; y >= 0; y--) {
                if (chains[x][y] > 2) {
                    hadChains = true;
                    gaps[x]++;
                    removed.push({
                        x : x, y : y,
                        type : getJewel(x, y)
                    });

                } else if (gaps[x] > 0) {
                    moved.push({
                        toX : x, toY : y + gaps[x],
                        fromX : x, fromY : y,
                        type : getJewel(x, y)
                    });
                    jewels[x][y + gaps[x]] = getJewel(x, y);
                }
            }
        }

        for (x = 0; x < cols; x++) {
            // fill from top
            for (y = 0; y < gaps[x]; y++) {
                jewels[x][y] = randomJewel();
                moved.push({
                    toX : x, toY : y,
                    fromX : x, fromY : y - gaps[x],
                    type : jewels[x][y]
                });
            }
        }

        events = events || [];

        if (hadChains) {
            events.push({
                type : "remove",
                data : removed
            }, {
                type : "score",
                data : score
            }, {
                type : "move",
                data : moved
            });

            // refill if no more moves
            if (!hasMoves()) {
                fillBoard();
                events.push({
                    type : "refill",
                    data : getBoard()
                });
            }

            return check(events);
        } else {
            return events;
        }
    }
*/
/*
    // if possible, swaps (x1,y1) and (x2,y2) and
    // calls the callback function with list of board events
    function swap(x1, y1, x2, y2, callback) {
        var tmp,
            events;

        if (canSwap(x1, y1, x2, y2)) {

            // swap the jewels
            tmp = getJewel(x1, y1);
            jewels[x1][y1] = getJewel(x2, y2);
            jewels[x2][y2] = tmp;

            // check the board and get list of events
            events = check();

            callback(events);
        } else {
            callback(false);
        }
    }
*/
/*
    // returns true if at least one match can be made
    function hasMoves() {
        for (var x = 0; x < cols; x++) {
            for (var y = 0; y < rows; y++) {
                if (canJewelMove(x, y)) {
                    return true;
                }
            }
        }
        return false;
    }
*/
/*
    // returns true if (x,y) is a valid position and if 
    // the jewel at (x,y) can be swapped with a neighbor
    function canJewelMove(x, y) {
        return ((x > 0 && canSwap(x, y, x-1 , y)) ||
                (x < cols-1 && canSwap(x, y, x+1 , y)) ||
                (y > 0 && canSwap(x, y, x , y-1)) ||
                (y < rows-1 && canSwap(x, y, x , y+1)));
    }
*/

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
