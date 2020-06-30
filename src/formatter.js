import get from "lodash/get";
import { key_utils } from "./auth/ecc";
import config from "./config"

const HiveVar = config.get("rebranded_node") ? "hive" : "steem"
const HbdVar = config.get("rebranded_node") ? "hbd" : "sbd"

module.exports = hiveAPI => {
  function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Deprecating - Replacement: vestingHive
  function vestingSteem(account, gprops) {
    const vests = parseFloat(account.vesting_shares.split(" ")[0]);
    const total_vests = parseFloat(gprops.total_vesting_shares.split(" ")[0]);
    const total_vest_hive = parseFloat(
      gprops['total_vesting_fund_' + HiveVar].split(" ")[0]
    );
    const vesting_hivef = total_vest_hive * (vests / total_vests);
    return vesting_hivef;
  }
  const vestingHive = vestingSteem

  function processOrders(open_orders, assetPrecision) {
    const hbdOrders = !open_orders
      ? 0
      : open_orders.reduce((o, order) => {
          if (order.sell_price.base.indexOf("HBD") !== -1) {
            o += order.for_sale;
          }
          return o;
        }, 0) / assetPrecision;

    const hiveOrders = !open_orders
      ? 0
      : open_orders.reduce((o, order) => {
          if (order.sell_price.base.indexOf("HIVE") !== -1) {
            o += order.for_sale;
          }
          return o;
        }, 0) / assetPrecision;

    return { hiveOrders, hbdOrders };
  }

  function calculateSaving(savings_withdraws) {
    let savings_pending = 0;
    let savings_hbd_pending = 0;
    savings_withdraws.forEach(withdraw => {
      const [amount, asset] = withdraw.amount.split(" ");
      if (asset === "HIVE") savings_pending += parseFloat(amount);
      else {
        if (asset === "HBD") savings_hbd_pending += parseFloat(amount);
      }
    });
    return { savings_pending, savings_hbd_pending };
  }

  // Deprecating - Replacement: pricePerHive
  function pricePerSteem(feed_price) {
    let price_per_hive = undefined;
    const { base, quote } = feed_price;
    if (/ HBD$/.test(base) && / HIVE$/.test(quote)) {
      price_per_hive = parseFloat(base.split(" ")[0]) / parseFloat(quote.split(" ")[0]);
    }
    return price_per_hive;
  }
  const pricePerHive = pricePerSteem

  // TODO: remove vesting_steem
  function estimateAccountValue(
    account,
    { gprops, feed_price, open_orders, savings_withdraws, vesting_steem, vesting_hive } = {}
  ) {
    const promises = [];
    const username = account.name;
    const assetPrecision = 1000;
    let orders, savings;

    // TODO: remove vesting_steem
    // this is necessary to work with unbranded nodes
    if (vesting_steem) {
      vesting_hive = vesting_steem
    }
    if (!vesting_hive || !feed_price) {
      if (!gprops || !feed_price) {
        promises.push(
          hiveAPI.getStateAsync(`/@${username}`).then(data => {
            gprops = data.props;
            feed_price = data.feed_price;
            vesting_hive = vestingHive(account, gprops);
          })
        );
      } else {
        vesting_hive = vestingHive(account, gprops);
      }
    }

    if (!open_orders) {
      promises.push(
        hiveAPI.getOpenOrdersAsync(username).then(open_orders => {
          orders = processOrders(open_orders, assetPrecision);
        })
      );
    } else {
      orders = processOrders(open_orders, assetPrecision);
    }

    if (!savings_withdraws) {
      promises.push(
        hiveAPI
          .getSavingsWithdrawFromAsync(username)
          .then(savings_withdraws => {
            savings = calculateSaving(savings_withdraws);
          })
      );
    } else {
      savings = calculateSaving(savings_withdraws);
    }

    return Promise.all(promises).then(() => {
      let price_per_hive = pricePerHive(feed_price);

      const savings_balance = account.savings_balance;
      const savings_hbd_balance = account["savings_" + HbdVar + "_balance"];
      const balance_hive = parseFloat(account.balance.split(" ")[0]);
      const saving_balance_hive = parseFloat(savings_balance.split(" ")[0]);
      const hbd_balance = parseFloat(account[HbdVar + "_balance"]);
      const hbd_balance_savings = parseFloat(savings_hbd_balance.split(" ")[0]);

      let conversionValue = 0;
      const currentTime = new Date().getTime();
      (account.other_history || []).reduce((out, item) => {
        if (get(item, [1, "op", 0], "") !== "convert") return out;

        const timestamp = new Date(get(item, [1, "timestamp"])).getTime();
        const finishTime = timestamp + 86400000 * 3.5; // add 3.5day conversion delay
        if (finishTime < currentTime) return out;

        const amount = parseFloat(
          get(item, [1, "op", 1, "amount"]).replace(" HBD", "")
        );
        conversionValue += amount;
      }, []);

      const total_hbd =
        hbd_balance +
        hbd_balance_savings +
        savings.savings_hbd_pending +
        orders.hbdOrders +
        conversionValue;

      const total_hive =
        vesting_hive +
        balance_hive +
        saving_balance_hive +
        savings.savings_pending +
        orders.hiveOrders;

      return (total_hive * price_per_hive + total_hbd).toFixed(2);
    });
  }

  function createSuggestedPassword() {
    const PASSWORD_LENGTH = 32;
    const privateKey = key_utils.get_random_key();
    return privateKey.toWif().substring(3, 3 + PASSWORD_LENGTH);
  }

  return {
    reputation: function(reputation) {
      if (reputation == null) return reputation;
      let neg = reputation < 0;
      let rep = String(reputation);
      rep = neg ? rep.substring(1) : rep;
      let v = (Math.log10((rep > 0 ? rep : -rep) - 10) - 9);
      v =  neg ? -v : v;
      return parseInt(v * 9 + 25);
    },

    // Deprecated - Remove on future releases
    vestToSteem: function(
      vestingShares,
      totalVestingShares,
      totalVestingFundSteem
    ) {
      console.warn('vestToSteem() is deprecated and will be removed in the future releases. Use vestToHive() instead.')
      return (
        parseFloat(totalVestingFundSteem) *
        (parseFloat(vestingShares) / parseFloat(totalVestingShares))
      );
    },

    // Same as vestToSteem
    vestToHive: function(
      vestingShares,
      totalVestingShares,
      totalVestingFundHive
    ) {
      return (
        parseFloat(totalVestingFundHive) *
        (parseFloat(vestingShares) / parseFloat(totalVestingShares))
      );
    },

    commentPermlink: function(parentAuthor, parentPermlink) {
      const timeStr = new Date()
        .toISOString()
        .replace(/[^a-zA-Z0-9]+/g, "")
        .toLowerCase();
      parentPermlink = parentPermlink.replace(/(-\d{8}t\d{9}z)/g, "");
      return "re-" + parentAuthor + "-" + parentPermlink + "-" + timeStr;
    },

    amount: function(amount, asset) {
      return amount.toFixed(3) + " " + asset;
    },
    numberWithCommas,
    vestingSteem,
    vestingHive,
    estimateAccountValue,
    createSuggestedPassword,
    pricePerSteem,
    pricePerHive
  };
};
