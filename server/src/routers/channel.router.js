const router = require('express').Router();
const { Channel } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const channels = await Channel.findAll();
    res.json(channels);
  } catch (error) {
    console.error('Error fetching channels:', error);
    res.status(500).json({ message: 'Error fetching channels' });
  }
});

module.exports = router;