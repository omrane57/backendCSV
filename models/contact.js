"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // define association here
    }
  }
  Contact.init(
    {
      employeeName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: [["en-US"]],
            msg: "Employee name must contain only letters.",
          },
          notNull: {
            msg: "Employee name cannot be null.",
          },
          notEmpty: {
            msg: "Employee name cannot be empty.",
          },
        },
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: [["en-US"]],
            msg: "Designation must contain only letters.",
          },
          notNull: {
            msg: "Designation cannot be null.",
          },
          notEmpty: {
            msg: "Designation cannot be empty.",
          },
        },
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: [["en-US"]],
            msg: "Department must contain only letters.",
          },
          notNull: {
            msg: "Department cannot be null.",
          },
          notEmpty: {
            msg: "Department cannot be empty.",
          },
        },
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Experience must be a numeric value.",
          },
          notNull: {
            msg: "Experience cannot be null.",
          },
          notEmpty: {
            msg: "Experience cannot be empty.",
          },
        },
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Account ID must be a numeric value.",
          },
          notNull: {
            msg: "Account ID cannot be null.",
          },
          notEmpty: {
            msg: "Account ID cannot be empty.",
          },
        },
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Location ID must be a numeric value.",
          },
          notNull: {
            msg: "Location ID cannot be null.",
          },
          notEmpty: {
            msg: "Location ID cannot be empty.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Contact",
      underscored: true,
      paranoid: true,
    }
  );
  return Contact;
};
