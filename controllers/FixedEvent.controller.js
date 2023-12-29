import FixedEvent from '../models/FixedEvent.model.js';

export const getAllFixedEvents = async (req, res) => {
 try {
    const fixedEvents = await FixedEvent.find();
    res.status(200).json(fixedEvents);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const createFixedEvent = async (req, res) => {
   try {
      // Check for missing parameters
      if (!req.body.name || !req.body.manager || !req.body.date || req.body.visible === undefined) {
        return res.status(400).json({ message: 'Por favor, ingrese todos los campos requeridos' });
      }
  
      // Check if the event already exists
      const existingEvent = await FixedEvent.findOne({ name: req.body.name });
      if (existingEvent) {
        return res.status(400).json({ message: 'Un evento con ese nombre ya existe' });
      }
  
      const fixedEvent = new FixedEvent({
        name: req.body.name,
        manager: req.body.manager,
        date: req.body.date,
        visible: req.body.visible,
      });
  
      await fixedEvent.save();
  
      res.status(201).json(fixedEvent);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
  };

export const getFixedEvent = async (req, res) => {
 try {
    const fixedEvent = await FixedEvent.findById(req.params.id);
    if(!fixedEvent){
      return res.status(400).json({ message: 'FixedEvent not found' });
    }
    res.status(200).json(fixedEvent);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const updateFixedEvent = async (req, res) => {
 try {
    // Check for missing parameters
    if (!req.body.name || !req.body.manager || !req.body.date || req.body.visible === undefined) {
      return res.status(400).json({ message: 'Por favor, ingrese todos los campos requeridos' });
    }
    const fixedEvent = await FixedEvent.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        manager: req.body.manager,
        date: req.body.date,
        visible: req.body.visible,
      },
      { new: true }
    );

    res.status(200).json(fixedEvent);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const deleteFixedEvent = async (req, res) => {
 try {
   const FixedEvent = await FixedEvent.findById(req.params.id);
   if (!FixedEvent) {
      return res.status(404).json({ message: 'Evento fijo no encontrado' });
   }
    await FixedEvent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'FixedEvent deleted successfully' });
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};