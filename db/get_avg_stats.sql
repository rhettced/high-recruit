select 
avg(aces) as avg_aces,
avg(blocks) as avg_blocks, 
avg(digs) as avg_digs, 
avg(hit_attempts) as avg_hit_attempts, 
avg(kills) as avg_kills, 
sum(kills) as total_kills, 
sum(hit_attempts) as total_hit_attempts from game where player_id = ${player_id};