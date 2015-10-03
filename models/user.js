var Seq = require("sequelize");

module.exports = function (db) {
  return db.define('User', {
    id: {
      type: Seq.UUID,
      primaryKey: true,
      defaultValue: Seq.UUIDV4
    },
    createdAt:    { type: Seq.DATE },
    name:         { type: Seq.STRING, allowNull: false },
    email:        { type: Seq.STRING, allowNull: false },
    gender:       { type: Seq.STRING },
    about:        { type: Seq.STRING },
    clean:        { type: Seq.STRING },
    age:          { type: Seq.STRING },
    noise:        { type: Seq.STRING },
    interaction:  { type: Seq.STRING },
    sleep:        { type: Seq.ARRAY(Seq.STRING) }
  }, {
    paranoid: true,
    freezeTableName: true,
    instanceMethods: {
      pack: function () {
        return {
          id: this.id,
          name: this.name,
          email: this.email
        }
      }
    }
  });
}
