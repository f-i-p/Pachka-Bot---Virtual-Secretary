const router = require("express").Router();
const authRouter = require("./auth.router");
const tokenRouter = require("./token.router");
const scheduleRouter = require("./token.router");

router.use("/auth", authRouter);
router.use("/token", tokenRouter);
router.use("/schedule", scheduleRouter);

module.exports = router;
