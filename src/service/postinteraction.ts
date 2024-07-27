import  Post from '../models/post'; 
import { CommentAttributes } from '../models/post'


export interface IInteractionService {
  likePost(postId: number, userId: number): Promise<void>;
  dislikePost(postId: number, userId: number): Promise<void>;
  addComment(postId: number, userId: number, content: string): Promise<void>;
  getPostComments(postId: number): Promise<CommentAttributes[]>;
}


class InteractionService implements IInteractionService {
    private postModel: typeof Post;

    constructor(postModel: typeof Post) {
      this.postModel = postModel;
    }

    public async likePost(postId: number, userId: number): Promise<void> {
      try {
        const post = await Post.findByPk(postId);
        if (post) {
          post.likes += 1;
          await post.save();
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to like post: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred while liking the post');
        }
      }
    }
  
    public async dislikePost(postId: number, userId: number): Promise<void> {
      try {
        const post = await Post.findByPk(postId);
        if (post) {
          post.dislikes += 1;
          await post.save();
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to dislike post: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred while disliking the post');
        }
      }
    }
  
    public async addComment(postId: number, userId: number, content: string): Promise<void> {
      try {
        const post = await Post.findByPk(postId);
        if (post) {
          const comments: CommentAttributes[] = post.comments || [];
          comments.push({ userId, content, createdAt: new Date() });
          post.comments = comments;
          await post.save();
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to add comment: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred while adding the comment');
        }
      }
    }
  
    public async getPostComments(postId: number): Promise<CommentAttributes[]> {
      try {
        const post = await Post.findByPk(postId);
        if (post) {
          return post.comments || [];
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get post comments: ${error.message}`);
        } else {
          throw new Error('An unexpected error occurred while getting the comments');
        }
      }
    }
  }
  



export default InteractionService;
