const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Category, { foreignKey: 'category_id', targetKey: 'id' });
      Project.belongsTo(models.Style, { foreignKey: 'style_id', targetKey: 'id' });
      Project.hasMany(models.Picture, { foreignKey: 'project_id', sourceKey: 'id' });
    }
  }
  Project.init({
    name: DataTypes.STRING,
    style_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};
