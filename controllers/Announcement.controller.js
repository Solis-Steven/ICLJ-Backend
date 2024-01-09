import Announcement from '../models/Announcement.model.js';

export const getAllAnnouncements = async (req, res) => {
 try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const createAnnouncement = async (req, res) => {
 try {
    const announcement = new Announcement({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      image: req.body.image,
    });

    await announcement.save();

    res.status(201).json(announcement);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const getAnnouncement = async (req, res) => {
 try {
    const announcement = await Announcement.findById(req.params.id);
    if(!announcement){
      return res.status(404).json({ message: 'Anuncio no encontrado' });
    }
    res.status(200).json(announcement);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const updateAnnouncement = async (req, res) => {
   const AnnouncementToUpdate = await Announcement.findById(req.params.id);
   if(!AnnouncementToUpdate) {
     return res.status(404).json({ message: 'Anuncio no encontrado' });
   }

   const {name, description, date, image} = req.body
   AnnouncementToUpdate.name = name || AnnouncementToUpdate.name;
    AnnouncementToUpdate.description = description || AnnouncementToUpdate.description;
    AnnouncementToUpdate.date = date || AnnouncementToUpdate.date;
    AnnouncementToUpdate.image = image || AnnouncementToUpdate.image;
 try {
   const AnnouncementSaved = await AnnouncementToUpdate.save();
   res.json(AnnouncementSaved);
  
 } catch (error) {
   res.status(500).json({msg: "Internal Server Error"})
 }
};

export const deleteAnnouncement = async (req, res) => {
 try {
   const announcement = await Announcement.findById(req.params.id);
   if(!announcement) {
     return res.status(404).json({ message: 'Anuncio no encontrado' });
   }
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Announcement deleted successfully' });
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};