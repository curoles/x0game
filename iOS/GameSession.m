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

-(GameStatus)isGameOver {
    return [strategy checkGameIsOver:board];
}

-(BOOL)setMark:(GameMove)move Mark:(MarkType)mark {
    return [board setMark:move.x Y:move.y Mark:mark];
}

-(GameMove)makeResponse {
    return [strategy makeMove:board];
}

@end

