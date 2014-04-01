/**@file
 * @brief     Tic-Tac-Toe game session
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import <objc/Object.h>

#import "GameSessionProtocol.h"
#import "GameBoard.h"
#import "GameStrategy.h"

@interface GameSession : Object <IGameSession> {
GameBoard* board;// = [[GameBoard alloc] init];
GameStrategy* strategy;
}

-(id)init:(GameBoard*)board Strategy:(GameStrategy*)strategy;
-(void)reset;
-(GameEvaluation)evaluateGame;
-(BOOL)isGameOver:(GameEvaluation*)e;

-(BOOL)setMark:(FieldCoord)move Mark:(MarkType)mark;
-(GameMove)makeResponse:(const GameEvaluation*)eval; 

@end

