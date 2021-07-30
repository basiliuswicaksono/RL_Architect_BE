// import jwt from '../helpers/jwt';
// import bcrypt from '../helpers/bcrypt';
// import { Admin } from '../models';
// import Response from '../responses/response.class';

const { Admin } = require('../models');
const { Response } = require('../responses/response.class');
const jwt = require('../helpers/jwt');
const bcrypt = require('../helpers/bcrypt');

class AdminLoginController {
  static async login(req, res) {
    const response = new Response(req, res);

    try {
      const { username, password } = req.body;

      const adminData = await Admin.findOne({ where: { username } });
      if (!adminData) {
        const error = {
          message: 'WRONG USERNAME OR PASSWORD ERROR',
          statusCode: response.statusBadRequest,
        };
        throw error;
      }

      const haveAccess = bcrypt.comparePass(password, adminData.password);
      if (!haveAccess) {
        const error = {
          message: 'WRONG USERNAME OR PASSWORD ERROR',
          statusCode: response.statusBadRequest,
        };
        throw error;
      }

      const payload = {
        username: adminData.username,
        isAdmin: true,
      };

      const token = jwt.generateJwt(payload);

      return response.contentSuccess(response.statusOk, token);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(error, statusCode, error.message);
    }
  }
}

module.exports = AdminLoginController;
