
import config from "config";

// 1. Convert REPORTER NAME to REPORTER ID, disregard if you can create this with reporter name
let reportId;
if (typeof reporterId == 'null') {
    reporterId = config.get('issueFields.reporterId');  //da
}
//REFACTOR LATER TO DO GET REQUEST TO PULL BACK REPORTERID FROM REPORTER NAME 


// 2. Convert ASSIGNEE NAME to ASSIGNEE ID, disregard if you can create this with reporter name
let assigneeId;
if (typeof assigneeId == 'null') {
    assigneeId = config.get('issueFields.assigneeId');  //jw
} 
//REFACTOR LATER TO DO GET REQUEST TO PULL BACK ASSIGNEEID FROM ASSIGNEENAME 

// 3. Convert Priority Name to Priority ID, disregard if you can create this with priority name


// EXPORT VARIABLES TO SRC/INDEX.JS
export { reporterId, assigneeId }