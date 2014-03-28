/**@file
 * @brief     Tic-Tac-Toe game session
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import <objc/Object.h>

#import "GameSessionProtocol.h"
#import "GameBoard.h"

@interface GameSession : Object <IGameSession> {
GameBoard* board;// = [[GameBoard alloc] init];
}

-(id)init:(GameBoard*)board;
-(void)reset;
-(int)isGameOver;

-(BOOL)setMark:(unsigned int)x Y:(unsigned int)y;
-(int)makeResponse; 

@end

