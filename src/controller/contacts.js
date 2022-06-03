const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');

const authorizeToken = (req) => {
  const token = req.headers.authorization;
  if (!token) {
    return { error: true, message: 'Missing Auth Token' };
  }

  try {
    return jwt.verify(token, constants.SECRET_KEY, (err, res) => {
      if (err) {
        return { error: true, message: 'Invalid Token' };
      }
      return { error: false, message: 'success' };
    });
  } catch (err) {
    console.log('error while verifying token', err);
    return { error: true, message: 'Invalid Token' };
  }
};

module.exports = {
  authorizeToken: authorizeToken,
};
