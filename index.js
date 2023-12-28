import express from "express";
import dataBaseConnection from "./config/dataBaseConnection.js";
import cors from "cors";
import dotenv from "dotenv";
import announcementRoutes from "./routes/Announcement.routes.js";
import userRoutes from "./routes/User.routes.js";
import fixedEventRoutes from "./routes/FixedEvent.routes.js";
import sermonRoutes from "./routes/Sermon.routes.js";
import testimonialRoutes from "./routes/Testimonial.routes.js";

dotenv.config();
const app = new express();
app.use(cors());
app.use(express.json());

dataBaseConnection();

app.use("/api/fixedEvent", fixedEventRoutes);
app.use("/api/announcements", announcementRoutes)
app.use("/api/users", userRoutes)
app.use("/api/sermons", sermonRoutes)
app.use("/api/testimonials", testimonialRoutes)

const server = app.listen(8000, () => {
    console.log("Server runs");
})