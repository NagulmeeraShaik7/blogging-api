import { createComment, getBlogComments } from './comment.controller.mjs';
import * as commentUsecases from '../usecases/comment.usecase.mjs';

describe('Comment Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createComment', () => {
    it('should create a comment and return 201', async () => {
      const mockComment = { id: 'c1', text: 'Nice post!' };
      req.body = { text: 'Nice post!', blogId: 'b1', author: 'User1' };

      jest.spyOn(commentUsecases, 'createCommentUseCase').mockResolvedValue(mockComment);

      await createComment(req, res, next);

      expect(commentUsecases.createCommentUseCase).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockComment);
    });

    it('should pass error to next on failure', async () => {
      const error = new Error('Create failed');
      jest.spyOn(commentUsecases, 'createCommentUseCase').mockRejectedValue(error);

      await createComment(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getBlogComments', () => {
    it('should return comments for a blog and status 200', async () => {
      const mockComments = [
        { id: 'c1', text: 'First comment' },
        { id: 'c2', text: 'Second comment' },
      ];
      req.params.blogId = 'b1';

      jest.spyOn(commentUsecases, 'getBlogCommentsUseCase').mockResolvedValue(mockComments);

      await getBlogComments(req, res, next);

      expect(commentUsecases.getBlogCommentsUseCase).toHaveBeenCalledWith('b1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockComments);
    });

    it('should pass error to next on failure', async () => {
      const error = new Error('Get comments failed');
      jest.spyOn(commentUsecases, 'getBlogCommentsUseCase').mockRejectedValue(error);

      await getBlogComments(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
