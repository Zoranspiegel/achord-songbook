module.exports = (req, res) => {
  try {
    res.status(200).json({ msg: 'Under develop' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
