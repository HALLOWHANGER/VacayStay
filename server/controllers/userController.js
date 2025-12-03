import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};


export const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  if (!["user", "Admin", "hotelOwner"].includes(role)) {
    return res.status(400).json({ success: false, message: "Invalid role" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ success: true, message: `User role updated to ${role}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update role" });
  }
};
export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities;
    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body;
    const user = await req.user;
    // Store max 3 recent searched cities
    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchedCity);
    } else {
      user.recentSearchedCities.shift();
      user.recentSearchedCities.push(recentSearchedCity);
    }
    await user.save();
    res.json({ success: true, message: "City added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};