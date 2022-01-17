function _getMovies(){
    return Promise.resolve(
        [
            {
                "id": 123,
                "title": "Elko",
                "year": "2012",
                "genre": "Short, Drama",
                "director": "Alexander Yan",
                "createdAt": "2022-01-17T11:52:10.004Z",
                "_id": "Mbfb8rquFttfp3b1"
            },
            {
                "id": 123,
                "title": "Mission: Impossible - Ghost Protocol",
                "year": "2011",
                "genre": "Action, Adventure, Thriller",
                "director": "Brad Bird",
                "createdAt": "2022-01-17T11:41:24.795Z",
                "_id": "XqF1rIUbp9iBM3j2"
            },
          ]
    );
}
function _insertMovie(movie){
    return Promise.resolve(movie)
}

class MovieFetchError extends Error {}

const addMovie = async (title, user) => {
    const movies = await _getMovies();

    if(user.role == 'basic' && movies.length >= 5){
        throw new MovieFetchError('You have reached your limit of 5 movies');
    }
    if(movies.find(movie => movie.title.includes(title))){
        throw new MovieFetchError('You already have this movie');
    }
    const data = {
        "Title": title,
        "Year": "1999",
        "Genre": "Action, Adventure, Sci-Fi",
        "Director": "The Wachowski Brothers",
    }
            
    if(data.Response === 'False'){
        throw new MovieFetchError('Movie not found');
    }

    const movie = {
        userId: user.userId,
        Title: data.Title,
        Year: data.Year,
        Genre: data.Genre,
        Director: data.Director,
    }
    const result = await _insertMovie(movie);
    return result
}

exports.addMovie = addMovie;