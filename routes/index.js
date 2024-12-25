const express = require('express');
const router = express.Router();
const schoolRoutes = require('./schoolRoutes');
const classroomRoutes = require('./classroomRoutes');
const studentRoutes = require('./studentRoutes');
const AuthController = require('../controllers/AuthController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const authValidation = require('../validation/authValidation');

router.use('/schools', schoolRoutes);
router.use('/classrooms', classroomRoutes);
router.use('/students', studentRoutes);
  
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName: 
 *                  type: string
 *               role:
 *                  type: string
 *               school:
 *                  type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid registration data
 */
router.post('/auth/register', validate(authValidation.register), AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       description: User login details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid login credentials
 */
router.post('/auth/login', validate(authValidation.login), AuthController.login);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh user authentication token
 *     tags: [Auth]
 *     requestBody:
 *       description: Request body to refresh token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             required:
 *               - refreshToken
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid refresh token
 */
router.post('/auth/refresh-token', validate(authValidation.refreshToken), AuthController.refreshToken);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset link
 *     tags: [Auth]
 *     requestBody:
 *       description: Request body to initiate forgot password process
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset link sent to email
 *       400:
 *         description: Invalid email address
 */
router.post('/auth/forgot-password', validate(authValidation.forgotPassword), AuthController.forgotPassword);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized access
 */
router.post('/auth/logout', auth(['superadmin', 'school_admin', 'teacher', 'student']), AuthController.logout);

module.exports = router;