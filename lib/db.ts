import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI!;

let client: MongoClient | null = null;
let db: Db | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    const c = new MongoClient(uri);
    global._mongoClientPromise = c.connect();
  }
  return global._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  if (db) return db;
  client = await getClientPromise();
  db = client.db(process.env.MONGODB_DB_NAME || undefined);
  return db;
}
