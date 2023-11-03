import mongoose from "mongoose";

const DB_CONNECT = async (url: string) => {
  await mongoose.connect(url);
  console.log("DB CONNECTED");
};

export default DB_CONNECT;
