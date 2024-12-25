/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing students
 */

const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const studentValidation = require('../validation/studentValidation');

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Student data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               schoolId:
 *                 type: string
 *             required:
 *               - name
 *               - age
 *               - schoolId
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid data
 */
router.post('/', auth(['school_admin']), validate(studentValidation.create), StudentController.create);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   schoolId:
 *                     type: string
 */
router.get('/', auth(['school_admin', 'superadmin']), StudentController.getAll);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student
 *     responses:
 *       200:
 *         description: Student found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 schoolId:
 *                   type: string
 *       404:
 *         description: Student not found
 */
router.get('/:id', auth(['school_admin', 'superadmin']), StudentController.getById);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student
 *     requestBody:
 *       description: Data to update student
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               schoolId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Student not found
 */
router.put('/:id', auth(['school_admin']), validate(studentValidation.update), StudentController.update);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student
 *     responses:
 *       200:
 *         description: Student deleted
 *       404:
 *         description: Student not found
 */
router.delete('/:id', auth(['school_admin']), StudentController.delete);

/**
 * @swagger
 * /students/school/{schoolId}:
 *   get:
 *     summary: Get all students for a specific school
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         description: School ID
 *     responses:
 *       200:
 *         description: List of students
 *       404:
 *         description: School not found
 */
router.get('/school/:schoolId', auth(['school_admin', 'superadmin']), StudentController.getAll);

/**
 * @swagger
 * /students/{id}/transfer:
 *   post:
 *     summary: Transfer a student to another school
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student
 *     requestBody:
 *       description: Transfer data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newSchoolId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student transferred successfully
 *       400:
 *         description: Invalid transfer data
 *       404:
 *         description: Student not found
 */
router.post('/:id/transfer', auth(['school_admin', 'superadmin']), validate(studentValidation.transfer), StudentController.transfer);

module.exports = router;
