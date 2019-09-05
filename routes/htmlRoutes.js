let path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  app.get("*", checkAuthenticated, function (req, res) {
    if (req.user) {
      res.send()
    }
    console.log(req.user);
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated())
      return next()

    res.redirect('/index.html')
  }
}
