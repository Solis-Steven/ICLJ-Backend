import express from "express";
import dataBaseConnection from "./config/dataBaseConnection.js";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = new express();
app.use(cors());
app.use(express.json());

dataBaseConnection();

const server = app.listen(8000, () => {
    console.log("Server runs");
})