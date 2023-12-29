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
    res.status(200).json(multimediaContent);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const updateMultimediaContent = async (req, res) => {
 try {
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
    await MultimediaContent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'MultimediaContent deleted successfully' });
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};