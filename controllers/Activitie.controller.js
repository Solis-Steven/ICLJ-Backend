import ActivitieContent from '../models/Activitie.model.js';

export const agendActivitie = async (req, res) => {
    try {
        const newActivitie = new ActivitieContent(req.body);
        await newActivitie.validate();

        await newActivitie.save();
        res.json(newActivitie);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: error.message });
        }

        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

export const editActivitie = async (req, res) => {
    const { id } = req.params;
    const existingActivitie = await ActivitieContent.findById(id);
    
    if (!existingActivitie) {
        return res.status(404).json({ msg: "Activitie doesn't exists" });
    }

    try {
        const { name, date, time, assistance, users } = req.body;

        existingActivitie.name = name || existingActivitie.name;
        existingActivitie.date = date || existingActivitie.date;
        existingActivitie.time = time || existingActivitie.time;
        existingActivitie.assistance = assistance;
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
        const deletedActivitie = await ActivitieContent.findByIdAndDelete(id);

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
        const Activities = await ActivitieContent.findById(id);
        if (!Activities) {
            return res.status(404).json({ msg: 'Activitie not found' });
        }
        res.json(Activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const getAllActivities = async (req, res) => {
    try {
        const Activities = await ActivitieContent.find();
        res.json(Activities);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
export const addActivitieUser = async (req, res) => {
    const { id: activityId } = req.params;
    const { name, phone } = req.body;
    try {
        if ( !name || !phone === undefined) {
            return res.status(400).json({ msg: "Invalid user data in the request body" });
        }
        const user = { name, phone };

        const activity = await ActivitieContent.findById(activityId);
        if (!activity) {
            return res.status(404).json({ msg: "Activity doesn't exist" });
        }
        if (!user) {
            return res.status(400).json({ msg: "User is required in the request body" });
        }
        activity.users.push(user);
        const updatedActivity = await activity.save();
        res.json(updatedActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
