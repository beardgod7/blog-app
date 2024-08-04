import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/pgconfig';


export interface UserAttributes {
  id: number;
  user_name: string;
  imageData?: Buffer;
  role:string;
  imageContentType?: string;
  password: string;
  createdAt: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public user_name!: string;
  public imageData?: Buffer;
  public role!:string;
  public imageContentType?: string;
  public password!: string;
  public createdAt!: Date;
  public comparePassword!: (password: any) => Promise<boolean>;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageData: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  imageContentType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'user',
});

export default User;
