const mongoose = require('mongoose');

const osintSchema = new mongoose.Schema({
    Nom: { type: String, required: true },
    Description: { type: String, required: true },
    Image: { type: String, required: true },
    //URL: { type: String, required: false, unique: true },
    Flags: { type: String, required: true },
    DateAjout: { type: Date, default: Date.now },
    Auteur: { type: String, required: true }
}, {
    timestamps: true 
});

module.exports = mongoose.model('OSINT', osintSchema);