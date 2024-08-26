var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');
var imagePath = path.join(path.resolve(__dirname, '..'), '/public/images/');

function getDirectoryContent(req, res, next) {
  fs.readdir(imagePath , function (err, images) {
    if (err) { return next(err); }
    res.locals.filenames = images;
    next();
  });
}

router.get('/', getDirectoryContent, function(req, res) {
  // build a response using res.locals.filenames here.
  // just sending the names is silly, and so for demonstration only
  res.send(res.locals.filenames);
});

module.exports = router;