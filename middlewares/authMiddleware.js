const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret_key = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, secret_key);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error in Auth middleeware",
      err,
    });
  }
};

module.exports = authMiddleware;
