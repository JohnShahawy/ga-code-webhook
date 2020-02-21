const functions = require('firebase-functions');
// const getQuotes = require('./services/GetQuotes');
var ua = require('universal-analytics');

exports.recordGAEvent = functions.https.onRequest(async (req,res)=>{
    //event category
    //event action
    // event label
    //event value
    // gaid
    //messenger id
    // const visitor= ua('UA-158268933-1')
    const gaList = ['UA-158268933-1']

    const { category, action, label, value, gaid, messengerid } = req.headers;
    if(gaList.indexOf(gaid) > -1){
    const visitor= ua(gaid, messengerid)
   try{
    label && value 
    ?    visitor.event(category, action, label, value).send()
    :    visitor.event(category, action).send();
   }
   catch(e){
       console.log(e)
   }
    if(gaid, category, action){
    res.send('Event Recorded');
    }
    else {
        res.status(500).send('Error with parameters')
    }
}
else{
    res.status(401).send('Not Authorized.  Please contact info@tactiveconsulting.com for more info.')
}


})
// exports.getQuotes = functions.https.onRequest(async (req,res)=>{

//     getQuotes(req,res);

// })

