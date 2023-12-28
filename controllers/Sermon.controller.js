import Sermon from '../models/Sermon.model.js';

export const addSermon = async (req, res) => {
    try {
        const newSermon = new Sermon(req.body);
        await newSermon.save();
        res.json(newSermon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const editSermon = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const existingSermon = await Sermon.findById(id);
    
    if (!existingSermon) {
        return res.status(404).json({ msg: "Sermon doesn't exists" });
    }

    try {
        const { title, date, sermon } = req.body;

        existingSermon.title = title || existingSermon.title;
        existingSermon.date = date || existingSermon.date;
        existingSermon.sermon = sermon || existingSermon.sermon;

        const updatedSermon = await existingSermon.save();

        res.json(updatedSermon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const deleteSermon = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const deletedSermon = await Sermon.findByIdAndDelete(id);

        if (!deletedSermon) {
            return res.status(404).json({ msg: "Sermon doesn't exists" });
        }

        res.json(deletedSermon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const getSermon = async (req, res) => {
    try {
        const { id } = req.params;
        const sermon = await Sermon.findById(id);

        if (!sermon) {
            return res.status(404).json({ msg: 'Sermon not found' });
        }

        res.json(sermon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const getAllSermons = async (req, res) => {
    try {
        const sermons = await Sermon.find();
        res.json(sermons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}