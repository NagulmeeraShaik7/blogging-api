import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Blog API',
    version: '1.0.0',
    description: 'API for managing blogs, comments, and users',
  },
  servers: [
    {
      url: 'http://localhost:3000/api/',
      description: 'Development server',
    },
    {
      url: 'https://blogging-api-2000.onrender.com/api/',
      description: 'Production server',
    },
  ],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the user',
            example: '507f1f77bcf86cd799439011',
          },
          username: {
            type: 'string',
            description: 'The unique username of the user',
            example: 'johndoe',
          },
          email: {
            type: 'string',
            description: 'The unique email address of the user',
            example: 'johndoe@example.com',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the user was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the user was last updated',
          },
        },
      },
      Blog: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the blog',
            example: '507f1f77bcf86cd799439011',
          },
          title: {
            type: 'string',
            description: 'The title of the blog',
            example: 'My First Blog',
          },
          content: {
            type: 'string',
            description: 'The content of the blog',
            example: 'This is the content of my blog post.',
          },
          author: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'The ID of the user who authored the blog',
                example: '507f1f77bcf86cd799439011',
              },
              username: {
                type: 'string',
                description: 'The username of the author',
                example: 'johndoe',
              },
            },
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the blog was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the blog was last updated',
          },
        },
      },
      Comment: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'The unique identifier for the comment',
            example: '507f1f77bcf86cd799439011',
          },
          content: {
            type: 'string',
            description: 'The content of the comment',
            example: 'Great blog post!',
          },
          author: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'The ID of the user who authored the comment',
                example: '507f1f77bcf86cd799439011',
              },
              username: {
                type: 'string',
                description: 'The username of the author',
                example: 'johndoe',
              },
            },
          },
          blog: {
            type: 'string',
            description: 'The ID of the blog the comment is associated with',
            example: '507f1f77bcf86cd799439011',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the comment was created',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the comment was last updated',
          },
        },
      },
    },
  },
  paths: {
    '/blogs': {
      post: {
        summary: 'Create a new blog',
        tags: ['Blogs'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'content', 'author'],
                properties: {
                  title: {
                    type: 'string',
                    description: 'The title of the blog',
                    example: 'My First Blog',
                  },
                  content: {
                    type: 'string',
                    description: 'The content of the blog',
                    example: 'This is the content of my blog post.',
                  },
                  author: {
                    type: 'string',
                    description: 'The ID of the user authoring the blog',
                    example: '507f1f77bcf86cd799439011',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Blog created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Blog' },
              },
            },
          },
          '400': { description: 'Invalid request data' },
          '500': { description: 'Server error' },
        },
      },
      get: {
        summary: 'Retrieve all blogs',
        tags: ['Blogs'],
        responses: {
          '200': {
            description: 'List of all blogs',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Blog' },
                },
              },
            },
          },
          '500': { description: 'Server error' },
        },
      },
    },
    '/blogs/{id}': {
      get: {
        summary: 'Retrieve a blog by ID',
        tags: ['Blogs'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'The ID of the blog to retrieve',
            example: '507f1f77bcf86cd799439011',
          },
        ],
        responses: {
          '200': {
            description: 'Blog retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Blog' },
              },
            },
          },
          '404': { description: 'Blog not found' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/comments': {
      post: {
        summary: 'Create a new comment',
        tags: ['Comments'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['content', 'author', 'blog'],
                properties: {
                  content: {
                    type: 'string',
                    description: 'The content of the comment',
                    example: 'Great blog post!',
                  },
                  author: {
                    type: 'string',
                    description: 'The ID of the user authoring the comment',
                    example: '507f1f77bcf86cd799439011',
                  },
                  blog: {
                    type: 'string',
                    description: 'The ID of the blog the comment is associated with',
                    example: '507f1f77bcf86cd799439011',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Comment created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Comment' },
              },
            },
          },
          '400': { description: 'Invalid request data' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/comments/blog/{blogId}': {
      get: {
        summary: 'Retrieve all comments for a specific blog',
        tags: ['Comments'],
        parameters: [
          {
            in: 'path',
            name: 'blogId',
            required: true,
            schema: { type: 'string' },
            description: 'The ID of the blog to retrieve comments for',
            example: '507f1f77bcf86cd799439011',
          },
        ],
        responses: {
          '200': {
            description: 'List of comments for the specified blog',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Comment' },
                },
              },
            },
          },
          '404': { description: 'Blog not found or no comments available' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/users': {
      post: {
        summary: 'Create a new user',
        tags: ['Users'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'email', 'password'],
                properties: {
                  username: {
                    type: 'string',
                    description: 'The unique username of the user',
                    example: 'johndoe',
                  },
                  email: {
                    type: 'string',
                    description: 'The unique email address of the user',
                    example: 'johndoe@example.com',
                  },
                  password: {
                    type: 'string',
                    description: "The user's password",
                    example: 'securepassword123',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          '400': {
            description: 'Bad request, invalid input data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Invalid input data',
                    },
                  },
                },
              },
            },
          },
          '409': {
            description: 'Conflict, username or email already exists',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Username or email already exists',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get a user by ID',
        tags: ['Users'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' },
            description: 'The ID of the user to retrieve',
            example: '507f1f77bcf86cd799439011',
          },
        ],
        responses: {
          '200': {
            description: 'User retrieved successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' },
              },
            },
          },
          '400': {
            description: 'Invalid ID format',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'Invalid user ID',
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                      example: 'User not found',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.mjs'], // Path to the router files
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;