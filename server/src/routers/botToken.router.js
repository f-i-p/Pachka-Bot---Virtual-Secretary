const router = require('express').Router();
const { Workspace } = require('../../db/models');
const generateToken = require('../../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');
const { where } = require('sequelize');

router.get("/", async (req, res) => {
    try {
      const botToken = await Workspace.findOne({where: {id: 1}}); // дописать где: id пространства 
      const onlyToken = botToken.hashAccessToken;
      res.status(200).json({ onlyToken });
  
    } catch (error) {
      res.status(500).json({ "error:": error.message });
    }
});
  
module.exports = router;