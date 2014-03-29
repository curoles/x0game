//#include <objc/objc.h>
//#import <objc/Object.h>

#import "GameDefines.h"
#import "GameBoard.h"
#import "GameStrategy.h"
#import "GameBoard+ConsolePrinting.h"
#import "GameSession.h"



int main(void)
{
    GameBoard* board = [[GameBoard alloc] init];
    GameStrategy* strategy = [[GameStrategy alloc] init];
    GameSession* game = [[GameSession alloc] init:board Strategy:strategy];

    [game reset];

    do {
        GameMove uMove, resp;
        puts("place mark x,y:");
        scanf("%u %u", &uMove.x, &uMove.y);
        if (![game setMark:uMove  Mark:MARK_X]) {
            puts("Illegal move");
            continue;
        }
        if (![game isGameOver]) {
            resp = [game makeResponse];
            [game setMark:resp Mark:MARK_O];
        }
        [board printBoard];
    } while (![game isGameOver]);


    [game free];
    [strategy free];
    [board free];

    return 0;
}
