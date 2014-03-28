/**@file
 * @brief     Tic-Tac-Toe game board
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */

#import <objc/Object.h>

#define GAME_BOARD_SIZE (3)

typedef enum MarkType {MARK_NONE = -1, MARK_X, MARK_O} MarkType;

// Tic-Tac-Toe game board
//
@interface GameBoard : Object {
    int field[GAME_BOARD_SIZE][GAME_BOARD_SIZE];
    unsigned int numberOfMoves;
}


-(id)init;
-(void)reset;
-(int)size;
-(int)getMark:(unsigned int)x Y:(unsigned int)y;
-(BOOL)setMark:(unsigned int)x Y:(unsigned int)y Mark:(MarkType)mark;

-(unsigned int)numberOfXmoves;
-(unsigned int)numberOfOmoves;

//-(void)forEachField:(void (^)(unsigned int, unsigned int))visitor;
-(void)forEachField:(void (*)(GameBoard*, unsigned int, unsigned int))visitor;
 
@end

