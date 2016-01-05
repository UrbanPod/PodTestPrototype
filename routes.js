module.exports = function (app, models) {
  app.use('/signup', require("./routes/signup")(models));
}
