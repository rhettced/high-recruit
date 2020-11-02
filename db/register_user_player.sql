insert into player
(name,email,school,class_year,profile_pic,position,phone_number,password,team_id)
values
(${name},${email}, ${school}, ${classYear},${picUrl},${position},${phoneNumber},${hash},2)

returning player_id,name,email,school,class_year,profile_pic,position,phone_number;