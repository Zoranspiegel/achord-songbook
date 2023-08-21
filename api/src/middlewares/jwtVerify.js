const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const bearerToken = authorization.split(' ')[1];
    jwt.verify(bearerToken, JWT_SECRET, (error, authData) => {
      if (error) return res.status(403).json({ error: error.message });
      req.authData = authData;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};
