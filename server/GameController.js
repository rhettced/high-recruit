module.exports = {
    addGame: (req,res) => {
        const {aces,digs,blocks,hitAttempts,kills,playerId,opponent} = req.body;
        //console.log(req.body);
        db = req.app.get('db');

        db.add_game({aces,digs,blocks,hitAttempts,kills,playerId,opponent})
        .then(games => res.status(200).send(games))
        .catch(err => res.status(500).send(err))
    },
    getSinglePlayerGame: (req,res) =>{
        const {player_id} = req.session.user;
        db = req.app.get('db');
        //console.log(req.session.user);

        db.get_single_player_games({player_id})
        .then(games => res.status(200).send(games))
        .catch(err => res.status(500).send(err))
    },
    getAvgStats: async(req,res) => {
        const {player_id} = req.session.user;
        db = req.app.get('db');
    

        await db.get_avg_stats({player_id})
        .then(stats => res.status(200).send(stats))
        .catch(err => res.status(500).send(err))
    },
    getProfileViews: (req,res) =>{
        const {player_id} = req.params;
        const db = req.app.get('db');

        db.get_num_profile_views({player_id})
        .then(profileViews =>{
            res.status(200).send(profileViews);
        })
        .catch(err => console.log(err))
    },
    getTotalStats: (req,res) => {
        const db=req.app.get('db');
        
        db.get_total_avg_stats()
        .then(allStats=>{
            res.status(200).send(allStats);
        })
        .catch(err => console.log(err))
    },
    addSinglePlay: (req,res) =>{
        const {ace,dig,block,hitAttempt,kill,player_id} = req.body;
        const db = req.app.get('db');
        console.log(req.body)
        db.add_single_play({ace,dig,block,hitAttempt,kill,player_id})
        .then((gameStats)=>{
            res.status(200).send(gameStats);
        })
        .catch(err => console.log(err))
    },
    turnStatsToGame: (req,res) =>{
        const {aces,digs,blocks,kills,opponent} = req.body;
        const playerId = req.body.player_id;
        const hitAttempts = req.body.hit_attempts;
        const db = req.app.get('db');
        console.log(req.body);
        db.add_game({aces,digs,blocks,kills,opponent,playerId,hitAttempts})
        .then(()=>{
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },
    deleteCurrentGameStats: (req,res) =>{
        const db = req.app.get('db');

        db.delete_current_game_stats()
        .then(()=>{
            res.sendStatus(200)
        })
        .catch(err => console.log(err))
    },
    getTeamPlayers: (req,res) =>{
        const db = req.app.get('db');
        const {team_id} = req.params;
        console.log(req.params)
        db.get_team_players({team_id})
        .then((team)=>{
            res.status(200).send(team)
        })
        .catch(err => console.log(err))
    }
}