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
