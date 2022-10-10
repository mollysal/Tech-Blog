const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
// View all Posts Route
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        const posts = postData.get({ plain: true });

        res.render('dashbaord', {
            ...posts,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
        res.redirect('login');
    }
});

// Edit Route
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        });

        if (!postData) {
            res.status(400).json({ message: 'No Post found with this id' });
            return;
        }

        const posts = postData.get({ plain: true });

        res.render('dashbaord', {
            ...posts,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
        res.redirect('login');
    }
});

// Create Route
router.get('/create', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                },
            ]
        });
        const posts = postData.get({ plain: true });

        res.render('dashbaord', {
            ...posts,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 