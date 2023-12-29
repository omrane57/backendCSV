"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    static associate(models) {
      // define association here
    }
  }

  Location.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: [["en-US"]],
            msg: "Address must contain only letters.",
          },
          notNull: {
            msg: "Address cannot be null.",
          },
          notEmpty: {
            msg: "Address cannot be empty.",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: [["en-US"]],
            msg: "City must contain only letters.",
          },
          notNull: {
            msg: "City cannot be null.",
          },
          notEmpty: {
            msg: "City cannot be empty.",
          },
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: [["en-US"]],
            msg: "State must contain only letters.",
          },
          notNull: {
            msg: "State cannot be null.",
          },
          notEmpty: {
            msg: "State cannot be empty.",
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: [["en-US"]],
            msg: "Country must contain only letters.",
          },
          notNull: {
            msg: "Country cannot be null.",
          },
          notEmpty: {
            msg: "Country cannot be empty.",
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone cannot be null.",
          },
          notEmpty: {
            msg: "Phone cannot be empty.",
          },
        },
      },
      extras: {
        type: DataTypes.ARRAY({
          type: DataTypes.INTEGER,
          validate: {
            isNumeric: {
              msg: "Extras must be numeric values.",
            },
            notNull: {
              msg: "Extras cannot be null.",
            },
            notEmpty: {
              msg: "Extras cannot be empty.",
            },
          },
        }),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Extras cannot be null.",
          },
          notEmpty: {
            msg: "Extras cannot be empty.",
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
    },
    {
      sequelize,
      modelName: "Location",
      underscored: true,
      paranoid: true,
    }
  );

  return Location;
};
