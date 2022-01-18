process.env.JWT_SECRET = 'secret';

const { validateToken } = require('../src/middleware/validateToken');

const { AuthFactory } = require('../src/services/auth');
const auth = new AuthFactory();

describe('Authorization Service', ()=>{
    it('Validate token generation', () => {
        
        const token = auth.generateToken('premium-jim', 'GBLtTyq3E_UNjFnpo9m6');
        expect(token).toBeDefined();
    })
    it('Validate token verification', () => {
        const token = auth.generateToken('premium-jim', 'GBLtTyq3E_UNjFnpo9m6');
        
        class req{get(){return 'Bearer ' + token}}
        const newRequest = new req();

        validateToken(newRequest, token, ()=>{});
        expect(newRequest.user.name).toBe('Premium Jim');
    })
})

