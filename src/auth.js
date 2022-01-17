const jwt = require("jsonwebtoken");

const users = [
  {
    id: 123,
    role: "basic",
    name: "Basic Thomas",
    username: "basic-thomas",
    password: "sR-_pcoow-27-6PAwCD8",
  },
  {
    id: 434,
    role: "premium",
    name: "Premium Jim",
    username: "premium-jim",
    password: "GBLtTyq3E_UNjFnpo9m6",
  },
];

class AuthError extends Error {}

class AuthFactory {
  constructor(secret){
    this._secret = secret
  }
  generateToken(username, password){
    const user = users.find((u) => u.username === username);
  
    if (!user || user.password !== password) {
      throw new AuthError("invalid username or password");
    }
  
    return jwt.sign(
      {
        userId: user.id,
        name: user.name,
        role: user.role,
      },
      this._secret,
      {
        issuer: "https://www.netguru.com/",
        subject: `${user.id}`,
        expiresIn: 30 * 60,
      }
    );
  }

  validateToken(req, res, next){
    const authHeader = req.get("Authorization");
  
    if (!authHeader) throw new AuthError("missing authorization header");
    
    const [scheme, token] = authHeader.split(" ");
    try{
      const decoded = jwt.verify(token, this._secret);
      req.user = decoded;
      next();
    }catch{
      throw new AuthError("invalid token");
    }
  }
}

module.exports = {
  AuthError,
  AuthFactory,
};
