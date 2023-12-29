const prisma = require("../utils/prisma");
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/token");
const { uploadFile } = require("../uploadFile");

// TODO USER ENDPOINTS

router.post('/register', async (req, res) => {
    const { email, password, username, name } = req.body;
    const errormsg = []
    try {
        // Check if email already exists
        const isEmailExist = await prisma.user.findUnique({
            where: {
                email: email, // Corrected destructuring
            },
            select: {
                id: true,
            },
        });

        errormsg.push(isEmailExist)

        if (isEmailExist) {
            return res.status(400).json({
                status: 400,
                errors: {
                    email: 'Email already taken. Please use another email.',
                },
            });
        }

        // Check if username already exists
        const isUsernameExist = await prisma.user.findUnique({
            where: {
                username
            },
            select: {
                id: true,
            },
        });

        if (isUsernameExist) {
            return res.status(400).json({
                status: 400,
                errors: {
                    username: 'Username already taken. Please use another username.',
                },
            });
        }

        // Encrypt the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create user
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                name
            }
        });

        res.status(200).json({
            status: 200,
            message: 'Account created successfully. Please login into your account!',
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            errormsg
        });
    }
});




router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if there is any email or not
        const isUserExist = await prisma.user.findUnique({
            where: {
                email
            },
        });

        if (isUserExist) {
            // Check if the password is correct or not
            const isPasswordSame = bcrypt.compareSync(
                password,
                isUserExist.password
            );

            if (isPasswordSame) {
                res.status(200).json({
                    status: 200,
                    message: 'You logged in successfully!',
                });
            } else {
                res.status(400).json({
                    status: 400,
                    errors: {
                        email: 'Invalid credentials.',
                    },
                });
            }
        } else {
            res.status(400).json({
                status: 400,
                errors: {
                    email: 'No account found with this email',
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            success: false,
        });
    }
});


router.post('/authUser', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            return res.status(200).json({
                status: 200,
                user,
                id: user.id.toString(),
                success: true,
            });
        } else {
            return res.status(400).json({
                status: 400,
                errors: {
                    email: 'No account found with this email',
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            success: false,
        });
    }
});


// Get all users

router.post('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                image: true,
                created_at: true,
                Post: true,
                Comment: true,
                Notification: true,
                Likes: true
            }
        });
        res.status(200).json({
            status: 200,
            users,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            success: false,
        });
    }
});




module.exports = router;
