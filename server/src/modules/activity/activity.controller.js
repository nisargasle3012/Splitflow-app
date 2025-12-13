import User from "../users/user.model.js";

export const getme = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("name email"); 
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      userId,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
