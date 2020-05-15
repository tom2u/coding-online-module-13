const express = require("express");
const router = express.Router();

const candidateRoutes = require("./candidateRoutes");
const partyRoutes = require("./partyRoutes");
const voterRoutes = require("./voterRoutes");
const voteRoutes = require("./voteRoutes");

router.use(candidateRoutes);
router.use(voterRoutes);
router.use(partyRoutes);
router.use(voteRoutes);

module.exports = router;
