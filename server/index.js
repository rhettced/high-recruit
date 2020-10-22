require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      app = express(),
      {CONNECTION_STRING,SERVER_PORT,SESSION_SECRET} = process.env;

      const authCtrl = require('./AuthController');
      const gameCtrl = require('./GameController');
      const recCtrl = require('./RecruiterController');

app.use(express.json());

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
app.get('/api/session',authCtrl.getSession)
// endpoints for games
app.post('/api/addgame',gameCtrl.addGame);
app.get('/api/getplayersgames',gameCtrl.getSinglePlayerGame);
app.get('/api/playerstats',gameCtrl.getAvgStats);
app.get(`/api/displayplayers`,recCtrl.displayPlayers);

app.listen(SERVER_PORT,console.log(`Bringing the wings to server ${SERVER_PORT}`));