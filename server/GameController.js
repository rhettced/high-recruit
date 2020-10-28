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
    }
}