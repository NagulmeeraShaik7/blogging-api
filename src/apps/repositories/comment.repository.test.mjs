import { createComment, findCommentsByBlogId } from './comment.repository.mjs';
import Comment from '../models/comment.model.mjs';

// Mock the Comment model
jest.mock('../models/comment.model.mjs');

describe('Comment Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createComment', () => {
    it('should create and return a comment', async () => {
      const commentData = { content: 'Nice post!', blog: 'b1', author: 'u1' };
      const mockComment = { _id: 'c1', ...commentData };

      Comment.create.mockResolvedValue(mockComment);

      const result = await createComment(commentData);

      expect(Comment.create).toHaveBeenCalledWith(commentData);
      expect(result).toEqual(mockComment);
    });

    it('should throw an error if creation fails', async () => {
      Comment.create.mockRejectedValue(new Error('DB Error'));

      await expect(createComment({})).rejects.toThrow('DB Error');
    });
  });

  describe('findCommentsByBlogId', () => {
    it('should return comments for a given blog with populated authors', async () => {
      const mockQuery = {
        populate: jest.fn().mockResolvedValue(['comment1', 'comment2']),
      };

      Comment.find.mockReturnValue(mockQuery);

      const result = await findCommentsByBlogId('b1');

      expect(Comment.find).toHaveBeenCalledWith({ blog: 'b1' });
      expect(mockQuery.populate).toHaveBeenCalledWith('author', 'username');
      expect(result).toEqual(['comment1', 'comment2']);
    });

    it('should throw an error if retrieval fails', async () => {
      Comment.find.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(findCommentsByBlogId('b1')).rejects.toThrow('DB Error');
    });
  });
});
