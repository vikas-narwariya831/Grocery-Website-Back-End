var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

router.post("/add_new_user", function (req, res, next) {
  pool.query(
    "select * from usersdata where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (error) {
        console.log("xxxxx" + error);
        res.status(200).json({ status: 0, message: "Server error...." });
      } else {
        if (result.length == 1) {
          res
            .status(200)
            .json({
              status: 1,
              message: "User Added Successfully",
              data: result,
            });
        } else {
          pool.query(
            "insert into usersdata(mobileno)values(?)",
            [req.body.mobileno],
            function (reslt, err) {
              if (err) {
                 console.log("RESLT",err)
                res
                  .status(200)
                  .json({ status: 0, message: "Server error...." });
              } else {
                console.log("RESULT:", reslt);
                res
                  .status(200)
                  .json({
                    status: 2,
                    message: "User Added Successfully",
                    data: [
                      { userid: reslt.insertId, mobileno: req.body.mobileno },
                    ],
                  });
              }
            }
          );
        }
      }
    }
  );
});

router.get("/fetch_all_category", function (req, res) {
  pool.query("select * from categories", function (error, result) {
    if (error) {
      res.status(500).json({ status: false, data: [] });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
});

router.get("/fetch_all_productsdeals", function (req, res) {
  pool.query(
    "select * from products where deals='Yes'",
    function (error, result) {
      if (error) {
        res.status(500).json({ status: false, data: [] });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});

router.post("/fetch_all_productlist_by_product", function (req, res) {
  pool.query(
    "select PL.*, (select P.pricetype from products P where P.productid=PL.productid) as pricetype, (select P.productname from products P where P.productid=PL.productid) as productname,(select P.image from products P where P.productid=PL.productid) as productimage from listproduct PL where PL.productid=?",
    [req.body.productid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Server Error..." });
      } else {
        console.log("Result", result);
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});

router.get("/fetch_all_productstrending", function (req, res) {
  pool.query(
    "select * from products where trending='Yes'",
    function (error, result) {
      if (error) {
        res.status(500).json({ status: false, data: [] });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});

// Fetching Products with Category ID
router.post("/fetch_products", function (req, res, next) {
  console.log("category", req.body.categoryid);
  pool.query(
    "select PL.*, (select P.pricetype from products P where P.productid=PL.productid) as pricetype, (select P.productname from products P where P.productid=PL.productid) as productname,(select P.image from products P where P.productid=PL.productid) as productimage from listproduct PL where PL.categoryid=?",
    [req.body.categoryid],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Server Error..." });
      } else {
        console.log("Result", result);
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});
// add user
router.post("/add_user_address", function (req, res, next) {
  pool.query(
    "insert into useraddress (userid, mobileno, fullname, state, city, zipcode, address)values(?,?,?,?,?,?,?)",
    [req.body.userid,req.body.phone,req.body.fullname,req.body.state,req.body.city,req.body.zipcode,req.body.address],
    function (error, result) {
      if (error) {
        console.log("xxxxx" + error);
        res.status(200).json({ status: 0, message: "Server error...." });
      } else {
        res.status(200).json({ status: true, message: "Address Submitted Succesfully" });
      }
      })
    })



router.post("/check_user_address", function (req, res, next) {
  pool.query(
    "select * from useraddress where mobileno=?",
    [req.body.mobileno],
    function (error, result) {
      if (error) {
        console.log("xxxxx" + error);
        res.status(200).json({ status: 0, message: "Server error....1" });
      } else {
         
      if(result.length==0)
        {
          res.status(200).json({ status:false });

        }
        else
        {
          res.status(200).json({ status:true,data:result });
        }
      }
      })
    
    })

module.exports = router;
