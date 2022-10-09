const router = require('express').Router();
const { Post, User, Comment } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all postData and JOIN with comment & user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// MAY NEED TO ADD A SIGNUP ROUTE

// Get single post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ],
        });
        if (!postData) {
            res.status(400).json({ message: 'No Post found with this id' });
            return;
        }

        // Serialize data so the template can read it
        const post = postData.get({ plain: true });

        // Pass serialized data and session flag into template
        res.render('single-post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;