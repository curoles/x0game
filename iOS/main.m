//#include <objc/objc.h>
//#import <objc/Object.h>

#import "GameBoard.h"
#import "GameBoard+ConsolePrinting.h"
#import "GameSession.h"



int main(void)
{
    GameBoard* board = [[GameBoard alloc] init];
    GameSession* game = [[GameSession alloc] init:board];

    [game reset];

    do {
        unsigned int x, y;
        puts("place mark x,y:");
        scanf("%u %u", &x, &y);
        [game setMark:x Y:y];
        if (![game isGameOver]) {
            [game makeResponse];
        }
        [board printBoard];
    } while (!game.isGameOver);


    [game free];
    [board free];

    return 0;
}
