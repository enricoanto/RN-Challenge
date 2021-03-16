'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title must be field."
        },
        len: {
          args: [0,17],
          msg: "Title max 17 characters"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description must be field."
        },
        len: {
          args: [0,39],
          msg: "Description max 39 characters"
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate:
      {
        isAfter:{
          args: new Date().toString(),
          msg: "Date must be after ToDo item is created."
        }
      }
    }
  }, {
      hooks : {
        beforeCreate(todo) {
          todo.status = 'Uncompleted'
        },
      },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};