const fs = require('fs');
const config = require('../src/main/config.json');

config.analytics.trackingId = process.env.UNIVERSAL_ANALYTICS_TRACKING_ID;

fs.writeFileSync('./src/main/config.json', JSON.stringify(config));
