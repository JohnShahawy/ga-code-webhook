
module.exports = async function (request, response) {
    console.log(request.query)
    var rp = require('request-promise')
    var getBestPolicies = require('../getBestPolicies');

    var carrierArray = require('../../carriers.json').map((carrier) => { return carrier.id }).splice(0, 10)
    var productJson = require('../../product-types.json');
    var productArray = productJson['TERM']

    // to get everything
    // var productArray =Object.keys(productJson)
    // .reduce((prev,cur)=>{

    //     return [...prev,...productJson[cur]];
    // },[]) 

    var options = {
        method: 'POST',
        url: 'https://api.ixn.tech/v1/quotes',
        headers:
        {
            // 'cache-control': 'no-cache',
            // Connection: 'keep-alive',
            // 'Content-Length': '1456',
            // 'Accept-Encoding': 'gzip, deflate',
            // 'Cache-Control': 'no-cache',
            Accept: '*/*',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'APP-TOKEN': '75eb2bfb-075c-4423-9c7f-6a51bb720628',
            'APP-ID': '2db59500-b064-467d-a03c-824f6f0e6a3c',
            // 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        },
        form:
        {
            state: request.query.state,
            gender: request.query.gender,
            current_age: request.query.age,
            nearest_age: request.query.age,
            tobacco: request.query.tobacco,
            face_amount: request.query.face,
            'product_types[]': productArray,
            // ['20 Year Term', '30 Year Term', '10 Year Term'],
            // 'product_types[1]': '30 Year Term',
            // '30 Year Term'],
            'health_categories[]': request.query.health,
            'carrier_ids[]': carrierArray
        },
        qsStringifyOptions: { arrayFormat: 'repeat' }
    };



    return rp(options)
        .then((data) => {
            
      
            return response.send(getBestPolicies(data))

        })
        .catch(e => {
            console.log('error', e);
            response.status(500).send('Error Fetching Data')
        })
}
