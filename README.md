[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://gitlab.syncad.com/hive/hive-js/blob/master/LICENSE)

# Hive.js
Hive.js the Official JavaScript API for Hive blockchain

# Documentation

- [Install](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#install)
- [Browser](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#browser)
- [Config](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#config)
- [Database API](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#api)
    - [Subscriptions](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#subscriptions)
    - [Tags](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#tags)
    - [Blocks and transactions](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#blocks-and-transactions)
    - [Globals](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#globals)
    - [Keys](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#keys)
    - [Accounts](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#accounts)
    - [Market](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#market)
    - [Authority / validation](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#authority--validation)
    - [Votes](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#votes)
    - [Content](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#content)
    - [Witnesses](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#witnesses)
- [Login API](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#login)
- [Follow API](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#follow-api)
- [Broadcast API](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#broadcast-api)
- [Broadcast](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#broadcast)
- [Auth](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#auth)
- [Formatter](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#formatter)
- [Utils](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#utils)
- [Tutorials](https://gitlab.syncad.com/hive/hive-js/tree/master/doc#tutorials)


Here is full documentation:
https://gitlab.syncad.com/hive/hive-js/tree/master/doc

## Browser
```html
<script src="./hive.min.js"></script>
<script>
hive.api.getAccounts(['mahdiyari', 'hiveio'], function(err, response){
    console.log(err, response);
});
</script>
```

## CDN
https://cdn.jsdelivr.net/npm/@hiveio/hive-js/dist/hive.min.js<br/>
```html
<script src="https://cdn.jsdelivr.net/npm/@hiveio/hive-js/dist/hive.min.js"></script>
```

## Webpack
[Please have a look at the webpack usage example.](https://gitlab.syncad.com/hive/hive-js/blob/master/examples/webpack-example)

## Server
## Install
```
$ npm install @hiveio/hive-js --save
```

## RPC Servers
https://api.hive.blog By Default<br/>
https://anyx.io<br/>
https://api.openhive.network<br/>
https://api.hivekings.com<br/>
https://api.pharesim.me<br/>
https://hived.privex.io<br/>
https://rpc.ausbit.dev<br/>
https://rpc.esteem.app<br/>
<sub>[List of Hive nodes](https://hivekings.com/nodes)</sub><br/>

## Examples
### Broadcast Vote
```js
var hive = require('@hiveio/hive-js');

var wif = hive.auth.toWif(username, password, 'posting');
hive.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
	console.log(err, result);
});
```

### Get Accounts
```js
hive.api.getAccounts(['mahdiyari', 'hiveio'], function(err, result) {
	console.log(err, result);
});
```

### Get State
```js
hive.api.getState('/trends/funny', function(err, result) {
	console.log(err, result);
});
```

### Reputation Formatter
```js
var reputation = hive.formatter.reputation(user.reputation);
console.log(reputation);
```

### Hive Testnet
Hive-js requires some configuration to work on the public Hive testnet.

You need to set two Hive API options, `address_prefix` and `chain_id`.
```js
hive.api.setOptions({
  address_prefix: 'TST',
  chain_id: '46d82ab7d8db682eb1959aed0ada039a6d49afa1602491f93dde9cac3e8e6c32',
  useTestNet: true,
});
```

The Chain ID could change. If it does, it may not be reflected here, but will be documented on any testnet launch announcements.

## Contributions
Patches are welcome! Contributors are listed in the package.json file. Please run the tests before opening a pull request and make sure that you are passing all of them.

## Issues
When you find issues, please report them!

## License
MIT
