module.exports = {
    addGame: (req,res) => {
        const {aces,digs,blocks,hitAttempts,kills,playerId,opponent} = req.body;
        console.log(req.body);
        db = req.app.get('db');

        db.add_game({aces,digs,blocks,hitAttempts,kills,playerId,opponent})
        .then(games => res.status(200).send(games))
        .catch(err => res.status(500).send(err))
    },
    getSinglePlayerGame: (req,res) =>{
        const {playerId} = req.params;
        db = req.app.get('db');

        db.get_single_player_games({playerId})
        .then(games => res.status(200).send(games))
        .catch(err => res.status(500).send(err))
    }
}