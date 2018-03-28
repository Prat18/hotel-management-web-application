const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const Booking = require('../models/Booking')

module.exports = (router) => {

    router.post('/register', (req, res) => {
        //req.body.email;
        //req.body.username;
        //req.body.password;

        if (!req.body.email) {
            res.json({ success: false, message: 'you must provide an e-mail' });
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'you must provide a username' });
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide a password' });
                } else {
                    //console.log(req.body);
                    //res.send('hello world');

                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    })
                    user.save((err) => {
                        // Check if error occured
                        if (err) {
                            // Check if error is an error indicating duplicate account
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
                            } else {
                                // Check if error is a validation rror
                                if (err.errors) {
                                    // Check if validation error is in the email field
                                    if (err.errors.email) {
                                        res.json({ success: false, message: err.errors.email.message }); // Return error
                                    } else {
                                        // Check if validation error is in the username field
                                        if (err.errors.username) {
                                            res.json({ success: false, message: err.errors.username.message }); // Return error
                                        } else {
                                            // Check if validation error is in the password field
                                            if (err.errors.password) {
                                                res.json({ success: false, message: err.errors.password.message }); // Return error
                                            } else {
                                                res.json({ success: false, message: err }); // Return any other error not already covered
                                            }
                                        }
                                    }
                                } else {
                                    res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
                                }
                            }
                        } else {
                            res.json({ success: true, message: 'Acount registered!' }); // Return success
                        }
                    });
                }
            }
        }
    });



    router.post('/login', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'No username was provided' }); // Return error
        } else {
            // Check if password was provided
            if (!req.body.password) {
                res.json({ success: false, message: 'No password was provided.' }); // Return error
            } else {
                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err })
                    } else {
                        if (!user) {
                            res.json({ success: false, message: 'username not found' });
                        } else {
                            const validPassword = user.comparePassword(req.body.password);
                            if (!validPassword) {
                                res.json({ success: false, message: 'password invalid' })
                            } else {
                                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                                res.json({ success: true, message: 'Success!', token: token, user: { username: user.username } });
                            }
                        }
                    }
                })
            }
        }
    });

     router.use((req, res, next) => {
        const token = req.headers['authorization']; // Create token found in headers
        // Check if token was found in headers
        console.log(token);
        if (!token) {
            console.log('fuck again' + token + "<------");
            res.json({ success: false, message: 'fuck this shit' }); // Return error
        } else {
            // Verify the token is valid
            jwt.verify(token, config.secret, (err, decoded) => {
                // Check if error is expired or invalid
                if (err) {
                    res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
                } else {
                    req.decoded = decoded; // Create global variable to use in any request beyond
                    next(); // Exit middleware
                }
            });
        }
    }); 

    router.get('/profile', (req, res) => {
        User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
            if (err) {
                res.json({ success: false, message: err })
            } else {
                if (!user) {
                    res.json({ success: false, message: 'user not found' })
                } else {
                    res.json({ success: true, user: user });
                }
            }
        })
    })

    return router;
}
