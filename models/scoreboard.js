const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    id_user: {type: mongoose.Schema.Types.ObjectId, required: false},
    username: {type: String, required: true},
    affiliation: {type: String, required: true},
    score: {type: Number, required: true},
    solved_challenges: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: false
    }],
});


module.exports = mongoose.model('Scoreboard', scoreSchema);