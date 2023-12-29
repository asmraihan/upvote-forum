const { uploadFile } = require("../uploadFile");
const prisma = require("../utils/prisma");
const express = require('express');
const router = express.Router();

// TODO THREAD ENDPOINTS

router.post('/createThread', async (req, res) => {
    const formData = req.body;
    const user = JSON.parse(formData.user);
    try {
        const data = {
            content: formData.content,
            image: '',
            isPublic: formData.isPublic,
        };

        const image = req.files.img;
        if (image) {
            try {
                const filename = await uploadFile(image, 'uploads/threads');
                data.image = filename;
            } catch (error) {
                return res.status(500).json({
                    status: 500,
                    message: 'Something went wrong. Please try again later.',
                });
            }
        }
        await prisma.post.create({
            data: {
                content: data.content,
                image: data.image || null,
                comment_count: 0,
                like_count: 0,
                isPublic: data.isPublic,
                user: {
                    connect: { id: parseInt(user.id) },
                },
            },
        });
        return res.status(200).json({ status: 200, message: 'Post created successfully!' });
    }
    catch (error) {
        return res.status(500).json({ status: 500, error: error.message });
    }
});

router.post('/getAllPosts', async (req, res) => {
    const formData = req.body;
    const user = JSON.parse(formData.user);
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                    },
                },
                Likes: {
                    take: 1,
                    where: {
                        user_id: parseInt(user.id),
                    },
                },
            },
            orderBy: {
                id: 'desc',
            },
        });

        console.log(posts);

        return res.status(200).json({status: 200, data: posts});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500,message: 'Internal Server Error'});
    }
});

module.exports = router;
