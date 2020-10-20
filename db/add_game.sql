insert into game 
(aces,digs,blocks,hit_attempts,kills,player_id)
values
(${aces}, ${digs}, ${blocks}, ${hitAttempts},${kills},${playerId});

select * from game where player_id = ${playerId};