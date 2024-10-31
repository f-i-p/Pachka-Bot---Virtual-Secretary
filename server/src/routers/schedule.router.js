const Schedule = require("../../db/models/schedule");
const router = require("express").Router();

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