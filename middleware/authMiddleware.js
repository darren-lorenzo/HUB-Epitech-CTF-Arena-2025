const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token = req.headers['Authorization'];

    if (!token) {
        return res.status(400).json({ error: true, message: 'Acess Denied. No token provided' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    } else {
        return res.status(400).json({ error: true, message: 'Acess Denied. Invalid token format' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ error: true, message: 'Acess Denied. Invalid token' });
    }
};

module.exports = { authMiddleware };