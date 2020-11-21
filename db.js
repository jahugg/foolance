// code example from mongoDB
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = 'foolance';
const mongoUri = 'mongodb+srv://foolancer:BPxynHWiCy1kDsjL@cluster0.w9rrm.mongodb.net/foolance?retryWrites=true&w=majority';
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const state = {
  db: null,
};

// connect to db
const connect = (cb) => {
  if (state.db) cb();
  else
    MongoClient.connect(mongoUri, mongoOptions, (err, client) => {
      if (err) cb(err);
      else {
        state.db = client.db(dbname);
        cb();
      }
    });
};

// get primary key of 
const getPrimaryKey = (_id) => {
  return ObjectID(_id);
};

// get db
const getDB = () => {
  return state.db;
};

// export all functions
module.exports = {getDB, connect, getPrimaryKey};
