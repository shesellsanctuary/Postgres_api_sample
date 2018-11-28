const redis = require('redis');
const uuid = require('uuid')
const sleep = require('system-sleep');

const client = redis.createClient();

function generateData(){
    for (i = 0; i < 50; i++){
        const key = tenants[getRandomInt(0, 9)] + "_" + services[getRandomInt(0, 5)];   
        const timestamp = Math.floor(Date.now() / 1000);
        console.log(key + " " + timestamp);
        client.hset(key, timestamp, getRandomInt(1, 20000));
        sleep(1000);
    }
}

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

tenants = []
services = []

function createTenants(numberOfTenants) {
    for (i = 0; i < numberOfTenants; i++){
        tenants.push(uuid())
    }
}

function createServices(){
    services.push('geo-location-service-sandbox.cfapps.sap.hana.ondemand.com')
    services.push('fortuneteller-nginx.cfapps.sap.hana.ondemand.com')
    services.push('consent-record-manager.cfapps.sap.hana.ondemand.com')
    services.push('trip-service-sandbox.cfapps.sap.hana.ondemand.com')
    services.push('ecar-onboarding.cfapps.sap.hana.ondemand.com')
    services.push('vehicle-service-sandbox.cfapps.sap.hana.ondemand.com')
}



module.exports = { createTenants, createServices, generateData }