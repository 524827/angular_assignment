const Users = require("../models/users.model");

const users = new Users();

exports.saveSubscriptions = (req, res, next) => {
  users.createNewUser(req, res);
};

exports.getAllUsers = (req, res, next) => {
  users.getUserList(req, res);
};

exports.updateUser = (req, res, next) => {
  users.updateUser(req, res);
};

exports.deleteUser = (req, res, next) => {
  users.deleteUser(req, res);
};
