import mongoose from 'mongoose';
//require('dotenv').config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

export { db };
