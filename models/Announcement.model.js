import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
 name: String,
 description: String,
 date: Date,
 image: String,
});

export default mongoose.model('Announcement', AnnouncementSchema);