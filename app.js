const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();
const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // Mailchimp API endpoint
  const url = "https://us21.api.mailchimp.com/3.0/lists/fbc4682210";

  // Mailchimp API key
  const apiKey = process.env.API_KEY; 

  // Mailchimp list ID
  const listId = "fbc4682210";

  // Request payload
  const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            },
        }
    ]
    
  };

  // Make a POST request to Mailchimp API
  axios
    .post(url, data, {
      headers: {
        Authorization: "apikey " + apiKey,
      },
    })
    .then(function (response) {
      console.log(response.data);
      res.send("Successfully subscribed!");
    })
    .catch(function (error) {
      console.log(error.response.data);
      res.status(500).send("Failed to subscribe.");
    });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(port, function () {
  console.log("Server is running on port " + port);
});
