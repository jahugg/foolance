const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:oPia3I2Ok1R5jlnB@cluster0.beqox.mongodb.net/Cluster0?retryWrites=true&w=majority";
connect();
async function connect() {
    const cline = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(`cluster0`);
        console.log(`Connected to database ${db.databaseName}`);
    }
    catch (ex) {
        console.error(`Exception: ${ex}`);
    }
    finally {
        client.close();
    }
}
