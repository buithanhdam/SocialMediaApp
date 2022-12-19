const jwt  = require("jsonwebtoken");
const dotenv  = require("dotenv");


const authMiddleWare = async (req, res, next) => {
    dotenv.config();
const secret = process.env.JWT_SIGN_TOKEN;
  try {
    const token = req.headers.Authorization.split(" ")[1];
    console.log(token)
    if (token) {
      const decoded = jwt.verify(token, secret);
      console.log(decoded)
      req.body._id = decoded?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {authMiddleWare};