// import Response from '../responses/response.class';
const Response = require('../responses/response.class');
const { Style } = require('../models');

class StyleController {
  static async getAll(req, res) {
    const response = new Response(res);
    try {
      const styles = await Style.findAll();

      return response.contentSuccess(response.statusOk, styles);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async getDetail(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const style = await Style.findByPk(id);

      return response.contentSuccess(response.statusOk, style);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async create(req, res) {
    const response = new Response(res);
    try {
      const style = await Style.create(req.body);

      return response.contentSuccess(response.statusOk, style);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async update(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const style = await Style.findByPk(id);
      if (!style) {
        const error = { message: 'id not found', statusCode: response.statusBadRequest };
        throw error;
      }
      const updatedStyle = await style.update(req.body);

      return response.contentSuccess(response.statusOk, updatedStyle);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async delete(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const style = await Style.findByPk(id);
      if (!style) {
        const error = { message: 'id not found', statusCode: response.statusBadRequest };
        throw error;
      }
      await style.destroy();

      return response.contentSuccess(response.statusOk, 'data deleted successfully');
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }
}

module.exports = StyleController;
