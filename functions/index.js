const functions = require('firebase-functions');
const admin = require('firebase-admin');
const apirequest = require('request');
const cors = require('cors')({ origin: true });
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getBedRequestStatus = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
    const requestInfo = request.body;
    console.log("Request from backend ",requestInfo);
    const statusRef = admin
            .database()
            .ref(`/status/` + requestInfo.aadhar);
    statusRef
        // .orderByChild("aadhar")
        // .equalTo('111122223333')
        .once("value", function (snapshot) {
            console.log("Snapshot ", snapshot.val());
            var status = {'errorMessage':"This request is not in our database. Check the Patient's name and attender's phone number you have provided. Please dont add +91 to the phone number."};
            if (snapshot.val()) {
                status = snapshot.val();
            }
            response.send(status);
        });
    });
});

exports.masterStatus = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const masterStatus = request.body;
        console.log("Request data",masterStatus);
        // const masterStatus = { "statusMessage": "Your request has been accepted.2" };
        // const requestStatus = { "aadhar": "111122223333", "statusMessage": "Your request has been accepted." }
        const statusRef = admin
            .database()
            .ref(`/masterstatus/`);
        statusRef
            // .orderByChild("aadhar")
            // .equalTo('111122223333')
            .once("value", function (snapshot) {
                if (snapshot.val()) {
                    var updatedata = snapshot.val();
                    updatedata.statusmessage = masterStatus.statusMessage;
                    updatedata.statusUpdateTime = new Date().getTime();
                    statusRef
                        .update(updatedata)
                        .then(data => {
                            response.send({
                                'status': 'existing record updated'
                            });
                        })
                        .catch(err => {
                            response.send(err);
                        });
                } else {
                    var updatedata = {};
                    updatedata["statusmessage"] = masterStatus.statusMessage;
                    updatedata["statusUpdateTime"] = new Date().getTime();
                    statusRef.set(updatedata).then(() => {
                        response.send({
                            'status': 'new record created'
                        });
                    })
                        .catch(err => {
                            response.send(err);
                        });
                }
            });
    })
});

exports.googleMapsSearch = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        // const searchTerm = request.query.searchTerm;
        var googleMapsUrl = ""
        // var googleMapsUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + searchTerm + "&key=AIzaSyBCJXQI-JcKPAfG0ONO_x2D2yo_INuzV7c"
        if (request.query.pagetoken) {
            googleMapsUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json" + "?pagetoken=" + request.query.pagetoken + "&key=AIzaSyAdW_JTvX1PXbmDrwZIXYNYAGgMa9nIVok";
        } else {
            googleMapsUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + request.query.searchTerm + "&key=AIzaSyAdW_JTvX1PXbmDrwZIXYNYAGgMa9nIVok"
        }
        var options = {
            'method': 'GET',
            'url': googleMapsUrl
        };
        apirequest(options, function (error, resp) {
            if (error) {
                console.log("Zoho Creator Sync Error", error);
                response.send(error);
                // throw new Error(error);
            }
            console.log("Google MAPS Search response " + resp.body);
            response.send(resp.body);
        });
    
    })
});

exports.updateBedRequestStatus = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const requestStatus = request.body;
        console.log("Request from backend ",requestStatus);
        // const requestStatus = { "aadhar": "111122223333", "statusMessage": "Your request has been accepted." }
        const statusRef = admin
            .database()
            .ref(`/status/` + requestStatus.aadhar);
        statusRef
            // .orderByChild("aadhar")
            // .equalTo('111122223333')
            .once("value", function (snapshot) {
                if (snapshot.val()) {
                    var updatedata = snapshot.val();
                    updatedata.requestStatus = requestStatus.requestStatus;
                    updatedata.statusMessage = requestStatus.statusMessage;
                    updatedata.statusUpdateTime = new Date().getTime();
                    statusRef
                        .update(updatedata)
                        .then(data => {
                            response.send({
                                'status': 'existing record updated'
                            });
                        })
                        .catch(err => {
                            response.send(err);
                        });
                } else {
                    var updatedata = {};
                    updatedata["statusMessage"] = requestStatus.statusMessage;
                    updatedata["requestStatus"] = requestStatus.requestStatus;
                    updatedata["statusUpdateTime"] = new Date().getTime();
                    statusRef.set(updatedata).then(() => {
                        response.send({
                            'status': 'new record created'
                        });
                    })
                        .catch(err => {
                            response.send(err);
                        });
                }
            });
    });
});
