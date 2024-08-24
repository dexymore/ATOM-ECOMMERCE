import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
dotenv.config({
  path: ".env",
});

process.on('uncaughtException', err => {



  
    process.exit(1);

});


mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));





const PORT: string | number = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;