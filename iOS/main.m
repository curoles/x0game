//#include <objc/objc.h>
//#import <objc/Object.h>
#import "GameBoard.h"


void printField(GameBoard* board, unsigned int x, unsigned int y) {
    MarkType mark = [board getMark:x Y:y];
    switch (mark) {
    case MARK_X: printf("X|"); break;
    case MARK_O: printf("O|"); break;
    default: printf(" |");
    }
    if (x == GAME_BOARD_SIZE-1) printf("\n");
}

void printBoard(GameBoard* board)
{
    [board forEachField:printField];
}

int main(void)
{
    GameBoard* board = [[GameBoard alloc] init];
    int i = [board size];
    printf("size =%d [0][0]=%d\n", i, [board getMark:0 Y:0]);
    printBoard(board); 
    return 0;
}
