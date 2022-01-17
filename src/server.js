const express = require("express");
const bodyParser = require("body-parser");
const { AuthError, AuthFactory } = require("./auth");
const { MovieFactory, MovieFetchError } = require("./movies");

/*
  Connect to database. I konw this is not the best database out there, but it's good at mimicking a mongoDB api
  and it doesn't require any additional setup - for the sake of recruiter's experience :)
*/

const Datastore = require('nedb')
const db = new Datastore({ filename: './movies.db', autoload: true });

const PORT = 3000;
const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}

const authFactory = new AuthFactory(JWT_SECRET);
const movieFactory = new MovieFactory(db);

const app = express();

app.use(bodyParser.json());

app.post("/auth", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "invalid payload" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "invalid payload" });
  }

  try {
    const token = authFactory.generateToken(username, password);

    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    next(error);
  }
});

// implement middleware to validate token using authFactory.validateToken() function

app.use('/movies', (req, res, next) => {
  try {
    authFactory.validateToken(req, res, next);
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
})

// handle post requests to /movies endpoint to create new movie entry in the database
app.post('/movies', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "no title specified!" });
  }

  try {
    const result = await movieFactory.addMovie(title, req.user);
    
    return res.status(200).json({ result });
  }catch(err){
    if (err instanceof MovieFetchError) {
      return res.status(401).json({ error: err.message });
    }
    next(err)
  }
})

// handle get requests to /movies endpoint to get all movies for the current user from the database
app.get('/movies', (req, res) => {
  const { userId } = req.user;
  
  db.find({ id: userId }, (err, docs) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }
    return res.status(200).json(docs);
  });
  
})

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
