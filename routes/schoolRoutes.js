const express = require('express');
const router = express.Router();
const SchoolController = require('../controllers/SchoolController');
const auth = require('../middleware/auth');

router.post('/', auth(['superadmin']), SchoolController.create);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all schools
 *     tags: [School]
 *     security:
 *       - bearerAuth: []  # This indicates that the endpoint is protected and requires authentication
 *     responses:
 *       200:
 *         description: List of all schools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   contactNumber:
 *                     type: string
 *       401:
 *         description: Unauthorized access
 */
router.get('/', auth(['superadmin', 'school_admin']), SchoolController.getAll);


module.exports = router;