/**@file
 * @brief     Tic-Tac-Toe game strategy
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import "GameStrategy.h"

static
GameMove makeDumbMove(GameBoard* board) {
    GameMove move = {0, 0, 0};
    for (unsigned int x = 0; x < COLS; x++) {
        for (unsigned int y = 0; y < ROWS; y++) {
            MarkType type = [board getMark:x Y:y];
            if (type == MARK_NONE) {
                move.valid = 1; move.x = x; move.y = y;
                break;
            }
        }
        if (move.valid) break;
    }

    return move;
}

// Tic-Tac-Toe game strategy
//
@implementation GameStrategy

-(GameStatus)checkGameIsOver:(GameBoard*)board {

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
}


-(GameMove)makeMove:(GameBoard*)board {

    GameMove move = {0, 0};

    move = makeDumbMove(board);

    return move;
}
 
@end

