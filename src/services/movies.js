const axios = require('axios');
const {getDb} = require('../database');

class MovieFetchError extends Error {}

class MovieFactory {
    constructor(){
        this._db = getDb();
    }
    _getDateRange(){
        let today = new Date();
        let lowkey = new Date(today.getFullYear(), today.getMonth(), 1);
        let highkey = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        return {
            lowkey,
            highkey
        }
    }
    async _getMovies(query){
        return new Promise((resolve)=>{
            this._db.find(query, (err, docs) => {
                if(err) throw new MovieFetchError(err.message);
                resolve(docs)
            }); 
        });
    }
    async _insertMovie(movie){
        return new Promise((resolve)=>{
            this._db.insert(movie, (err, newDoc) => {
                if(err) throw new MovieFetchError(err.message);
                resolve(newDoc);
            });
        });
    }
    async addMovie(title, user){
        const range = this._getDateRange();
        const query = {
            userId: user.userId,
            createdAt: {
                $gte: range.lowkey,
                $lt: range.highkey 
            }
        };
    
        const movies = await this._getMovies(query);
    
        if(user.role == 'basic' && movies.length >= 5){
            throw new MovieFetchError('You have reached your limit of 5 movies');
        }
        if(movies.find(movie => movie.title.includes(title))){
            throw new MovieFetchError('You already have this movie');
        }
        const { data } = await axios.get(`http://www.omdbapi.com/?apikey=8b826d60&t=${title}`);
                
        if(data.Response === 'False'){
            throw new MovieFetchError('Movie not found');
        }
    
        const movie = {
            userId: user.userId,
            title: data.Title,
            year: data.Year,
            genre: data.Genre,
            director: data.Director,
            createdAt: new Date(),
        }
    
        return await this._insertMovie(movie);
    
    }
    async findMovie(user){
        return await this._getMovies({userId: user.userId})
    }
}

module.exports = {
    MovieFetchError,
    MovieFactory,
}