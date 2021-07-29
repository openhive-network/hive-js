export default [
    {
      "api": "condenser_api",
      "method": "get_trending_tags",
      "params": ["tag", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_tags_used_by_author",
      "params": ["account"]
    },
    {
      "api": "condenser_api",
      "method": "get_post_discussions_by_payout",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_comment_discussions_by_payout",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_trending",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_created",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_active",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_cashout",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_votes",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_children",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_hot",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_feed",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_blog",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_comments",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_promoted",
      "params": ["query"]
    },
    {
      "api": "condenser_api",
      "method": "get_block_header",
      "params": ["block_num"]
    },
    {
      "api": "block_api",
      "method": "get_block",
      "params": ["block_num"]
    },
    {
      "api": "account_history_api",
      "method": "get_ops_in_block",
      "params": ["block_num", "only_virtual"]
    },
    {
      "api": "condenser_api",
      "method": "get_state",
      "params": ["path"]
    },
    {
      "api": "database_api",
      "method": "get_config"
    },
    {
      "api": "database_api",
      "method": "get_dynamic_global_properties"
    },
    {
      "api": "condenser_api",
      "method": "get_chain_properties"
    },
    {
      "api": "database_api",
      "method": "get_feed_history"
    },
    {
      "api": "condenser_api",
      "method": "get_current_median_history_price"
    },
    {
      "api": "database_api",
      "method": "get_witness_schedule"
    },
    {
      "api": "condenser_api",
      "method": "get_hardfork_version"
    },
    {
      "api": "condenser_api",
      "method": "get_next_scheduled_hardfork"
    },
    {
      "api": "account_by_key_api",
      "method": "get_key_references",
      "params": ["keys"]
    },
    {
      "api": "condenser_api",
      "method": "get_accounts",
      "params": ["names"]
    },
    {
      "api": "condenser_api",
      "method": "get_account_references",
      "params": ["accountId"]
    },
    {
      "api": "condenser_api",
      "method": "lookup_account_names",
      "params": ["accounts"]
    },
    {
      "api": "condenser_api",
      "method": "lookup_accounts",
      "params": ["lower_bound_name", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_account_count"
    },
    {
      "api": "condenser_api",
      "method": "get_conversion_requests",
      "params": ["accountName"]
    },
    {
      "api": "account_history_api",
      "method": "get_account_history",
      "params": ["account", "from", "limit", "operation_filter_low", "operation_filter_high"],
    },
    {
      "api": "condenser_api",
      "method": "get_owner_history",
      "params": ["account"]
    },
    {
      "api": "condenser_api",
      "method": "get_recovery_request",
      "params": ["account"]
    },
    {
      "api": "condenser_api",
      "method": "get_escrow",
      "params": ["from", "escrow_id"]
    },
    {
      "api": "condenser_api",
      "method": "get_withdraw_routes",
      "params": ["account", "withdraw_route_type"]
    },
    {
      "api": "condenser_api",
      "method": "get_savings_withdraw_from",
      "params": ["account"]
    },
    {
      "api": "condenser_api",
      "method": "get_savings_withdraw_to",
      "params": ["account"]
    },
    {
      "api": "condenser_api",
      "method": "get_order_book",
      "params": ["limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_open_orders",
      "params": ["owner"]
    },
    {
      "api": "database_api",
      "method": "get_transaction_hex",
      "params": ["trx"]
    },
    {
      "api": "condenser_api",
      "method": "get_transaction",
      "params": ["trx_id"]
    },
    {
      "api": "database_api",
      "method": "get_required_signatures",
      "params": ["trx", "available_keys"]
    },
    {
      "api": "database_api",
      "method": "get_potential_signatures",
      "params": ["trx"]
    },
    {
      "api": "database_api",
      "method": "verify_authority",
      "params": ["trx"]
    },
    {
      "api": "database_api",
      "method": "verify_account_authority",
      "params": ["account", "signers"]
    },
    {
      "api": "condenser_api",
      "method": "get_active_votes",
      "params": ["author", "permlink"]
    },
    {
      "api": "database_api",
      "method": "list_votes",
      "params": ["voter"]
    },
    {
      "api": "condenser_api",
      "method": "get_content",
      "params": ["author", "permlink"]
    },
    {
      "api": "condenser_api",
      "method": "get_content_replies",
      "params": ["author", "permlink"]
    },
    {
      "api": "condenser_api",
      "method": "get_discussions_by_author_before_date",
      "params": ["author", "start_permlink", "before_date", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_replies_by_last_update",
      "params": ["start_author", "start_permlink", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_witnesses",
      "params": ["witnessIds"]
    },
    {
      "api": "condenser_api",
      "method": "get_witness_by_account",
      "params": ["account"]
    },
    {
      "api": "condenser_api",
      "method": "get_witnesses_by_vote",
      "params": ["from", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "lookup_witness_accounts",
      "params": ["lower_bound_name", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_witness_count"
    },
    {
      "api": "database_api",
      "method": "get_active_witnesses"
    },
    {
      "api": "condenser_api",
      "method": "get_reward_fund",
      "params": ["name"]
    },
    {
      "api": "database_api",
      "method": "get_reward_funds"
    },
    {
      "api": "condenser_api",
      "method": "get_vesting_delegations",
      "params": ["account", "from", "limit"]
    },
    {
      "api": "database_api",
      "method": "get_version"
    },
    {
      "api": "condenser_api",
      "method": "get_followers",
      "params": ["account", "start", "type", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_following",
      "params": ["account", "start", "type", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_follow_count",
      "params": ["account"]
    },
    {
      "api": "condenser_api",
      "method": "get_feed_entries",
      "params": ["account", "start_entry_id", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_feed",
      "params": ["account", "start_entry_id", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_blog_entries",
      "params": ["account", "start_entry_id", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_blog",
      "params": ["account", "start_entry_id", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_account_reputations",
      "params": ["lower_bound_name", "limit"]
    },
    {
      "api": "condenser_api",
      "method": "get_reblogged_by",
      "params": ["author", "permlink"]
    },
    {
      "api": "condenser_api",
      "method": "get_blog_authors",
      "params": ["account"]
    },
    {
      "api": "condenser_api",
      "method": "broadcast_transaction",
      "params": ["trx"]
    },
    {
      "api": "condenser_api",
      "method": "broadcast_transaction_synchronous",
      "params": ["trx"]
    },
    {
      "api": "network_broadcast_api",
      "method": "broadcast_block",
      "params": ["block"]
    },
    {
      "api": "transaction_status_api",
      "method": "find_transaction",
      "params": ["transaction_id", "expiration"]
    },
    {
      "api": "market_history_api",
      "method": "get_ticker",
      "params": []
    },
    {
      "api": "market_history_api",
      "method": "get_volume",
      "params": []
    },
    {
      "api": "market_history_api",
      "method": "get_order_book",
      "method_name": "getMarketOrderBook",
      "params": ["limit"]
    },
    {
      "api": "market_history_api",
      "method": "get_trade_history",
      "params": ["start", "end", "limit"]
    },
    {
      "api": "market_history_api",
      "method": "get_recent_trades",
      "params": ["limit"]
    },
    {
      "api": "market_history_api",
      "method": "get_market_history",
      "params": ["bucket_seconds", "start", "end"]
    },
    {
      "api": "market_history_api",
      "method": "get_market_history_buckets",
    },
    {
      "api": "database_api",
      "method": "find_proposals",
      "params": ["proposal_ids"]
    },
    {
      "api": "database_api",
      "method": "list_proposals",
      "params": ["start", "limit", "order", "order_direction", "status"]
    },
    {
      "api": "database_api",
      "method": "list_proposal_votes",
      "params": ["start", "limit", "order", "order_direction", "status"]
    },
    {
      "api": "database_api",
      "method": "get_nai_pool",
    }
];
