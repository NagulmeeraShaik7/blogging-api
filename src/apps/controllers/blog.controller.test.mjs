import { createBlog, getBlog, getAllBlogs } from './blog.controller.mjs';
import * as blogUsecases from '../usecases/blog.usecase.mjs';

describe('Blog Controller', () => {
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

  describe('createBlog', () => {
    it('should create a blog and return 201', async () => {
      const mockBlog = { title: 'Test Blog' };
      req.body = { title: 'Test Blog', author: 'User123' };

      jest.spyOn(blogUsecases, 'createBlogUseCase').mockResolvedValue(mockBlog);

      await createBlog(req, res, next);

      expect(blogUsecases.createBlogUseCase).toHaveBeenCalledWith(req.body, req.body.author);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockBlog);
    });

    it('should pass error to next middleware on failure', async () => {
      const error = new Error('Create failed');
      jest.spyOn(blogUsecases, 'createBlogUseCase').mockRejectedValue(error);

      await createBlog(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getBlog', () => {
    it('should retrieve a blog and return 200', async () => {
      const mockBlog = { id: '1', title: 'Sample' };
      req.params.id = '1';

      jest.spyOn(blogUsecases, 'getBlogUseCase').mockResolvedValue(mockBlog);

      await getBlog(req, res, next);

      expect(blogUsecases.getBlogUseCase).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBlog);
    });

    it('should pass error to next middleware on failure', async () => {
      const error = new Error('Get failed');
      jest.spyOn(blogUsecases, 'getBlogUseCase').mockRejectedValue(error);

      await getBlog(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getAllBlogs', () => {
    it('should return all blogs with status 200', async () => {
      const mockBlogs = [{ id: '1' }, { id: '2' }];
      jest.spyOn(blogUsecases, 'getAllBlogsUseCase').mockResolvedValue(mockBlogs);

      await getAllBlogs(req, res, next);

      expect(blogUsecases.getAllBlogsUseCase).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBlogs);
    });

    it('should pass error to next middleware on failure', async () => {
      const error = new Error('Fetch failed');
      jest.spyOn(blogUsecases, 'getAllBlogsUseCase').mockRejectedValue(error);

      await getAllBlogs(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
