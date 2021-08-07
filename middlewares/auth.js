const jwt = require('../helpers/jwt');
const Response = require('../responses/response.class');
const { Admin } = require('../models');

async function authentication(req, res, next) {
  const response = new Response(res);

  try {
    let tokenBearer = req.get('Authorization');

    if (!tokenBearer) {
      const error = { message: 'FORBIDDEN', statusCode: response.statusForbidden };
      throw error;
    }

    tokenBearer = tokenBearer.replace('Bearer ', '');

    const jwtDecoded = jwt.verifyJwt(tokenBearer);

    if (!jwtDecoded.isAdmin) {
      const error = { message: 'FORBIDDEN', statusCode: response.statusForbidden };
      throw error;
    }

    const admin = await Admin.findOne({ where: { username: jwtDecoded.username } });

    if (!admin) {
      const error = { message: 'FORBIDDEN', statusCode: response.statusForbidden };
      throw error;
    }

    // simpan data di req
    req.dataAdmin = jwtDecoded;

    return next();
  } catch (error) {
    const statusCode = error.statusCode || response.statusForbidden;
    return response.contentFail(statusCode, error.message);
  }
}

module.exports = { authentication };
