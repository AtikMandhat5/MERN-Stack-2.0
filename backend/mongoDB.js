const { MongoClient } = require('mongodb');

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'databaseName';

let dbClient = null;

const connectToDatabase = async () => {
  if (dbClient && dbClient.isConnected()) {
    return dbClient.db(dbName);
  }

  try {
    const client = await MongoClient.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    dbClient = client;
    return client.db(dbName);
  } catch (err) {
    throw new Error('Database connection failed: ' + err.message);
  }
};

const closeDatabaseConnection = () => {
  if (dbClient) {
    dbClient.close();
  }
};

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
};