var Seq = require("sequelize");

module.exports = function (db) {
  return db.define('Interest', {
    id: {
      type: Seq.UUID,
      primaryKey: true,
      defaultValue: Seq.UUIDV4
    },
    name: {
      type: Seq.STRING,
      allowNull: false
    }
  }, {
    paranoid: true,
    freezeTableName: true,
    instanceMethods: {
      pack: function () {
          return {
            id: this.id,
            name: this.name
          };
      }
    }
  });
}
