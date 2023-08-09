import mongoose from 'mongoose';

let isConnected = false; // check if db is connected

export const connectToDN = async() => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL is not defined');
    if(isConnected) return console.log('Already connected to DB');

    try {
        await mongoose.connect(process.env.MONGODB_URL)

        isConnected = true;
        console.log('Connected to MONGO_DB');
    } catch (error) {
        console.log('Error connecting to DB', error);
    }
}

