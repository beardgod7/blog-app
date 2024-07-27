import { Request, Response } from 'express';
import sortService from '../service/sort-filterservice'; 

class sortController {
  private sortService: sortService;

  constructor(sortService: sortService) {
    this.sortService =  sortService;
  }

  
  public getPostsSortedByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const posts = await this.sortService.getPostsSortedByCategory();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

 
  public getPostsFilteredByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { category } = req.params;
      const posts = await this.sortService.getPostsFilteredByCategory(category);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
}

export default sortController;
