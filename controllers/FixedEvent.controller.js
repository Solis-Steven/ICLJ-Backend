import FixedEvent from "../models/FixedEvent.model.js";
import { User } from "../models/User.model.js"
export const getAllFixedEvents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const fixedEvents = await FixedEvent.find()
      .populate("manager", "name")
      .select("-createdAt -updatedAt -__v")
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(fixedEvents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createFixedEvent = async (req, res) => {
  try {
    // Check if the event already exists
    const existingEvent = await FixedEvent.findOne({ name: req.body.name });
    if (existingEvent) {
      return res
        .status(400)
        .json({ message: "Un evento con ese nombre ya existe" });
    }

    const fixedEvent = new FixedEvent({
      name: req.body.name,
      manager: req.body.manager,
      date: req.body.date,
      visible: req.body.visible,
    });

    await fixedEvent.save();
    // Obtener el nombre del manager
    const managerName = await User.findById(req.body.manager).select("name");

    // Devolver el objeto 'fixedEvent' con el nombre del manager incluido
    res.status(201).json({
      ...fixedEvent.toObject(),
      manager: {
        id: req.body.manager,
        name: managerName.name,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFixedEvent = async (req, res) => {
  try {
    const fixedEvent = await FixedEvent.findById(req.params.id);
    if (!fixedEvent) {
      return res.status(400).json({ message: "FixedEvent not found" });
    }
    res.status(200).json(fixedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFixedEvent = async (req, res) => {
  const { id } = req.params;
  const fixedEventToUpdate = await FixedEvent.findById(id);
  if (!fixedEventToUpdate) {
    const error = new Error("The FixedEvent doesn't exists");
    return res.status(404).json({ msg: error.message });
  }

  const { name, manager, date, visible } = req.body;

  fixedEventToUpdate.name = name || fixedEventToUpdate.name;
  fixedEventToUpdate.manager = manager || fixedEventToUpdate.manager;
  fixedEventToUpdate.date = date || fixedEventToUpdate.date;
  fixedEventToUpdate.visible = visible !== undefined ? Boolean(visible) : fixedEventToUpdate.visible;
  try {
    const fixedEventSave = await fixedEventToUpdate.save();
      // Obtener el nombre del manager
      const managerName = await User.findById(req.body.manager).select("name");

      // Devolver el objeto 'fixedEventASave' con el nombre del manager incluido
      res.status(201).json({
        ...fixedEventSave.toObject(),
        manager: {
          id: req.body.manager,
          name: managerName.name,
        },
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFixedEvent = async (req, res) => {
  try {
    const fixedEvent = await FixedEvent.findById(req.params.id);
    if (!fixedEvent) {
      return res.status(404).json({ message: "Evento fijo no encontrado" });
    }
    await FixedEvent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "FixedEvent deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
