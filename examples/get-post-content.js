const hive = require('../lib');

const resultP = hive.api.getContentAsync('hiveio', 'announcing-the-launch-of-hive-blockchain');
resultP.then(result => console.log(result));
