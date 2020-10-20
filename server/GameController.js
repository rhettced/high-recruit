module.exports = {
    addGame: (req,res) => {
        const {aces,digs,blocks,hitAttempts,kills,playerId} = req.body;
        console.log(req.body);
        db = req.app.get('db');

        db.add_game({aces,digs,blocks,hitAttempts,kills,playerId})
        .then(games => res.status(200).send(games))
        .catch(err => res.status(500).send(err))
    }
}