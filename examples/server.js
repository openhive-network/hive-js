var hive = require('../lib');

hive.api.getAccountCount(function(err, result) {
	console.log(err, result);
});

hive.api.getAccounts(['hiveio'], function(err, result) {
	console.log(err, result);
	var reputation = hive.formatter.reputation(result[0].reputation);
	console.log(reputation);
});

hive.api.getState('trending/hive', function(err, result) {
	console.log(err, result);
});

hive.api.getFollowing('hiveio', 0, 'blog', 10, function(err, result) {
	console.log(err, result);
});

hive.api.getFollowers('hiveio', 0, 'blog', 10, function(err, result) {
	console.log(err, result);
});

hive.api.streamOperations(function(err, result) {
	console.log(err, result);
});

hive.api.getDiscussionsByActive({
  limit: 10,
  start_author: 'thecastle',
  start_permlink: 'this-week-in-level-design-1-22-2017'
}, function(err, result) {
	console.log(err, result);
});
