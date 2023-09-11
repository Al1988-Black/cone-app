const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/cone", require("./cone.routes"));

module.exports = router;
