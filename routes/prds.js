var express = require("express");
const Validator = require("fastest-validator");

const Products = require("./../model/products");
const upload = require("../utils/multer");

const newPrdValid = require("./schemaValid/newPrdValid");

var router = express.Router();
const v = new Validator();

router.post("/", upload.single("Image"), async (req, res, next) => {
  try {
    const validate = v.validate(req.body, newPrdValid);
    if (validate === true) {
      const { Name, Description, Price, Weight } = req.body;
      const Image = `images/${req.file.filename}`;

      if (!Image) {
        const error = new Error("لطفاً برای بارگذاری تصویری انتخاب کنید.");
        error.statusCode = 422;
        throw error;
      }

      const Prds = new Products({
        Name,
        Description,
        Price: Price === "" || Price === "0" ? "رایگان" : Price,
        Image,
        Weight,
      });
      await Prds.save();

      res.status(201).json({ message: "محصول ساخته شد!", Prds });
    } else {
      res.send(validate);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
});

router.get("/", async (req, res) => {
  const prds = await Products.findAll();
  res.render("listPrds", { prds });
});

router.get("/prd:id", async (req, res) => {
  const id = req.params.id.replace(":", "");
  if (id !== "" && id !== " " && !isNaN(id)) {
    await Products.findByPk(id)
      .then((prd) => {
        if (prd !== null) {
          res.render("prd", { prd });
        } else {
          res.status(500).json({ message: "کالا پیدا نشد!" });
        }
      })
      .catch((error) => {
        res.render("error", { message: "خطایی روی داد", error });
      });
  } else {
    error = new Error("Plase Enter ID");
    error.statusCode = 500;
    res.render("error", { message: "لطفا ایدی کالا را وارد کنید", error });
  }
});

router.put("/prd:id", async (req, res) => {
  const ID = req.params.id.replace(":", "");
  if (ID !== "" && ID !== " " && !isNaN(ID)) {
    await Products.update(req.body, { where: { id: ID } })
      .then((result) => {
        if (result == 1) {
          res.status(201).json({ message: "کالا ویرایش شد.", result });
        } else {
          res.status(500).json({ message: "کالا ویرایش نشد!" });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "خطایی روی داد" });
      });
  } else {
    res.status(500).json({ message: "لطفا ایدی کالا را وارد کنید" });
  }
});

module.exports = router;
