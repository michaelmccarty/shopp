require("dotenv").config();

let express = require("express");
let session = require('express-session');
let app = express();

let PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let db = require("./models");


let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.account.findByPk(id).then(function (user) {
    done(null, user);
  }).catch(function (err) {
    done(err)
  });
});

app.use(session({
  secret: process.env.SESSIONKEY,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/apiRoutes")(app, passport, db);
require("./routes/htmlRoutes")(app);


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


let LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (name, password, done) {

    db.User.findOne({
      where: {
        name: name
      }
    }).then(function (user) {
      if (!user) { //if user isn't in DB, create one, log in

        db.User.create({
          name: name,
          password: password
        }).then(function (results) {
        });

        return done(null, false);
      }
      else if (user) {
        // if user is found, check against PW and log in or fail
        console.log("\n\nsuccessful login\n\n");
        return done(null, user);


        // if (user.password != password)
        // {
        //   console.log("\n\nPASSWORDS DONT MATCH\n\n");
        //   return done(null, false);
        // }
      }
    });
  }
));



// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: "842729916089-4bdb3mdn3nlluvv2sv8ekld8vjveunqj.apps.googleusercontent.com",
  clientSecret: "VPW_pakQUn2tNKAnPDQuTcYC",
  callbackURL: "http://localhost:8080/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    db.User.findOrCreate({
      where: {
        googleId: profile.id
      }
    }).then(function (data) {

      return done(null, data[0]);
    }).catch(function (err) {
      console.log(err);
    });
  }
));



// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
  });
});