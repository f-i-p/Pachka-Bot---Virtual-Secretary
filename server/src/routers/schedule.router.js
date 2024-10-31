const router = require("express").Router();
const { Schedule } = require("../../db/models");
const { verifyAccessToken } = require("../../middlewares/verifyToken");

router.post("/", verifyAccessToken, async (req, res) => {
  const { channelId, dayOfWeek, time, message, frequency } = req.body;

  if (!(channelId && dayOfWeek && time && message && frequency)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newSchedule = await Schedule.create({
      channelId,
      dayOfWeek,
      time,
      message,
      frequency,
    });

    res
      .status(201)
      .json({ message: "Schedule created successfully", newSchedule });
  } catch (error) {
    console.error("Error creating schedule:", error);
    res.status(500).json({ message: "Server error while creating schedule" });
  }
});

router.get("/", async (req, res) => {
  try {
    const schedules = await Schedule.findAll();
    res.json(schedules);
  } catch (error) {
    console.error("Ошибка при получении расписаний:", error);
    res.status(500).send("Ошибка сервера");
  }
});

module.exports = router;
