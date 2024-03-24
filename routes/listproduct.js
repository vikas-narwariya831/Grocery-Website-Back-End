var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.get("/fetch_all_categoryid", function (req, res, next) {
  pool.query("select categoryid from category", function (error, result) {
    if (error) {
      console.log(error);
      res.status(500).json({ status: false, message: "Server error...." });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
});

router.post(
  "/add_new_listproduct",
  upload.single("images"),
  function (req, res, next) {
    pool.query(
      "insert into listproduct(categoryid, productid, weight, price, offerprice, description, images, createdat, updatedat, createdby)values(?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.categoryid,
        req.body.productid,
        req.body.weight,
        req.body.price,
        req.body.offerprice,
        req.body.description,
        req.file.originalname,
        req.body.createdat,
        req.body.updatedat,
        req.body.createdby,
      ],
      function (error, result) {
        if (error) {
          console.log(error);
          res.status(500).json({ status: false, message: "Server error...." });
        } else {
          res
            .status(200)
            .json({
              status: true,
              message:
                "Product Listed Succesfully",
            });
        }
      }
    );
  }
);

router.post("/fetch_all_productid", function (req, res, next) {
  pool.query(
    "select * from products where categoryid=?",
    [req.body.categoryid],

    function (error, result) {
      if (error) {
        console.log(result);
        console.log(req.body.categoryid);
        res.status(500).json({ status: false, message: "Server error...." });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});

module.exports = router;
