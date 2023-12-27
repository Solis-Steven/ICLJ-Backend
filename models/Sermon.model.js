import mongoose from 'mongoose';

const SermonSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    sermon: {
        type: String
    }
});

const Sermon = mongoose.model('Sermon', SermonSchema);

export default Sermon;