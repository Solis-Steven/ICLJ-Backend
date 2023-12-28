// Controlador ConsolidationHouse
import ConsolidationHouse from '../models/ConsolidationHouse';

export const getAllConsolidationHouses = async (req, res) => {
 try {
    const consolidationHouses = await ConsolidationHouse.find();
    res.status(200).json(consolidationHouses);
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
};

export const createConsolidationHouse = async (req, res) => {
 const { name, leader, date, address } = req.body;
 const newConsolidationHouse = new ConsolidationHouse({ name, leader, date, address });

 try {
    await newConsolidationHouse.save();
    res.status(201).json(newConsolidationHouse);
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const getConsolidationHouse = async (req, res) => {
 try {
    const consolidationHouse = await ConsolidationHouse.findById(req.params.id);
    res.status(200).json(consolidationHouse);
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
};

export const updateConsolidationHouse = async (req, res) => {
 const { name, leader, date, address } = req.body;
 const updatedConsolidationHouse = { name, leader, date, address };

 try {
    await ConsolidationHouse.findByIdAndUpdate(req.params.id, updatedConsolidationHouse);
    res.status(200).json({ message: 'ConsolidationHouse updated successfully' });
 } catch (error) {
    res.status(400).json({ message: error.message });
 }
};

export const deleteConsolidationHouse = async (req, res) => {
 try {
    await ConsolidationHouse.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'ConsolidationHouse deleted successfully' });
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
};