import config from "config";
import winston from "winston";

// configure logger
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf((msg) =>
            // colorizer.colorize(
            //     msg.level,
            //     `${msg.timestamp} - ${msg.level}: ${msg.message}`,
            // ),
            (
                console.log(`${msg.timestamp} - ${msg.level}: ${msg.message}`)
            ) 
        ),
    ),
    transports: [new winston.transports.Console()],
});

// 1. Convert REPORTER NAME to REPORTER ID, disregard if you can create this with reporter name
let reportedId = function(csvReporting) { 
    let csvReporter = csvReporting.toLowerCase(); // email all lowercase for if statement comparison
    let reporterName = config.get('issueFields.reporterName');
    let reporterId;
    if (csvReporter == reporterName) {
        reporterId = config.get('issueFields.reporterId');  //da
        return reporterId;
    } else if (typeof csvReporter == 'Undefined') {
        console.log('csvReporter is undefined');
    } else if (csvReporter == 'Undefined') {
            console.log('csvReporter is undefined');
    } else if (typeof csvReporter == 'Null') {
        console.log('csvReporter is Null');
    } else {
        console.log('Issue, no csvReporter, error, who knows.')
    }
        //REFACTOR LATER TO DO GET REQUEST TO PULL BACK REPORTERID FROM REPORTER NAMEå
}

// 2. Convert ASSIGNEE NAME to ASSIGNEE ID, disregard if you can create this with reporter name
let assignedId = function(csvAssigneed) {
    let assigneeName1 = config.get('issueFields.assigneeName1');
    let assigneeName2 = config.get('issueFields.assigneeName2');
    let assigneeId1 = config.get('issueFields.assigneeId1');  // jw
    let assigneeId2 = config.get('issueFields.assigneeId2');  // tf
    let csvAssignee = csvAssigneed.toLowerCase(); 
    if (csvAssignee == assigneeName1) {
        return assigneeId1; // jw
    } else if (csvAssignee == assigneeName2) {
        return assigneeId2; // tf
    } else if (csvAssignee == 'null') {
        console.log('Assignee is NULL');
    } else if (csvAssignee == 'undefined') {
        console.log('Assignee is undefined');
    } else {
        console.log('Issue, no csvAssignee, error, who knows.')
    }
}

 // if (typeof assigneeId == 'null') {
    //     assigneeId = config.get('issueFields.assigneeId'); //jw
    // }
    //REFACTOR LATER TO DO GET REQUEST TO PULL BACK ASSIGNEEID FROM ASSIGNEENAME 

// 3. Convert Priority Name to Priority ID, disregard if you can create this with priority name

// EXPORT VARIABLES TO SRC/INDEX.JS
export { reportedId, assignedId };
// export { reportedId, assigneeId };