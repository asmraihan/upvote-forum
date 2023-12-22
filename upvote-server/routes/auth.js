const prisma = require("../utils/prisma");
const { logger } = require("../utils/activityLogger")
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/token");
const { uploadFile } = require("../uploadFile");

// TODO USER ENDPOINTS

router.post(`/registerUser`, async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields." });
    }
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, 10),
            },
        })
        res.status(200).json(
            { message: "User Created Successfully", user, success: true },
        );
        await logger("user_created", name, `User created: ${user.id}`);

    } catch (error) {
        res.status(500).json(
            { error: "User Creation Failed", ...error, success: false },
        );
        await logger("error", name, `Error creating user: ${error.message}`);
    }
}
);

router.post('/loginUser', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) return res.status(404).json({ error: "User not found" });

        if (!user.password) return res.status(404).json({ error: "User Pass not found" });

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) return res.status(400).json({ error: "Invalid credentials" });

        return res.status(200).json({ message: "User Login Successfully", user, success: true });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server error", ...error, success: false });
    }
})


// get all users

router.post('/getAllUsers', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ message: "User Login Successfully", users, success: true });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", ...error, success: false });
    }
});

// get user by id

router.post(`/getUserById`, async (req, res) => {
    try {
        const { id } = req.body;
        const user = await prisma.user.findFirst({
            where: { id },
            include: {
                blogs: true,
                _count: {
                    select: { blogs: true }, /* FIXASM */
                },
            }
        })
        if (!user) {
            return res.status(404).json({ error: "User not found", success: false });
        }
        res.json({ message: "User Found Successfully", user, success: true });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", ...error, success: false });
    }
});


router.post(`/deleteUser`, async (req, res) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.delete({
            where: { email },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found", success: false });
        }
        res.json({ message: "User Deleted Successfully", ...user, success: true });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", ...error, success: false });
    }
});


// TODO ORGANIZATION ENDPOINTS

// router.post(`/createOrganization`, async (req, res) => {
//     const { name, owner_name, number, email, user_id, type, isMulti, location, img } = req.body;

//     try {
//         const imageName = await uploadFile(req.files.img, "image");

//         // Check if organization with the same user_id already exists
//         let organization;

//         const existingOrganization = await prisma.organization.findUnique({
//             where: { user_id: user_id },
//         });

//         if (existingOrganization) {
//             // If organization exists, update it
//             organization = await prisma.organization.update({
//                 where: { user_id: user_id },
//                 data: {
//                     name,
//                     owner_name,
//                     number,
//                     email,
//                     type,
//                     isMulti,
//                     location,
//                     logo: imageName,
//                 },
//             });

//             // Log activity for organization update
//             await logger("organization_updated", user_id, `Organization updated: ${name}`);
//         } else {
//             // If organization does not exist, create it
//             organization = await prisma.organization.create({
//                 data: {
//                     name,
//                     owner_name,
//                     number,
//                     email,
//                     user_id,
//                     type,
//                     isMulti,
//                     location,
//                     logo: imageName,
//                 },
//             });

//             // Update user completeness
//             await prisma.user.update({
//                 where: { user_id: user_id },
//                 data: { isComplete: "YES" },
//             });

//             // Log activity for organization creation
//             await logger("organization_created", user_id, `Organization created: ${name}`);
//         }

//         res.json({ message: `${name} Organization ${existingOrganization ? 'updated' : 'created'} successfully` });
//     } catch (error) {
//         // Log error
//         await logger("error", user_id, `Error creating/updating organization: ${error.message}`);
//         res.status(500).json({ error: error.message });
//     }
// });



// TODO ACTIVITY LOG ENDPOINTS

router.post('/getAllActivitiesForOrg', async (req, res) => {
    const { user_id, page = 1, pageSize = 10 } = req.body;
    try {
        const skip = (page - 1) * pageSize;

        const [activities, count] = await Promise.all([
            prisma.activity.findMany({
                where: {
                    user: user_id
                },
                orderBy: {
                    date: 'desc'
                },
                skip,
                take: pageSize
            }),
            prisma.activity.count({
                where: {
                    user: user_id
                }
            })
        ]);

        res.json({ activities, count });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
