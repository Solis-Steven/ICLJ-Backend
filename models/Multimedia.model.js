import mongoose from 'mongoose';

const MultimediaContentSchema = new mongoose.Schema({
 name: String,
 ref: String,
 visible: Boolean,
 
});

const MultimediaContent = mongoose.model('MultimediaContent', MultimediaContentSchema);

export default MultimediaContent;