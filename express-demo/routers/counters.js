const express = require("express");
const router = express.Router();
var Counters = require("../model/counters");

router.get("/", function (req, res) {
    console.log("-----------test---------------");
    Counters.find({}, (err, result) => {
        console.log("result.............")
        if (err) {
            res.send("server or db error");
        }
        console.log(result);
        res.send(result);
    });
    // res.send("-----------test---------------");
});

module.exports = router;