import express from "express";
import dataBaseConnection from "./config/dataBaseConnection.js";
import cors from "cors";
import dotenv from 'dotenv';
import fixedEventRoutes from './routes/FixedEvent.routes.js';
import announcementRoutes from './routes/announcementRoutes.js';
dotenv.config();

const app = new express();
app.use(cors());
app.use(express.json());

dataBaseConnection();
app.use('/api/fixedEvent', fixedEventRoutes);
app.use('/api/announcements', announcementRoutes)
const server = app.listen(8000, () => {
    console.log("Server runs");
})