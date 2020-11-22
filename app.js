const express = require('express');
const bodyParser = require('body-parser');
const app = express(); // express instance
const PORT = 3000;
app.use(bodyParser.json());

const path = require('path'); // what is path package used for?
const db = require('./db'); // this?
const collection = 'trackers';

// configuring app routes
app.use(express.static('./dist')); //static route (current parcel workaround)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
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





// code example from mongoDB
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://foolancer:BPxynHWiCy1kDsjL@cluster0.w9rrm.mongodb.net/foolance?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("foolance").collection("trackers");
//   // perform actions on the collection object
//   console.log(collection);
//   client.close();
// });

// solution from https://www.youtube.com/watch?v=M9Fs-CCe0Jo
// is throwing the same dns error...
// connect();
// async function connect() {
//     const client = new MongoClient(uri);

//     try {
//         await client.connect();
//         const db = client.db(`foolance`);
//         console.log(`Connected to database ${db.databaseName}`);
//     }
//     catch (ex) {
//         console.error(`Exception: ${ex}`);
//     }
//     finally {
//         client.close();
//     }
// }


// sevis solution
// async function main() {

//     const url = 'mongodb://localhost:27017';
//     const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
//     await client.connect();

//     const collection = client.db("foolance").collection("trackers");
//     await collection.insertOne({ name: 'jan', hours: 3 });
//     await collection.insertOne({ name: 'sev', hours: 1 });
//     var docs = await collection.find({}).toArray();
//     console.log(docs);

//     await client.close();
// };