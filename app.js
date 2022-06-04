//jshint esversion: 6

import {
    ID,
    API,
} from "./secrets";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName, 
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)
    const url = API

const options = {
    method: "POST",
    auth: "dog1:869c8fbbdd9031fae6900164b1e6d696-us14"
}

const request = https.request(url, options, function (response) {

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", (data) => {
        console.log(JSON.parse(data));
    })
});

request.write(jsonData)
request.end()

});

app.post("/failure", (req, res) => {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Estamos na maloca. 3000");
});

