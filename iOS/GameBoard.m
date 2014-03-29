/**@file
 * @brief     Tic-Tac-Toe board
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import "GameBoard.h"


@implementation GameBoard


-(id)init {
    self = [super init];
    if (self) {
        [self reset];
    }
    return self;
}

-(int)size {
    return GAME_BOARD_SIZE;
}

-(int)getMark:(unsigned int)x Y:(unsigned int)y {
    if (x >= GAME_BOARD_SIZE || y >= GAME_BOARD_SIZE)
        return -2;

    return field[x][y];
}

-(void)reset {
    numberOfMoves = 0;

    for (int y = 0; y < GAME_BOARD_SIZE; ++y) {
        for (int x = 0; x < GAME_BOARD_SIZE; ++x) {
            field[x][y] = MARK_NONE;
        }
    }
}

-(BOOL)setMark:(unsigned int)x Y:(unsigned int)y Mark:(MarkType)mark {

    if (x >= GAME_BOARD_SIZE || y >= GAME_BOARD_SIZE)
        return 0;

    if (mark == MARK_NONE) {
        return 0;
    }

    if ([self getMark:x Y:y] != MARK_NONE) {
        //puts("field taken");
        return 0;
    }

    int isXturn = ([self numberOfXmoves] <= [self numberOfOmoves]);

    if (mark == MARK_X && !isXturn) {
        //puts("wrong turn for X");
        return 0;
    }

    if (mark == MARK_O && isXturn)
        return 0;

    field[x][y] = mark;

    ++numberOfMoves;

    return 1;
}

-(unsigned int)numberOfXmoves {
    return (numberOfMoves / 2) + (numberOfMoves % 2);
}

-(unsigned int)numberOfOmoves {
    return numberOfMoves / 2;
}

-(void)forEachField:(void (*)(GameBoard*, unsigned int, unsigned int))visitor {
    for (unsigned int y = 0; y < GAME_BOARD_SIZE; ++y) {
        for (unsigned int x = 0; x < GAME_BOARD_SIZE; ++x) {
            visitor(self, x, y);
        }
    }
}

@end

