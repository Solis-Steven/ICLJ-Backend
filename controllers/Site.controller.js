import SiteContent from "../models/Site.model.js";

export const getAllSites = async (req, res) => {
    try {
        const Sites = await SiteContent.find();
        res.json(Sites);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
export const addSite = async (req, res) => {
    try {
        const site = new SiteContent({
            name: req.body.name,
            address: req.body.address,
        });
        await site.save();
        res.json({msg: "Site added successfully"})
    } catch (error) {
        console.log(error);
    }
};
export const editSite = async (req, res) => {
    const { name, address } = req.body;
    const updateSite = { name, address };
    try {
        const updated = await SiteContent.findByIdAndUpdate(
            req.params.id,
            { $set: updateSite },
            { new: true }
        );
        res.json({msg: "Site edited successfully", updated })
    } catch (error) {
        console.log(error);
    }
};
export const deleteSite = async (req, res) => {
    const { id } = req.params;
    if(id){
        try{
            await SiteContent.findByIdAndDelete(id);
            res.json({msg: "Site deleted successfully"})
        } catch (error) {
            console.log(error);
        }
    }
};