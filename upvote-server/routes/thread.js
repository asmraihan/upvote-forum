const prisma = require("../utils/prisma");
const { logger } = require("../utils/activityLogger")
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/token");
const { uploadFile } = require("../uploadFile");

// TODO THREAD ENDPOINTS



module.exports = router;
