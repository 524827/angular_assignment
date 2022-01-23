const { usersModel } = require("../schemas/users.schema");
const sendResponse = require("../core/response/send-response");
const { enctryptPassword } = require("../utils/password.utils");

class Users {
  /**
   *
   * @param {*} req - reqeust object
   * @param {*} res - response object
   * @returns
   */
  async createNewUser(req, res) {
    try {
      const password = await enctryptPassword(req.body.password);

      const user = await usersModel.findOne({ email: req.body.email });
      if (user) {
        sendResponse(res, [], "Email already exist", true, 409);
      }
      await usersModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password,
      });
      sendResponse(res, [], "user save successfully", false, 200);
    } catch (e) {
      sendResponse(res, [], "Internal server error", true, 500);
    }
  }

  /**
   *
   * @param {*} req - reqeust object
   * @param {*} res - response object
   * @returns
   */
  async getUserList(req, res) {
    try {
      const users = await usersModel
        .find()
        .select("-password")
        .select("-__v")
        .lean();
      sendResponse(res, users, "success", false, 200);
    } catch (e) {
      sendResponse(res, [], "Internal server error", true, 500);
    }
  }

  /**
   *
   * @param {*} req - reqeust object
   * @param {*} res - response object
   * @returns
   */
  async updateUser(req, res) {
    usersModel
      .findByIdAndUpdate(req.body.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        updatedAt: new Date(),
      })
      .then((result) => {
        result
          ? sendResponse(res, [], "user updated successfully", false, 200)
          : sendResponse(res, [], "No user found", false, 404);
      })
      .catch((e) => {
        console.log(e);
        sendResponse(res, [], "Internal server error", true, 500);
      });
  }

  /**
   *
   * @param {*} req - reqeust object
   * @param {*} res - response object
   * @returns
   */
  async deleteUser(req, res) {
    try {
      const user = await usersModel.findByIdAndDelete(req.params.id);
      user
        ? sendResponse(res, [], "user deleted successfully", false, 200)
        : sendResponse(res, [], "No user found", false, 404);
    } catch (e) {
      sendResponse(res, [], "Internal server error", true, 500);
    }
  }
}

module.exports = Users;
