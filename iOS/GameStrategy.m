/**@file
 * @brief     Tic-Tac-Toe game strategy
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import "GameStrategy.h"

static
GameMove makeDumbMove(GameBoard* board) {
    GameMove move = {{0, 0}, NO};
    for (unsigned int x = 0; x < COLS; x++) {
        for (unsigned int y = 0; y < ROWS; y++) {
            MarkType type = [board getMark:x Y:y];
            if (type == MARK_NONE) {
                move.valid = YES;
                move.pos.x = x;
                move.pos.y = y;
                break;
            }
        }
        if (move.valid) break;
    }

    return move;
}

static
GameMove makeFirstMove(GameBoard* board) {
    GameMove move = {{0, 0}, NO};

    if ([board getMark:1 Y:1] == MARK_NONE) { // centre is available
        move.valid = YES;
        move.pos.x = move.pos.y = 1;
    }
    else { // set mark in any available corner
        for (unsigned int x = 0; x < COLS; x += 2) {
            for (unsigned int y = 0; y < ROWS; y += 2) {
                if ([board getMark:x Y:y] == MARK_NONE) {
                    move.valid = YES;
                    move.pos.x = x;
                    move.pos.y = y;
                    break;
                }
            }
            if (move.valid) break;
        }
    }

    return move;
}

static
GameEvaluation evalGame(GameBoard* board) {
    GameEvaluation e/*valuation*/ = {
        .status = STATUS_PLAYING,
        .strike = {{.type = STRIKE_NONE}, {.type = STRIKE_NONE}}
    };

    unsigned int freeFlds = 0;
    unsigned int horzStrike[2][ROWS] = {{0,0,0},{0,0,0}};
    unsigned int vertStrike[2][COLS] = {{0,0,0},{0,0,0}};

    unsigned int fdiagStrike[2] = {0, 0};
    unsigned int bdiagStrike[2] = {0, 0};

    for (unsigned int x = 0; x < COLS; x++) {
        vertStrike[0][x] = vertStrike[1][x] = 0;
        
        for (unsigned int y = 0; y < ROWS; y++) {
            MarkType type = [board getMark:x Y:y];
            if (type == MARK_NONE) {
                freeFlds++;
            }
            else {
                vertStrike[type][x]++;
                horzStrike[type][y]++;
                if (x == y) {bdiagStrike[type]++;}
                if (x == (2-y)) {fdiagStrike[type]++;}
            }
        }
    }

    for (unsigned int markType = MARK_X; markType <= MARK_O; ++markType) {

        Strike* strike = &e.strike[markType];

        for (unsigned int x = 0; x < COLS; x++) {
            if (vertStrike[markType][x] > 1) {
                strike->type = STRIKE_VERTICAL;
                strike->size = vertStrike[markType][x];
                if (vertStrike[markType][x] > 2) {
                    e.status = (markType == MARK_X)? STATUS_USER_WON : STATUS_MACHINE_WON;
                    for (unsigned int y = 0; y < ROWS; y++) {
                        strike->line[y].x = x; strike->line[y].y = y;
                    }
                    goto exitGate;
                }
                else {
                    //e.strike.line[0].x = TODO;
                    //e.strike.line[0].y = TODO;
                }
            }
        }

        for (unsigned int y = 0; y < ROWS; y++) {
            if (horzStrike[markType][y] > 1) {
                strike->type = STRIKE_HORIZONTAL;
                strike->size = horzStrike[markType][y];
                if (horzStrike[markType][y] > 2) {
                    e.status = (markType == MARK_X)? STATUS_USER_WON : STATUS_MACHINE_WON;
                    for (unsigned int x = 0; x < COLS; x++) {
                        strike->line[x].x = x; strike->line[x].y = y;
                    }
                    goto exitGate;
                }
                else {
                    //e.strike.line[0].x = TODO;
                    //e.strike.line[0].y = TODO;
                }
            }
        }

        if (fdiagStrike[markType] > 1) {
            strike->type = STRIKE_FRW_DIAG;
            strike->size = fdiagStrike[markType];
            if (fdiagStrike[markType] > 2) {
                e.status = (markType == MARK_X)? STATUS_USER_WON : STATUS_MACHINE_WON;
                for (unsigned int x = 0; x < COLS; x++) {
                    strike->line[x].x = x; strike->line[x].y = 2-x;
                }
                goto exitGate;
            }
            else {
                //e.strike.line[0].x = TODO;
                //e.strike.line[0].y = TODO;
            }
        }

        if (bdiagStrike[markType] > 1) {
            strike->type = STRIKE_BACK_DIAG;
            strike->size = bdiagStrike[markType];
            if (bdiagStrike[markType] > 2) {
                e.status = (markType == MARK_X)? STATUS_USER_WON : STATUS_MACHINE_WON;
                for (unsigned int x = 0; x < COLS; x++) {
                    strike->line[x].x = x; strike->line[x].y = x;
                }
                goto exitGate;
            }
            else {
                //e.strike.line[0].x = TODO;
                //e.strike.line[0].y = TODO;
            }
        }

    }


    if (e.status != STATUS_USER_WON && e.status != STATUS_MACHINE_WON && freeFlds == 0) {
        e.status = STATUS_DRAW; //NO MOVES, ALL FIELDS ARE TAKEN
    }

