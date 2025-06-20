const Cryptography = require('../models/cryptography');
const Steganography = require('../models/steganography');
const Web = require('../models/web');
const OSINT = require('../models/osint');
const Scoreboard = require('../models/scoreboard');
const { ObjectId } = require('mongodb');

function isValidObjectId(id) {
  if (!id) return false;
  // Remove any non-hex characters first
  const cleanId = id.replace(/[^a-f0-9]/g, '');
  return ObjectId.isValid(cleanId) && 
         (cleanId.length === 24 || cleanId.length === 12);
}

// function to add a new challenge in cryptography
const AddNewChallenge = async (req, res) => {
    try {
        const challengeData = req.body;
        const type = req.body.type; // the type of challenge (CRYPTOGRAPHY, STEGANOGRAPHY, WEB, OSINT)
        if (type == 'CRYPTOGRAPHY') {
            const newChallenge = new Cryptography({
                Nom: challengeData.Nom,
                Description: challengeData.Description,
                Message: challengeData.Message,
                Flags: challengeData.Flags,
                DateAjout: new Date(),
                Auteur: challengeData.Auteur
            });
            await newChallenge.save();
        } else if (type == 'STEGANOGRAPHY') {
            const newChallenge = new Steganography({
                Nom: challengeData.Nom,
                Description: challengeData.Description,
                Message: challengeData.Message,
                Image: challengeData.Image,
                Flags: challengeData.Flags,
                DateAjout: new Date(),
                Auteur: challengeData.Auteur
            });
            await newChallenge.save();
        } else if (type == 'WEB') {
            const newChallenge = new Web({
                Nom: challengeData.Nom,
                Description: challengeData.Description,
                URL: challengeData.URL,
                Flags: challengeData.Flags,
                DateAjout: new Date(),
                Auteur: challengeData.Auteur
            });
            await newChallenge.save();
        } else if (type == 'OSINT') {
            const newChallenge = new OSINT({
                Nom: challengeData.Nom,
                Description: challengeData.Description,
                Image: challengeData.Image,
                // URL: challengeData.URL,
                Flags: challengeData.Flags,
                DateAjout: new Date(),
                Auteur: challengeData.Auteur
            });
            await newChallenge.save();
        } else {
            return res.status(400).json({ message: 'Invalid challenge type' });
        }
        res.status(201).json({ message: 'Challenge registered successfully' /* , challenge: newChallenge*/ });
        console.log ("Challenge registered successfully");
    } catch (error) {
        res.status(500).json({ message: 'Error registering challenge', error });
        console.error("Error registering challenge:", error);
    }
}

