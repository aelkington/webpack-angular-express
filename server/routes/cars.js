var express = require('express'),
    router = express.Router();

// Car brands page
router.get('/brands', function(req, res) {
  var brands = {
    brands: ['Audi', 'BMW', 'Mercedes']
  };

  res.send(brands);
});

module.exports = router;
