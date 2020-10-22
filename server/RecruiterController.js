module.exports = {
    displayPlayers: (req,res) => {
        db =req.app.get('db');

        db.display_players_recruiter()
        .then(players => res.status(200).send(players))
        .catch(err => console.log(err))
    },
    singlePlayer: (req,res) => {
        const {playerId} = req.params;
        db = req.app.get('db');

        db.get_player({playerId})
        .then(player => res.status(200).send(player))
        .catch(err => console.log(err))
    }
}