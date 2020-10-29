insert into single_play(
ace,dig,block,hit_attempt,kill,player_id)
values
(${ace},${dig},${block},${hitAttempt},${kill},${player_id});

select sum(ace) as aces, 
sum(dig) as digs, 
sum(block) as blocks, 
sum(hit_attempt) as hit_attempts, 
sum (kill) as kills, 
player.player_id,
name from single_play join player on player.player_id = single_play.player_id group by player.player_id;