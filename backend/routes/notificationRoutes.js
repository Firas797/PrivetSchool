const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const User = require("../models/userModel");

// Create notification
router.post("/", async (req, res) => {
  try {
    const { title, message, recipients, isForAll } = req.body;
    let recipientIds = [];

    if (isForAll) {
      // If admin chooses "All", send to every user in DB
      const users = await User.find({}, "_id");
      recipientIds = users.map((u) => u._id);
    } else if (recipients && recipients.length > 0) {
      // Specific users
      recipientIds = recipients;
    }

    const notification = new Notification({
      title,
      message,
      recipients: recipientIds,
      isForAll,
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({
      $or: [
        { recipients: userId },   // personal notifications
        { isForAll: true }        // broadcast notifications
      ]
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get all notifications marked as "forall"
// Get all notifications for all users (broadcast)
router.get("/forall", async (req, res) => {
  try {
    const notifications = await Notification.find({ isForAll: true }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Mark as read
router.put("/:id/read/:userId", async (req, res) => {
  try {
    const { id, userId } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { $addToSet: { readBy: userId } },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