exitGate:
    return e/*valuation*/;
}

// Tic-Tac-Toe game strategy
//
@implementation GameStrategy

-(GameEvaluation)evaluateGame:(GameBoard*)board {

#if 0
    GameStatus status = STATUS_PLAYING;
    int freeFlds = 0;
    int X_x_strike[COLS] = {0,0,0}; int O_x_strike[ROWS] = {0,0,0};
    int X_y_strike = 0; int O_y_strike = 0;
    int X_diag_strike = 0; int O_diag_strike = 0;
    int X_diag2_strike = 0; int O_diag2_strike = 0;

    for (int x = 0; x < COLS; x++) {
        X_y_strike = 0; O_y_strike = 0;
        for (int y = 0; y < ROWS; y++) {
            MarkType type = [board getMark:x Y:y];
            if (type == MARK_NONE) {
                freeFlds++;
            }
            else if (type == MARK_X) {
                X_y_strike++;
                X_x_strike[y]++;
                if (x == y) {X_diag_strike++;}
                if (x == (2-y)) {X_diag2_strike++;}
            }
            else if (type == MARK_O) {
                O_y_strike++;
                O_x_strike[y]++;
                if (x == y) {O_diag_strike++;}
                if (x == (2-y)) {O_diag2_strike++;}
            }
        }

        if (X_y_strike == 3 || X_diag_strike == 3 || X_diag2_strike == 3
        || X_x_strike[0] == 3 || X_x_strike[1] == 3 || X_x_strike[2] == 3) {
            status = STATUS_USER_WON;
            break;
        }
        else if (O_y_strike == 3 || O_diag_strike == 3 || O_diag2_strike == 3
        || O_x_strike[0] == 3 || O_x_strike[1] == 3 || O_x_strike[2] == 3) {
            status = STATUS_MACHINE_WON;
            break;
        }

    }

    if (status != STATUS_USER_WON && status != STATUS_MACHINE_WON && freeFlds == 0) {
        status = STATUS_DRAW; //NO MOVES, ALL FIELDS ARE TAKEN
    }

    return status;
#endif

    GameEvaluation e = evalGame(board);

    return e;
}


-(GameMove)makeMove:(GameBoard*)board {

    GameMove move = {{0, 0}, NO};

    unsigned int numberOfXmoves = [board numberOfXmoves];

    if (numberOfXmoves == 1) {
        move = makeFirstMove(board);
    }
    else {
        /*if (can win) {
            win
        }
        else {
            if (danger)
                prevent danger
            else
                makeDumbMove
        }*/
        move = makeDumbMove(board);
    }

    return move;
}
 
@end

