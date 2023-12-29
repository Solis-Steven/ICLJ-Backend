import Testimonial from "../models/Testimonial.model.js";

export const addTestimonial = async (req, res) => {
    try {
        const newTestimonial = new Testimonial(req.body);
        await newTestimonial.save();
        res.json({msg: "Testimonio Agregado Correctamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al agregar un testimonio" });
    }
};

export const editTestimonial = async (req, res) => {
    const { id } = req.params;
    const { personName, type, testimonial } = req.body;

    const existingTestimonial = await Testimonial.findById(id);

    if (!existingTestimonial) {
        return res.status(404).json({ msg: "El testimonio no existe" });
    }

    existingTestimonial.personName = personName || existingTestimonial.personName;
    existingTestimonial.type = type || existingTestimonial.type;
    existingTestimonial.testimonial = testimonial || existingTestimonial.testimonial;

    try {
        await existingTestimonial.save();
        res.json({ msg: "Testimonio Editado Correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al editar un testimonio" });
    }
};

export const deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return res.status(404).json({ msg: "El testimonio no existe" });
        }

        res.json(deletedTestimonial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar testimonio" });
    }
};

export const getTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findById(id);

        if (!testimonial) {
            return res.status(404).json({ msg: "El testimonio no existe" });
        }

        res.json(testimonial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener testimonio" });
    }
};

export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener testimonios" });
    }
};
