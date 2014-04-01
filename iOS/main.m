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

    GameEvaluation e;

    do {
        FieldCoord uMove;
        puts("place mark x,y:");
        scanf("%u %u", &uMove.x, &uMove.y);
        if (![game setMark:uMove  Mark:MARK_X]) {
            puts("Illegal move");
            continue;
        }
        e = [game evaluateGame];
        if (![game isGameOver:&e]) {
            GameMove resp = [game makeResponse];
            [game setMark:resp.pos Mark:MARK_O];
            e = [game evaluateGame];
        }
        [board printBoard];
    } while (![game isGameOver:&e]);

    if (e.status == STATUS_USER_WON || e.status == STATUS_MACHINE_WON) {
        MarkType markType = (e.status == STATUS_USER_WON)? MARK_X:MARK_O;
        puts((e.status == STATUS_USER_WON)? "You won":"You lost");
        puts("Strike:");
        for (unsigned int n = 0; n < GAME_BOARD_SIZE; ++n) {
            printf("(%u,%u) ", e.strike[markType].line[n].x,
                e.strike[markType].line[n].y);
        }
        puts(".");
    }

    [game free];
    [strategy free];
    [board free];

    return 0;
}
