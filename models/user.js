var Seq = require("sequelize");

module.exports = function (db) {
  return db.define('User', {
    id: {
      type: Seq.UUID,
      primaryKey: true,
      defaultValue: Seq.UUIDV4
    },
    createdAt: {
      type: Seq.DATE
    },
    name: {
      type: Seq.STRING,
      allowNull: false
    },
    email: {
      type: Seq.STRING,
      allowNull: false
    },
    intro: {
      type: Seq.STRING
    }
  }, {
    paranoid: true,
    freezeTableName: true,
    instanceMethods: {
      pack: function () {
        return {
          id: this.id,
          name: this.name,
          email: this.email,
          intro: this.intro
        }
      }
    }
  });
}
