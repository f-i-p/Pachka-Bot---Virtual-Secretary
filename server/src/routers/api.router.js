const router = require('express').Router();
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const scheduleRouter = require('./schedule.router');
const channelRoutes = require('./channel.router')
const botRouter = require('./bot.router')

router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/schedules', scheduleRouter);
router.use('/channels', channelRoutes);
router.use('/', botRouter)


module.exports = router;
