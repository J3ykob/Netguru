const db = () => {
    return {
        find: () => {
            return Promise.resolve([
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
              ]);
        },
        insert: () => {
            return Promise.resolve({
                
                "id": 123,
                "title": "StART",
                "year": "2010",
                "genre": "Animation, Short",
                "director": "Goran Gomaz",
                "createdAt": "2022-01-17T11:52:02.932Z",
                "_id": "2Lyrupm7WsS1XW4T"
                
            });
        }
    }
}

exports.db = db;