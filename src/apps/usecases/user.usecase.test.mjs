import {
  createUserUseCase,
  getUserUseCase,
  getUserBlogsUseCase
} from './user.usecase.mjs';

import * as userRepository from '../repositories/user.repository.mjs';
import bcrypt from 'bcrypt';

// Mock external modules
jest.mock('../repositories/user.repository.mjs');
jest.mock('bcrypt');

describe('User Use Cases', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserUseCase', () => {
    it('should create a user with hashed password when all fields are valid', async () => {
      const userData = {
        username: 'john',
        email: 'john@example.com',
        password: 'password123'
      };

      const hashedPassword = 'hashed_password';
      const mockUser = {
        _id: 'u1',
        username: 'john',
        email: 'john@example.com',
        password: hashedPassword
      };

      bcrypt.hash.mockResolvedValue(hashedPassword);
      userRepository.createUser.mockResolvedValue(mockUser);

      const result = await createUserUseCase(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(userRepository.createUser).toHaveBeenCalledWith({
        username: 'john',
        email: 'john@example.com',
        password: hashedPassword
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw error if any field is missing', async () => {
      const invalidInputs = [
        { email: 'john@example.com', password: 'pass' },
        { username: 'john', password: 'pass' },
        { username: 'john', email: 'john@example.com' }
      ];

      for (const input of invalidInputs) {
        await expect(createUserUseCase(input)).rejects.toMatchObject({
          message: 'All fields are required',
          statusCode: 400
        });
      }

      expect(userRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe('getUserUseCase', () => {
    it('should return user if found', async () => {
      const mockUser = { _id: 'u1', username: 'john' };

      userRepository.findUserById.mockResolvedValue(mockUser);

      const result = await getUserUseCase('u1');

      expect(userRepository.findUserById).toHaveBeenCalledWith('u1');
      expect(result).toEqual(mockUser);
    });

    it('should throw 404 error if user not found', async () => {
      userRepository.findUserById.mockResolvedValue(null);

      await expect(getUserUseCase('u1')).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404
      });
    });
  });

  describe('getUserBlogsUseCase', () => {
    it('should return user blogs if user exists', async () => {
      const mockUser = {
        _id: 'u1',
        blogs: [{ id: 'b1' }, { id: 'b2' }]
      };

      userRepository.findUserBlogs.mockResolvedValue(mockUser);

      const result = await getUserBlogsUseCase('u1');

      expect(userRepository.findUserBlogs).toHaveBeenCalledWith('u1');
      expect(result).toEqual(mockUser.blogs);
    });

    it('should throw 404 error if user not found', async () => {
      userRepository.findUserBlogs.mockResolvedValue(null);

      await expect(getUserBlogsUseCase('u1')).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404
      });
    });
  });
});
