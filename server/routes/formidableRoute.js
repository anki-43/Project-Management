const { Router } = require("express");

const router = new Router();

router.post("/api/upoad", (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});

module.exports = router;
