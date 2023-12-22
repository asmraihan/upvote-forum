const prisma = require("../utils/prisma");
const { logger } = require("../utils/activityLogger")
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/token");
const { uploadFile } = require("../uploadFile");

// TODO USER ENDPOINTS
router.post('/getAllUsers', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json({ message: "User Login Successfully", users, success: true });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", ...error, success: false });
    }
});



module.exports = router;
