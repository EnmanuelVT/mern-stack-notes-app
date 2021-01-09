var admin = require("firebase-admin");

var serviceAccount = require("/home/emmanuel/Downloads/notes-app-authentication-6a088-firebase-adminsdk-m71g7-f301ec278a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://notes-app-authentication-6a088-default-rtdb.firebaseio.com/",
});

module.exports = admin;
