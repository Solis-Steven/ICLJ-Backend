import mongoose from 'mongoose';

const ActivitieContentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\d{4}-\d{2}-\d{2}$/.test(value);
            },
            message: "La fecha no tiene un formato correcto (yyyy-dd-mm)"
        }
    },
    time: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^(2[0-3]|1[0-9]|0?[0-9]):[0-5][0-9]?$/.test(value.toLowerCase());
            },
            message: "La hora no tiene el formato correcto (hh:mm)"
        }
    },
    assistance: {
        type: Boolean,
        default: false,
        trim: true,
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
            }
        }],
        default: [],
        validate: {
            validator: function (value) {
                return this.assistance || (Array.isArray(value) && value.every(item => item.assisted));
            },
            message: "Solo se pueden agregar usuarios si las asistencia esta habilitada"
        }
    }
    
});

const ActivitieContent = mongoose.model('ActivitieContent', ActivitieContentSchema);

export default ActivitieContent;