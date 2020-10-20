const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req,res) => {
        const {email,password,name,school,position,classYear,picUrl,phoneNumber, boxChecked} = req.body;
        db = req.app.get('db');
        console.log(req.body);
        if (boxChecked === false){

            const foundUser = await db.check_user_player({email});
            if(foundUser[0]){
                return res.status(400).send(`This email is already being used`);
            }
    
            let salt = bcrypt.genSaltSync(10),
                hash = bcrypt.hashSync(password, salt);
    
            const newUser = await db.register_user_player({email,hash,name,school,position,classYear,picUrl,phoneNumber})
            req.session.user = newUser[0];
            //console.log(newUser);
            //so when refresh page doesn't make them login
            // req.session.userid = newUser[0].id;
            res.status(201).send(req.session.user);
        } else {
            const foundUser = await db.check_user_recruiter({email});
            if(foundUser[0]){
                return res.status(400).send(`This email is already being used`);
            }
    
            let salt = bcrypt.genSaltSync(10),
                hash = bcrypt.hashSync(password, salt);
    
            const newUser = await db.register_user_recruiter({email,hash,name,school,phoneNumber})
            req.session.user = newUser[0];
            //console.log(newUser);
            //so when refresh page doesn't make them login
            // req.session.userid = newUser[0].id;
            res.status(201).send(req.session.user);
        }
    },
    login: async(req,res) => {
        const {password, email,boxChecked} = req.body,
        db = req.app.get('db');
        console.log(req.body);
        
        if (boxChecked === false){
            const foundUser = await db.check_user_player({email});
            if(!foundUser[0]){
                return res.status(400).send(`Email not found`);
            }
    
            const authenticated = bcrypt.compareSync(password,foundUser[0].password);
            if(!authenticated) {
                return res.status(401).send(`Password is incorrect`);
            }
    
            delete foundUser[0].password;
            req.session.user = foundUser[0];
            //so when refresh page doesn't make them login
            // req.session.userid = foundUser[0].id;
            res.status(200).send(req.session.user);
        } else {
            const foundUser = await db.check_user_recruiter({email});
            if(!foundUser[0]){
                return res.status(400).send(`Email not found`);
            }
    
            const authenticated = bcrypt.compareSync(password,foundUser[0].password);
            if(!authenticated) {
                return res.status(401).send(`Password is incorrect`);
            }
    
            delete foundUser[0].password;
            req.session.user = foundUser[0];
            //so when refresh page doesn't make them login
            // req.session.userid = foundUser[0].id;
            res.status(200).send(req.session.user);
        }
    },
    logout: async(req,res) => {
        await req.session.destroy();
        res.sendStatus(200);
    } 
}
