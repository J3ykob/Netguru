const express = require('express')
const router = express.Router()

const {AuthError, AuthFactory} = require('../services/auth');
const authFactory = new AuthFactory();

router.post('/', (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "invalid payload" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "invalid payload" });
    }
    try {
        const token = authFactory.generateToken(username, password);

        return res.status(200).json({ token });
    } catch (error) {
        if (error instanceof AuthError) {
            return res.status(401).json({ error: error.message });
        }

        next(error);
    }
})

module.exports = router