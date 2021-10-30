var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('mongoose-double')(mongoose);

mongoose.connect('mongodb://'+process.env.MONGO_LBI_SERVICE_HOST+':27017/testGeoloc', { useNewUrlParser: true , server: { reconnectTries: Number.MAX_VALUE }  })
    .then(() => console.log('connection successful'))
.catch((err) => console.error(err));

var db = mongoose.connection;
var SchemaTypes = mongoose.Schema.Types;
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
mongoose.MessageSchema = new mongoose.Schema(
 {
  username: String,
  text: String,
  location: {
   type: { type: String },
   coordinates: []
  }
}, {collection: 'Message'});
mongoose.MessageSchema.index({ location: "2dsphere" });
mongoose.MessageModel = mongoose.model("Message", mongoose.MessageSchema);
//module.exports = mongoose;

mongoose.UserSchema = new mongoose.Schema(
 {
  email: String,
  pw: String,
  role: String
}, {collection: 'User'});
mongoose.UserModel = mongoose.model("User", mongoose.UserSchema);
//module.exports = mongoose;


mongoose.UserSchema = new mongoose.Schema(
 {
  email: String,
  pw: String,
  role: String
}, {collection: 'User'});
mongoose.UserModel = mongoose.model("User", mongoose.UserSchema);


mongoose.SponsorSchema = new mongoose.Schema(
 {
  first_name: String,
  last_name: String,
  user : { type: Schema.Types.ObjectId, ref: 'User' }
}, {collection: 'Sponsor'});
mongoose.SponsorModel = mongoose.model("Sponsor", mongoose.UserSchema);
module.exports = mongoose;

/*

var message1 = mongoose.MessageModel({
  username: "maisonparents",
  text: "mparents",
  location: {
   type: "Point",
   coordinates: [50.519051, 4.693130]
  },
 });
message1.save((err, message) => {
  if (err) console.log(err);
  console.log(message);
 });
var message2 = mongoose.MessageModel({
  username: "mmamy",
  text: "mamy",
  location: {
   type: "Point",
   coordinates: [50.519480, 4.697740]
  },
 });
message2.save((err, message) => {
  if (err) console.log(err);
  console.log(message);
 });

 var message3 = mongoose.MessageModel({
   username: "noville",
   text: "noville",
   location: {
    type: "Point",
    coordinates: [50.606714, 4.887841]
   },
  });
 message3.save((err, message) => {
   if (err) console.log(err);
   console.log(message);
  });


  var message4 = mongoose.MessageModel({
    username: "liege",
    text: "liege",
    location: {
     type: "Point",
     coordinates: [50.635395, 5.567621]
    },
   });
  message4.save((err, message) => {
    if (err) console.log(err);
    console.log(message);
   });
*/
