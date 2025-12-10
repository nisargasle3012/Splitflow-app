import Group from "./group.model.js";

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const userId = req.user.id;

    if (!name || !members || members.length === 0) {
      return res.status(400).json({ message: "Name and members are required" });
    }

    // Ensure creator is included in members list
    if (!members.includes(userId)) {
      members.push(userId);
    }

    const group = await Group.create({
      name,
      members,
      createdBy: userId,
    });

    return res.status(201).json({
      message: "Group created successfully",
      group,
    });
  } catch (error) {
    console.error("Create Group Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMyGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    const groups = await Group.find({ members: userId });

    return res.json({ groups });
  } catch (error) {
    console.error("Get Groups Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
