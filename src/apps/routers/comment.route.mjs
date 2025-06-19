import express from 'express';
import { createComment, getBlogComments } from '../controllers/comment.controller.mjs';

const router = express.Router();

/**
 * @swagger
 * api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - author
 *               - blog
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *               author:
 *                 type: string
 *                 description: The ID of the user authoring the comment
 *               blog:
 *                 type: string
 *                 description: The ID of the blog the comment is associated with
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 content:
 *                   type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 blog:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.post('/', createComment);

/**
 * @swagger
 * api/comments/blog/{blogId}:
 *   get:
 *     summary: Retrieve all comments for a specific blog
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to retrieve comments for
 *     responses:
 *       200:
 *         description: List of comments for the specified blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   author:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   blog:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Blog not found or no comments available
 *       500:
 *         description: Server error
 */
router.get('/blog/:blogId', getBlogComments);

export default router;