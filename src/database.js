const Datastore = require('nedb')
let db = null;

/*
  Connect to database. I konw this is not the best database out there, but it's good at mimicking a mongoDB api
  and it doesn't require any additional setup - for the sake of recruiter's experience :)
*/

const initDb = async () => {
  db = new Datastore({ filename: './src/movies.db', autoload: true });
  return;
}

const getDb = () => {
  if(!db){
    throw new Error('Database not initialized');
  }
  return db;
}


module.exports = {
  initDb,
  getDb,
}