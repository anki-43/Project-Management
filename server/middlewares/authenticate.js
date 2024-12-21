function authenticate(req, res, next) {
  console.log("********************", req.session.userId);
  if (!req.session.userId) {
    const err = new Error("You shall not pass");
    err.statusCode = 401;
    next(err);
  }
  next();
}

module.exports = authenticate;
