const { Picture } = require('../models');
const Response = require('../responses/response.class');

class PictureController {
  static async getAll(req, res) {
    const response = new Response(res);
    try {
      const pictures = await Picture.findAll();

      return response.contentSuccess(response.statusOk, pictures);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async getDetail(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const picture = await Picture.findByPk(id);

      return response.contentSuccess(response.statusOk, picture);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async create(req, res) {
    const response = new Response(res);
    try {
      const picture = await Picture.create(req.body);

      return response.contentSuccess(response.statusOk, picture);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async update(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const picture = await Picture.findByPk(id);
      if (!picture) {
        const error = { message: 'id not found', statusCode: response.statusBadRequest };
        throw error;
      }
      const updatedPicture = await picture.update(req.body);

      return response.contentSuccess(response.statusOk, updatedPicture);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async delete(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const picture = await Picture.findByPk(id);
      if (!picture) {
        const error = { message: 'id not found', statusCode: response.statusBadRequest };
        throw error;
      }
      await picture.destroy();

      return response.contentSuccess(response.statusOk, 'data deleted successfully');
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }
}

module.exports = PictureController;
