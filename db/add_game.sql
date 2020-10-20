insert into game 
(aces,digs,blocks,hit_attempts,kills,player_id,opponent)
values
(${aces}, ${digs}, ${blocks}, ${hitAttempts},${kills},${playerId},${opponent});

select * from game where player_id = ${playerId};