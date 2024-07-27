import { Request, Response } from 'express';
import { IPostService } from '../service/postservice';

class PostController {
  private postService: IPostService;

  constructor(postService: IPostService) {
    this.postService = postService;
  }

  public createPost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { content, selectedCategory } = req.body;
      const imageData = req.file?.buffer;
      const imageContentType = req.file?.mimetype;

      console.log('Received data for post creation:', { content, selectedCategory, imageContentType });

      const post = await this.postService.createPost({ content, selectedCategory, imageData, imageContentType });
      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await this.postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public getAllPostsByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const posts = await this.postService.getAllPostsByUserId(parseInt(userId, 10));
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(parseInt(id, 10));
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public updatePostById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { content, selectedCategory } = req.body;
      const imageData = req.file?.buffer;
      const imageContentType = req.file?.mimetype;

      const post = await this.postService.updatePostById(parseInt(id, 10), { content, selectedCategory, imageData, imageContentType });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

  public deletePostById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.postService.deletePostById(parseInt(id, 10));
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}

export default PostController;
