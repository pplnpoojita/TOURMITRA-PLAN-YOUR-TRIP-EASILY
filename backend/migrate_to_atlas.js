const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const LOCAL_URI = 'mongodb://127.0.0.1:27017/tourMitraDB';
const REMOTE_URI = process.env.MONGO_URI; 

async function migrateData() {
  let localClient;
  let remoteClient;
  try {
    console.log("Connecting to Local Database...");
    localClient = await MongoClient.connect(LOCAL_URI);
    const localDb = localClient.db('tourMitraDB');
    
    console.log("Connecting to Atlas Database...");
    remoteClient = await MongoClient.connect(REMOTE_URI);
    // Use the database name specified in the URI (tourMitraDB fallback)
    const remoteDb = remoteClient.db();

    // Get all collections from the local database
    const localCollections = await localDb.listCollections().toArray();
    const collectionNames = localCollections.map(c => c.name);
    
    if (collectionNames.length === 0) {
      console.log("No collections found in local database.");
      return;
    }

    console.log(`Found collections: ${collectionNames.join(', ')}`);

    for (const name of collectionNames) {
      console.log(`\nStarting migration for: ${name}`);
      const localDocs = await localDb.collection(name).find({}).toArray();
      console.log(`=> Found ${localDocs.length} documents locally.`);
      
      if (localDocs.length > 0) {
        // Clear remote collection first (optional, prevents duplicate _id if run multiple times)
        const remoteCollection = remoteDb.collection(name);
        await remoteCollection.deleteMany({});
        
        // Insert all documents directly into Atlas
        await remoteCollection.insertMany(localDocs);
        console.log(`=> Migrated ${localDocs.length} documents to Atlas collection '${name}'.`);
      }
    }
    
    console.log("\n✅ Migration completed successfully!");

  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    if (localClient) await localClient.close();
    if (remoteClient) await remoteClient.close();
  }
}

migrateData();
