import { createUser, getUser } from './user.controller.mjs';
import * as userUsecases from '../usecases/user.usecase.mjs';

describe('User Controller', () => {
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

  describe('createUser', () => {
    it('should create a user and return 201', async () => {
      const mockUser = { id: 'u1', name: 'John Doe' };
      req.body = { name: 'John Doe', email: 'john@example.com' };

      jest.spyOn(userUsecases, 'createUserUseCase').mockResolvedValue(mockUser);

      await createUser(req, res, next);

      expect(userUsecases.createUserUseCase).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should pass error to next on failure', async () => {
      const error = new Error('User creation failed');
      jest.spyOn(userUsecases, 'createUserUseCase').mockRejectedValue(error);

      await createUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getUser', () => {
    it('should retrieve a user and return 200', async () => {
      const mockUser = { id: 'u1', name: 'Jane Doe' };
      req.params.id = 'u1';

      jest.spyOn(userUsecases, 'getUserUseCase').mockResolvedValue(mockUser);

      await getUser(req, res, next);

      expect(userUsecases.getUserUseCase).toHaveBeenCalledWith('u1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should pass error to next on failure', async () => {
      const error = new Error('Get user failed');
      jest.spyOn(userUsecases, 'getUserUseCase').mockRejectedValue(error);

      await getUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
