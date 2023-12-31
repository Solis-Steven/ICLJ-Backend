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
   const { id } = req.params;

   const multimediaToUpdate = await MultimediaContent.findById(id);
   if(!multimediaToUpdate) {
      const error = new Error("The multimedia Content doesn't exists");
      return(res.status(404).json({msg: error.message}));
  }
  const {name, ref} = req.body
    
  multimediaToUpdate.name = name || multimediaToUpdate.name;
  multimediaToUpdate.ref = ref || multimediaToUpdate.ref;
  
 try {
   const multimediaSave = await multimediaToUpdate.save();
   res.json(multimediaSave);
 } catch (error) {
   res.status(500).json({msg: "Internal Server Error"})
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