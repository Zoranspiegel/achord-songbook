require('dotenv').config();
const app = require('./src/app');
const { db } = require('./src/db');

const PORT = process.env.PORT || 3001;

db.sync({ force: false })
  .then(() => {
    console.log('🐘 Connected to postgreSQL database');
    app.listen(PORT, () => {
      console.log(`🧞 Listening on port ${PORT}...`);
    });
  });
