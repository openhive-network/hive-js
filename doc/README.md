# Documentation

- [Install](#install)
- [Browser](#browser)
- [Config](#config)
- [JSON-RPC](#jsonrpc)
- [Database API](#api)
    - [Subscriptions](#subscriptions)
    - [Tags](#tags)
    - [Blocks and transactions](#blocks-and-transactions)
    - [Globals](#globals)
    - [Keys](#keys)
    - [Accounts](#accounts)
    - [Market](#market)
    - [Authority / validation](#authority--validation)
    - [Votes](#votes)
    - [Content](#content)
    - [Witnesses](#witnesses)
- [Login API](#login)
- [Follow API](#follow-api)
- [Broadcast API](#broadcast-api)
- [Broadcast](#broadcast)
- [Auth](#auth)
- [Formatter](#formatter)
- [Utils](#utils)
- [Tutorials](#tutorials)

# Install
```
$ npm install @hiveio/hive-js --save
```

# Browser 
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

## Config
Default config should work with Hive. However you can change default config.
as 
```js
hive.api.setOptions({ url: 'https://anyx.io' });
hive.config.set('address_prefix','STM');
hive.config.set('chain_id','beeab0de00000000000000000000000000000000000000000000000000000000');
hive.config.set('alternative_api_endpoints', ['https://api.hive.blog', 'https://anyx.io']);
```

### set
```
hive.config.set('address_prefix','STM');
```
### get
```
hive.config.get('chain_id');
```

## JSON-RPC
Here is how to activate JSON-RPC transport:
```js
hive.api.setOptions({ url: 'https://api.hive.blog' });
```

# API

## API CALL
Can be used for all the possible API calls.

```js
hive.api.call(method, params, callback);
// or
hive.api.callAsync(method, params).then(res => {});
```

Example:
```js
hive.api.callAsync('condenser_api.get_accounts', [['mahdiyari']])
  .then((res) => console.log(res))
````

## Subscriptions

### Set Subscribe Callback
```
hive.api.setSubscribeCallback(callback, clearFilter, function(err, result) {
  console.log(err, result);
});
```
### Set Pending Transaction Callback
```
hive.api.setPendingTransactionCallback(cb, function(err, result) {
  console.log(err, result);
});
```
### Set Block Applied Callback
```
hive.api.setBlockAppliedCallback(cb, function(err, result) {
  console.log(err, result);
});
```
### Cancel All Subscriptions
```
hive.api.cancelAllSubscriptions(function(err, result) {
  console.log(err, result);
});
```

## Tags

### Get Trending Tags
Returns a list of the currently trending tags in descending order by value.
```
hive.api.getTrendingTags(afterTag, limit, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|afterTag|The name of the last tag to begin from|String|Use the empty string `''` to start the list. Subsequent calls can use the last tag name|
|limit|The maximum number of tags to return|Integer||
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|

Call Example:
```js
hive.api.getTrendingTags('', 2, function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
[ { name: '', total_payouts: '37610793.383 SBD', net_votes: 4211122, top_posts: 411832, comments: 1344461, trending: '5549490701' },
  { name: 'life', total_payouts: '8722947.658 SBD', net_votes: 1498401, top_posts: 127103, comments: 54049, trending: '570954588' } ]
```

Using the Result:
```js
// Extract tags from the result into an array of tag name strings
var f = result.map(function(item) { return item.name; });
console.log(f);

// Get the last tag for subsequent calls to `getTrendingTags`
//   or use: f[f.length - 1]   if you used the extraction code above.
var lastKnownTag = result[result.length - 1].name;

// Use the last known tag to get the next group of tags
hive.api.TrendingTags(lastKnownTag, 2, function(err, result) {
  console.log(err, result);
});
```

See also: [getTrendingCategories](#get-trending-categories)

### Get Blog
Gets the last `limit` number of posts of `account` before the post with index `entryId`

```js
hive.api.getBlog(account, entryId, limit, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|string|a hive username|
|entryId|number|a positive number - the index from which to start counting (the index is zero based)|
|limit|number|a positive number - the max count of posts to be returned|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getBlog("username", 10, 3, function(err, data) {
	console.log(err, data);
});

// In this case we have a call to get [3] posts, the newest of which is the one with index [10]
//			(that's the 11-th post, because the post indexes are zero based)
// That means that the results will be posts [10, 9 and 8]
```

Return Example:
```js
[
  {
		blog:"username"
		comment: { /* Omited for simplicity */ }
		entry_id: 10
		reblog_on:"1970-01-01T00:00:00"
	},
	{
		blog:"username"
		comment: { /* Omited for simplicity */ }
		entry_id: 9
		reblog_on:"1970-01-01T00:00:00"
	},
	{
		blog:"username"
		comment: { /* Omited for simplicity */ }
		entry_id: 8
		reblog_on:"1970-01-01T00:00:00"
  }
]
```

### Get Blog Authors
Gets a list of all people who wrote in someones blog, along with how many times they wrote in that blog.

```js
hive.api.getBlogAuthors(blogAccount, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|blogAccount|string|a hive username|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getBlogAuthors("username", function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
[ [ 'username1', 1 ],
  [ 'username2', 1 ],
  [ 'username3', 3 ],
  [ 'username4', 2 ],
  [ 'username5', 1 ] ]
```

### Get Blog Entries
Gets the last `limit` number of posts of `account` before the post with index `entryId`
Very similar to hive.api.getBlog but with much simpler result objects

```js
hive.api.getBlogEntries(account, entryId, limit, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|string|a hive username|
|entryId|number|a positive number - the index from which to start counting (the index is zero based)|
|limit|number|a positive number - the max count of posts to be returned|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getBlogEntries("username", 10, 3, function(err, data) {
	console.log(err, data);
});

// In this case we have a call to get [3] posts, the newest of which is the one with index [10]
//			(that's the 11-th post, because the post indexes are zero based)
// That means that the results will be posts [10, 9 and 8]
```

Return Example:
```js
[ { author: 'username',
    permlink: 'post-permlink-10',
    blog: 'username',
    reblog_on: '1970-01-01T00:00:00',
    entry_id: 10 },
  { author: 'username',
    permlink: 'post-permlink-9',
    blog: 'username',
    reblog_on: '1970-01-01T00:00:00',
    entry_id: 9 },
  { author: 'username',
    permlink: 'post-permlink-8',
    blog: 'username',
    reblog_on: '1970-01-01T00:00:00',
    entry_id: 8 } ]
```

### Get Discussions By Trending
Gets the hive posts as they would be shown in the trending tab of hive.blog.

```js
hive.api.getDiscussionsByTrending(query, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|query|object|an object containing different options for querying, like 'limit' and 'tag'|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var query = { limit : 3, tag : "hive" };
hive.api.getDiscussionsByTrending30(query, function(err, data) {
	console.log(err, data);
});

// NOTE! The default limit is 0. Not setting a limit will get you an empty result.
```

Return Example:
```js
// the result is an array of big objects representing the comments

 [ { /* ommited for simplicity */ },
   { /* ommited for simplicity */ },
   { /* ommited for simplicity */ } ]
```

### Get Discussions By Created
```
hive.api.getDiscussionsByCreated(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Active
```
hive.api.getDiscussionsByActive(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Cashout
```
hive.api.getDiscussionsByCashout(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Payout
```
hive.api.getDiscussionsByPayout(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Votes
```
hive.api.getDiscussionsByVotes(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Children
```
hive.api.getDiscussionsByChildren(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Hot
```
hive.api.getDiscussionsByHot(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Feed
```
hive.api.getDiscussionsByFeed(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Blog
```
hive.api.getDiscussionsByBlog(query, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Comments
```
hive.api.getDiscussionsByComments(query, function(err, result) {
  console.log(err, result);
});
```

### Get Discussions By Promoted
Gets the recent posts ordered by how much was spent to promote them

```js
hive.api.getDiscussionsByPromoted(query, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|query|object|an object containing different options for querying, like 'limit' and 'tag'|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var query = { limit : 3, tag : "hive" };
hive.api.getDiscussionsByPromoted(query, function(err, data) {
	console.log(err, data);
});

// NOTE! The default limit is 0. Not setting a limit will get you an empty result.
```

Return Example:
```js
// the result is an array of big objects representing the comments

 [ { /* ommited for simplicity */ },
   { /* ommited for simplicity */ },
   { /* ommited for simplicity */ } ]
```

### Get Comment Discussions By Payout
Gets the recent comments (not posts) ordered by their pending payout.

```js
hive.api.getCommentDiscussionsByPayout(query, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|query|object|an object containing different options for querying, like 'limit' and 'tag'|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var query = { limit : 3, tag : "hive" };
hive.api.getCommentDiscussionsByPayout(query, function(err, data) {
	console.log(err, data);
});

// NOTE! The default limit is 0. Not setting a limit will get you an empty result.
```

Return Example:
```js
// the result is an array of big objects representing the comments

 [ { /* ommited for simplicity */ },
   { /* ommited for simplicity */ },
   { /* ommited for simplicity */ } ]
```

### Get Post Discussions By Payout
Gets the recent posts ordered by their pending payout.

```js
hive.api.getPostDiscussionsByPayout(query, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|query|object|an object containing different options for querying, like 'limit' and 'tag'|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var query = { limit : 3, tag : "collorchallenge" };
hive.api.getPostDiscussionsByPayout(query, function(err, data) {
	console.log(err, data);
});

// NOTE! The default limit is 0. Not setting a limit will get you an empty result.
```

Return Example:
```js
// the result is an array of big objects representing the comments

 [ { /* ommited for simplicity */ },
   { /* ommited for simplicity */ },
   { /* ommited for simplicity */ } ]
```

## Blocks and transactions

### Get Block Header
```js
hive.api.getBlockHeader(blockNum, function(err, result) {
  console.log(err, result);
});
```
### Get Block
```js
hive.api.getBlock(blockNum, function(err, result) {
  console.log(err, result);
});
```
### Get Ops In Block
Gets all operations in a given block

```js
hive.api.getOpsInBlock(blockNum, onlyVirtual, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|blockNum|number|A positive number|
|onlyVirtual|bool|'false' to get all operations. 'true' to only get virtual operations|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getOpsInBlock(10000001, false, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
[ { trx_id: '4b688c13940fd5b4bb11356286ef12061f71976c',
    block: 10000001,
    trx_in_block: 0,
    op_in_trx: 0,
    virtual_op: 0,
    timestamp: '2017-03-08T17:34:24',
    op: [ 'vote', [Object] ] },
  { trx_id: 'a450debc8332c3b27935b3307891dfc509669edc',
    block: 10000001,
    trx_in_block: 2,
    op_in_trx: 0,
    virtual_op: 0,
    timestamp: '2017-03-08T17:34:24',
    op: [ 'vote', [Object] ] } ]

```
### Get State
**Warning:** getState calls are getting deprecated.  

Gets a lot of information about the state of `path`

```js
hive.api.getState(path, function(err, result) {
  console.log(err, result);
});
```
|Parameter|Datatype|Description|
|---------|--------|-----------|
|path|string| like "/@username". This is the extension from the Hive URL. It can be used on users, posts, comments, comments-by-user, replies-to-user and so on|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getState("/@username", function(err, data) {
	console.log(err, data);
});

// Here are some valid calls:

hive.api.getState("/@username", function(err, data) { console.log(data); });

hive.api.getState("/@username/permlink-of-post", function(err, data) { console.log(data); });

hive.api.getState("/@username/comments", function(err, data) { console.log(data); });

hive.api.getState("/@username/recent-replies", function(err, data) { console.log(data); });

hive.api.getState("/trending", function(err, data) { console.log(data); });

hive.api.getState("/trending/collorchallenge", function(err, data) { console.log(data); });

// and others....
```

Return Example:
```js
// The result is huge, and can have many variations depending on what you are getting the state of. It can't be documented briefly. Here is some basic information:
{	accounts: {username: {...}}
	content: {
		username/permlink1: {...},
		username/permlink2: {...}, 
		username/permlink3: {...} …}
	current_route:"/@username"
	discussion_idx: {...}
	error:""
	feed_price: {base: "3.889 HBD", quote: "1.000 HIVE"}
	pow_queue: []
	props: {...}
	tag_idx: { trending: [...] }
	tags:{...}
	witness_schedule: {...}
	witnesses: {...}	}
```

### Get State With Options
**Warning:** getState calls are getting deprecated.

```js
hive.api.getStateWith(options, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|options|object|like { path : "/@username"} where the path is an extension from a Hive URL. It can be used on users, posts, comments, comments-by-user, replies-to-user and so on|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getStateWith({ path : "/@username" }, function(err, data) {
	console.log(err, data);
});
```
See `hive.api.getState` for more examples...

### Get Trending Categories
```js
hive.api.getTrendingCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Best Categories
```js
hive.api.getBestCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Active Categories
```js
hive.api.getActiveCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Recent Categories
```js
hive.api.getRecentCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```

## Globals

### Get Config
```js
hive.api.getConfig(function(err, result) {
  console.log(err, result);
});
```
### Get Dynamic Global Properties
```js
hive.api.getDynamicGlobalProperties(function(err, result) {
  console.log(err, result);
});
```
### Get Chain Properties
```js
hive.api.getChainProperties(function(err, result) {
  console.log(err, result);
});
```
### Get Feed Entries
Gets the posts in the feed of a user.
The feed displays posts of followed users, as well as what they reblogged.

```js
hive.api.getFeedEntries(account, entryId, limit, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|string|a hive username|
|entryId|number|the post id from which to start counting. Write '0' to start from newest post|
|limit|number|a positive number|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getFeedEntries("username", 0, 2, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
[
  {
    author: 'otherusername',
    permlink: 'permlink',
    reblog_by: ['mahdiyari'], //full when post is in feed because it's reblogged
    reblog_on: '2018-02-11T18:42:54',
    entry_id: 10260
  },
  {
    author: 'otherusername',
    permlink: 'permlink',
    reblog_by: [], // false when post is in feed because user follows it's author
    reblog_on: '2018-02-11T18:39:24',
    entry_id: 10259
  }
]
```
### Get Feed History
```js
hive.api.getFeedHistory(function(err, result) {
  console.log(err, result);
});
```
### Get Current Median History Price
```js
hive.api.getCurrentMedianHistoryPrice(function(err, result) {
  console.log(err, result);
});
```
### Get Ticker
Gets the lates summorized data from the hive market.

```js
hive.api.getTicker(callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getTicker(function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{ latest: '0.89732142857142860',
  lowest_ask: '0.89684014869888484',
  highest_bid: '0.89600000000000002',
  percent_change: '-14.56712923228768730',
  hive_volume: '7397.697 HIVE',
  hbd_volume: '6662.316 HBD' }
```
### Get Trade History
Gets the trade history for a given period between a `start` date and an `end` date

```js
hive.api.getTradeHistory(start, end, limit, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|start|string|Datetime string in the format "2018-01-01T00:00:00"|
|end|string|Datetime string in the format "2018-01-01T00:00:00"|
|limit|number|a positive number|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var start = "2018-01-01T00:00:00";
var end = "2018-01-02T00:00:00";

hive.api.getTradeHistory(start, end, 5, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 [ { date: '2018-01-01T00:00:09',
    current_pays: '10.192 HBD',
    open_pays: '25.650 HIVE' },
  { date: '2018-01-01T00:00:09',
    current_pays: '2.000 HBD',
    open_pays: '5.033 HIVE' },
  { date: '2018-01-01T00:00:12',
    current_pays: '13.560 HBD',
    open_pays: '34.128 HIVE' },
  { date: '2018-01-01T00:00:12',
    current_pays: '3.057 HBD',
    open_pays: '7.690 HIVE' },
  { date: '2018-01-01T00:00:12',
    current_pays: '6.908 HBD',
    open_pays: '17.375 HIVE' } ] 
```
### Get Version
Gets the version of the Hive blockchain you are connected to.

```js
hive.api.getVersion(callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getVersion(function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{
  blockchain_version: '1.24.4',
  chain_id: 'beeab0de00000000000000000000000000000000000000000000000000000000',
  fc_revision: 'b91e5d490e3647cc816748a5565452b663c6aa73',
  hive_revision: 'b91e5d490e3647cc816748a5565452b663c6aa73'
}
```
### Get Volume
Gets the Hive and Hive Dollar volumes

```js
hive.api.getVolume(callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getVolume(function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{ hive_volume: '8101.888 HIVE',
	hbd_volume: '7287.268 HBD' }
```
### Get Hardfork Version
Gets the current hardfork version of the Hive blockchain.
```js
hive.api.getHardforkVersion(function(err, result) {
  console.log(err, result);
});
```
Return Example:
```js
'1.24.0'
```
This returns a string and not JSON.

See also: [getNextScheduledHardfork](#get-next-scheduled-hardfork), [getConfig](#get-config)
### Get Next Scheduled Hardfork
```js
hive.api.getNextScheduledHardfork(function(err, result) {
  console.log(err, result);
});
```
### Get Reward Fund
```js
hive.api.getRewardFund(name, function(err, result) {
  console.log(err, result);
});
```
### Claim Reward Balance
Claims pending rewards, be they HIVE, HBD or VESTS.

```js
hive.broadcast.claimRewardBalance(wif, account, reward_hive, reward_hbd, reward_vests, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|wif|string|Use hive.auth.toWif(user, pass, type)|
|account|string|a hive username|
|reward_hive|string|balance like "0.000 HIVE"|
|reward_hbd|string|balance like "0.000 HBD"|
|reward_vests|string|balance like "0.000006 VESTS"|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.broadcast.claimRewardBalance("5Hupd....pp7vGY", "username", "0.000 HIVE", "0.000 HBD", "0.000006 VESTS", function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{ id: '052f.......c6c2f',
  block_num: 19756287,
  trx_num: 40,
  expired: false,
  ref_block_num: 29928,
  ref_block_prefix: 808836877,
  expiration: '2018-02-10T20:12:15',
  operations: [ [ 'claim_reward_balance', [Object] ] ],
  extensions: [],
  signatures: [ '205......614e' ] }
```
### Claim Reward Balance With Options
Claims pending rewards, be they HIVE, HBD or VESTS.

```js
hive.broadcast.claimRewardBalanceWith(wif, options, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|wif|string|Use < hive.auth.toWif(user, pass, type) >|
|options|object|an object containing the calim parameters. Look at the example below.|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var options = {
    account:"username",
    reward_hbd:"0.000 HBD",
    reward_hive:"0.000 HIVE",
    reward_vests:"0.000006 VESTS"
}
hive.broadcast.claimRewardBalanceWith("5Hupd....pp7vGY", options, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 { id: '4b7b........034c7',
  block_num: 19756322,
  trx_num: 3,
  expired: false,
  ref_block_num: 29965,
  ref_block_prefix: 4245658614,
  expiration: '2018-02-10T20:14:00',
  operations: [ [ 'claim_reward_balance', [Object] ] ],
  extensions: [],
  signatures: [ '1f61a..........4f3d7' ] }
```
### Get Vesting Delegations
Returns a list of delegations made from one `account`. Denominated in VESTS.
```js
hive.api.getVestingDelegations(account, from, limit, function(err, result) {
  console.log(err, result);
});
```
|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|account|Account who is making the delegations|String||
|from|The name of the last account to begin from|String|Use the empty string `''` to start the list. Subsequent calls can use the last delegatee's account name|
|limit|The maximum number of delegation records to return|Integer||
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|


Call Example:
```js
hive.api.getVestingDelegations('mahdiyari', '', 2, function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
[
  {
    delegatee: 'dblog-io',
    delegator: 'mahdiyari',
    id: 980695,
    min_delegation_time: '2018-08-03T20:33:21',
    vesting_shares: '29429.940343 VESTS'
  },
  {
    delegatee: 'lokio',
    delegator: 'mahdiyari',
    id: 1359266,
    min_delegation_time: '2020-10-21T12:15:18',
    vesting_shares: '28832.135025 VESTS'
  }
]
```
Using the Result:
```js
// Extract delegatee names from the result into an array of account name strings
var f = result.map(function(item) { return item.delegatee; });
console.log(f);

// Get the last tag for subsequent calls to `getVestingDelegations`
//   or use: f[f.length - 1]   if you used the extraction code above.
var lastKnownDelegatee = result[result.length - 1].delegatee;

// Use the last known delegatee to get the next group of delegatees
hive.api.TrendingTags('mahdiyari', lastKnownDelegatee, 2, function(err, result) {
  console.log(err, result);
});
```

See also: [accountCreateWithDelegation](#account-create-with-delegation), [delegateVestingShares](#delegate-vesting-shares)

## Keys

### Get Key References
```js
hive.api.getKeyReferences(key, function(err, result) {
  console.log(err, result);
});
```

## Accounts

### Get Accounts
```js
hive.api.getAccounts(names, function(err, result) {
  console.log(err, result);
});
```
### Get Account References
```js
hive.api.getAccountReferences(accountId, function(err, result) {
  console.log(err, result);
});
```
### Lookup Account Names
```js
hive.api.lookupAccountNames(accountNames, function(err, result) {
  console.log(err, result);
});
```
### Lookup Accounts
```js
hive.api.lookupAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Account Count
```js
hive.api.getAccountCount(function(err, result) {
  console.log(err, result);
});
```
### Get Conversion Requests
```js
hive.api.getConversionRequests(accountName, function(err, result) {
  console.log(err, result);
});
```
### Get Account History
```js
hive.api.getAccountHistory(account, from, limit, operation_filter_low, operation_filter_high, function(err, result) {
  console.log(err, result);
});
```  
Example:  

```js
const { ChainTypes, makeBitMaskFilter } = require('@hiveio/hive-js/lib/auth/serializer')
const op = ChainTypes.operations
const walletOperationsBitmask = makeBitMaskFilter([
  op.transfer,
  op.transfer_to_vesting,
  op.withdraw_vesting,
  op.interest,
  op.liquidity_reward,
  op.transfer_to_savings,
  op.transfer_from_savings,
  op.escrow_transfer,
  op.cancel_transfer_from_savings,
  op.escrow_approve,
  op.escrow_dispute,
  op.escrow_release,
  op.fill_convert_request,
  op.fill_order,
  op.claim_reward_balance
])
hive.api.getAccountHistory(account, from, limit, ...walletOperationsBitmask, function(err, result) {
  console.log(err, result)
})
```  


### Get Owner History
```js
hive.api.getOwnerHistory(account, function(err, result) {
  console.log(err, result);
});
```
### Get Recovery Request
```js
hive.api.getRecoveryRequest(account, function(err, result) {
  console.log(err, result);
});
```

### Get Account Reputations
Gets the reputation points of `limit` accounts with names most similar to `lowerBoundName`.

```js
hive.api.getAccountReputations(lowerBoundName, limit, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|lowerBoundName|string|a hive username query|
|limit|number|a positive number|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getAccountReputations("username", 2, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 [ { account: 'username', reputation: '26727073581' },
   { account: 'username-taken', reputation: 0 } ]
```

## Market

### Get Order Book
```js
hive.api.getOrderBook(limit, function(err, result) {
  console.log(err, result);
});
```
### Get Market Order Book
Takes the top-most `limit` entries in the market order book for both buy and sell orders.

```js
hive.api.getMarketOrderBook(limit, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|limit|number|a positive number|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getMarketOrderBook(2, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{
  asks: [
    {
      created: '2020-11-03T15:24:54',
      hbd: 227,
      hive: 1915,
      order_price: [Object],
      real_price: '0.11853785900783290'
    },
    {
      created: '2020-11-03T15:20:51',
      hbd: 1244,
      hive: 10463,
      order_price: [Object],
      real_price: '0.11889515435343592'
    }
  ],
  bids: [
    {
      created: '2020-11-03T15:23:03',
      hbd: 2000,
      hive: 16948,
      order_price: [Object],
      real_price: '0.11800802454566911'
    },
    {
      created: '2020-11-03T15:21:51',
      hbd: 44673,
      hive: 378585,
      order_price: [Object],
      real_price: '0.11799992075755775'
    }
  ]
}
```
### Get Market Order Book With Options
Takes the top-most `limit` entries in the market order book for both buy and sell orders.

```js
hive.api.getMarketOrderBookWith(options, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|options|object|like { limit:number }|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getMarketOrderBookWith({ limit: 1 }, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
{
  asks: [
    {
      created: '2020-11-03T15:24:54',
      hbd: 227,
      hive: 1915,
      order_price: [Object],
      real_price: '0.11853785900783290'
    }
  ],
  bids: [
    {
      created: '2020-11-03T15:29:30',
      hbd: 5990,
      hive: 50533,
      order_price: [Object],
      real_price: '0.11853640195515802'
    }
  ]
}
```
### Get Open Orders
```js
hive.api.getOpenOrders(owner, function(err, result) {
  console.log(err, result);
});
```
### Get Liquidity Queue
```js
hive.api.getLiquidityQueue(startAccount, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Market History Buckets

```js
hive.api.getMarketHistoryBuckets(callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getMarketHistoryBuckets(function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 [ 15, 60, 300, 3600, 86400 ]
```

## Authority / validation

### Get Transaction Hex
```js
hive.api.getTransactionHex(trx, function(err, result) {
  console.log(err, result);
});
```
### Get Transaction
```js
hive.api.getTransaction(trxId, function(err, result) {
  console.log(err, result);
});
```
### Get Required Signatures
```js
hive.api.getRequiredSignatures(trx, availableKeys, function(err, result) {
  console.log(err, result);
});
```
### Get Potential Signatures
```js
hive.api.getPotentialSignatures(trx, function(err, result) {
  console.log(err, result);
});
```
### Verify Authority
```js
hive.api.verifyAuthority(trx, function(err, result) {
  console.log(err, result);
});
```
### Verify Account Authority
```js
hive.api.verifyAccountAuthority(nameOrId, signers, function(err, result) {
  console.log(err, result);
});
```

## Votes

### Get Active Votes
```js
hive.api.getActiveVotes(author, permlink, function(err, result) {
  console.log(err, result);
});
```
### Get Account Votes
```js
hive.api.getAccountVotes(voter, function(err, result) {
  console.log(err, result);
});
```

## Content


### Get Content
```js
hive.api.getContent(author, permlink, function(err, result) {
  console.log(err, result);
});
```
### Get Content Replies
```js
hive.api.getContentReplies(author, permlink, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Author Before Date
```js
hive.api.getDiscussionsByAuthorBeforeDate(author, startPermlink, beforeDate, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Reblogged By
Gives a list of the users that reblogged a given post

```js
hive.api.getRebloggedBy(author, permlink, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|author|string|a hive username|
|permlink|string|a permalink of comment or post|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getRebloggedBy("author", "example-permlink", function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 [ 'author',
  'user1',
  'user2',
  'user3',
  'user4' ]
```
### Get Replies By Last Update
```js
hive.api.getRepliesByLastUpdate(startAuthor, startPermlink, limit, function(err, result) {
  console.log(err, result);
});
```

## Witnesses


### Get Witnesses
```js
hive.api.getWitnesses(witnessIds, function(err, result) {
  console.log(err, result);
});
```
### Get Witness By Account
```js
hive.api.getWitnessByAccount(accountName, function(err, result) {
  console.log(err, result);
});
```
### Get Witnesses By Vote
```js
hive.api.getWitnessesByVote(from, limit, function(err, result) {
  console.log(err, result);
});
```
### Lookup Witness Accounts
```js
hive.api.lookupWitnessAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Witness Schedule
Gets some general information about the witnesses.

```js
hive.api.getWitnessSchedule(callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getWitnessSchedule(function(err, data) {
  console.log(err,data);
})
```

Return Example:
```js
{
  id: 0,
  current_virtual_time: '576908375209337450843859945',
  next_shuffle_block_num: 48367095,
  current_shuffled_witnesses: [
    'cervantes',   'themarkymark',
    'pharesim',    'stoodkev',
    'ausbitbank',  'followbtcnews',
    'anyx',        'gtg',
    'steempeak',   'therealwolf',
    'drakos',      'good-karma',
    'blocktrades', 'roelandp',
    'emrebeyler',  'ocd-witness',
    'arcange',     'someguy123',
    'steempress',  'yabapmatt',
    'abit'
  ],
  num_scheduled_witnesses: 21,
  elected_weight: 1,
  timeshare_weight: 5,
  miner_weight: 1,
  witness_pay_normalization_factor: 25,
  median_props: {
    account_creation_fee: '3.000 HIVE',
    maximum_block_size: 65536,
    hbd_interest_rate: 0,
    account_subsidy_budget: 797,
    account_subsidy_decay: 347321
  },
  majority_version: '1.24.2',
  max_voted_witnesses: 20,
  max_miner_witnesses: 0,
  max_runner_witnesses: 1,
  hardfork_required_witnesses: 17,
  account_subsidy_rd: {
    resource_unit: 10000,
    budget_per_time_unit: 797,
    pool_eq: 157691079,
    max_pool_size: 157691079,
    decay_params: {
      decay_per_time_unit: 347321,
      decay_per_time_unit_denom_shift: 36
    },
    min_decay: 0
  },
  account_subsidy_witness_rd: {
    resource_unit: 10000,
    budget_per_time_unit: 996,
    pool_eq: 9384019,
    max_pool_size: 9384019,
    decay_params: {
      decay_per_time_unit: 7293741,
      decay_per_time_unit_denom_shift: 36
    },
    min_decay: 216
  },
  min_witness_account_subsidy_decay: 0
}
```
### Get Witness Count
```js
hive.api.getWitnessCount(function(err, result) {
  console.log(err, result);
});
```
### Get Active Witnesses
```js
hive.api.getActiveWitnesses(function(err, result) {
  console.log(err, result);
});
```

## Login API

### Login

/!\ It's **not safe** to use this method with your username and password. This method always return `true` and is only used in intern with empty values to enable broadcast.

```js
hive.api.login('', '', function(err, result) {
  console.log(err, result);
});
```

### Get Api By Name
```js
hive.api.getApiByName(apiName, function(err, result) {
  console.log(err, result);
});
```

## Follow API
The follower API queries information about follow relationships between accounts. The API is read-only and does not create changes on the blockchain.

### Get Followers
Returns an alphabetical ordered array of the accounts that are following a particular account.
```js
hive.api.getFollowers(following, startFollower, followType, limit, function(err, result) {
  console.log(err, result);
});
```
|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|following|The followers of which account|String|No leading @ symbol|
|startFollower|Start the list from which follower?|String|No leading @symbol. Use the empty string `''` to start the list. Subsequent calls can use the name of the last follower|
|followType|Follow or mute|String|Set to 'blog' for followers or 'ignore' for mutes|
|limit|The maximum number of followers to return|Integer|1000 is maximum|
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|

Call Example:
```js
hive.api.getFollowers('username', '', 'blog', 2, function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
[ { follower: 'user1', following: 'username', what: [ 'blog' ] },
  { follower: 'user2', following: 'username', what: [ 'blog' ] } ]
```

Using the Result:
```js
// Extract followers from the result into an array of account name strings
var f = result.map(function(item) { return item.follower; });
console.log(f);

// Get the last follower for subsequent calls to getFollowers
//   or use: f[f.length - 1]   if you used the extraction code above.
var lastKnownFollower = result[result.length - 1].follower;

// Use the last known follower to get the next group of followers
hive.api.getFollowers('username', lastKnownFollower, 'blog', 2, function(err, result) {
  console.log(err, result);
});
```
See also: [getFollowing](#get-following), [getFollowCount](#get-follow-count)

### Get Following
Returns an alphabetical ordered Array of the accounts that are followed by a particular account.
```js
hive.api.getFollowing(follower, startFollowing, followType, limit, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|follower|The account to get the following for|String|No leading @ symbol|
|startFollowing|Start the list at which followed account?|String|No leading @symbol. Use the empty string `''` to start the list|
|followType|Follow or mute|String|Set to 'blog' for following or 'ignore' for muted|
|limit|The maximum number of items to return|Integer|1000 is maximum|
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|

Call Example:
```js
hvie.api.getFollowing('username', '', 'blog', 2, function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
[ { follower: 'username', following: 'user1', what: [ 'blog' ] },
  { follower: 'username', following: 'user2', what: [ 'blog' ] } ]
```

Using the Result:
```js
// Extract followed accounts from the result into an array of account name strings
var f = result.map(function(item) { return item.following; });
```
See the usage examples for [getFollowers](#get-followers) because the behaviour is very similar.

See also: [getFollowers](#get-followers), [getFollowCount](#get-follow-count)

### Get Follow Count
```js
hive.api.getFollowCount(account, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|account|The name for get the follow ccount for|String|No leading @ symbol|
|function()|Your callback|function|Tip: use `console.log(err, result)` to see the result|


Call Example:
```js
hive.api.getFollowCount('username', function(err, result) {
  console.log(err, result);
});
```

Return Example:
```js
{ account: 'username', follower_count: 16790, following_count: 913 }
```

See also: [getFollowers](#get-followers), [getFollowing](#get-following)

## Broadcast API

### Broadcast Block With Options
Broadcast a new block on the hive blockchain.

```js
hive.api.broadcastBlockWith(options, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|options|object|like { b: blockObject } where blockObject contains the information on the block you are trying to broadcast|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
var options = { 
    b: {
        previous:"0000000000000000000000000000000000000000",
        timestamp:"1970-01-01T00:00:00",
        witness:"",
        transaction_merkle_root:"0000000000000000000000000000000000000000",
        extensions:[],
        witness_signature:
            "00000000000000000000000000000000000000000000000000000000000000000"+
            "00000000000000000000000000000000000000000000000000000000000000000",
        transactions: []
    }
};

hive.api.broadcastBlockWith(options, function(err, data) {
	console.log(err, data);
});
```

### Broadcast Transaction Synchronous
```js
hive.api.broadcastTransactionSynchronous(trx, function(err, result) {
  console.log(err, result);
});
```
### Broadcast Block
```js
hive.api.broadcastBlock(b, function(err, result) {
  console.log(err, result);
});
```

# Broadcast
The `hive.broadcast` methods cause permanent changes on the blockchain.
### Account Create
```js
hive.broadcast.accountCreate(wif, fee, creator, newAccountName, owner, active, posting, memoKey, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
### Account Create With Delegation
```js
hive.broadcast.accountCreateWithDelegation(wif, fee, delegation, creator, newAccountName, owner, active, posting, memoKey, jsonMetadata, extensions, function(err, result) {
  console.log(err, result);
});
```
### Delegate Vesting Shares
Delegates HIVE POWER, denominated in VESTS, from a `delegator` to the `delegatee`. Requires the `delegator`'s private WIF key. Set the delegation to 0 to undelegate.
```js
hive.broadcast.delegateVestingShares(wif, delegator, delegatee, vesting_shares, function(err, result) {
  console.log(err, result);
});
```
### Account Update
```js
hive.broadcast.accountUpdate(wif, account, owner, active, posting, memoKey, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
### Account Witness Proxy
```js
hive.broadcast.accountWitnessProxy(wif, account, proxy, function(err, result) {
  console.log(err, result);
});
```
### Account Witness Vote
```js
hive.broadcast.accountWitnessVote(wif, account, witness, approve, function(err, result) {
  console.log(err, result);
});
```
### Witness Set Properties
```js
hive.broadcast.witnessSetProperties(signingKey, owner, props, extensions, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|signingKey|Private signing key of the witness|String||
|owner|The name of witness account|String||
|props|Witness properties|Array| Use `hive.utils.buildWitnessUpdateOp(owner, props)` to build the values|
|extensions|empty array []|Array||

### Challenge Authority
```js
hive.broadcast.challengeAuthority(wif, challenger, challenged, requireOwner, function(err, result) {
  console.log(err, result);
});
```
### Change Recovery Account
```js
hive.broadcast.changeRecoveryAccount(wif, accountToRecover, newRecoveryAccount, extensions, function(err, result) {
  console.log(err, result);
});
```
### Comment
```js
hive.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
### Comment Options
```js
hive.broadcast.commentOptions(wif, author, permlink, maxAcceptedPayout, percentHiveDollars, allowVotes, allowCurationRewards, extensions, function(err, result) {
  console.log(err, result);
});
```
### Comment Payout
```js
hive.broadcast.commentPayout(wif, author, permlink, payout, function(err, result) {
  console.log(err, result);
});
```
### Comment Reward
```js
hive.broadcast.commentReward(wif, author, permlink, hbdPayout, vestingPayout, function(err, result) {
  console.log(err, result);
});
```
### Convert
```js
hive.broadcast.convert(wif, owner, requestid, amount, function(err, result) {
  console.log(err, result);
});
```
### Collateralized Convert

```js
hive.broadcast.collateralizedConvert(wif, owner, requestid, amount, function(err, result) {
  console.log(err, result);
});
```
|Parameter|Datatype|Description|
|---------|--------|-----------|
|wif|string|Active private key. "5xx...xxxx"|
|owner|string|Hive username. "guest123"|
|requestid|integer|Identifier for the conversion transactions from same account. 1|
|amount|string|Hive to be used as collateral for the conversion. "100.000 HIVE"|
|callback|function|function(err, data) {/*code*/}|

### Curate Reward
```js
hive.broadcast.curateReward(wif, curator, reward, commentAuthor, commentPermlink, function(err, result) {
  console.log(err, result);
});
```
### Custom
```js
hive.broadcast.custom(wif, requiredAuths, id, data, function(err, result) {
  console.log(err, result);
});
```
### Custom Binary
```js
hive.broadcast.customBinary(wif, id, data, function(err, result) {
  console.log(err, result);
});
```
### Custom Json
```js
hive.broadcast.customJson(wif, requiredAuths, requiredPostingAuths, id, json, function(err, result) {
  console.log(err, result);
});
```
### Delete Comment
```js
hive.broadcast.deleteComment(wif, author, permlink, function(err, result) {
  console.log(err, result);
});
```
### Escrow Dispute
```js
hive.broadcast.escrowDispute(wif, from, to, agent, who, escrowId, function(err, result) {
  console.log(err, result);
});
```
### Escrow Release
```js
hive.broadcast.escrowRelease(wif, from, to, agent, who, receiver, escrowId, hbdAmount, hiveAmount, function(err, result) {
  console.log(err, result);
});
```
### Escrow Transfer
```js
hive.broadcast.escrowTransfer(wif, from, to, agent, escrowId, hbdAmount, hiveAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta, function(err, result) {
  console.log(err, result);
});
```
### Get Escrow
```js
hive.api.getEscrow(from, escrowId, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|from|string|a hive username|
|escrowId|number|id of the specific escrow transfer|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getEscrow("username", 23456789, function(err, data) {
	console.log(err, data);
});
```
### Feed Publish
```js
hive.broadcast.feedPublish(wif, publisher, exchangeRate, function(err, result) {
  console.log(err, result);
});
```
### Pow2
```js
hive.broadcast.pow2(wif, work, newOwnerKey, props, function(err, result) {
  console.log(err, result);
});
```
### Fill Convert Request
```js
hive.broadcast.fillConvertRequest(wif, owner, requestid, amountIn, amountOut, function(err, result) {
  console.log(err, result);
});
```
### Fill Order
```js
hive.broadcast.fillOrder(wif, currentOwner, currentOrderid, currentPays, openOwner, openOrderid, openPays, function(err, result) {
  console.log(err, result);
});
```
### Fill Vesting Withdraw
```js
hive.broadcast.fillVestingWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
```
### Get Withdraw Routes
Gets withdraw routes (hive power withdraws).

```js
hive.api.getWithdrawRoutes(account, withdrawRouteType, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|string|a hive username|
|withdrawRouteType|number|a number representing a value from an enumeration. Must be 0, 1 or 2|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getWithdrawRoutes("username", 1, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
[ { from_account: 'username',
    to_account: 'receiver',
    percent: 10000,
    auto_vest: false } ]
```
### Interest
```js
hive.broadcast.interest(wif, owner, interest, function(err, result) {
  console.log(err, result);
});
```
### Limit Order Cancel
Cancels an open limit order on the [internal market](https://wallet.hive.blog/market). Be aware that the order might be filled, or partially filled, before this call completes.

```js
hive.broadcast.limitOrderCancel(wif, owner, orderid, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|wif|Active private key|String||
|owner|Account name|String|No leading @ symbol|
|orderid|User defined ordernumber|Integer|The `orderid` used when the order was created|
|function()|Your callback|function||


See also: [getOpenOrders](#get-open-orders), [limitOrderCancel](#limit-order-cancel), [limitOrderCreate2](#limit-order-create2)

### Limit Order Create
Creates a limit order on the [internal market](https://wallet.hive.blog/market) to trade one asset for another using a specified minimum. Orders can be set attempt to fill immediately and or to go to the orderbook. Orders in the order book remain until filled or the expiration time is reached.
```js
hive.broadcast.limitOrderCreate(wif, owner, orderid, amountToSell, minToReceive, fillOrKill, expiration, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|wif|Active private key|String||
|owner|Account name|String|No leading @ symbol|
|orderid|User defined ordernumber|Integer|Used to cancel orders|
|amountToSell|Amount to sell|String|"X.XXX ASSET" must have 3 decimal places. e.g. "25.100 HBD"|
|minToReceive|Amount desired|String|"X.XXX ASSET" must have 3 decimal places. e.g. "20.120 HIVE"|
|fillOrKill|Fill order from current order book or kill the order|Boolean|`false` places the order into the Order Book until either cancelled, filled, or the expiration time is reached|
|expiration|Time when order expires|Integer|Unit milliseconds. Zero is UNIX epoch|
|function()|Your callback|function||

Tip: `expiration` time must always be in the future even if `fillOrKill` is set to `true`.

Risky tip: The Internal Market seems to always try and get the best price from the current orderbook so, to place an at market order, then use the `minToReceive` as `0.001` and `fillOrKill` as `true` (use at own risk).


See also: [getOrderBook](#get-order-book), [getOpenOrders](#get-open-orders), [limitOrderCancel](#limit-order-cancel), [limitOrderCreate2](#limit-order-create2)

### Limit Order Create2
Creates a limit order on the [internal market](https://wallet.hive.blog/market) to trade one asset for another using an exchange rate.  Orders can be set attempt to fill immediately and or to go to the orderbook. Orders in the order book remain until filled or the expiration time is reached.

```js
hive.broadcast.limitOrderCreate2(wif, owner, orderid, amountToSell, exchangeRate, fillOrKill, expiration, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|wif|Active private key|String||
|owner|Account name|String|No leading @ symbol|
|orderid|User defined order identifier|Integer|Used to cancel orders|
|amountToSell|Amount to sell|String|"X.XXX ASSET" must have 3 decimal places. e.g. "25.100 HBD"|
|exchangeRate|The exchange rate|Integer|`amountToSell` is multiplied by the `exchangeRate` to have the same effect as `minToReceive`|
|fillOrKill|Fill order from current order book or kill the order|Boolean|`false` places the order into the Order Book until either canceled, filled, or the expiration time is reached|
|expiration|Time when order expires|Integer|Unit milliseconds. Zero is UNIX epoch|
|function()|Your callback|function||


See also: [getOrderBook](#get-order-book), [getOpenOrders](#get-open-orders), [limitOrderCancel](#limit-order-cancel), [limitOrderCreate](#limit-order-create2)


### Liquidity Reward
```js
hive.broadcast.liquidityReward(wif, owner, payout, function(err, result) {
  console.log(err, result);
});
```
### Pow
```js
hive.broadcast.pow(wif, worker, input, signature, work, function(err, result) {
  console.log(err, result);
});
```
### Prove Authority
```js
hive.broadcast.proveAuthority(wif, challenged, requireOwner, function(err, result) {
  console.log(err, result);
});
```
### Recover Account
```js
hive.broadcast.recoverAccount(wif, accountToRecover, newOwnerAuthority, recentOwnerAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
### Report Over Production
```js
hive.broadcast.reportOverProduction(wif, reporter, firstBlock, secondBlock, function(err, result) {
  console.log(err, result);
});
```
### Request Account Recovery
```js
hive.broadcast.requestAccountRecovery(wif, recoveryAccount, accountToRecover, newOwnerAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
### Escrow Approve
```js
hive.broadcast.escrowApprove(wif, from, to, agent, who, escrowId, approve, function(err, result) {
  console.log(err, result);
});
```
### Set Withdraw Vesting Route
```js
hive.broadcast.setWithdrawVestingRoute(wif, fromAccount, toAccount, percent, autoVest, function(err, result) {
  console.log(err, result);
});
```
### Transfer
Transfers assets, such as HIVE or HBD, from one account to another.
```js
hive.broadcast.transfer(wif, from, to, amount, memo, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|wif|Active private key for the `from` account|String||
|from|Account name to take asset from|String|No leading @ symbol|
|to|Account name to place asset into|String|No leading @ symbol|
|amount|Amount of asset to transfer|String|"X.XXX ASSET" must have 3 decimal places. e.g. "5.150 HBD"|
|function()|Your callback|function||

See also: [recurrentTransfer](#recurrent-transfer)

### Recurrent Transfer
Transfers assets, such as HIVE or HBD, from one account to another.
```js
hive.broadcast.recurrentTransfer(wif, from, to, amount, memo, recurrence, executions, extensions, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|wif|Active private key for the `from` account|String||
|from|Account name to take asset from|String|No leading @ symbol|
|to|Account name to place asset into|String|No leading @ symbol|
|amount|Amount of of asset to transfer|String|"X.XXX ASSET" must have 3 decimal places. e.g. "5.150 HBD"|
|recurrence|How often will the payment be triggered|Integer|e.g. 48 - unit: hours|
|executions|The times the recurrent payment will be executed|Integer|e.g. 10 - one tranfer per recurrence|
|function()|Your callback|function||

See also: [transferToVesting](#transfer-to-vesting)

### Transfer To Vesting
Vests HIVE into HIVE POWER. This method supports powering up one account from another.
```js
hive.broadcast.transferToVesting(wif, from, to, amount, function(err, result) {
  console.log(err, result);
});
```

|Parameter|Description|Datatype|Notes|
|---|---|---|---|
|wif|Active private key for the `from` account|String||
|from|Account name to take HIVE from|String|No leading @ symbol|
|to|Account name to vest HIVE POWER into|String|No leading @ symbol. Can be the same account as `to`|
|amount|Amount of HIVE to vest/power up|String|"X.XXX HIVE" must have 3 decimal places. e.g. "25.100 HIVE". Must be denominated in HIVE|
|function()|Your callback|function||

See also: [transfer](#transfer)

### Vote
```js
hive.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
  console.log(err, result);
});
```
### Withdraw Vesting
```js
hive.broadcast.withdrawVesting(wif, account, vestingShares, function(err, result) {
  console.log(err, result);
});
```
### Witness Update
```js
hive.broadcast.witnessUpdate(wif, owner, url, blockSigningKey, props, fee, function(err, result) {
  console.log(err, result);
});
```
### Fill Vesting Withdraw
```js
hive.broadcast.fillVestingWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
```
### Fill Order
```js
hive.broadcast.fillOrder(wif, currentOwner, currentOrderid, currentPays, openOwner, openOrderid, openPays, function(err, result) {
  console.log(err, result);
});
```
### Get Recent Trades
Gets a list of the last `limit` trades from the market.

```js
hive.api.getRecentTrades(limit, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|limit|number|a positive number|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getRecentTrades(2, function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
[
  {
    date: '2020-11-03T16:08:51',
    current_pays: '51.754 HIVE',
    open_pays: '6.085 HBD'
  },
  {
    date: '2020-11-03T16:08:48',
    current_pays: '1.134 HBD',
    open_pays: '9.503 HIVE'
  }
]
```
### Fill Transfer From Savings
```js
hive.broadcast.fillTransferFromSavings(wif, from, to, amount, requestId, memo, function(err, result) {
  console.log(err, result);
});
```
### Get Savings Withdraw From
Gets a list of savings withdraws from `account`.

```js
hive.api.getSavingsWithdrawFrom(account, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|string|a hive username|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getSavingsWithdrawFrom("username", function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 [ /* list of withdraws from savings */ ]
```

### Get Savings Withdraw To
Gets a list of savings withdraws from `account`.

```js
hive.api.getSavingsWithdrawTo(account, callback);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|string|a hive username|
|callback|function|function(err, data) {/*code*/}|


Call Example:
```js
hive.api.getSavingsWithdrawTo("username", function(err, data) {
	console.log(err, data);
});
```

Return Example:
```js
 [ /* list of withdraws from savings */ ]
```

### Comment Payout
```js
hive.broadcast.commentPayout(wif, author, permlink, payout, function(err, result) {
  console.log(err, result);
});
```
### Transfer To Savings
```js
hive.broadcast.transferToSavings(wif, from, to, amount, memo, function(err, result) {
  console.log(err, result);
});
```
### Transfer From Savings
```js
hive.broadcast.transferFromSavings(wif, from, requestId, to, amount, memo, function(err, result) {
  console.log(err, result);
});
```
### Cancel Transfer From Savings
```js
hive.broadcast.cancelTransferFromSavings(wif, from, requestId, function(err, result) {
  console.log(err, result);
});
```

### Multisig
You can use multisignature to broadcast an operation.
```js
hive.broadcast.send({
  extensions: [],
  operations: [
    ['vote', {
      voter: 'guest123',
      author: 'fabien',
      permlink: 'test',
      weight: 1000
    }]
  ]}, [privPostingWif1, privPostingWif2], (err, result) => {
  console.log(err, result);
});
```

# Auth

### Verify
```js
hive.auth.verify(name, password, auths);
```

### Generate Keys
```js
hive.auth.generateKeys(name, password, roles);
```

### Get Private Keys
```js
hive.auth.getPrivateKeys(name, password, roles);
```

### Is Wif
```js
hive.auth.isWif(privWif);
```

### To Wif
```js
hive.auth.toWif(name, password, role);
```

### Wif Is Valid
```js
hive.auth.wifIsValid(privWif, pubWif);
```

### Wif To Public
```js
hive.auth.wifToPublic(privWif);
```

### Sign Transaction
```js
hive.auth.signTransaction(trx, keys);
```

### Sign a message
```js
hive.auth.signMessage(message, privateKey)
```

# Formatter

### Amount
Formats number and currency to the valid way for sending (for example - it trims the number's floating point remainder to 3 digits only).

```js
hive.formatter.amount(_amount, asset);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|_amount|number|A positive number|
|asset|string|The name of a hive asset (hive, hbd)|


Call Example:
```js
hive.formatter.amount(53.442346, "HIVE");
```

Return Example:
```js
 "53.442 HIVE" 
```

### Number With Commas
Formats a big number, by adding a comma on every 3 digits.
Attention - only works on strings. No numbers can be passed directly.

```js
hive.formatter.numberWithCommas(x);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|x|string|Number to format as string|


Call Example:
```js
hive.formatter.numberWithCommas(53304432342.432.toString());
// or
hive.formatter.numberWithCommas("53304432342.432");
```

Return Example:
```js
 "53,304,432,342.432" 
```

### Create Suggested Password
```js
var password = hive.formatter.createSuggestedPassword();
console.log(password);
// => 'GAz3GYFvvQvgm7t2fQmwMDuXEzDqTzn9'
```

### Comment Permlink
```js
var parentAuthor = 'hiveio';
var parentPermlink = 'announcing-the-launch-of-hive-blockchain';
var commentPermlink = hive.formatter.commentPermlink(parentAuthor, parentPermlink);
console.log(commentPermlink);
```

### Estimate Account Value
```js
var hivePower = hive.formatter.estimateAccountValue(account);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|account|object|a hive user object|


Call Example:
```js
hive.api.getAccounts(["username"], function(e1, accounts) {
  var accountValueInUSD = hive.formatter.estimateAccountValue(accounts[0])
    .catch(function (err) { console.log(err); })
    .then(function (data) { console.log(data); });
});
```

### Reputation
```js
var reputation = hive.formatter.reputation(3512485230915);
console.log(reputation);
// => 56
```

### Vest To Hive

**Warning:** hive.formatter.vestToSteem() is deprecated and will be removed in the future releases.
Use the following method instead:

```js
var hivePower = hive.formatter.vestToHive(vestingShares, totalVestingShares, totalVestingFundHive);
console.log(hivePower);
```

# Utils

### Validate Username
```js
var isValidUsername = hive.utils.validateAccountName('test1234');
console.log(isValidUsername);
// => 'null'

var isValidUsername = hive.utils.validateAccountName('a1');
console.log(isValidUsername);
// => 'Account name should be longer.'
```

### Build Witness Update Properties
```js
const owner = 'mahdiyari'
const props = {
  "key": "Public Signing Key" // REQUIRED
  "account_creation_fee": "0.000 HIVE", // optional
  "account_subsidy_budget": 10000, // optional
  "account_subsidy_decay": 330782, // optional
  "maximum_block_size": 65536, // optional
  "hbd_interest_rate": 0, // optional
  "hbd_exchange_rate": {"base": "0.250 HBD", "quote": "1.000 HIVE"}, // optional
  "url": "https://testurl", // optional
  "new_signing_key": "Public Signing Key" // optional
}

const witnessOps = hive.utils.buildWitnessUpdateOp(owner, props);

hive.broadcast.witnessSetProperties('Private Signing Key', owner, witnessOps[1].props, [], function(err, result) {
  console.log(err, result);
});
```

### Camel Case
Formats a string with '_' characters to follow the CamelCase notation instead.

```js
hive.utils.camelCase(str);
```

|Parameter|Datatype|Description|
|---------|--------|-----------|
|str|string|the string will be converted to camelCase like "exampleString"|


Call Example:
```js
hive.utils.camelCase("example_string");
```

Return Example:
```js
"exampleString"
```

## Tutorials
[How to use HiveJs on React Native](https://peakd.com/hive-139531/@stoodkev/how-to-use-hivejs-or-other-modules-referencing-core-node-js-modules-on-react-native)

