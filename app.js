const express = require('express');
const bodyParser = require('body-parser');
const app = express(); // express instance
const PORT = 3000;
app.use(bodyParser.json());

const path = require('path'); // what is path package used for?
const db = require('./db'); // this?
const collection = 'trackers';

// configuring app routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

// get documents from databast (GET)
app.get('/getTodos', (req, res) => {
  db.getDB()
    .collection(collection)
    .find({})
    .toArray((err, documents) => {
      if (err) console.log(err);
      else {
        console.log(documents);
        res.json(documents);
      }
    });
});

// updating an existing document in the database (UPDATE)
app.put('/:id', (req, res) => {
  const trackerID = req.params.id;
  const userInput = req.body;

  db.getDB()
    .collection(collection)
    .findOneAndUpdate({ _id: db.getPrimaryKey(trackerID) }, { $set: { tracker: userInput.tracker } }, { returnOriginal: false }, (err, result) => {
      if (err) console.log('update failed with error: ' + err);
      else res.json(result);
    });
});

// create a new document in the database (POST)
app.post('/', (req, res) => {
  const userInput = req.body;
  db.getDB()
    .collection(collection)
    .insertOne(userInput, (err, result) => {
      if (err) console.log('unable to create document: ' + err);
      else res.json({ result: result, document: result.ops[0] });
    });
});

// delete a existing document from the db (DELETE)
app.delete('/:id', (req, res) => {
  const trackerID = req.params.id;

  db.getDB()
    .collection(collection)
    .findOneAndDelete({ _id: db.getPrimaryKey(trackerID) }, (err, result) => {
        if (err)
            console.log("could not delete: "+ err);
        else
            res.json(result);
    });
});

// connect to database
db.connect((err) => {
  if (err) {
    console.log('Unable to connect to database');
    process.exit(1);
  } else {
    app.listen(PORT, () => {
      console.log(`Connect to database, app listening on port ${PORT}`);
    });
  }
});
