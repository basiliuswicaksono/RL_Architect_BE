const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Style extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Style.belongsTo(models.Category, { foreignKey: 'category_id', targetKey: 'id' });
      Style.hasMany(models.Project, { foreignKey: 'style_id', sourceKey: 'id' });
      Style.hasMany(models.Picture, { foreignKey: 'style_id', sourceKey: 'id' });
    }
  }
  Style.init({
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Style',
  });
  return Style;
};
