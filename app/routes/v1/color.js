var express = require('express');
var router = express.Router();

// GET  http://localhost:8085/v1/color/
router.get('/color', function (req, res) {
    let color = req.query.color;
    let response = {
        "message": "success",
        "errors": [],
        "response": {}
    };
    let body = {};
    if (color === void 0) {
        // undefined
        body = {"None": "Please specify Primary or Secondary in color query parameter"}
    }
    else if (color.toUpperCase() === "PRIMARY") {
        // primary //
        body = {
            "colors": {
                "theme": "secondary",
                "base-color": "#2196F3",
                "main-color": "#1976D2",
                "accent-color": "#EF5350"
            }
        };
    } else if (color.toUpperCase() === "SECONDARY") {
        // secondary
        body = {
            "colors": {
                "theme": "secondary",
                "base-color": "#9E9E9E",
                "main-color": "#757575",
                "accent-color": "#42A5F5"
            }
        };
    } else {
        body = {"None": "Please specify Primary or Secondary in color query parameter"}
    }

    response['response'] = body;

    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.send(response);
    console.log(res);
});

//routerをモジュールとして扱う準備
module.exports = router;