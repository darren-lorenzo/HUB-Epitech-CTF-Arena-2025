const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Check if JWT secret is configured
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ 
            error: true, 
            message: 'Server configuration error' 
        });
    }

    // Get token from header (case-insensitive)
    let token = req.headers['authorization'] || req.headers['Authorization'];
    
    if (!token) {
        return res.status(401).json({ 
            error: true, 
            message: 'Access Denied. No token provided' 
        });
    }

    // Extract token from Bearer scheme
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    } else {
        return res.status(401).json({ 
            error: true, 
            message: 'Access Denied. Invalid token format' 
        });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            error: true, 
            message: 'Access Denied. Invalid token',
            details: error.message 
        });
    }
};

module.exports = { authMiddleware };