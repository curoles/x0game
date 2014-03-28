/**@file
 * @brief     Tic-Tac-Toe game session protocol or API
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import <objc/objc.h>

@protocol IGameSession

-(void)reset;
-(int)isGameOver;

-(BOOL)setMark:(unsigned int)x Y:(unsigned int)y;
-(int)makeResponse; 

@end

