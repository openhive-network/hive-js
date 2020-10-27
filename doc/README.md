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
```
hive.api.getTrendingTags(afterTag, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Trending
```
hive.api.getDiscussionsByTrending(query, function(err, result) {
  console.log(err, result);
});
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

## Blocks and transactions

### Get Block Header
```
hive.api.getBlockHeader(blockNum, function(err, result) {
  console.log(err, result);
});
```
### Get Block
```
hive.api.getBlock(blockNum, function(err, result) {
  console.log(err, result);
});
```
### Get State
```
hive.api.getState(path, function(err, result) {
  console.log(err, result);
});
```
### Get Trending Categories
```
hive.api.getTrendingCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Best Categories
```
hive.api.getBestCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Active Categories
```
hive.api.getActiveCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Recent Categories
```
hive.api.getRecentCategories(after, limit, function(err, result) {
  console.log(err, result);
});
```

## Globals

### Get Config
```
hive.api.getConfig(function(err, result) {
  console.log(err, result);
});
```
### Get Dynamic Global Properties
```
hive.api.getDynamicGlobalProperties(function(err, result) {
  console.log(err, result);
});
```
### Get Chain Properties
```
hive.api.getChainProperties(function(err, result) {
  console.log(err, result);
});
```
### Get Feed History
```
hive.api.getFeedHistory(function(err, result) {
  console.log(err, result);
});
```
### Get Current Median History Price
```
hive.api.getCurrentMedianHistoryPrice(function(err, result) {
  console.log(err, result);
});
```
### Get Hardfork Version
```
hive.api.getHardforkVersion(function(err, result) {
  console.log(err, result);
});
```
### Get Next Scheduled Hardfork
```
hive.api.getNextScheduledHardfork(function(err, result) {
  console.log(err, result);
});
```
### Get Reward Fund
```
hive.api.getRewardFund(name, function(err, result) {
  console.log(err, result);
});
```
### Get Vesting Delegations
```
hive.api.getVestingDelegations(account, from, limit, function(err, result) {
  console.log(err, result);
});
```

## Keys

### Get Key References
```
hive.api.getKeyReferences(key, function(err, result) {
  console.log(err, result);
});
```

## Accounts

### Get Accounts
```
hive.api.getAccounts(names, function(err, result) {
  console.log(err, result);
});
```
### Get Account References
```
hive.api.getAccountReferences(accountId, function(err, result) {
  console.log(err, result);
});
```
### Lookup Account Names
```
hive.api.lookupAccountNames(accountNames, function(err, result) {
  console.log(err, result);
});
```
### Lookup Accounts
```
hive.api.lookupAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Account Count
```
hive.api.getAccountCount(function(err, result) {
  console.log(err, result);
});
```
### Get Conversion Requests
```
hive.api.getConversionRequests(accountName, function(err, result) {
  console.log(err, result);
});
```
### Get Account History
```
hive.api.getAccountHistory(account, from, limit, operation_filter_low, operation_filter_high, function(err, result) {
  console.log(err, result);
});
```
### Get Owner History
```
hive.api.getOwnerHistory(account, function(err, result) {
  console.log(err, result);
});
```
### Get Recovery Request
```
hive.api.getRecoveryRequest(account, function(err, result) {
  console.log(err, result);
});
```

## Market

### Get Order Book
```
hive.api.getOrderBook(limit, function(err, result) {
  console.log(err, result);
});
```
### Get Open Orders
```
hive.api.getOpenOrders(owner, function(err, result) {
  console.log(err, result);
});
```
### Get Liquidity Queue
```
hive.api.getLiquidityQueue(startAccount, limit, function(err, result) {
  console.log(err, result);
});
```

## Authority / validation

### Get Transaction Hex
```
hive.api.getTransactionHex(trx, function(err, result) {
  console.log(err, result);
});
```
### Get Transaction
```
hive.api.getTransaction(trxId, function(err, result) {
  console.log(err, result);
});
```
### Get Required Signatures
```
hive.api.getRequiredSignatures(trx, availableKeys, function(err, result) {
  console.log(err, result);
});
```
### Get Potential Signatures
```
hive.api.getPotentialSignatures(trx, function(err, result) {
  console.log(err, result);
});
```
### Verify Authority
```
hive.api.verifyAuthority(trx, function(err, result) {
  console.log(err, result);
});
```
### Verify Account Authority
```
hive.api.verifyAccountAuthority(nameOrId, signers, function(err, result) {
  console.log(err, result);
});
```

## Votes

