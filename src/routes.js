import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './Components/Auth';
import PlayerView from './Components/PlayerView';
import RecruiterView from './Components/RecruiterView';
import SinglePlayer from './Components/SinglePlayer';
import EditPlayer from './Components/EditPlayer';

export default(
    <Switch>
        <Route component={Auth} exact path='/'/>
        <Route component={PlayerView} path='/profile'/>
        <Route component={SinglePlayer} path='/player/:player_id'/>
        <Route component={RecruiterView} exact path='/recruitview'/>
        <Route component={EditPlayer} path='/editaccount/:player_id'/>
        
    </Switch>
);