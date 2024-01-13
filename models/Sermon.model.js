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
    summary: {
        type: String,
        require: true
    },
    sermon: {
        type: String,
        require: true
    }
});

const Sermon = mongoose.model('Sermon', SermonSchema);

export default Sermon;