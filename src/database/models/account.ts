import {
  BelongsToGetAssociationMixin,
  CreationOptional,
  DataTypes,
  Model,
} from "sequelize";
import { DATABASE_INSTANCE } from "../db";
import { User } from "./user";

export class Account extends Model {
  declare id: CreationOptional<string>;
  declare accountId: string;
  declare providerId: string;
  declare userId: string;
  declare accessToken: CreationOptional<string>;
  declare refreshToken: CreationOptional<string>;
  declare idToken: CreationOptional<string>;
  declare accessTokenExpiresAt: CreationOptional<Date>;
  declare refreshTokenExpiresAt: CreationOptional<Date>;
  declare scope: CreationOptional<string>;
  declare password: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getUser: BelongsToGetAssociationMixin<User>;
}

Account.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    providerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accessTokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    refreshTokenExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: "account", // We need to choose the model name
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export function associateAccount() {
  Account.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    hooks: true,
  });
}
