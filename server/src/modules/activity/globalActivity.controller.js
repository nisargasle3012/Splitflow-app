import Activity from "./activity.model.js";

export const getGlobalActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    const activities = await Activity.find({
      $or: [
        { actorUser: userId },
        { "metadata.fromUser": userId },
        { "metadata.toUser": userId }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("actorUser", "name");

    res.json({ activities });

  } catch (error) {
    console.error("Get Global Activity Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
