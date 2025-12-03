import City from "../models/Cities.js";


export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find({});
        res.json({ success: true, cities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addCity = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ success: false, message: "City name cannot be empty" });
        }

        const existingCity = await City.findOne({ name: name.trim() });
        if (existingCity) {
            return res.status(400).json({ success: false, message: "City already exists" });
        }

        const city = new City({ name: name.trim() });
        await city.save();

        res.json({ success: true, message: "City added successfully", city });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        await City.findByIdAndDelete(id);
        res.json({ success: true, message: "City deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
