const {AuthFactory} = require('../src/auth');
const auth = new AuthFactory("secret");


describe('Authorization Service', ()=>{
    it('Validate token generation', () => {
        const token = auth.generateToken('premium-jim', 'GBLtTyq3E_UNjFnpo9m6');
        expect(token).toBeDefined();
    })
    it('Validate token verification', () => {
        class req{get(){return 'Bearer ' + token}}
        const newRequest = new req();
        const token = auth.generateToken('premium-jim', 'GBLtTyq3E_UNjFnpo9m6');

        auth.validateToken(newRequest, token, ()=>{});
        expect(newRequest.user.name).toBe('Premium Jim');
    })
})

