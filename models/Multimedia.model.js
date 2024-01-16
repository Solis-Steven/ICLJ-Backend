import mongoose from 'mongoose';

const MultimediaContentSchema = new mongoose.Schema({
 name: String,
 ref: String,
 visible: Boolean,
 type: String,
 
});

const MultimediaContent = mongoose.model('MultimediaContent', MultimediaContentSchema);

export default MultimediaContent;