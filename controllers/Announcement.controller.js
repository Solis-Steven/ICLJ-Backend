import Announcement from '../models/announcementModel';

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
    res.status(200).json(announcement);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const updateAnnouncement = async (req, res) => {
 try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        image: req.body.image,
      },
      { new: true }
    );

    res.status(200).json(announcement);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const deleteAnnouncement = async (req, res) => {
 try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Announcement deleted successfully' });
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};