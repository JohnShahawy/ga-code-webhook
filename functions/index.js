const functions = require('firebase-functions');
const getQuotes = require('./services/GetQuotes');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.helloworld = functions.https.onRequest(async (req,res)=>{

    const text = req.query.text;
    res.send(text);

})
exports.getQuotes = functions.https.onRequest(async (req,res)=>{

    getQuotes(req,res);

})