const express = require("express");
const controller = require("./controller/user.controller");

const router = express.Router();

router.get("/all", controller.getAllUser);
router.get("/random", controller.randomUser);
router.post("/save", controller.saveAUser);
router.put("/bulkUpdate", controller.updateMultipleUser);

router
  .route("/:id")
  .put(controller.updateMultipleUser)
  .delete(controller.deleteAUser);

module.exports = router;
