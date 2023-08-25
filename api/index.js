require('dotenv').config();
const app = require('./src/app');
const { db } = require('./src/db');
const { v2 } = require('cloudinary');
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} = process.env;

const PORT = process.env.PORT || 3001;

v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

db.sync({ force: false })
  .then(() => {
    console.log('🐘 Connected to postgreSQL database');
    app.listen(PORT, () => {
      console.log(`🧞 Listening on port ${PORT}...`);
    });
  });
