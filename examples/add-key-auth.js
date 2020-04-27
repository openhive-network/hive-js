const hive = require('../lib');

/* Generate private active WIF */
const username = process.env.HIVE_USERNAME;
const password = process.env.HIVE_PASSWORD;
const privActiveWif = hive.auth.toWif(username, password, 'active');

/** Add posting key auth */
hive.broadcast.addKeyAuth({
    signingKey: privActiveWif,
    username,
    authorizedKey: 'STM88CPfhCmeEzCnvC1Cjc3DNd1DTjkMcmihih8SSxmm4LBqRq5Y9',
    role: 'posting',
  },
  (err, result) => {
    console.log(err, result);
  }
);
