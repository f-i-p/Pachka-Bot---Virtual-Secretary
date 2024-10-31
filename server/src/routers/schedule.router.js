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

router.put("/:id", verifyAccessToken, async (req, res) => {
  const { channelId, dayOfWeek, time, message, frequency } = req.body;
  const { id } = req.params;

  if (!(channelId && dayOfWeek && time && message && frequency)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    schedule.channelId = channelId;
    schedule.dayOfWeek = dayOfWeek;
    schedule.time = time;
    schedule.message = message;
    schedule.frequency = frequency;

    await schedule.save();

    res
      .status(200)
      .json({ message: "Schedule updated successfully", schedule });
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ message: "Server error while updating schedule" });
  }
});

router.delete("/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await Schedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    await schedule.destroy();
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ message: "Server error while deleting schedule" });
  }
});
module.exports = router;
