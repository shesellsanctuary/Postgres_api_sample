'use strict'
const uuid = require('uuid')


function generatePayload(serviceId, servicePlan, consumerRegion, consumerGlobalAccount, consumerSubAccount, 
    consumerOrg, consumerSpace, consumerInstance, consumerUser, consumerApplication, measureId, measureValue) {

    let payload = {}
    const usage = 'usage';
    payload[usage] = [];

    usage1 = { 
        "id" : uuid(), 
        "timestamp" : Date.now(),
        "service": {
            "id": serviceId,
            "plan": servicePlan
        },
        "consumer": {
            "environment": "CF",
            "region": consumerRegion,
            "globalAccount": consumerGlobalAccount,
            "subAccount": consumerSubAccount,
            "org": consumerOrg,
            "space": consumerSpace,
            "instance": consumerInstance,
            "user": consumerUser,
            "application": consumerApplication
        },
        "measures" : [
            {
                "id": measureId,
                "value": measureValue
            }
        ]
    }
    payload[usage].push(usage1);


    return payload
}



console.log(JSON.stringify(payload))