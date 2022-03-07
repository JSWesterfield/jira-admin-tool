const csv = require('csv-parser')
const fs = require('fs')
import express  from "express"
import config from "config";
import fetch from "node-fetch"
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const csvResults = [];

const host = config.get("jiraCloudCreds.host");
const userName = config.get("jiraCloudCreds.username");
const password = config.get("jiraCloudCreds.password");
const endpoint = config.get("jiraCloudCreds.endpointCreate")
const projectKey = config.get("issueFields.projectKey");
const issueType1 = config.get("issueFields.issueType1");
const reporterId = config.get("issueFields.reporterId");
const assigneeId1 = config.get("issueFields.assigneeId1");
const epicName = config.get("issueFields.epicName");
const priority2 = config.get("issueFields.priority2");

const authString = `${userName}` + ":" + `${password}`; // "email@example.com:<api_token>"
console.log(`Our new authString is: ${authString}`); 

const domain = `${host}`+`${endpoint}`;  // https://your-domain.atlassian.net/rest/api/2/issue/bulk
console.log(`Our new domain is: ${domain}`); // test


// set cors, provides a Connect/Express middleware that can be used to enable CORS with various options
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Have to set the template literal substitution values within the JSON prior to its use within the fetch method having to parse this JSON.
let bodyDataDomain = {
  "fields": {
    "project": {
      "key": `${projectKey}`
    },
    "reporter": {
      "id": `${reporterId}`
    },
    "assignee": {
      "id": `${assigneeId1}`
    },
    "summary": "[TEST]Estimate Scope of Project ",
    "description": "This is a task created via via nodeJS.",
    "issuetype": {
      "name": `${issueType1}`
    },
    "priority": {
      "name": `${priority2}`
    }, 
    "customfield_10008": `${epicName}`
  }
};

// stringify the JSON data and the template literal substitution(expression) values so that the fetch command will be able to parse the JSON data.
let bodyData = JSON.stringify(bodyDataDomain)// stringify the current json into a string? Is this what we want? To be read by the fetch method 
console.log(bodyData);

// Example: domain : "https://your-domain.atlassian.net/rest/api/2/issue"
fetch(domain, {
  method: "POST",
  headers: {
    "Authorization": `Basic ${Buffer.from(
      authString                            //  email@example.com:<api_token>"     
    ).toString("base64")}`,
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: bodyData
})
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));

// EXAMPLE FETCH REQUEST METHOD
// fetch(https://your-domain.atlassian.net/rest/api/2/issue, {
//   method: "POST",
//   headers: {
//     "Authorization": `Basic ${Buffer.from(
//       "email@example.com:<api_token>"
//     ).toString("base64")}`,
//     "Accept": "application/json",
//     "Content-Type": "application/json"
//   },

// // AWS SECRETS MANAGEMENT 
// // If you need more information about configurations or implementing the sample code, visit the AWS docs:
// // https://aws.amazon.com/developers/getting-started/nodejs/

// const secretName = config.get("AWSCreds.secretName");
// const region = config.get("AWSCreds.region")

// // Load the AWS SDK
// // var AWS = require("aws-sdk"),
// //     region = region,
// //     secretName = secretName,
// //     secret,
// //     decodedBinarySecret;

// // // Create a Secrets Manager client
// // var client = new AWS.SecretsManager({
// //     region: region
// // });

// // In this sample we only handle the specific exceptions for the "GetSecretValue" API.
// // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// // We rethrow the exception by default.
// // console.log(`1. My host name is ${host}` + `, and my username is ${userName}` + `, and I have a password of ${password}.`);

// // client.getSecretValue({SecretId: secretName}, function(err, data) {
// //     if (err) {
// //         if (err.code === "DecryptionFailureException")
// //             // Secrets Manager can"t decrypt the protected secret text using the provided KMS key.
// //             // Deal with the exception here, and/or rethrow at your discretion.
// //             throw err;
// //         else if (err.code === "InternalServiceErrorException")
// //             // An error occurred on the server side.
// //             // Deal with the exception here, and/or rethrow at your discretion.
// //             throw err;
// //         else if (err.code === "InvalidParameterException")
// //             // You provided an invalid value for a parameter.
// //             // Deal with the exception here, and/or rethrow at your discretion.
// //             throw err;
// //         else if (err.code === "InvalidRequestException")
// //             // You provided a parameter value that is not valid for the current state of the resource.
// //             // Deal with the exception here, and/or rethrow at your discretion.
// //             throw err;
// //         else if (err.code === "ResourceNotFoundException")
// //             // We can"t find the resource that you asked for.
// //             // Deal with the exception here, and/or rethrow at your discretion.
// //             throw err;
// //     }
// //     else {
// //         // Decrypts secret using the associated KMS key.
// //         // Depending on whether the secret is a string or binary, one of these fields will be populated.
// //         if ("SecretString" in data) {
// //             secret = data.SecretString;
// //         } else {
// //             let buff = new Buffer(data.SecretBinary, "base64");
// //             decodedBinarySecret = buff.toString("ascii");
// //         }
// //     }
    
//     // const password = secret;
    
//     // Your code goes here. 
//     let jira = new JiraClient({
//         host: host,                  // find host url
//         basic_auth: {
//             username: userName,      // find username(email?)
//             password: password,      // OAuth Token(from Custom or Connected JIRA App)
//         },
//         strictSSL: false,
//     });

//     app.post("/", (req, res) => {
//         res.send("starts new nodejs project");
//         if (req.body.status === "success") {
//             jira.issue.createIssue({
//                 "fields": {
//                     "project": {
//                         "key": projectKey,
//                     },
//                     "reporter": {
//                         "id": reporterId
//                     },
//                     "assignee": {
//                         "id": assigneeId1
//                     },
//                     "summary": "[TEST]Jira Rest API via nodejs library test via jira-connector",
//                     "description": "This is a task created via jira-connector",
//                     "issueType": {
//                         "name": taskType1,
//                     },
//                     "priority": {
//                         "name": priority2
//                     },  
//                     "customfield_10008": customField1,
//                 }, 
//                 function(error, issue) {
//                     console.log("error", error);
//                     console.log("issue", issue);
//                 },
//             });
//         } else {
//             console.log("status: nope");
//         }   
//     });


//     app.get("/", (req, res) => {
//         console.log("Welcome to JIRA app")
//         res.send("Welcome to JIRA app");
//     });
    
// // });

app.listen(5000, () => console.log("listening on part 5000"));