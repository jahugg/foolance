const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

async function main() {

    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();

    const collection = client.db("foolance").collection("trackers");
    await collection.insertOne({ name: 'jan', hours: 3 });
    await collection.insertOne({ name: 'sev', hours: 1 });
    var docs = await collection.find({}).toArray();
    console.log(docs);

    await client.close();
};

main();