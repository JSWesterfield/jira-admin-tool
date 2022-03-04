// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');
const express = require('express');
const config = require('config');
const app = express();
var bodyParser = require('body-parser')
const cors = require('cors');

const bodyData = `{
  'issueUpdates': [
    {
      'update': {
        'worklog': [
          {
            'add': {
              'timeSpent': '60m',
              'started': '2019-07-05T11:05:00.000+0000'
            }
          }
        ]
      },
      'fields': {
        'summary': 'Main order flow broken',
        'parent': {
          'key': 'PROJ-123'
        },
        'issuetype': {
          'id': '10000'
        },
        'project': {
          'id': '10000'
        },
        'description': 'Order entry fails when selecting supplier.',
        'reporter': {
          'id': '5b10a2844c20165700ede21g'
        },
        'priority': {
          'id': '20000'
        },
        'assignee': {
          'id': '5b109f2e9729b51b54dc274d'
        }
      }
    },
    {
      'update': {},
      'fields': {
        'summary': 'Order stuck in pending',
        'parent': {
          'id': '10034'
        },
        'issuetype': {
          'id': '10000'
        },
        'project': {
          'id': '1000'
        },
        'description': 'Order remains pending after approved.',
        'reporter': {
          'id': '5b10a2844c20165700ede21g'
        },
        'priority': {
          'id': '20000'
        },
        'assignee': {
          'id': '5b109f2e9729b51b54dc274d'
        }
      }
    }
  ]
}`;

const host = config.get('jiraCloudCreds.host');
let endpoint = 'endpoint_bulk'
let url = host + endpoint
console.log(`Our domain for fetching is: ${url}`);



// fetch('https://your-domain.atlassian.net/rest/api/2/issue/bulk', {
//   method: 'POST',
//   headers: {
//     'Authorization': `Basic ${Buffer.from(
//       'email@example.com:<api_token>'
//     ).toString('base64')}`,
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: bodyData
// })
//   .then(response => {
//     console.log(
//       `Response: ${response.status} ${response.statusText}`
//     );
//     return response.text();
//   })
//   .then(text => console.log(text))
//   .catch(err => console.error(err));