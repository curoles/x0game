/**@file
 * @brief     Tic-Tac-Toe game session
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import "GameSession.h"

@implementation GameSession

-(id)init:(GameBoard*)aBoard {
    self = [super init];
    if (self) {
        board = aBoard;//[[GameBoard alloc] init];
        [self reset];
    }
    return self;
}

-(void)reset {
    [board reset];
}

-(int)isGameOver {
    return 1;
}

-(BOOL)setMark:(unsigned int)x Y:(unsigned int)y {
    return [board setMark:x Y:y Mark:MARK_X];
}

-(int)makeResponse {
    return 0;
}

@end

