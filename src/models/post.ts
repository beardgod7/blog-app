import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/pgconfig';
import User from '../models/user'

export interface CommentAttributes {
  userId: number;
  content: string;
  createdAt: Date;
}


export interface PostAttributes {
  id: number;
  userId?: number;
  imageData?: Buffer;
  imageContentType?: string;
  content?: string;
  selectedCategory?: string;
  comments?: CommentAttributes[];
  likes: number;
  dislikes: number;
  isEditing: boolean;
  completed: boolean;
}

export interface PostCreationAttributes extends Optional<PostAttributes, 'id' | 'likes' | 'dislikes' | 'isEditing'> {}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public userid!:number;
  public imageData?: Buffer;
  public imageContentType?: string;
  public content?: string;
  public selectedCategory?: string;
  public comments?: CommentAttributes[];
  public likes!: number;
  public dislikes!: number;
  public isEditing!: boolean;
  public completed!: boolean;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  imageData: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  imageContentType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  selectedCategory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  comments: {
    type: DataTypes.JSON, 
    allowNull: true,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isEditing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  tableName: 'Post',
});

export default Post;

