import Sermon from "../models/Sermon.model.js";

export const addSermon = async (req, res) => {
    try {
        const newSermon = new Sermon(req.body);
        await newSermon.save();
        res.json({msg: "Sermón agregado correctamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al agregar sermón" });
    }
}

export const editSermon = async (req, res) => {
    const { id } = req.params;

    const existingSermon = await Sermon.findById(id);
    
    if (!existingSermon) {
        return res.status(404).json({ msg: "El sermón no existe" });
    }

    try {
        const { title, date, sermon } = req.body;

        existingSermon.title = title || existingSermon.title;
        existingSermon.date = date || existingSermon.date;
        existingSermon.sermon = sermon || existingSermon.sermon;

        await existingSermon.save();

        res.json({msg: "Sermón editado correctamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al editar sermón" });
    }
}

export const deleteSermon = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const deletedSermon = await Sermon.findByIdAndDelete(id);

        if (!deletedSermon) {
            return res.status(404).json({ msg: "El sermón no existe" });
        }

        res.json({msg: "Sermón eliminado correctamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar sermón" });
    }
}

export const getSermon = async (req, res) => {
    try {
        const { id } = req.params;
        const sermon = await Sermon.findById(id);

        if (!sermon) {
            return res.status(404).json({ msg: "Sermon not found" });
        }

        res.json(sermon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener sermón" });
    }
}

export const getAllSermons = async (req, res) => {
    try {
        const sermons = await Sermon.find();
        res.json(sermons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener sermones" });
    }
}