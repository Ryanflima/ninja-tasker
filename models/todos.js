// create a model for our tasks

// exporting this model to our index
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Tasks", {
    // define columns of our table
    todo: { type: DataTypes.STRING }
  });
  return Task;
};
