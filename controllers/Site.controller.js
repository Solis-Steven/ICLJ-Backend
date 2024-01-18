import SiteContent from "../models/Site.model.js";

export const getAllSites = async (req, res) => {
    try {
      const { page = 1, limit = 10} = req.query;
       const sites = await SiteContent.find()
       .select("-createdAt -updatedAt -__v")
       .skip((page - 1) * limit)
       .limit(limit);
       res.json(sites);
    } catch (error) {
      console.error(error);
    }
};
export const addSite = async (req, res) => {
    try {
        const site = new SiteContent({
            name: req.body.name,
            address: req.body.address,
            image: req.body.image,
        });
        const siteData = await site.save();
        res.json({msg: "Sede agregada correctamente", data:siteData})
    } catch (error) {
        return res.status(404).json({ msg: "Error al agregar la sede" });
    }
};
export const editSite = async (req, res) => {
    const { id } = req.params;
    const { name, address, image } = req.body;
    const updateSite = { name, address, image };

    const existingSite = await SiteContent.findById(id);
    if (!existingSite) {
        return res.status(404).json({ msg: "La sede no existe" });
    }
    try {
        const updated = await SiteContent.findByIdAndUpdate(
            req.params.id,
            { $set: updateSite },
            { new: true }
        );
        res.json({msg: "Sede editada correctamente", data:updated })
    } catch (error) {
        return res.status(404).json({ msg: "Error al editar la sede" });
    }
};
export const deleteSite = async (req, res) => {
    const { id } = req.params;
    if(id){
        try{
            const deletedSite = await SiteContent.findByIdAndDelete(id);
            if (!deletedSite) {
                return res.status(404).json({ msg: "La sede no existe" });
            }
    
            res.json({msg: "Sede eliminada correctamente"})
        } catch (error) {
            return res.status(404).json({ msg: "Error al eliminar la sede" });
        }
    }
};