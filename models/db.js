/**
Sets up relations and exposes the models
** Model definitions http://sequelize.readthedocs.org/en/1.7.0/docs/models/
** Model Relations http://docs.sequelizejs.com/en/latest/docs/associations/
**/
module.exports = function (sequelize) {
  // Defining Sequelize Objects
  var user = require('./user')(sequelize);
  var interest = require('./interest')(sequelize);

  /** Relations **/

  //User and Interest
  user.hasMany(interest, {
    as: 'interests'
  });

  // Create missing tables
  sequelize.sync({force: true});

  return {
    "user": user,
    "interest": interest
  };
};
