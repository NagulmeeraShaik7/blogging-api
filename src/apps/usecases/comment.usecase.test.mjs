import {
  createCommentUseCase,
  getBlogCommentsUseCase
} from './comment.usecase.mjs';

import * as commentRepository from '../repositories/comment.repository.mjs';

jest.mock('../repositories/comment.repository.mjs');

describe('Comment Use Cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCommentUseCase', () => {
    it('should create a comment when all fields are provided', async () => {
      const commentData = {
        content: 'Nice post!',
        author: 'user123',
        blog: 'blog123'
      };
      const mockComment = { id: 'c1', ...commentData };

      commentRepository.createComment.mockResolvedValue(mockComment);

      const result = await createCommentUseCase(commentData);

      expect(commentRepository.createComment).toHaveBeenCalledWith(commentData);
      expect(result).toEqual(mockComment);
    });

    it('should throw error if content is missing', async () => {
      const commentData = { author: 'user123', blog: 'blog123' };

      await expect(createCommentUseCase(commentData)).rejects.toMatchObject({
        message: 'Content, author, and blog are required',
        statusCode: 400
      });

      expect(commentRepository.createComment).not.toHaveBeenCalled();
    });

    it('should throw error if author is missing', async () => {
      const commentData = { content: 'Great!', blog: 'blog123' };

      await expect(createCommentUseCase(commentData)).rejects.toMatchObject({
        message: 'Content, author, and blog are required',
        statusCode: 400
      });

      expect(commentRepository.createComment).not.toHaveBeenCalled();
    });

    it('should throw error if blog is missing', async () => {
      const commentData = { content: 'Great!', author: 'user123' };

      await expect(createCommentUseCase(commentData)).rejects.toMatchObject({
        message: 'Content, author, and blog are required',
        statusCode: 400
      });

      expect(commentRepository.createComment).not.toHaveBeenCalled();
    });
  });

  describe('getBlogCommentsUseCase', () => {
    it('should return comments for a given blog ID', async () => {
      const blogId = 'blog123';
      const mockComments = [
        { id: 'c1', content: 'Nice post' },
        { id: 'c2', content: 'Thanks for sharing' }
      ];

      commentRepository.findCommentsByBlogId.mockResolvedValue(mockComments);

      const result = await getBlogCommentsUseCase(blogId);

      expect(commentRepository.findCommentsByBlogId).toHaveBeenCalledWith(blogId);
      expect(result).toEqual(mockComments);
    });

    it('should handle empty results gracefully', async () => {
      commentRepository.findCommentsByBlogId.mockResolvedValue([]);

      const result = await getBlogCommentsUseCase('blog123');

      expect(result).toEqual([]);
    });
  });
});
