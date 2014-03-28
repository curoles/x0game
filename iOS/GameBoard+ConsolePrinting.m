/**@file
 * @brief     Tic-Tac-Toe board printing to console/terminal
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import "GameBoard+ConsolePrinting.h"

static
void printField(GameBoard* board, unsigned int x, unsigned int y) {
    MarkType mark = [board getMark:x Y:y];
    switch (mark) {
    case MARK_X: printf("X|"); break;
    case MARK_O: printf("O|"); break;
    default: printf(" |");
    }
    if (x == GAME_BOARD_SIZE-1) printf("\n");
}

@implementation GameBoard (ConsolePrinting)
-(void)printBoard {
    [self forEachField:printField];
}
@end
