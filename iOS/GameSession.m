/**@file
 * @brief     Tic-Tac-Toe game session
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import "GameSession.h"

@implementation GameSession

-(id)init:(GameBoard*)aBoard Strategy:(GameStrategy*)aStrategy {
    self = [super init];
    if (self) {
        board = aBoard;//[[GameBoard alloc] init];
        strategy = aStrategy;
        [self reset];
    }
    return self;
}

-(void)reset {
    [board reset];
}

-(GameEvaluation)evaluateGame {
    return [strategy evaluateGame:board];
}

-(BOOL)isGameOver:(GameEvaluation*)e {
    return e->status != STATUS_PLAYING;
}

-(BOOL)setMark:(FieldCoord)field Mark:(MarkType)mark {
    return [board setMark:field.x Y:field.y Mark:mark];
}

-(GameMove)makeResponse {
    return [strategy makeMove:board];
}

@end

