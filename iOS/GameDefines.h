/**@file
 * @brief     Tic-Tac-Toe game definitions
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#import <objc/objc.h>

#define GAME_BOARD_SIZE (3)

#define COLS GAME_BOARD_SIZE
#define ROWS GAME_BOARD_SIZE

typedef enum MarkType {MARK_NONE = -1, MARK_X, MARK_O} MarkType;

typedef enum GameStatus {
    STATUS_PLAYING = 0,
    STATUS_USER_WON,
    STATUS_MACHINE_WON,
    STATUS_DRAW
} GameStatus;

struct GameMove
{
    unsigned int x, y;
    BOOL valid;
};

typedef struct GameMove GameMove;


