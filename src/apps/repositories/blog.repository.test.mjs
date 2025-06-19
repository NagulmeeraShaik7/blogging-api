import { createBlog, findBlogById, findAllBlogs } from './blog.repository.mjs';
import Blog from '../models/blog.model.mjs';

// Automatically mock the Blog model
jest.mock('../models/blog.model.mjs');

describe('Blog Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBlog', () => {
    it('should create and return a new blog', async () => {
      const blogData = { title: 'Test', content: 'Hello', author: 'user123' };
      const mockBlog = { _id: '1', ...blogData };

      Blog.create.mockResolvedValue(mockBlog);

      const result = await createBlog(blogData);

      expect(Blog.create).toHaveBeenCalledWith(blogData);
      expect(result).toEqual(mockBlog);
    });

    it('should throw error if creation fails', async () => {
      Blog.create.mockRejectedValue(new Error('DB Error'));
      await expect(createBlog({})).rejects.toThrow('DB Error');
    });
  });

  describe('findBlogById', () => {
    it('should return a blog with populated author', async () => {
      const mockBlog = { _id: '1', title: 'Test Blog', populate: jest.fn().mockResolvedValue('populatedBlog') };

      Blog.findById.mockReturnValue(mockBlog);

      const result = await findBlogById('1');

      expect(Blog.findById).toHaveBeenCalledWith('1');
      expect(mockBlog.populate).toHaveBeenCalledWith('author', 'username');
      expect(result).toEqual('populatedBlog');
    });

    it('should throw error if retrieval fails', async () => {
      Blog.findById.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(findBlogById('123')).rejects.toThrow('DB Error');
    });
  });

  describe('findAllBlogs', () => {
    it('should return all blogs with populated authors', async () => {
      const mockQuery = { populate: jest.fn().mockResolvedValue(['blog1', 'blog2']) };
      Blog.find.mockReturnValue(mockQuery);

      const result = await findAllBlogs();

      expect(Blog.find).toHaveBeenCalled();
      expect(mockQuery.populate).toHaveBeenCalledWith('author', 'username');
      expect(result).toEqual(['blog1', 'blog2']);
    });

    it('should throw error if retrieval fails', async () => {
      Blog.find.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(findAllBlogs()).rejects.toThrow('DB Error');
    });
  });
});
