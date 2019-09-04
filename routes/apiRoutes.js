let path = require("path");

module.exports = function (app, passport, db) {

    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in G oogle authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/callback
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

    // GET /auth/google/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

    // GET /auth/user  - local verifier
    app.post("/auth/user", passport.authenticate('local'));


    app.get('/auth/isauth', (req, res) => {
        if (req.user)
            res.send({ success: 1, message: 'You are logged in' });
        else
            res.status(401).send({ message: 'You are not logged in' });
    });

    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
}