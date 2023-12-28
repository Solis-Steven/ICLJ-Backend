import Activitie from '../models/Activitie.model';

export const agendActivitie = async (req, res) => {
    try {
        const newActivitie = new Activitie(req.body);
        await newActivitie.save();
        res.json(newActivitie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const editActivitie = async (req, res) => {
    const { id } = req.params;
    const existingActivitie = await Activitie.findById(id);
    
    if (!existingActivitie) {
        return res.status(404).json({ msg: "Activitie doesn't exists" });
    }

    try {
        const { name, date, time, assistance, users } = req.body;

        existingActivitie.name = name || existingActivitie.name;
        existingActivitie.date = date || existingActivitie.date;
        existingActivitie.time = time || existingActivitie.time;
        existingActivitie.assistance = assistance || existingActivitie.assistance;
        existingActivitie.users = users || existingActivitie.users;

        const updatedActivitie = await existingActivitie.save();

        res.json(updatedActivitie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const deleteActivitie = async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const deletedActivitie = await Activitie.findByIdAndDelete(id);

        if (!deletedActivitie) {
            return res.status(404).json({ msg: "Activitie doesn't exists" });
        }

        res.json(deletedActivitie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const getActivitie = async (req, res) => {
    try {
        const { id } = req.params;
        const Activitie = await Activitie.findById(id);

        if (!Activitie) {
            return res.status(404).json({ msg: 'Activitie not found' });
        }

        res.json(Activitie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const getAllActivities = async (res) => {
    try {
        const Activities = await Activitie.find();
        res.json(Activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}