import mongoose from 'mongoose';

const SiteContentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9\s,.-]+$/.test(value);
            },
            message: "The address is not valid"
        }
    },
});

const SiteContent = mongoose.model('SiteContent', SiteContentSchema);

export default SiteContent;