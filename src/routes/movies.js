const express = require('express')
const router = express.Router()

const { validateToken } = require('../middleware/validateToken')

const { MovieFactory, MovieFetchError } = require('../services/movies')
const movieFactory = new MovieFactory()

router.post('/', [validateToken], async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "no title specified!" });
    }

    try {
        const result = await movieFactory.addMovie(title, req.user);
        
        return res.status(200).json({ result });
    }catch(err){
        if (err instanceof MovieFetchError) {
            return res.status(401).json({ error: err.message });
        }
        next(err)
    }

})

router.get('/', [validateToken], async (req, res) => {
    try{
        const movies = await movieFactory.findMovie(req.user);

        return res.status(200).json({ movies });

    }catch(err){
        if (err instanceof MovieFetchError) {
            return res.status(401).json({ error: err.message });
        }
        next(err)
    }
})

module.exports = router