const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { user } = require('../db');

/* eslint-disable */
module.exports = async (req, res) => {
  try {
    const { auth0_sub, ...rest } = req.body;
    const [loggedUser, created] = await user.findOrCreate({
      where: {
        auth0_sub
      },
      defaults: rest
    });
    const statusCode = created ? 201 : 200;
    console.log(loggedUser.id);
    
    jwt.sign({ ...loggedUser.dataValues }, JWT_SECRET, (error, token) => {
      if (error) return res.sendStatus(403);
      res.status(statusCode).json({ ...loggedUser.dataValues, token });
    })
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
