select 
avg(aces) as avg_aces,
avg(blocks) as avg_blocks, 
avg(digs) as avg_digs, 
avg(hit_attempts) as avg_hit_attempts, 
avg(kills) as avg_kills, 
sum(kills) as total_kills, 
sum(hit_attempts) as total_hit_attempts,
game.player_id,
player.profile_pic,
player.name
from game join player on player.player_id = game.player_id
group by game.player_id, player.profile_pic, player.name;