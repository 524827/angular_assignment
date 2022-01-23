const mongoose = require("mongoose");

exports.mongoConnection = () => {
  return mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

