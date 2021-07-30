const { Project } = require('../models');
const Response = require('../responses/response.class');

class ProjectController {
  static async getAll(req, res) {
    const response = new Response(res);
    try {
      const projects = await Project.findAll();

      return response.contentSuccess(response.statusOk, projects);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async getDetail(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const project = await Project.findByPk(id);

      return response.contentSuccess(response.statusOk, project);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async create(req, res) {
    const response = new Response(res);
    try {
      const project = await Project.create(req.body);

      return response.contentSuccess(response.statusOk, project);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async update(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const project = await Project.findByPk(id);
      if (!project) {
        const error = { message: 'id not found', statusCode: response.statusBadRequest };
        throw error;
      }
      const updatedProject = await project.update(req.body);

      return response.contentSuccess(response.statusOk, updatedProject);
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }

  static async delete(req, res) {
    const response = new Response(res);
    try {
      const { id } = req.params;
      const project = await Project.findByPk(id);
      if (!project) {
        const error = { message: 'id not found', statusCode: response.statusBadRequest };
        throw error;
      }
      await project.destroy();

      return response.contentSuccess(response.statusOk, 'data deleted successfully');
    } catch (error) {
      const statusCode = error.statusCode || response.statusInternalServerError;
      return response.contentFail(statusCode, error.message);
    }
  }
}

module.exports = ProjectController;
