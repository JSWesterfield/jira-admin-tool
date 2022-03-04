const express = require("express");
const config = require("config");
const app = express();
const cors = require("cors");
const { default: JiraClient } = require("jira-connector");

app.use(cors());

const host = config.get("JiraCloudCreds.host");
const userName = config.get("JiraCloudCreds.username");
const password = config.get("JiraCloudCreds.password");

console.log(`1. My host name is ${host}` + `, and my username is ${userName}` + `, and I have a password of ${password}.`);

var jira = new JiraClient({
    host: host,                    // find host url
    basic_auth: {
        username: userName,     // find username(email?)
        password: password,                 // OAuth Token(from Custom or Connected JIRA App)
    },
    strictSSL: false,
});

console.log(`2. My host name is ${host}` + `, and my username is ${userName}` + `, and I have a password of ${password}.`);

const projectKey = config.get("issueFields.projectKey");
const issueType1 = config.get("issueField.issueType1");
const issueType2 = config.get("issueField.issueType2");
const issueType3 = config.get("issueField.issueType3");



app.get("/", (req, res) => {
    res.send("starts new nodejs project");

    jira.issue.createIssue({
        fields: {
            project: {
                key: projectKey,
            },
            summary: "Jira Rest API via nodejs library",
            description: "This is a task created via jira-connector",
            issueType: {
                name: taskType1,
            }, 
            customfield_10014: customField1,
        }, 
        function(error, issue) {
            console.log("error", error);
            console.log("issue", issue);
        },
    });
});

app.listen(5000, () => console.log("listening on part 5000"));