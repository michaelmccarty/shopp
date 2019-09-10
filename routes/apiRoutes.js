const path = require("path");


module.exports = function (app, passport, db) {

    app.get('/logout', (req, res) => {


        if (req.user.googleId)
            console.log("\n\n\nGoogle user logged out ID's: " + req.user.googleId + "\n\n\n");

        else
            console.log("\n\n\n" + req.user.name + " user has been logged out.\n\n\n");


        req.logout();
        res.end();
    });

    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/main',
            failureRedirect: '/',
            failerFlash: false
        })
    );

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
        passport.authenticate('google', { failureRedirect: '/' }),
        function (req, res) {
            res.redirect('/main');
        });



    app.get('/products', checkAuthenticated, (req, res) => {


        console.log("\n\n\n\n\n\n\n\n\n");

        db.Product.findAll({}).then(function (products) {
            res.json(products);
        });

        // db.User.findOne({
        //     where: {
        //       name: name
        //     }
        //   }).then(function (user) {
        //     if (!user) { //if user isn't in DB, create one, log in

        //       db.User.create({
        //         name: name,
        //         password: password
        //       }).then(function (result) {
        //         console.log("\n\ncreated new user, "+ name +"\n\n");
        //         return done(null, result);
        //       }).catch(err => console.log(err));


        //     }
        //     else if (user) {
        //       // if user is found, check against PW and log in or fail
        //       console.log("\n\nsuccessful login, "+ user.name +"\n\n");
        //       return done(null, user);


        //       // if (user.password != password)
        //       // {
        //       //   console.log("\n\nPASSWORDS DONT MATCH\n\n");
        //       //   return done(null, false);
        //       // }
        //     }
        //   });



        res.end()

    });


    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated())
            return next()

        res.redirect('/index.html')
    }
}