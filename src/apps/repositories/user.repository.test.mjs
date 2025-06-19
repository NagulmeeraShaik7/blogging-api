import { createUser, findUserById, findUserBlogs } from './user.repository.mjs';
import User from '../models/user.model.mjs';

// Mock the User model
jest.mock('../models/user.model.mjs');

describe('User Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const userData = { username: 'john', email: 'john@example.com', password: 'secret' };
      const mockUser = { _id: 'u1', ...userData };

      User.create.mockResolvedValue(mockUser);

      const result = await createUser(userData);

      expect(User.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if creation fails', async () => {
      User.create.mockRejectedValue(new Error('DB Error'));

      await expect(createUser({})).rejects.toThrow('DB Error');
    });
  });

  describe('findUserById', () => {
    it('should return a user without password field', async () => {
      const mockQuery = {
        select: jest.fn().mockResolvedValue({ _id: 'u1', username: 'john' }),
      };

      User.findById.mockReturnValue(mockQuery);

      const result = await findUserById('u1');

      expect(User.findById).toHaveBeenCalledWith('u1');
      expect(mockQuery.select).toHaveBeenCalledWith('-password');
      expect(result).toEqual({ _id: 'u1', username: 'john' });
    });

    it('should throw an error if retrieval fails', async () => {
      User.findById.mockImplementation(() => {
        throw new Error('Find failed');
      });

      await expect(findUserById('u1')).rejects.toThrow('Find failed');
    });
  });

  describe('findUserBlogs', () => {
    it('should return a user with populated blogs', async () => {
      const mockQuery = {
        populate: jest.fn().mockResolvedValue({ _id: 'u1', blogs: ['b1', 'b2'] }),
      };

      User.findById.mockReturnValue(mockQuery);

      const result = await findUserBlogs('u1');

      expect(User.findById).toHaveBeenCalledWith('u1');
      expect(mockQuery.populate).toHaveBeenCalledWith('blogs');
      expect(result).toEqual({ _id: 'u1', blogs: ['b1', 'b2'] });
    });

    it('should throw an error if blog population fails', async () => {
      User.findById.mockImplementation(() => {
        throw new Error('Populate error');
      });

      await expect(findUserBlogs('u1')).rejects.toThrow('Populate error');
    });
  });
});
