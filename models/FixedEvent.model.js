import mongoose from 'mongoose';

const FixedEventSchema = new mongoose.Schema({
 name: String,
 manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 date: Date,
 visible: Boolean,
});

const FixedEvent = mongoose.model('FixedEvent', FixedEventSchema);

export default FixedEvent;