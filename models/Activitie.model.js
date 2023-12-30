import mongoose from 'mongoose';

const ActivitieContentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    date: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\d{2}-\d{2}-\d{4}$/.test(value);
            },
            message: "The date is not in the correct format (dd-mm-yyyy)"
        }
    },
    time: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^(1[0-2]|0?[1-9]):[0-5][0-9]([ap]m)?$/.test(value.toLowerCase());
            },
            message: "The time is not in the correct format (h:mm[am|pm])"
        }
    },
    assistance: {
        type: Boolean,
        required: function () {
            return this.assistance === true;
        }
    },
    users: {
        type: [{
            name: {
                type: String,
                required: true,
                trim: true
            },
            phone: {
                type: String,
                trim: true,
            },
            assisted:  {
                type: Boolean,
                default: false,
                required: true,
                trim: true
            }
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "User"
        }],
        default: [],
        validate: {
            validator: function (value) {
                return Array.isArray(value) && value.every(item => typeof item === 'object');
            },
            message: "Invalid list of users"
        }
    }
    
});

const ActivitieContent = mongoose.model('ActivitieContent', ActivitieContentSchema);

export default ActivitieContent;