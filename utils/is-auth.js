const jwt = require("jsonwebtoken");
const User = require("../model/users");

exports.isAuth =async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).json({ title: "!کاربر احراز هویت نشده", message:"توکن را در قسمت هدر ارسال کنید" });
  }
  const token = authHeader;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    res.status(500).json({ title: "!کاربر احراز هویت نشده", message:"توکن ارسالی اشتباه است", err });
  }
  if (!decodedToken) {
    res.status(401).json({ title: "!کاربر احراز هویت نشده", message:"توکن ارسالی اشتباه است" });
  }
  try {
      const user = await User.findByPk(decodedToken.id)
      if (user.isAdmin === true) {
        req.id = user.isAdmin;
        next(); 
      }
      else {
        res.status(401).json({ title: "!کاربر احراز هویت نشده", message:"کاربر مدیر نیست!" });
      }
  } catch (error) {
      if(error) throw console.log(error);;
  }
};

exports.createToken = async (id, email) => {
  const token = await jwt.sign({ id, email }, "secret", {
    expiresIn: "8h",
  });
  return token;
};
