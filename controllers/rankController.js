const scoreboard = require("../models/scoreboard.js");

const getRankings = async (req, res) => {
    try {
        const rankings = await scoreboard.find().sort({ score: -1 }).limit(20);
        res.status(200).json(rankings);
    } catch (error) {
        res.status(500).json({ error: true, message: 'Erreur lors de la récupération des classements' });
    }
}

const addScore = async (req, res) => {
    try {
        const { id_user, username, affiliation, score } = req.body;
        const newScore = new scoreboard({ id_user, username, affiliation, score });
        await newScore.save();
        res.status(201).json({ message: 'Score ajouté avec succès', data: newScore });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Erreur lors de l\'ajout du score' });
    }
}

const updateScore = async (req, res) => {
    try {
        const { score } = req.body;
        const id_user = req.user.identity._id;
        const updatedScore = await scoreboard.findOneAndUpdate(
            { id_user },
            { $inc: { score: score } },
            { new: true }
        );
        if (!updatedScore) {
            return res.status(404).json({ error: true, message: 'Score non trouvé' });
        }
        res.status(200).json({ message: 'Score mis à jour avec succès', data: updatedScore });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Erreur lors de la mise à jour du score' });
    }
}

module.exports = {
    getRankings,
    addScore,
    updateScore
};