require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      app = express(),
      {CONNECTION_STRING,SERVER_PORT,SESSION_SECRET} = process.env;
      const path = require('path');

      const authCtrl = require('./AuthController');
      const gameCtrl = require('./GameController');
      const recCtrl = require('./RecruiterController');
      const emailCtrl = require('./EmailController');
      
      app.use(express.json());
      app.use(express.static(__dirname + '/../build'));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db',db);
    console.log('Party on Sports Fans')
})

//endpoints for authentication
app.post('/api/register',authCtrl.register);
app.post('/api/login',authCtrl.login);
app.post(`/api/logout`,authCtrl.logout);
app.get('/api/session',authCtrl.getSession);
app.delete('/api/deleteaccount/:player_id/:recruiter_id',authCtrl.deleteAccount);
app.put(`/api/editinfo/:player_id`,authCtrl.editPlayer);
// endpoints for games/profiles
app.post('/api/addgame',gameCtrl.addGame);
app.get('/api/getplayersgames',gameCtrl.getSinglePlayerGame);
app.get('/api/playerstats',gameCtrl.getAvgStats);
app.get(`/api/displayplayers`,recCtrl.displayPlayers);
app.get(`/api/single/:playerId`,recCtrl.singlePlayer);
app.get(`/api/numprofileviews`,gameCtrl.getProfileViews);

//endpoint for contact and recruiter stuff
app.post(`/api/email`,emailCtrl.email);
app.post(`/api/text`,emailCtrl.text);
app.post(`/api/addprofileview`,recCtrl.addView);
//endpoint for hosting
app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname,'../build/index.html'));
})

app.listen(SERVER_PORT,console.log(`Bringing the wings to server ${SERVER_PORT}`));