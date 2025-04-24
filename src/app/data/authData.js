import mongoose from 'mongoose';
import dbConnect from "../lib/dbConnect";
import bcrypt from "bcryptjs";

export const addUser = async ({ email, password }) => {
    await dbConnect();
    const db = mongoose.connection.db;
    const users = db.collection('accounts');
  
    const exists = await users.findOne({ email });
    if (exists) throw new Error("Пользователь уже существует");

    const hashed = bcrypt.hashSync(password, 10);
    await users.insertOne({ email, password: hashed });

    console.log("Пользователь успешно добавлен:", { email });  

    return { email };
};
  

export const findUserByCredentials = async (email, password) => {
  await dbConnect();
  const db = mongoose.connection.db;
  const users = db.collection('accounts');

  const user = await users.findOne({ email });
  if (!user) return null;

  const match = bcrypt.compareSync(password, user.password);
  return match ? user : null;
};

export const getUserByEmail = async (email) => {
    await dbConnect();
    const db = mongoose.connection.db;
    const users = db.collection('accounts');
    
    const user = await users.findOne({ email });
    if (!user) {
      throw new Error('Пользователь не найден');
    }
  
    return user;  
  };
  