### Get Active Votes
```
hive.api.getActiveVotes(author, permlink, function(err, result) {
  console.log(err, result);
});
```
### Get Account Votes
```
hive.api.getAccountVotes(voter, function(err, result) {
  console.log(err, result);
});
```

## Content


### Get Content
```
hive.api.getContent(author, permlink, function(err, result) {
  console.log(err, result);
});
```
### Get Content Replies
```
hive.api.getContentReplies(author, permlink, function(err, result) {
  console.log(err, result);
});
```
### Get Discussions By Author Before Date
```
hive.api.getDiscussionsByAuthorBeforeDate(author, startPermlink, beforeDate, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Replies By Last Update
```
hive.api.getRepliesByLastUpdate(startAuthor, startPermlink, limit, function(err, result) {
  console.log(err, result);
});
```

## Witnesses


### Get Witnesses
```
hive.api.getWitnesses(witnessIds, function(err, result) {
  console.log(err, result);
});
```
### Get Witness By Account
```
hive.api.getWitnessByAccount(accountName, function(err, result) {
  console.log(err, result);
});
```
### Get Witnesses By Vote
```
hive.api.getWitnessesByVote(from, limit, function(err, result) {
  console.log(err, result);
});
```
### Lookup Witness Accounts
```
hive.api.lookupWitnessAccounts(lowerBoundName, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Witness Count
```
hive.api.getWitnessCount(function(err, result) {
  console.log(err, result);
});
```
### Get Active Witnesses
```
hive.api.getActiveWitnesses(function(err, result) {
  console.log(err, result);
});
```
### Get Miner Queue
```
hive.api.getMinerQueue(function(err, result) {
  console.log(err, result);
});
```

## Login API

### Login

/!\ It's **not safe** to use this method with your username and password. This method always return `true` and is only used in intern with empty values to enable broadcast.

```
hive.api.login('', '', function(err, result) {
  console.log(err, result);
});
```

### Get Api By Name
```
hive.api.getApiByName(apiName, function(err, result) {
  console.log(err, result);
});
```

## Follow API

### Get Followers
```
hive.api.getFollowers(following, startFollower, followType, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Following
```
hive.api.getFollowing(follower, startFollowing, followType, limit, function(err, result) {
  console.log(err, result);
});
```
### Get Follow Count
```
hive.api.getFollowCount(account, function(err, result) {
  console.log(err, result);
});
```

## Broadcast API

### Broadcast Transaction Synchronous
```
hive.api.broadcastTransactionSynchronous(trx, function(err, result) {
  console.log(err, result);
});
```
### Broadcast Block
```
hive.api.broadcastBlock(b, function(err, result) {
  console.log(err, result);
});
```

# Broadcast

### Account Create
```
hive.broadcast.accountCreate(wif, fee, creator, newAccountName, owner, active, posting, memoKey, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
### Account Create With Delegation
```
hive.broadcast.accountCreateWithDelegation(wif, fee, delegation, creator, newAccountName, owner, active, posting, memoKey, jsonMetadata, extensions, function(err, result) {
  console.log(err, result);
});
```
### Delegate Vesting Shares
```
hive.broadcast.delegateVestingShares(wif, delegator, delegatee, vesting_shares, function(err, result) {
  console.log(err, result);
});
```
### Account Update
```
hive.broadcast.accountUpdate(wif, account, owner, active, posting, memoKey, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
### Account Witness Proxy
```
hive.broadcast.accountWitnessProxy(wif, account, proxy, function(err, result) {
  console.log(err, result);
});
```
### Account Witness Vote
```
hive.broadcast.accountWitnessVote(wif, account, witness, approve, function(err, result) {
  console.log(err, result);
});
```
### Witness Set Properties
```
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
```
hive.broadcast.challengeAuthority(wif, challenger, challenged, requireOwner, function(err, result) {
  console.log(err, result);
});
```
### Change Recovery Account
```
hive.broadcast.changeRecoveryAccount(wif, accountToRecover, newRecoveryAccount, extensions, function(err, result) {
  console.log(err, result);
});
```
### Comment
```
hive.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function(err, result) {
  console.log(err, result);
});
```
### Comment Options
```
hive.broadcast.commentOptions(wif, author, permlink, maxAcceptedPayout, percentHiveDollars, allowVotes, allowCurationRewards, extensions, function(err, result) {
  console.log(err, result);
});
```
### Comment Payout
```
hive.broadcast.commentPayout(wif, author, permlink, payout, function(err, result) {
  console.log(err, result);
});
```
### Comment Reward
```
hive.broadcast.commentReward(wif, author, permlink, hbdPayout, vestingPayout, function(err, result) {
  console.log(err, result);
});
```
### Convert
```
hive.broadcast.convert(wif, owner, requestid, amount, function(err, result) {
  console.log(err, result);
});
```
### Curate Reward
```
hive.broadcast.curateReward(wif, curator, reward, commentAuthor, commentPermlink, function(err, result) {
  console.log(err, result);
});
```
### Custom
```
hive.broadcast.custom(wif, requiredAuths, id, data, function(err, result) {
  console.log(err, result);
});
```
### Custom Binary
```
hive.broadcast.customBinary(wif, id, data, function(err, result) {
  console.log(err, result);
});
```
### Custom Json
```
hive.broadcast.customJson(wif, requiredAuths, requiredPostingAuths, id, json, function(err, result) {
  console.log(err, result);
});
```
### Delete Comment
```
hive.broadcast.deleteComment(wif, author, permlink, function(err, result) {
  console.log(err, result);
});
```
### Escrow Dispute
```
hive.broadcast.escrowDispute(wif, from, to, agent, who, escrowId, function(err, result) {
  console.log(err, result);
});
```
### Escrow Release
```
hive.broadcast.escrowRelease(wif, from, to, agent, who, receiver, escrowId, hbdAmount, hiveAmount, function(err, result) {
  console.log(err, result);
});
```
### Escrow Transfer
```
hive.broadcast.escrowTransfer(wif, from, to, agent, escrowId, hbdAmount, hiveAmount, fee, ratificationDeadline, escrowExpiration, jsonMeta, function(err, result) {
  console.log(err, result);
});
```
### Feed Publish
```
hive.broadcast.feedPublish(wif, publisher, exchangeRate, function(err, result) {
  console.log(err, result);
});
```
### Pow2
```
hive.broadcast.pow2(wif, work, newOwnerKey, props, function(err, result) {
  console.log(err, result);
});
```
### Fill Convert Request
```
hive.broadcast.fillConvertRequest(wif, owner, requestid, amountIn, amountOut, function(err, result) {
  console.log(err, result);
});
```
### Fill Order
```
hive.broadcast.fillOrder(wif, currentOwner, currentOrderid, currentPays, openOwner, openOrderid, openPays, function(err, result) {
  console.log(err, result);
});
```
### Fill Vesting Withdraw
```
hive.broadcast.fillVestingWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
```
### Interest
```
hive.broadcast.interest(wif, owner, interest, function(err, result) {
  console.log(err, result);
});
```
### Limit Order Cancel
```
hive.broadcast.limitOrderCancel(wif, owner, orderid, function(err, result) {
  console.log(err, result);
});
```
### Limit Order Create
```
hive.broadcast.limitOrderCreate(wif, owner, orderid, amountToSell, minToReceive, fillOrKill, expiration, function(err, result) {
  console.log(err, result);
});
```
### Limit Order Create2
```
hive.broadcast.limitOrderCreate2(wif, owner, orderid, amountToSell, exchangeRate, fillOrKill, expiration, function(err, result) {
  console.log(err, result);
});
```
### Liquidity Reward
```
hive.broadcast.liquidityReward(wif, owner, payout, function(err, result) {
  console.log(err, result);
});
```
### Pow
```
hive.broadcast.pow(wif, worker, input, signature, work, function(err, result) {
  console.log(err, result);
});
```
### Prove Authority
```
hive.broadcast.proveAuthority(wif, challenged, requireOwner, function(err, result) {
  console.log(err, result);
});
```
### Recover Account
```
hive.broadcast.recoverAccount(wif, accountToRecover, newOwnerAuthority, recentOwnerAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
### Report Over Production
```
hive.broadcast.reportOverProduction(wif, reporter, firstBlock, secondBlock, function(err, result) {
  console.log(err, result);
});
```
### Request Account Recovery
```
hive.broadcast.requestAccountRecovery(wif, recoveryAccount, accountToRecover, newOwnerAuthority, extensions, function(err, result) {
  console.log(err, result);
});
```
### Escrow Approve
```
hive.broadcast.escrowApprove(wif, from, to, agent, who, escrowId, approve, function(err, result) {
  console.log(err, result);
});
```
### Set Withdraw Vesting Route
```
hive.broadcast.setWithdrawVestingRoute(wif, fromAccount, toAccount, percent, autoVest, function(err, result) {
  console.log(err, result);
});
```
### Transfer
```
hive.broadcast.transfer(wif, from, to, amount, memo, function(err, result) {
  console.log(err, result);
});
```
### Transfer To Vesting
```
hive.broadcast.transferToVesting(wif, from, to, amount, function(err, result) {
  console.log(err, result);
});
```
### Vote
```
hive.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
  console.log(err, result);
});
```
### Withdraw Vesting
```
hive.broadcast.withdrawVesting(wif, account, vestingShares, function(err, result) {
  console.log(err, result);
});
```
### Witness Update
```
hive.broadcast.witnessUpdate(wif, owner, url, blockSigningKey, props, fee, function(err, result) {
  console.log(err, result);
});
```
### Fill Vesting Withdraw
```
hive.broadcast.fillVestingWithdraw(wif, fromAccount, toAccount, withdrawn, deposited, function(err, result) {
  console.log(err, result);
});
```
### Fill Order
```
hive.broadcast.fillOrder(wif, currentOwner, currentOrderid, currentPays, openOwner, openOrderid, openPays, function(err, result) {
  console.log(err, result);
});
```
### Fill Transfer From Savings
```
hive.broadcast.fillTransferFromSavings(wif, from, to, amount, requestId, memo, function(err, result) {
  console.log(err, result);
});
```
### Comment Payout
```
hive.broadcast.commentPayout(wif, author, permlink, payout, function(err, result) {
  console.log(err, result);
});
```
### Transfer To Savings
```
hive.broadcast.transferToSavings(wif, from, to, amount, memo, function(err, result) {
  console.log(err, result);
});
```
### Transfer From Savings
```
hive.broadcast.transferFromSavings(wif, from, requestId, to, amount, memo, function(err, result) {
  console.log(err, result);
});
```
### Cancel Transfer From Savings
```
hive.broadcast.cancelTransferFromSavings(wif, from, requestId, function(err, result) {
  console.log(err, result);
});
```

### Multisig
You can use multisignature to broadcast an operation.
```
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
```
hive.auth.verify(name, password, auths);
```

