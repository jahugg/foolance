// trying to add this due to "dns.resolveSrv is not a function" error
// "yarn add dns" throws an error too...
var dns = require('dns');

// code example from mongoDB
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://foolancer:BPxynHWiCy1kDsjL@cluster0.w9rrm.mongodb.net/foolance?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("foolance").collection("trackers");
  // perform actions on the collection object
  console.log(collection);
  client.close();
});



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