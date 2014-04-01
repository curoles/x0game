/**@file
 * @brief     Tic-Tac-Toe board printing to console/terminal
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import "GameBoard.h"

// Extending GameBoard class with ConsolePrinting category.
//
@interface GameBoard (ConsolePrinting)
-(void)printBoard;
@end
