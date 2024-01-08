// Controlador ConsolidationHouse
import ConsolidationHouse from '../models/ConsolidationHouse.model.js';

export const getAllConsolidationHouses = async (req, res) => {
 try {
   const { page = 1, limit = 10, isActive = true } = req.query;
    const consolidationHouses = await ConsolidationHouse.find()
    .select("-createdAt -updatedAt -__v")
    .skip((page - 1) * limit)
    .limit(limit);
    res.json(consolidationHouses);
 } catch (error) {
   console.error(error);
 }
};

export const createConsolidationHouse = async (req, res) => {
 const {name, leader, date, address} = req.body;
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
    if (!consolidationHouse) {
      return res.status(404).json({ message: 'ConsolidationHouse not found' });
   }
   res.status(200).json(consolidationHouse);
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
};

export const updateConsolidationHouse = async (req, res) => {
   const ConsolidationHouseToUpdate = await ConsolidationHouse.findById(req.params.id);

   if(!ConsolidationHouseToUpdate) {
       const error = new Error("The ConsolidationHouses doesn't exists");
       return(res.status(404).json({msg: error.message}));
   }
 const { name, leader, date, address } = req.body;
   ConsolidationHouseToUpdate.name = name || ConsolidationHouseToUpdate.name;
    ConsolidationHouseToUpdate.leader = leader || ConsolidationHouseToUpdate.leader;
    ConsolidationHouseToUpdate.date = date || ConsolidationHouseToUpdate.date;
    ConsolidationHouseToUpdate.address = address || ConsolidationHouseToUpdate.address; 

 try {
   
   const ConsolidationHouseSaved = await ConsolidationHouseToUpdate.save();
   res.json(ConsolidationHouseSaved)
 } catch (error) {
   res.status(500).json({msg: "Internal Server Error"})
 }
};

export const deleteConsolidationHouse = async (req, res) => {
   try {
      const consolidationHouse = await ConsolidationHouse.findById(req.params.id);
      if (!consolidationHouse) {
         return res.status(404).json({ message: 'ConsolidationHouse not found' });
      }
  
      await ConsolidationHouse.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'ConsolidationHouse deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
  };