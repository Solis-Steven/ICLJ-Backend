import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    personName: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum: ["Financiero", "Sanidad", "Conversión", "Liberación", "Provisión"],
        require: true
    },
    testimonial: {
        type: String,
        require: true
    }
});

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

export default Testimonial;