/**@file
 * @brief     Tic-Tac-Toe game definitions
 * @author    Igor Lesik
 * @copyright Igor Lesik 2014
 *
 */
#pragma once
#ifndef TTT_GAME_DEFINES_H_INCLUDED
#define TTT_GAME_DEFINES_H_INCLUDED

#import <objc/objc.h>

#define GAME_BOARD_SIZE (3)

#define COLS GAME_BOARD_SIZE
#define ROWS GAME_BOARD_SIZE

typedef enum MarkType {MARK_NONE = -1, MARK_X = 0, MARK_O} MarkType;

typedef enum GameStatus {
    STATUS_PLAYING = 0,
    STATUS_USER_WON,
    STATUS_MACHINE_WON,
    STATUS_DRAW
} GameStatus;


struct FieldCoord
{
    unsigned int x, y;
};

typedef struct FieldCoord FieldCoord;


typedef struct GameMove
{
    FieldCoord pos;
    BOOL valid;
} GameMove;

typedef enum StrikeTYpe {
    STRIKE_NONE = 0,
    STRIKE_VERTICAL,
    STRIKE_HORIZONTAL,
    STRIKE_FRW_DIAG,
    STRIKE_BACK_DIAG
} StrikeType;

typedef struct Strike
{
    StrikeType type;
    unsigned int size;
    FieldCoord line[GAME_BOARD_SIZE];
} Strike;

typedef struct GameEvaluation
{
    GameStatus status;
    Strike strike[2];
} GameEvaluation;

#endif
