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
            // TODO FIXME TODO FIXME
            xO=Math.floor(Math.random()*3);
            yO=Math.floor(Math.random()*3);
            jewels[xO][yO] = 1; // set O
            callback([]);
        }
/*
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
*/
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
