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
            if (vertStrike[markType][x] == ROWS) {
                strike->type = STRIKE_VERTICAL;
                strike->size = vertStrike[markType][x];
                e.status = (markType == MARK_X)? STATUS_USER_WON : STATUS_MACHINE_WON;
                for (unsigned int y = 0; y < ROWS; y++) {
                    strike->line[y].x = x; strike->line[y].y = y;
                }
                goto exitGate;
            }
            else if (vertStrike[markType][x] == ROWS-1) {
                for (unsigned int y = 0; y < ROWS; y++) {
                    if (MARK_NONE == [board getMark:x Y:y]) {
                        strike->line[0].x = x; strike->line[0].y = y;
                        strike->type = STRIKE_VERTICAL;
                        strike->size = vertStrike[markType][x];
                        break;
                    }
                }
            }
        }

        for (unsigned int y = 0; y < ROWS; y++) {
            if (horzStrike[markType][y] == COLS) {
                strike->type = STRIKE_HORIZONTAL;
                strike->size = horzStrike[markType][y];
                e.status = (markType == MARK_X)? STATUS_USER_WON : STATUS_MACHINE_WON;
                for (unsigned int x = 0; x < COLS; x++) {
                    strike->line[x].x = x; strike->line[x].y = y;
                }
                goto exitGate;
            }
            else if (horzStrike[markType][y] == COLS-1) {
                for (unsigned int x = 0; x < COLS; x++) {
                    if (MARK_NONE == [board getMark:x Y:y]) {
                        strike->line[0].x = x; strike->line[0].y = y;
                        strike->type = STRIKE_HORIZONTAL;
                        strike->size = horzStrike[markType][y];
                        break;
                    }
                }
            }
        }

        if (fdiagStrike[markType] == GAME_BOARD_SIZE) {
            strike->type = STRIKE_FRW_DIAG;
            strike->size = fdiagStrike[markType];
            e.status = (markType == MARK_X)? STATUS_USER_WON : STATUS_MACHINE_WON;
            for (unsigned int x = 0; x < COLS; x++) {
                strike->line[x].x = x; strike->line[x].y = 2-x;
            }
            goto exitGate;
        }
        else if (fdiagStrike[markType] == GAME_BOARD_SIZE-1)  {
            for (unsigned int x = 0; x < COLS; x++) {
                if (MARK_NONE == [board getMark:x Y:(2-x)]) {
                    strike->line[0].x = x; strike->line[0].y = 2-x;
                    strike->type = STRIKE_FRW_DIAG;
                    strike->size = fdiagStrike[markType];
                    break;
                }
            }
        }

        if (bdiagStrike[markType] == GAME_BOARD_SIZE) {
            strike->type = STRIKE_BACK_DIAG;
            strike->size = bdiagStrike[markType];
            e.status = (markType == MARK_X)? STATUS_USER_WON : STATUS_MACHINE_WON;
            for (unsigned int x = 0; x < COLS; x++) {
                strike->line[x].x = x; strike->line[x].y = x;
            }
            goto exitGate;
        }
        else if (bdiagStrike[markType] == GAME_BOARD_SIZE-1) {
            for (unsigned int x = 0; x < COLS; x++) {
                if (MARK_NONE == [board getMark:x Y:x]) {
                    strike->line[0].x = x; strike->line[0].y = x;
                    strike->type = STRIKE_BACK_DIAG;
                    strike->size = bdiagStrike[markType];
                    break;
                }
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

    GameEvaluation e = evalGame(board);

    return e;
}


-(GameMove)makeMove:(GameBoard*)board Eval:(const GameEvaluation*)eval{

    GameMove move = {{0, 0}, NO};

    unsigned int numberOfXmoves = [board numberOfXmoves];

    if (numberOfXmoves == 1) {
        move = makeFirstMove(board);
    }
    else {
        if (eval->strike[MARK_O].size == 2) { // machine can win on next move
            move.valid = YES;
            move.pos = eval->strike[MARK_O].line[0];
        }
        else {
            if (eval->strike[MARK_X].size == 2) { // user can win, let's prevent it
                move.valid = YES;
                move.pos = eval->strike[MARK_X].line[0];
            }
            else {
                move = makeDumbMove(board);
            }
        }
    }

    return move;
}
 
@end

