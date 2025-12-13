import Activity from "./activity.model.js";
import Group from "../groups/group.model.js";

export const getGroupActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { groupId } = req.params;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (!group.members.includes(userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const activities = await Activity.find({ groupId })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("actorUser", "name");

    res.json({ activities });

  } catch (error) {
    console.error("Get Group Activity Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
