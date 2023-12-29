"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  account.init(
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          isAlpha: { args: true, msg: "Company Name Should Be String" },
          notNull: { args: true, msg: "Company Name Should Not Be Null" },
          notEmpty: { args: true, msg: "Company Name Should Not Be Empty" },
        },
      },
      website: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { args: true, msg: "website Url  Should Be String" },
          notNull: { args: true, msg: "website Url  Should Not Be Null" },
          notEmpty: { args: true, msg: "website Url  Should Not Be Empty" },
        },
      },
      employeeRange: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [
              [
                "0 - 10",
                "11 - 50",
                "51 - 200",
                "201 - 500",
                "501 - 1,000",
                "1,001 - 5,000",
                "5,001 - 10,000",
                "10,000+",
              ],
            ],
            msg: "Employee Range Must Be In The predefined Options",
          },
          notNull: {
            args: true,
            msg: "Employee Range  Should Not Be Null",
          },
          notEmpty: {
            args: true,
            msg: "Employee Range  Should Not Be Empty",
          },
        },
      },
      employeeSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: { args: true, msg: "Value Must Be Numeric" },
          notNull: true,
          notEmpty: true,
        },
      },
      revenueRange: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            msg: "Values Must Be Within the Given Range",
            args: [
              [
                "0 - $1M",
                "$1M - $10M",
                "$10M - $50M",
                "$50M - $100M",
                "$100M - $250M",
                "$250M - $500M",
                "$500M - $1B",
                "$1B - $10B",
                "$10B+",
              ],
            ],
          },
          notNull: {
            args: true,
            msg: "Revenue Range  Should Not Be Null",
          },
          notEmpty: {
            args: true,
            msg: "Revenue Range  Should Not Be Empty",
          },
        },
      },
      revenue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: { args: true, msg: "Revenue Must Be Numeric" },
          notNull: {
            args: true,
            msg: "Renvenue Should Not Be Null",
          },
          notEmpty: {
            args: true,
            msg: "Renvenue Should Not Be Empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "account",
      underscored: true,
      paranoid: true,
    }
  );
  return account;
};
