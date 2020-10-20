insert into player
(name,email,school,class_year,profile_pic,position,phone_number,password)
values
(${name},${email}, ${school}, ${classYear},${picUrl},${position},${phoneNumber},${hash})

returning player_id,name,email,school,class_year,profile_pic,position,phone_number;