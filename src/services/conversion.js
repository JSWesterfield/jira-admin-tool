import config from "config";
import winston from "winston";

// configure logger
const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.printf((msg) =>
            colorizer.colorize(
                msg.level,
                `${msg.timestamp} - ${msg.level}: ${msg.message}`,
            ),
        ),
    ),
    transports: [new winston.transports.Console()],
});


// 1. Convert REPORTER NAME to REPORTER ID, disregard if you can create this with reporter name
let reportedId = function(csvReporter) { 
    let reporterId;
    if (typeof reporterId == 'null') {
        reporterId = config.get('issueFields.reporterId');  //da
        return reporterId;
    }
    //REFACTOR LATER TO DO GET REQUEST TO PULL BACK REPORTERID FROM REPORTER NAME
}

// 2. Convert ASSIGNEE NAME to ASSIGNEE ID, disregard if you can create this with reporter name
let assignedId = function(csvAssigneed) {
    let assigneeId;
    let assigneeId1 = config.get('issueFields.assigneeId1');  // jw
    let assigneeId2 = config.get('issueFields.assigneeId2');  // tf
    let csvAssignee = csvAssigneed.toLowerCase(); 
    if (csvAssignee == assigneeId1) {
        assigneeId = assigneeId1; // jw
        return assigneeId;
    }
    else if (csvAssignee == assigneeId2) {
        assigneeId = assigneeId2; // tf
        return assigneeId;
    } 
    else if(err) {
        console.err(error);
        console.log('Theres been an error');
    } else {
        console.log('Issue, error, who knows.')
    }
    // if (typeof assigneeId == 'null') {
    //     assigneeId = config.get('issueFields.assigneeId'); //jw
    // }
    //REFACTOR LATER TO DO GET REQUEST TO PULL BACK ASSIGNEEID FROM ASSIGNEENAME 
}

// 3. Convert Priority Name to Priority ID, disregard if you can create this with priority name

// EXPORT VARIABLES TO SRC/INDEX.JS
export { reportedId, assignedId };
// export { reportedId, assigneeId };