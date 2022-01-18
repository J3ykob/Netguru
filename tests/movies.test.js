const {mockdb} = require('../__mocks__/databse');
// jest.mock("axios");

jest.mock('../src/database', () => {
    return {
        getDb: () => mockdb()
    };
})

const {MovieFactory} = require('../src/services/movies');
const { default: axios } = require('axios');
const movies = new MovieFactory();


describe('Movies service', ()=>{
    it('Validate generating date range', () => {
        const range = movies._getDateRange();
        const today = new Date()

        expect(range.highkey.getMonth() === today.getMonth() + 1).toBe(true);
        expect(range.lowkey.getMonth() === today.getMonth()).toBe(true);
    })

    it('Validate movie upload', async () => {

        axios.get = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                data: {
                    "Title": title,
                    "Year": "1999",
                    "Genre": "Action, Adventure, Sci-Fi",
                    "Director": "The Wachowski Brothers",
                }
            })
        });

        const user = {userId: '123', role: 'premium'};
        const title = 'Matrix';

        const expectedOutput = {
            userId: user.userId,
            "title": title,
            "year": "1999",
            "genre": "Action, Adventure, Sci-Fi",
            "director": "The Wachowski Brothers",
            createdAt: expect.any(Date)
        }
        const result = await movies.addMovie(title, user);

        expect(result).toEqual(expectedOutput);
    })
});