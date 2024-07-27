import Post, { PostAttributes, PostCreationAttributes,CommentAttributes } from '../models/post';

export interface IPostService {
  createPost(data: CreatePostDTO): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
  getAllPostsByUserId(userId: number): Promise<Post[]>;
  getPostById(id: number): Promise<Post | null>;
  updatePostById(id: number, data: UpdatePostDTO): Promise<Post | null>;
  deletePostById(id: number): Promise<boolean>;
}

export interface CreatePostDTO {
  imageData?: Buffer;
  imageContentType?: string;
  content?: string;
  selectedCategory?: string;
  comments?: CommentAttributes[];
  likes?: number;
  dislikes?: number;
  isEditing?: boolean;
  completed?: boolean;
}

export interface UpdatePostDTO {
  imageData?: Buffer;
  imageContentType?: string;
  content?: string;
  selectedCategory?: string;
  comments?: CommentAttributes[];
  likes?: number;
  dislikes?: number;
  isEditing?: boolean;
  completed?: boolean;
}

class PostService implements IPostService {
  private postModel: typeof Post;

  constructor(postModel: typeof Post) {
    this.postModel = postModel;
  }

  async createPost(data: CreatePostDTO): Promise<Post> {
    return await this.postModel.create(data as PostCreationAttributes);
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postModel.findAll();
  }
  async getAllPostsByUserId(userId: number): Promise<Post[]> {
    return await this.postModel.findAll({ where: { userId } });
  }
  async getPostById(id: number): Promise<Post | null> {
    return await this.postModel.findByPk(id);
  }

  async updatePostById(id: number, data: UpdatePostDTO): Promise<Post | null> {
    const post = await this.postModel.findByPk(id);
    if (post) {
      return await post.update(data as Partial<PostAttributes>);
    }
    return null;
  }

  async deletePostById(id: number): Promise<boolean> {
    const post = await this.postModel.findByPk(id);
    if (post) {
      await post.destroy();
      return true;
    }
    return false;
  }
}

export default PostService;