### Generate Keys
```
hive.auth.generateKeys(name, password, roles);
```

### Get Private Keys
```
hive.auth.getPrivateKeys(name, password, roles);
```

### Is Wif
```
hive.auth.isWif(privWif);
```

### To Wif
```
hive.auth.toWif(name, password, role);
```

### Wif Is Valid
```
hive.auth.wifIsValid(privWif, pubWif);
```

### Wif To Public
```
hive.auth.wifToPublic(privWif);
```

### Sign Transaction
```
hive.auth.signTransaction(trx, keys);
```

# Formatter

### Create Suggested Password
```
var password = hive.formatter.createSuggestedPassword();
console.log(password);
// => 'GAz3GYFvvQvgm7t2fQmwMDuXEzDqTzn9'
```

### Comment Permlink
```
var parentAuthor = 'hiveio';
var parentPermlink = 'announcing-the-launch-of-hive-blockchain';
var commentPermlink = hive.formatter.commentPermlink(parentAuthor, parentPermlink);
console.log(commentPermlink);
```

### Estimate Account Value
```
var hivePower = hive.formatter.estimateAccountValue(account);
```

### Reputation
```
var reputation = hive.formatter.reputation(3512485230915);
console.log(reputation);
// => 56
```

### Vest To Hive

**Warning:** hive.formatter.vestToSteem() is deprecated and will be removed in the future releases.
Use the following method instead:

