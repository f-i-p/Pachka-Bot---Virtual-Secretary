const router = require('express').Router();
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const botToken = require('./botToken.router');
const proverka = require('./proverka.router');


router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/', botToken)
router.use('/proverka', proverka)



module.exports = router;
