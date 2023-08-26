const jwt = require('jsonwebtoken');
const { v2 } = require('cloudinary');
const { JWT_SECRET } = process.env;
const { user } = require('../db');

/* eslint-disable */

module.exports = async (req, res) => {
  try {
    const { auth0_sub, profile_picture, ...rest } = req.body;
    const foundUsers = await user.findAll({ where: { auth0_sub } });
    if (!foundUsers.length) {
      let cloudinary_profile_picture;
      await v2.uploader.upload(
        profile_picture,
        { public_id: auth0_sub, folder: 'achord/profile_pictures' },
        (error, picture) => {
          if (error) return console.log('Unable to upload profile_picture');
          if (picture) {
            console.log(cloudinary_profile_picture);
            console.log(picture.secure_url);
            cloudinary_profile_picture = picture.secure_url;
          }
        }
      );
      const newUser = await user.create({ ...rest, profile_picture: cloudinary_profile_picture, auth0_sub });
      jwt.sign({ id: newUser.id }, JWT_SECRET, (error, token) => {
        if (error) return res.sendStatus(403);
        res.status(201).json({ ...newUser.dataValues, token });
      });
    } else {
      jwt.sign({ id: foundUsers[0].id }, JWT_SECRET, (error, token) => {
        if (error) return res.sendStatus(403);
        res.status(200).json({ ...foundUsers[0].dataValues, token });
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// module.exports = async (req, res) => {
//   try {
//     const { auth0_sub, ...rest } = req.body;
//     const [loggedUser, created] = await user.findOrCreate({
//       where: {
//         auth0_sub
//       },
//       defaults: rest
//     });
//     const statusCode = created ? 201 : 200;
//     jwt.sign({ ...loggedUser.dataValues }, JWT_SECRET, (error, token) => {
//       if (error) return res.sendStatus(403);
//       res.status(statusCode).json({ ...loggedUser.dataValues, token });
//     });
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// };
