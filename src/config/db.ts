import mongoose from 'mongoose';
import env from './env.js';

const host = "localhost"
const connectdb = async () => {

    try {
        await mongoose.connect(env.mongoUri);
        console.log(`monogose connected successfully✅ ${host}`)

    } catch (error) {
        console.log(error, "error in mongoose")
    }
};


export default connectdb