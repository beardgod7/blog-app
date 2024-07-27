import Post from '../models/post';

class sortService {
  
  public async getPostsSortedByCategory(): Promise<Post[]> {
    try {
      const posts = await Post.findAll({
        order: [['selectedCategory', 'ASC']],
      });
      return posts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get posts sorted by category: ${error.message}`);
      } else {
        throw new Error('An unexpected error occurred while getting posts sorted by category');
      }
    }
  }

  
  public async getPostsFilteredByCategory(category: string): Promise<Post[]> {
    try {
      const posts = await Post.findAll({
        where: { selectedCategory: category },
      });
      return posts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get posts filtered by category: ${error.message}`);
      } else {
        throw new Error('An unexpected error occurred while getting posts filtered by category');
      }
    }
  }
}

export default sortService;