```
var hivePower = hive.formatter.vestToHive(vestingShares, totalVestingShares, totalVestingFundHive);
console.log(hivePower);
```

# Utils

### Validate Username
```
var isValidUsername = hive.utils.validateAccountName('test1234');
console.log(isValidUsername);
// => 'null'

var isValidUsername = hive.utils.validateAccountName('a1');
console.log(isValidUsername);
// => 'Account name should be longer.'
```

### Build Witness Update Properties
```
const owner = 'mahdiyari'
const props = {
  "key": "Public Signing Key" // REQUIRED
  "account_creation_fee": "0.000 HIVE", // optional
  "account_subsidy_budget": 10000, // optional
  "account_subsidy_decay": 330782, // optional
  "maximum_block_size": 65536, // optional
  "hbd_interest_rate": "0.000 HIVE", // optional
  "hbd_exchange_rate": {"base": "0.250 HBD", "quote": "1.000 HIVE"}, // optional
  "url": "https://testurl", // optional
  "new_signing_key": "Public Signing Key" // optional
}

const witnessOps = hive.utils.buildWitnessUpdateOp(owner, props);

hive.broadcast.witnessSetProperties('Private Signing Key', owner, witnessOps.props, [], function(err, result) {
  console.log(err, result);
});
```

## Tutorials
[How to use HiveJs on React Native](https://peakd.com/hive-139531/@stoodkev/how-to-use-hivejs-or-other-modules-referencing-core-node-js-modules-on-react-native)

