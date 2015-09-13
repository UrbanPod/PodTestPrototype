module.exports = {
  basic: function basic(req, res, next) {

    if (req.isAuthenticated()) {
      return next();
    }

    return res.redirect('/');
  }
}
