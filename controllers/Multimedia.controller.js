import MultimediaContent from '../models/Multimedia.model.js';

export const getAllMultimediaContents = async (req, res) => {
 try {
    const multimediaContents = await MultimediaContent.find();
    res.status(200).json(multimediaContents);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const createMultimediaContent = async (req, res) => {
 try {
   if(!req.body.name || req.body.ref){
      return res.status(400).json({ message:  'Por favor, ingrese todos los campos requeridos'  });
   }
    const multimediaContent = new MultimediaContent({
      name: req.body.name,
      ref: req.body.ref,
    });
    await multimediaContent.save();

    res.status(201).json(multimediaContent);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const getMultimediaContent = async (req, res) => {
 try {
    const multimediaContent = await MultimediaContent.findById(req.params.id);
    if(!multimediaContent){
      return res.status(404).json({ message: 'MultimediaContent not found' });
    }
    res.status(200).json(multimediaContent);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const updateMultimediaContent = async (req, res) => {
 try {
   if(!req.body.name || req.body.ref){
      return res.status(400).json({ message:  'Por favor, ingrese todos los campos requeridos'  });
   }
   const multimediaExist = await MultimediaContent.findById(req.params.id);
   if(!multimediaExist){
      return res.status(404).json({ message: 'MultimediaContent not found' });
   }
    const multimediaContent = await MultimediaContent.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        ref: req.body.ref,
      },
      { new: true }
    );

    res.status(200).json(multimediaContent);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const deleteMultimediaContent = async (req, res) => {
 try {
   const multimediaContent = await MultimediaContent.findById(req.params.id);
   if(!multimediaContent){
      return res.status(404).json({ message: ' MultimediaContent not found' });
   }
    await MultimediaContent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'MultimediaContent deleted successfully' });
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};