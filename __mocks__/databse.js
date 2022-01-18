const db = () => {
    return {
        find: (query, callback) => {
            const movies = [
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
            callback(null, movies);
        },
        insert: (toInsert, callback) => {
            callback(null, toInsert);
        }
    }
}

exports.mockdb = db;