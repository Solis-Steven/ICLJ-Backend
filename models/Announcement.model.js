import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
 name: String,
 description: String,
 date: Date,
 image: {type: String, required: true},
});

export default mongoose.model('Announcement', AnnouncementSchema);