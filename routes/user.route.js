const express = require("express");
const controller = require("./controller/user.controller");

const router = express.Router();

router.get("/all", controller.getAllUser);
router.get("/random", controller.randomUser);
router.post("/save", controller.saveAUser);
router.put("/bulk-update", controller.updateMultipleUser);

router.route("/update/:id").put(controller.updateAUser);
router.route("/delete/:id").delete(controller.deleteAUser);

module.exports = router;
