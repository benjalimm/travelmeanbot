var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require ('mongoose');
var ObjectID = mongoose.Types.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();

var router = express.Router();
// require('./server/routes/api')(router);


app.use(express.static(__dirname + "/public"));

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;
var mongoUri = "mongodb://localhost:27017/"


// Connect to the database before starting the application server.
// mongodb.MongoClient.connect(mongoUri, function (err, database) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

mongoose.connect(mongoUri, function(err, database) {
  if (err) {
    console.log (err);
    process.exit(1);
}

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

// app.get("/", function(req, res) {
//   db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
//     if (err) {
//       handleError(res, err.message, "Failed to get contacts.");
//     } else {
//       res.status(200).json(docs);
//     }
//   });
// });
//
// app.post("/", function(req, res) {
//   var newContact = req.body;
//   newContact.createDate = new Date();
//
//   if (!(req.body.firstName || req.body.lastName)) {
//     handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
//   }
//
//   db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to create new contact.");
//     } else {
//       res.status(201).json(doc.ops[0]);
//     }
//   });
// });

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */


 router.use(function(req, res, next) {
     // do logging
     console.log('Passing through middleware check.');
     next(); // make sure we go to the next routes and don't stop here
 });

 // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
 router.get('/', function(req, res) {
     res.json({ message: 'Testing API: Get request receieved.' });
 });

var User = require('./server/models/user');

 router.route('/users')

   // .get(function(req, res) {
   //   res.send('This shows a list of users');
   // });

   .post(function(req, res) {
     console.log(req.body) // this outputs the body data sent in

     // this creates a new user object
     var user = new User();

     // this assigns the data sent in to the user object
     user.firstName = req.body.firstName;
     user.lastName = req.body.lastName;
     user.email = req.body.email;
     user.fbid = req.body.fbid;
    //  user.home.city = req.body.home.city;
    //  user.home.code = req.body.home.code;
    //  user.dream.city = req.body.dream.city;
    //  user.dream.code = req.body.dream.code;

     // this saves the user
     user.save(function(err, data) {
       if (err) {
         throw err;
       } else {
         res.json(data) // this creates a new user and sends it back
         console.log("USER POSTED!");
       }
     });
   })


   .get(function(req, res) {
       User.find(function(err, users) {
           if (err)
               res.send(err);
           res.json(users)
           console.log("ALL USERS FOUND!");
       });
   });

   router.route('/users/:user_id')

    // get the user id
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user)
            console.log("USER ID: " + req.params.user_id + " FOUND!");
        });
    })

    // update the user id
    .put(function(req, res) {

        // find user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

                // update the user info
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email;
                user.fbid = req.body.fbid;
               //  user.home.city = req.body.home.city;
               //  user.home.code = req.body.home.code;
               //  user.dream.city = req.body.dream.city;
               //  user.dream.code = req.body.dream.code;

            // save the bear
            user.save(function(err, data) {
                if (err)
                    res.send(err);

                res.json(data)
                console.log("USER ID: " + req.params.user_id + " UPDATED!");
            });

        });
    })

    .delete(function(req, res) {
    User.remove({
        _id: req.params.user_id
    }, function(err, user) {
        if (err)
            res.send(err);

        res.json({ message: 'USER ID: '+ req.params.user_id + ' successfully deleted' })
        console.log("USER ID: " + req.params.user_id + " DELETED!");
    });
});

// api/deal

var Deal = require('./server/models/deal');

 router.route('/deals')

   .post(function(req, res) {
     console.log(req.body) // this outputs the body data sent in

     // this creates a new deal object
     var deal = new Deal();

     // this assigns the data sent in to the deal object
     deal.location = req.body.location;
     deal.price = req.body.price;

     // this saves the deal
     deal.save(function(err, data) {
       if (err) {
         throw err;
       } else {
         res.json(data) // this creates a new deal and sends it back
         console.log("DEAL POSTED!");
       }
     });
   })


   .get(function(req, res) {
       Deal.find(function(err, deals) {
           if (err)
               res.send(err);
           res.json(deals)
           console.log("ALL DEALS FOUND!");
       });
   });

   router.route('/deals/:deal_id')

    // get the deal id
    .get(function(req, res) {
        Deal.findById(req.params.deal_id, function(err, deal) {
            if (err)
                res.send(err);
            res.json(deal)
            console.log("DEAL ID: " + req.params.deal_id + " FOUND!");
        });
    })

    // update the deal id
    .put(function(req, res) {

        // find user we want
        Deal.findById(req.params.deal_id, function(err, deal) {

            if (err)
                res.send(err);

                // update the deal info
                deal.location = req.body.location;
                deal.price = req.body.price;

            // save the bear
            deal.save(function(err, data) {
                if (err)
                    res.send(err);

                res.json(data)
                console.log("DEAL ID: " + req.params.user_id + " UPDATED!");
            });

        });
    })

    .delete(function(req, res) {
    Deal.remove({
        _id: req.params.deal_id
    }, function(err, deal) {
        if (err)
            res.send(err);

        res.json({ message: 'DEAL ID: '+ req.params.deal_id + ' successfully deleted' })
        console.log("DEAL ID: " + req.params.deal_id + " DELETED!");
    });
});

// routes prefixed with /api
app.use('/api',router);




// app.get("/contacts/:id", function(req, res) {
//   db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to get contact");
//     } else {
//       res.status(200).json(doc);
//     }
//   });
// });
//
// app.put("/contacts/:id", function(req, res) {
//   var updateDoc = req.body;
//   delete updateDoc._id;
//
//   db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to update contact");
//     } else {
//       res.status(204).end();
//     }
//   });
// });
//
// app.delete("/contacts/:id", function(req, res) {
//   db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
//     if (err) {
//       handleError(res, err.message, "Failed to delete contact");
//     } else {
//       res.status(204).end();
//     }
//   });
// });
