import express from "express";
import dataBaseConnection from "./config/dataBaseConnection.js";
import cors from "cors";
import dotenv from "dotenv";
import announcementRoutes from "./routes/Announcement.routes.js";
import userRoutes from "./routes/User.routes.js";
import fixedEventRoutes from "./routes/FixedEvent.routes.js";
import sermonRoutes from "./routes/Sermon.routes.js";
import testimonialRoutes from "./routes/Testimonial.routes.js";
import sitesRoutes from "./routes/Site.routes.js";
import activitiesRoutes from "./routes/Activitie.routes.js";
import consolidationHousesRoutes from "./routes/ConsolidationHouse.routes.js";
dotenv.config();
const app = new express();
app.use(cors());
app.use(express.json({ limit: '20mb' }));


dataBaseConnection();

app.use("/api/fixedEvent", fixedEventRoutes);
app.use("/api/announcements", announcementRoutes)
app.use("/api/users", userRoutes)
app.use("/api/sermons", sermonRoutes)
app.use("/api/testimonials", testimonialRoutes)
app.use("/api/sites", sitesRoutes)
app.use("/api/activities", activitiesRoutes)
app.use("/api/consolidationHouses", consolidationHousesRoutes)



const server = app.listen(8000, () => {
    console.log("Server runs");
})