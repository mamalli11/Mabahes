const express = require("express");
const Validator = require("fastest-validator");

const User = require("../model/users");
const { isAuth, createToken } = require("../utils/is-auth");

const regiSchema = require("./schemaValid/regiValid");
const loginSchema = require("./schemaValid/loginValid");

const router = express.Router();
const v = new Validator();

router.post("/register", async (req, res, next) => {
  const validate = v.validate(req.body, regiSchema);

  if (validate === true) {
    const { Name, Phone, Email, Address, Password } = req.body;

    try {
      const userCount = (await User.findAll()).length;
      let user;

      if (userCount !== 0) {
        user = new User({ Name, Phone, Email, Address, Password });
        await user.save().catch((err) => {
          if (err.parent.code == "ER_DUP_ENTRY") {
            res.status(500).json({
              message: "خطا : کاربر ساخته نشد, ایمیل کاربر از قبل موجود است",
            });
          }
        });
      } else {
        user = new User({
          Name,
          Phone,
          Email,
          Address,
          Password,
          isAdmin: true,
        });
        await user.save();
      }
      const token = await createToken(user.id, user.Email);
      res.status(201).json({
        message: "کاربر جدید ساخته شد",
        token,
      });
    } catch (err) {
      if (err) throw console.log(err);
      res.status(500).json({ message: "خطا : کاربر ساخته نشد", err });
      next();
    }
  } else {
    res.status(500).json({ validate });
  }
});

router.post("/login", async (req, res) => {
  const validate = v.validate(req.body, loginSchema);

  if (validate === true) {
    const { Email, Password } = req.body;
    await User.findOne({ where: { Email: Email } })
      .then(async (r) => {
        if (Password === r.dataValues.Password) {
          res.status(201).json({
            message: "کاربر وارد شد.",
            token: await createToken(r.dataValues.id, r.dataValues.Email),
          });
        } else {
          res
            .status(500)
            .json({ message: "ایمیل یا پسورد اشتباه وارد شده است" });
        }
      })
      .catch((e) => {
        res.status(500).json({ message: "کاربر پیدا نشد!" });
        console.log(e);
      });
  } else {
    res.status(500).json({ validate });
  }
});

router.get("/", isAuth, async (req, res) => {
  const users = await User.findAll();
  res.render("users", { users });
});

router.get("/user:id", isAuth, async (req, res) => {
  const ID = req.params.id.replace(":", "");

  if (ID !== "" && ID !== " " && !isNaN(ID)) {
    const user = await User.findByPk(ID);
    res.render("user", { user: user.dataValues });
  } else {
    error = new Error("Plase Enter ID");
    error.statusCode = 500;
    res.render("error", { message: "لطفا ایدی کاربر را وارد کنید", error });
  }
});

module.exports = router;
