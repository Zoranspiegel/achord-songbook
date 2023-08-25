const { song } = require('../db');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    await song.update(req.body, {
      where: {
        id
      }
    });
    res.status(201).json(id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
