// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

function generateJwt(payload, expiresIn = '24h') {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

function verifyJwt(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateJwt, verifyJwt };
