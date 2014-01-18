#!/usr/bin/ruby

puts 'Criss-Cross game by Anthony and Igor Lesik 2014'

$board = [[' ',' ',' '], [' ',' ',' '], [' ',' ',' ']]
$nr_moves = 0

def draw(b)
  puts ' |1|2|3|'
  puts "C|#{b[2][0]}|#{b[2][1]}|#{b[2][2]}|"
  puts "B|#{b[1][0]}|#{b[1][1]}|#{b[1][2]}|"
  puts "A|#{b[0][0]}|#{b[0][1]}|#{b[0][2]}|"
end

def is_x_move
  ($nr_moves % 2) == 1 
end

def make_mark(row, col)
  sym = is_x_move ? 'x':'o'
  $board[row][col] = sym
end

def ask_move
  correct_pos = false
  row, col = 0, 0
  while not correct_pos do
    puts 'Enter position:'
    pos = gets
    row_sym = pos[0]
    col_sym = pos[1]
    if    row_sym == 'a' then row = 0
    elsif row_sym == 'b' then row = 1
    elsif row_sym == 'c' then row = 2
    else
      puts 'incorrect row'
    end

    if    col_sym == '1' then col = 0
    elsif col_sym == '2' then col = 1
    elsif col_sym == '3' then col = 2
    else
      puts 'incorrect column'
    end

    correct_pos = true
    $nr_moves += 1
  end
  p = row, col
end

def is_victory

  $board.each do |row|
    if row[0] != ' ' and (row[0] == row[1] and row[1] == row[2])
        return true
    end
  end

  for col in 0..2
    if $board[0][col] != ' ' and ($board[0][col] == $board[1][col] and $board[1][col] == $board[2][col])
        return true
    end
  end

  if $board[0][0] != ' ' and ($board[0][0] == $board[1][1] and $board[1][1] == $board[2][2])
    return true
  end

  if $board[0][2] != ' ' and ($board[0][2] == $board[1][1] and $board[1][1] == $board[2][0])
    return true
  end

  false
end

def is_all_marked
  $board.each do |row|
    row.each do |cell|
      if cell == ' '
        return false
      end
    end
  end
  return true
end

def is_game_over
  is_victory or is_all_marked
end

def make_dummy_move
  row_id, col_id = 0, 0
  $board.each do |row|
    col_id = 0
    row.each do |cell|
      if cell == ' '
        p = row_id, col_id
        return p
      end
      col_id += 1
    end
    row_id += 1
  end
  # assert SHOULD NOT BE HERE
  p = row_id, col_id
end

def make_1st_move
  if $board[1][1] == 'x'
    p = 0, 0
  else
    p = 1, 1
  end
end

def look_danger
  for row in 0..2
    if $board[row][0] == 'x' and $board[row][0] == $board[row][1] and $board[row][2] == ' '
      return true, row, 0, row, 1
    end
    if $board[row][0] == 'x' and $board[row][0] == $board[row][2] and $board[row][1] == ' '
      return true, row, 0, row, 2
    end
    if $board[row][1] == 'x' and $board[row][1] == $board[row][2] and $board[row][0] == ' '
      return true, row, 1, row, 2
    end
  end

  for col in 0..2
    if $board[0][col] == 'x' and $board[0][col] == $board[1][col] and $board[2][col] == ' '
      return true, 0, col, 1, col
    end
    if $board[0][col] == 'x' and $board[0][col] == $board[2][col] and $board[1][col] == ' '
      return true, 0, col, 2, col
    end
    if $board[1][col] == 'x' and $board[1][col] == $board[2][col] and $board[0][col] == ' '
      return true, 1, col, 2, col
    end
  end


  danger = false, 0, 0, 0, 0
  return danger
end

def make_preventive_move(d)
  p = make_dummy_move
  r1, c1, r2, c2 = d[1], d[2], d[3], d[4]

  if r1 == r2
    p = r1, c1 == 0 ? (c2 == 1 ? 2:1) : 0
  elsif c1 == c2
    p = r1 == 0 ? (r2 == 1 ? 2:1) : 0, c1
  end

  puts "Have to make preventive move (#{p[0]}, #{p[1]})"

  p
end

def move
  row, col = 0, 0
  if $nr_moves == 1
    row, col = make_1st_move
  else
    danger = look_danger
    is_danger = danger[0]
    if is_danger
      row, col = make_preventive_move(danger)
    else
      row, col = make_dummy_move
    end
  end
  $nr_moves += 1
  make_mark(row, col)
end

puts 'Game board:'
draw($board)

game_is_over = false

until game_is_over
  row, col  = ask_move
  make_mark(row, col)
  game_is_over = is_game_over
  unless game_is_over
    move
    game_is_over = is_game_over
  end
  draw($board)
end


puts ''
puts 'THE END'
