/**@file
 * @brief     Tic-Tac-Toe game strategy
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import <objc/Object.h>
#import "GameDefines.h"
#import "GameBoard.h"

// Tic-Tac-Toe game strategy
//
@interface GameStrategy : Object

-(GameEvaluation)evaluateGame:(GameBoard*)board;
-(GameMove)makeMove:(GameBoard*)board Eval:(const GameEvaluation*)eval;

@end

