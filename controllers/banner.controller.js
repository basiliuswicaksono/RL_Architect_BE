const { Banner } = require('../models');
const Response = require('../responses/response.class');

class BannerController {
  static async getAll(req, res) {
    const response = new Response(res);
    try {
      const banners = await Banner.findAll();

      return response.contentSuccess(response.statusOk, banners);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async getDetail(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const banner = await Banner.findByPk(id);

      return response.contentSuccess(response.statusOk, banner);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async create(req, res) {
    const response = new Response(res);
    try {
      const banner = await Banner.create(req.body);

      return response.contentSuccess(response.statusOk, banner);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async update(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const banner = await Banner.findByPk(id);
      if (!banner) {
        const error = { message: 'id not found', statusCode: response.statusBadRequest };
        throw error;
      }
      const updatedBanner = await banner.update(req.body);

      return response.contentSuccess(response.statusOk, updatedBanner);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async delete(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const banner = await Banner.findByPk(id);
      if (!banner) {
        const error = { message: 'id not found', statusCode: response.statusBadRequest };
        throw error;
      }
      await banner.destroy();

      return response.contentSuccess(response.statusOk, 'data deleted successfully');
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }
}

module.exports = BannerController;
