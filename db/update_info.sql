update player 
set name = ${name},
email = ${email},
school = ${school},
class_year = ${classYear},
profile_pic = ${picUrl},
position = ${position},
phone_number = ${phoneNumber}
where player_id = ${player_id};

select * from player where player_id = ${player_id};