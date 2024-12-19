function authenticate(req, res, next) {
  console.log("3", req.session, !req.session);
  if (!req.session.userId) {
    const err = new Error("You shall not pass");
    err.statusCode = 401;
    next(err);
  }
  next();
}

module.exports = authenticate;
