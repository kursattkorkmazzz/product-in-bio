import { CreationOptional, DataTypes, Model } from "sequelize";
import { DATABASE_INSTANCE } from "../db";

export class Verification extends Model {
  declare id: CreationOptional<string>;
  declare identifier: string;
  declare value: string;
  declare expiresAt: Date;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Verification.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
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
    modelName: "verification", // We need to choose the model name
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);
