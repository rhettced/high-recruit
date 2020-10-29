create table player(
player_id serial primary key,
name varchar(100),
email varchar(200),
school varchar(200),
class_year varchar(50),
profile_pic text,
position varchar(50),
phone_number varchar(20),
password text
);

insert into player
(name,email,school,class_year,profile_pic,position,phone_number,password)
values
('Rhett','rhettced@gmail.com', 'Alpine', 'Freshman','something','Setter','623-518-7521','1234');

create table recruiter
(
recruiter_id serial primary key,
name varchar(200),
email varchar(200),
password text,
phone_number varchar(20),
school varchar(100)
);

insert into recruiter 
(name,email,password,phone_number,school)
values
('Tommy', 'tommy@gmail.com','test','1234567890','UCLA');

create table game(
game_id serial primary key,
aces integer,
digs integer,
blocks integer,
hit_attempts integer,
kills integer,
player_id integer references player(player_id)
);

alter table game
add column opponent text;

select 
avg(aces) as avg_aces,
avg(blocks) as avg_blocks, 
avg(digs) as avg_digs, 
avg(hit_attempts) as avg_hit_attempts, 
avg(kills) as avg_kills, 
sum(kills) as total_kills, 
sum(hit_attempts) as total_hit_attempts,
game.player_id,
player.profile_pic
from game join player on player.player_id = game.player_id
group by game.player_id, player.profile_pic;

create table recruiter_views(
recruiter_view_id serial primary key,
player_id integer references player(player_id),
recruiter_id integer references recruiter(recruiter_id)
);

create table single_play(
single_play serial primary key,
ace integer,
dig integer,
block integer,
hit_attempt integer,
kill integer,
player_id integer references player(player_id)
);
