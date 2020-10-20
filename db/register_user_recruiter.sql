insert into recruiter 
(name,email,password,phone_number,school)
values
(${name}, ${email},${hash},${phoneNumber},${school})
returning recruiter_id,name,email,school,phone_number;