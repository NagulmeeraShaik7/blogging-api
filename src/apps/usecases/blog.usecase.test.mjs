import {
  createBlogUseCase,
  getBlogUseCase,
  getAllBlogsUseCase
} from './blog.usecase.mjs';

import * as blogRepository from '../repositories/blog.repository.mjs';

// Mock the repository methods
jest.mock('../repositories/blog.repository.mjs');

describe('Blog Use Cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBlogUseCase', () => {
    it('should create a blog when title and content are provided', async () => {
      const blogData = { title: 'My Blog', content: 'Some content' };
      const userId = 'user123';
      const mockBlog = { id: 'blog1', ...blogData, author: userId };

      blogRepository.createBlog.mockResolvedValue(mockBlog);

      const result = await createBlogUseCase(blogData, userId);

      expect(blogRepository.createBlog).toHaveBeenCalledWith({ ...blogData, author: userId });
      expect(result).toEqual(mockBlog);
    });

    it('should throw error if title is missing', async () => {
      const blogData = { content: 'Only content' };
      const userId = 'user123';

      await expect(createBlogUseCase(blogData, userId)).rejects.toMatchObject({
        message: 'Title and content are required',
        statusCode: 400,
      });

      expect(blogRepository.createBlog).not.toHaveBeenCalled();
    });

    it('should throw error if content is missing', async () => {
      const blogData = { title: 'Only title' };
      const userId = 'user123';

      await expect(createBlogUseCase(blogData, userId)).rejects.toMatchObject({
        message: 'Title and content are required',
        statusCode: 400,
      });

      expect(blogRepository.createBlog).not.toHaveBeenCalled();
    });
  });

  describe('getBlogUseCase', () => {
    it('should return blog when found by ID', async () => {
      const blogId = 'blog123';
      const mockBlog = { id: blogId, title: 'Sample', content: '...' };

      blogRepository.findBlogById.mockResolvedValue(mockBlog);

      const result = await getBlogUseCase(blogId);

      expect(blogRepository.findBlogById).toHaveBeenCalledWith(blogId);
      expect(result).toEqual(mockBlog);
    });

    it('should throw 404 error when blog is not found', async () => {
      blogRepository.findBlogById.mockResolvedValue(null);

      await expect(getBlogUseCase('unknownId')).rejects.toMatchObject({
        message: 'Blog not found',
        statusCode: 404,
      });
    });
  });

  describe('getAllBlogsUseCase', () => {
    it('should return all blogs', async () => {
      const blogs = [{ id: 'b1' }, { id: 'b2' }];
      blogRepository.findAllBlogs.mockResolvedValue(blogs);

      const result = await getAllBlogsUseCase();

      expect(blogRepository.findAllBlogs).toHaveBeenCalled();
      expect(result).toEqual(blogs);
    });
  });
});
