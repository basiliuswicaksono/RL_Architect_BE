const { Category } = require('../models');
const Response = require('../responses/response.class');

class CategoryController {
  static async getAll(req, res) {
    const response = new Response(res);
    try {
      const categories = await Category.findAll();

      return response.contentSuccess(response.statusOk, categories);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async getDetail(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      return response.contentSuccess(response.statusOk, category);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async create(req, res) {
    const response = new Response(res);
    try {
      const category = await Category.create(req.body);

      return response.contentSuccess(response.statusOk, category);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async update(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        const error = { message: 'id not found', statusCode: response.statusBadRequest };
        throw error;
      }
      const updatedCategory = await category.update(req.body);

      return response.contentSuccess(response.statusOk, updatedCategory);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async delete(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        const error = { message: 'id not found', statusCode: response.statusBadRequest };
        throw error;
      }
      await category.destroy();

      return response.contentSuccess(response.statusOk, 'data deleted successfully');
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }
}

module.exports = CategoryController;
