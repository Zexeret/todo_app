import { MongoClient, ServerApiVersion } from "mongodb";

let client;

export const getDbConnection = async () => {
  const uri = process.env.MONGO_URI;
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  console.log("Trying to connect with MongoDb...");
 await client.connect();
 console.log("Connected To MongoDb Successfully!!");
};

export const connectToDb = async (dbname) => {
    const db = client.db(dbname) ;
    
    return db ;
}
