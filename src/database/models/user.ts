import { CreationOptional, DataTypes, Model } from "sequelize";
import { DATABASE_INSTANCE } from "../db";

export enum LanguageTypes {
  EN,
}

export class User extends Model {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare emailVerified: CreationOptional<boolean>;
  declare lang: string;
  declare image: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lang: {
      type: DataTypes.ENUM(...Object.keys(LanguageTypes)),
      defaultValue: "EN",
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    // Other model options go here
    sequelize: DATABASE_INSTANCE, // We need to pass the connection instance
    modelName: "user", // We need to choose the model name
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);
