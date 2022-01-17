const db = require('../__mocks__/nedb');
const {addMovie} = require('../__mocks__/movies')
const {MovieFactory} = require('../movies');
const movies = new MovieFactory(db);

describe('Movies service', ()=>{
    it('Validate generating date range', () => {
        const range = movies._dateRange();
        const today = new Date()

        expect(range.highkey.getMonth() === today.getMonth() + 1).toBe(true);
        expect(range.lowkey.getMonth() === today.getMonth()).toBe(true);
    })

    it('Validate movie upload', async () => {
        const user = {userId: '123', role: 'premium'};
        const title = 'Matrix';

        const expectedOutput = {
            userId: '123',
            "Title": title,
            "Year": "1999",
            "Genre": "Action, Adventure, Sci-Fi",
            "Director": "The Wachowski Brothers",
        }
        const result = await addMovie(title, user);

        expect(result).toEqual(expectedOutput);
    })

    // it('Test exception handling: User uploading too many movies', async () => {
    //     const user = {userId: '123', role: 'basic'};
    //     const title = 'Matrix';

    //     expect(()=>addMovie(title, user)).toThrow(Error);
    // })
});