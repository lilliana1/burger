var express = require('express');
var router = express();

var burger = require('../models/burger.js');

router.get('/', function(req, res) {
burger.selectAll(function(data) {
var hbsObject = {
    burgers: data
};
res.render('index', hbsObject);
});
});
// POST/CREATE BURGER
router.post('/api/burgers', function(req, res) {
burger.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], function(data) {
res.json({ id: data.insertId });
    });
});

// PUT/UPDATE BURGER
router.put('/api/burgers/:id', function(req, res) {
var condition = 'id = ' + req.params.id;

console.log('condition:', condition);

burger.update(
{
    devoured: req.body.devoured
},
condition,
function(result) {
    if (result.changedRows == 0) {
    return res.status(404).end();
    } else {
    res.status(200).end();
    }
}
    );
});
// DELETE BURGER
router.delete("/api/burgers/:id", function(req, res) {
var condition = "id = " + req.params.id;

cat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
    // If no rows were changed, then the ID must not exist, so 404
    return res.status(404).end();
    } else {
    res.status(200).end();
    }
    });
});


module.exports = router;