var request = require("request");

var clientId = '<VCAP_SERVICES.metering-service.credentials.clientid>',
clientSecret = '<VCAP_SERVICES.metering-service.credentials.clientsecret>';

var getTokenOptions = {
    url: '<VCAP_SERVICES.metering-service.credentials.token_url>' + '/oauth/token?grant_type=client_credentials',
    auth: `Basic ${clientId}${clientSecret}`,
    json: true
};
var access_token ='',
    tokenExpires = '';

request.get(getTokenOptions, function (error, res, body){
    console.log(res.statusCode);
    access_token = body.access_token;
    tokenExpires = body.expires_in;
    if(error){
        console.log(error);
    }
});


// send usage

var meteringUrl = 'VCAP_SERVICES.metering-service.credentials.metering_url';

var usage = payload;
    

var putUsageOptions = {
    url: '<VCAP_SERVICES.metering-service.credentials.metering_url>' + '/usage/v2/usage/documents',
    auth: `Bearer ${access_token}`,
    json: true,
    body: usage
};

request.put(putUsageOptions, function (req, res) {
    console.log(res.statusCode);
});