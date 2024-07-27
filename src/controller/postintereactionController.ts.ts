import { Request, Response } from 'express';
import { IInteractionService } from '../service/postinteraction';
class InteractionController {
  private interactionService: IInteractionService;

  constructor(interactionService: IInteractionService) {
    this.interactionService = interactionService;
  }

  public likePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { postId } = req.params;
      const userId = parseInt(req.body.userId, 10); // Assuming userId is sent in the request body
      await this.interactionService.likePost(parseInt(postId, 10), userId);
      res.status(200).json({ message: 'Post liked' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: `Failed to like post: ${error.message}` });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred while liking the post' });
      }
    }
  };

  public dislikePost = async (req: Request, res: Response): Promise<void> => {
    try {
      const { postId } = req.params;
      const userId = parseInt(req.body.userId, 10); // Assuming userId is sent in the request body
      await this.interactionService.dislikePost(parseInt(postId, 10), userId);
      res.status(200).json({ message: 'Post disliked' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: `Failed to dislike post: ${error.message}` });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred while disliking the post' });
      }
    }
  };

  public addComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { postId } = req.params;
      const { userId, content } = req.body;
      await this.interactionService.addComment(parseInt(postId, 10), parseInt(userId, 10), content);
      res.status(201).json({ message: 'Comment added' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: `Failed to add comment: ${error.message}` });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred while adding the comment' });
      }
    }
  };

  public getPostComments = async (req: Request, res: Response): Promise<void> => {
    try {
      const { postId } = req.params;
      const comments = await this.interactionService.getPostComments(parseInt(postId, 10));
      res.status(200).json(comments);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: `Failed to get post comments: ${error.message}` });
      } else {
        res.status(500).json({ error: 'An unexpected error occurred while getting the comments' });
      }
    }
  };
}

export default InteractionController;
