/**@file
 * @brief     Tic-Tac-Toe game session protocol or API
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import <objc/objc.h>
#import "GameDefines.h"

@protocol IGameSession

-(void)reset;
-(GameEvaluation)evaluateGame;
-(BOOL)isGameOver:(GameEvaluation*)e;

-(BOOL)setMark:(FieldCoord)move Mark:(MarkType)mark;
-(GameMove)makeResponse:(const GameEvaluation*)eval;

@end

