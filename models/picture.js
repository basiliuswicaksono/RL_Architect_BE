const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Picture.belongsTo(models.Project, { foreignKey: 'style_id', targetKey: 'id' });
      Picture.belongsTo(models.Style, { foreignKey: 'project_id', targetKey: 'id' });
    }
  }
  Picture.init({
    name: DataTypes.STRING,
    url_picture: DataTypes.STRING,
    style_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Picture',
  });
  return Picture;
};
