const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");
const userValidations = require("../validations/user.validation");
const validator = require("express-joi-validation").createValidator({});

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post(
  "/create",
  validator.body(userValidations.createUserValidation),
  controller.saveSubscriptions
);

router.get("/list", controller.getAllUsers);

router.put(
  "/",
  validator.body(userValidations.updateUserValidation),
  controller.updateUser
);

router.delete("/:id", controller.deleteUser);

module.exports = router;
