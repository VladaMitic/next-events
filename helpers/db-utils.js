import { MongoClient } from 'mongodb';

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://vlada:Promeni01@cluster0.enskszv.mongodb.net/?retryWrites=true&w=majority'
  );
  return client;
}

export async function insertDocument(database, collection, client, document) {
  const db = client.db(database);
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocument(database, collection, client, filter) {
  const db = client.db(database);
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort({ _id: -1 })
    .toArray();

  return documents;
}
