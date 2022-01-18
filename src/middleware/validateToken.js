const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const validateToken = (req, res, next) => {
    const authHeader = req.get("Authorization");
  
    if (!authHeader) return res.status(401).json({error: "missing authorization header"});
    
    const [scheme, token] = authHeader.split(" ");
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    }catch{
      return res.status(401).json({error:"invalid token"});
    }
}

exports.validateToken = validateToken