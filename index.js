const express = require("express");
const app = express();
const cors = require("cors");
const { default: JiraClient } = require("jira-connector");

app.use(cors());

var jira = new JiraClient({
    host: "companyName.atlassian.net",                    // find host url
    basic_auth: {
        username: "Full_Name@company.com",     // find username(email?)
        password: "Fake-Passowrd010101",                 // OAuth Token(from Custom or Connected JIRA App)
    },
    strictSSL: false,
});

app.get("/", (req, res) => {
    res.send("starts new nodejs project");
});

app.listen(5000, () => console.log("listening on part 5000"));