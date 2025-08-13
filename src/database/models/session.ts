import {
  BelongsToGetAssociationMixin,
  CreationOptional,
  DataTypes,
  Model,
} from "sequelize";
import { DATABASE_INSTANCE } from "../db";
import { User } from "./user";

export class Session extends Model {
  declare id: CreationOptional<string>;
  declare expiresAt: Date;
  declare token: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare ipAddress?: CreationOptional<string>;
  declare userAgent?: CreationOptional<string>;
  declare userId: string;

  // Association mixins
  declare getUser: BelongsToGetAssociationMixin<User>;
}

Session.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
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
    modelName: "session", // We need to choose the model name
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

export function associateSession() {
  Session.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
}
