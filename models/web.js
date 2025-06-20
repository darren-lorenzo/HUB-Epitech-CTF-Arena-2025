const mongoose = require('mongoose');

const WebSchema = new mongoose.Schema ({
    Nom: { type: String, required: true },
    Description: { type: String, required: true },
    URL: { type: String, required: true, unique: true },
    Flags: { type: String, required: true },
    DateAjout: { type: Date, default: Date.now },
    Auteur: { type: String, required: true }
    }, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Web', WebSchema);