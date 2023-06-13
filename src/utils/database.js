import mongoose from "mongoose";


let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("Already connected to database!");
        return;
    }
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "itemsSample",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        isConnected = db.connections[0].readyState;
    }catch(e){
        console.log("Error connecting to database: ", e);
        isConnected = false;
    }
};