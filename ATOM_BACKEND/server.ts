import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
dotenv.config({
  path: ".env",
});
// Add a listener for any unchaught expections  events
process.on('uncaughtException', err => {
  // Log the error name and message to the console
   console.log("🔴",err.name, err.message);

  // Log that the server is shutting down
  console.log('uncaughtException','shutting down..');

  // Close the server and exit the process
  
    process.exit(1);

});


mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));





const PORT: string | number = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
