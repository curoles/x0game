CC:=gcc
CFLAGS:=-std=c99 -Wall -Werror
LFLAGS:=-lobjc

SRCS:=GameBoard.m GameBoard+ConsolePrinting.m GameSession.m main.m

all:
	$(CC) $(CFLAGS) $(SRCS) $(LFLAGS) -o test.out

clean:
	rm -f ./test.out
