// Modelo ConsolidationHouse
import mongoose from 'mongoose';

const ConsolidationHouseSchema = new mongoose.Schema({
 name: { type: String, required: true },
 leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require:true },
 date: { type: Date, required: true },
 address: { type: String, required: true },
});

export default mongoose.model('ConsolidationHouse', ConsolidationHouseSchema);