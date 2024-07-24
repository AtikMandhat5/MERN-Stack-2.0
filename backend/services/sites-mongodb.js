//site-service.js
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../mongoDB');
const { mail } = require('../services/mail');

const service = {};
const collectionName = 'sites';
const recordLimit = 500;

service.getData = async () => {
  const db = await connectToDatabase();
  try {
    const result = await db.collection(collectionName).find().limit(recordLimit).toArray();
    return result;
  } catch (err) {
    throw new Error('Error fetching data: ' + err.message);
  }
};

service.getDataById = async (id) => {
  const db = await connectToDatabase();
  try {
    const result = await db.collection(collectionName).findOne({ "_id": ObjectId(id) });
    return result;
  } catch (err) {
    throw new Error('Error fetching data by ID: ' + err.message);
  }
};

service.getDataByName = async (name) => {
  const db = await connectToDatabase();
  try {
    const result = await db.collection(collectionName).find({ name }).limit(recordLimit).toArray();
    return result;
  } catch (err) {
    throw new Error('Error fetching data by name: ' + err.message);
  }
};

service.addData = async (record) => {
  const db = await connectToDatabase();
  try {
    await db.collection(collectionName).insertOne(record);
    return { result: 'success' };
  } catch (err) {
    throw new Error('Error adding data: ' + err.message);
  }
};

service.sendMail = async (id) => {
  const db = await connectToDatabase();
  try {
    const result = await db.collection(collectionName).findOne({ "_id": ObjectId(id) });
    if (result) {
      await mail(result);
    }
    return result;
  } catch (err) {
    throw new Error('Error sending mail: ' + err.message);
  }
};

service.deleteData = async (id) => {
  const db = await connectToDatabase();
  try {
    await db.collection(collectionName).deleteOne({ "_id": ObjectId(id) });
    return { result: 'success' };
  } catch (err) {
    throw new Error('Error deleting data: ' + err.message);
  }
};

service.updateData = async (record) => {
  const db = await connectToDatabase();
  const id = record.id;
  delete record._id;
  delete record.id;

  try {
    await db.collection(collectionName).updateOne({ "_id": ObjectId(id) }, { $set: record });
    return { result: 'success' };
  } catch (err) {
    throw new Error('Error updating data: ' + err.message);
  }
};

module.exports = service;
