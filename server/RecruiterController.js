module.exports = {
    displayPlayers: (req,res) => {
        db =req.app.get('db');

        db.display_players_recruiter()
        .then(players => res.status(200).send(players))
        .catch(err => console.log(err))
    }
}