const ModifyChallenge = async (req, res) => {
    try {
        let id = req.params.id;
        const type = req.body.type;
        const cleanId = id.startsWith(':') ? id.slice(1) : id;
        
        if (!isValidObjectId(cleanId)) {
            return res.status(400).json({ message: 'Invalid challenge ID' });
        }

        const updateData = {
            Nom: req.body.Nom,
            Description: req.body.Description,
            Flags: req.body.Flags,
            DateAjout: new Date(),
            Auteur: req.user?.identity?.Alias || req.body.Auteur
        };
        let updatedChallenge;
        
        switch (type) {
            case 'CRYPTOGRAPHY':
                updateData.Message = req.body.Message;
                updatedChallenge = await Cryptography.findByIdAndUpdate(
                    cleanId, 
                    updateData,
                    { new: true }
                );
                break;
                
            case 'STEGANOGRAPHY':
                updateData.Message = req.body.Message;
                updateData.Image = req.body.Image;
                updatedChallenge = await Steganography.findByIdAndUpdate(
                    cleanId,
                    updateData,
                    { new: true }
                );
                break;
                
            case 'WEB':
                updateData.URL = req.body.URL;
                updatedChallenge = await Web.findByIdAndUpdate(
                    cleanId,
                    updateData,
                    { new: true }
                );
                break;
                
            case 'OSINT':
                updateData.Image = req.body.Image;
                updatedChallenge = await OSINT.findByIdAndUpdate(
                    cleanId,
                    updateData,
                    { new: true }
                );
                break;
                
            default:
                return res.status(400).json({ message: 'Invalid challenge type' });
        }

        if (!updatedChallenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        res.status(200).json({ 
            message: 'Challenge updated successfully',
            challenge: updatedChallenge
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Error modifying challenge', error });
        console.error("Error modifying challenge:", error);
    }
}

// Function to get all challenges
const getChallenges = async (req, res) => {
    try {
        const challenges = await Promise.all([
            Cryptography.find(),
            Steganography.find(),
            Web.find(),
            OSINT.find()
        ]);
        res.status(200).json({
            cryptography: challenges[0],
            steganography: challenges[1],
            web: challenges[2],
            osint: challenges[3]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching challenges', error });
    }
};

// Function to get a specific challenge by ID
const getChallengeById = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    const cleanId = id.startsWith(':') ? id.slice(1) : id;
        
    if (!isValidObjectId(cleanId)) {
        return res.status(400).json({ message: 'Invalid challenge ID' });
    }
    try {
        let challenge;
        switch (type) {
            case 'cryptography':
                challenge = await Cryptography.findById(cleanId);
                break;
            case 'steganography':
                challenge = await Steganography.findById(cleanId);
                break;
            case 'web':
                challenge = await Web.findById(cleanId);
                break;
            case 'osint':
                challenge = await OSINT.findById(cleanId);
                break;
            default:
                return res.status(400).json({ message: 'Invalid challenge type' });
        }
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json(challenge);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching challenge', error });
    }
};

// Function to submit a solution for a challenge
const submitSolution = async (req, res) => {
    const { id } = req.params;
    const { type, solution } = req.body;
    const cleanId = id.startsWith(':') ? id.slice(1) : id;
    const userId = req.user?.identity?._id;

    // Input validation
    if (!isValidObjectId(cleanId)) {
        return res.status(400).json({ message: 'Invalid challenge ID' });
    }
    if (!userId || !isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        // Find the challenge
        let challenge;
        switch (type.toLowerCase()) {
            case 'cryptography':
                challenge = await Cryptography.findById(cleanId);
                break;
            case 'steganography':
                challenge = await Steganography.findById(cleanId);
                break;
            case 'web':
                challenge = await Web.findById(cleanId);
                break;
            case 'osint':
                challenge = await OSINT.findById(cleanId);
                break;
            default:
                return res.status(400).json({ message: 'Invalid challenge type' });
        }

        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        // Check if solution is correct
        if (challenge.Flags !== solution) {
            return res.status(400).json({ message: 'Incorrect solution' });
        }

        // Check if user already solved this challenge
        const existingScore = await Scoreboard.findOne({
            id_user: userId,
            solved_challenges: cleanId
        });

        if (existingScore) {
            return res.status(400).json({
                message: 'You have already solved this challenge',
                score: existingScore.score
            });
        }

        // Update scoreboard
        const updatedScore = await Scoreboard.findOneAndUpdate(
            { id_user: userId },
            {
                $inc: { score: 30 },
                $addToSet: { solved_challenges: cleanId },
                $setOnInsert: {  // Only set these fields when creating new document
                    username: req.user.identity.Alias || 'anonymous',
                    affiliation: req.user.identity.Affiliation || 'none'
                }
            },
            {
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        return res.status(200).json({
            message: 'Correct solution! Points added to your score',
            score: updatedScore.score,
            solvedChallenge: cleanId
        });

    } catch (error) {
        console.error('Solution submission error:', error);
        return res.status(500).json({
            message: 'Error processing solution',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Export the functions
module.exports = {
    getChallenges,
    getChallengeById,
    submitSolution,
    ModifyChallenge,
    AddNewChallenge
};