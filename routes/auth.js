const router = require('express').Router();
const { User } = require('../models/index');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password!' });
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Inorrect username or password!' });
            return;
        }



        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ message: 'User created successfully' });
        });


    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Sign up route for new User
router.post('/signup', async (req, res) => {

    const { username, email, password, confirmPassword } = req.body;

    const existingUserEmail = await User.findOne({ where: { email: email } });
    const existingUserUsername = await User.findOne({ where: { username: username } });

    if (existingUserEmail) {
        return res.status(400).json({ message: 'Email already in use!' });
    }
    if (existingUserUsername) {
        return res.status(400).json({ message: 'This username already exists' });
    }

    try {

        const userData = await User.create({
            username: username,
            email: email,
            password: password
        });


        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json({ message: 'User created successfully' });

        })

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(err => {
            if (err) {
                console.error('Logout error:', err);
                res.status(500).json({ message: 'Logout failed.' });
            } else {
                res.clearCookie('connect.sid'); // Optional: clears cookie if you're using one
                res.status(204).end(); // No Content
            }
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;