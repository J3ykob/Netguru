const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const { initDb } = require('./database')
initDb();

const authRoutes = require('./routes/auth');
const moviesRoutes = require('./routes/movies');

const app = express();

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/movies", moviesRoutes);

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`auth svc running at port ${process.env.APP_PORT}`);
});
