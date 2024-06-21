
const Project = require('../models/Project');
const { AuthRequest } = require('../middleware/auth');

const addProject = async (req, res) => {
    if (req.user && (req.user as any).role !== 'Client') {
        return res.status(403).send({ error: 'Only clients can add projects' });
    }

    const { title, description, tags } = req.body;
    const clientId = (req.user as any)._id;

    try {
        const project = new Project({ title, description, tags, clientId });
        await project.save();
        res.status(201).send(project);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateProject = async (req, res) => {
    if (req.user && (req.user as any).role !== 'Client') {
        return res.status(403).send({ error: 'Only clients can update projects' });
    }

    const { id } = req.params;
    const updates = req.body;
    const clientId = (req.user as any)._id;

    try {
        const project = await Project.findOneAndUpdate({ _id: id, clientId }, updates, { new: true });
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }
        res.send(project);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteProject = async (req, res) => {
    if (req.user && (req.user as any).role !== 'Client') {
        return res.status(403).send({ error: 'Only clients can delete projects' });
    }

    const { id } = req.params;
    const clientId = (req.user as any)._id;

    try {
        const project = await Project.findOneAndDelete({ _id: id, clientId });
        if (!project) {
            return res.status(404).send({ error: 'Project not found' });
        }
        res.send(project);
    } catch (error) {
        res.status(400).send(error);
    }
};

const listProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getProjectsByTag = async (req,res) => {
    const { tag } = req.params;

    try {
        const projects = await Project.find({ tags: tag });
        res.send(projects);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { addProject, updateProject, deleteProject, listProjects, getProjectsByTag };
