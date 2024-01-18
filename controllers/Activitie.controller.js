import ActivitieContent from '../models/Activitie.model.js';

export const agendActivitie = async (req, res) => {
    try {
        const newActivitie = new ActivitieContent(req.body);
        const activity = await newActivitie.save();
        res.json({msg: "Actividad agregada correctamente", data:activity})
    } catch (error) {
        return res.status(404).json({ msg: "Error al agendar la actividad" });
    }
};

export const editActivitie = async (req, res) => {
    const { id } = req.params;
    const existingActivitie = await ActivitieContent.findById(id);
    
    if (!existingActivitie) {
        return res.status(404).json({ msg: "La actividad no existe" });
    }

    try {
        const { name, date, time, assistance, users } = req.body;

        existingActivitie.name = name || existingActivitie.name;
        existingActivitie.date = date || existingActivitie.date;
        existingActivitie.time = time || existingActivitie.time;
        existingActivitie.assistance = assistance;
        existingActivitie.users = users || existingActivitie.users;

        const updatedActivitie = await existingActivitie.save();

        res.json({msg: "Actividad editada correctamente", updatedActivitie })

    } catch (error) {
        return res.status(404).json({ msg: "Error al editar la actividad" });
    }
}

export const deleteActivitie = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedActivitie = await ActivitieContent.findByIdAndDelete(id);

        if (!deletedActivitie) {
            return res.status(404).json({ msg: "Error actividad no encontrada" });
        }

        res.json({msg: "Actividad eliminada correctamente"})
    } catch (error) {
        return res.status(404).json({ msg: "Error al elimnar la actividad" });
    }
}

export const getActivitie = async (req, res) => {
    try {
        const { id } = req.params;
        const Activities = await ActivitieContent.findById(id);
        if (!Activities) {
            return res.status(404).json({ msg: 'Error actividad no encontrada' });
        }
        res.json(Activities);
    } catch (error) {
        return res.status(404).json({ msg: "Error al obtener la actividad" })
    }
}
export const getAllActivities = async (req, res) => {
    try {
      const { page = 1, limit = 10} = req.query;
       const activities = await ActivitieContent.find()
       .select("-createdAt -updatedAt -__v")
       .skip((page - 1) * limit)
       .limit(limit);
       res.json(activities);
    } catch (error) {
      console.error(error);
    }
   };
   
export const addActivitieUser = async (req, res) => {
    const { id: activityId } = req.params;
    const { name, phone } = req.body;
    try {
        if (!name || phone === undefined) {
            return res.status(400).json({ msg: "Datos Inválidos" });
        }
        const user = { name, phone };

        const activity = await ActivitieContent.findById(activityId);
        if (!activity) {
            return res.status(404).json({ msg: "No existe la actividad" });
        }
        if (!user) {
            return res.status(400).json({ msg: "No existe el usuario de la actividad" });
        }
        activity.users.push(user);
        const updatedActivity = await activity.save();
        res.json({msg: "Usuario agregado correctamente", updatedActivity })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al agregar al usuario a la actividad', error: error.message });
    }
};
