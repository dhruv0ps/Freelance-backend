const express = require('express');
const { addProject, updateProject, deleteProject, listProjects, getProjectsByTag } = require('../Controller/projectController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/projects', authMiddleware, addProject);
router.put('/projects/:id', authMiddleware, updateProject);
router.delete('/projects/:id', authMiddleware, deleteProject);
router.get('/projects', listProjects);
router.get('/projects/tags/:tag', getProjectsByTag);

module.exports = router;