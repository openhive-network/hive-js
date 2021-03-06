import Promise from 'bluebird';
import newDebug from 'debug';
import broadcastHelpers from './helpers';
import formatterFactory from '../formatter';
import hiveApi from '../api';
import hiveAuth from '../auth';
import { camelCase } from '../utils';
import { transaction as trxSerializer } from '../auth/serializer/src/operations'
import { hash } from '../auth/ecc';
var operations = require('./operations');
const config = require('../config')

const debug = newDebug('hive:broadcast');
const noop = function() {}
const formatter = formatterFactory(hiveApi);

function getTransactionStatus(trxId, expiration, time = 3000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      hiveApi.findTransactionAsync(trxId, expiration).then(res => {
        resolve(res)
      })
    }, time)
  })
}

const hiveBroadcast = {};

// Base transaction logic -----------------------------------------------------

/**
 * Sign and broadcast transactions on the hive network
 */

hiveBroadcast.send = function hiveBroadcast$send(tx, privKeys, callback) {
  let trxId
  const resultP = hiveBroadcast._prepareTransaction(tx)
    .then((transaction) => {
      if (config.get("address_prefix") === "TST") {
        transaction.operations = JSON.parse(JSON.stringify(transaction.operations).replace(/ HIVE/g, ' TESTS'))
        transaction.operations = JSON.parse(JSON.stringify(transaction.operations).replace(/ HBD/g, ' TBD'))
      }
      debug(
        'Signing transaction (transaction, transaction.operations)',
        transaction, transaction.operations
      );
      const buf = trxSerializer.toBuffer(transaction);
      trxId = hash.sha256(buf).toString('hex').slice(0, 40);
      return Promise.join(
        transaction,
        hiveAuth.signTransaction(transaction, privKeys)
      );
    })
    .spread((transaction, signedTransaction) => {
      debug(
        'Broadcasting transaction (transaction, transaction.operations)',
        transaction, transaction.operations
      );
      return hiveApi.broadcastTransactionAsync(
        signedTransaction
      ).then((result) => {
        return Object.assign({ id: trxId }, result, signedTransaction);
      });
    });

  resultP.nodeify(callback || noop);
};

hiveBroadcast._prepareTransaction = function hiveBroadcast$_prepareTransaction(tx) {
  const propertiesP = hiveApi.getDynamicGlobalPropertiesAsync();
  return propertiesP
    .then((properties) => {
      // Set defaults on the transaction
      const chainDate = new Date(properties.time + 'Z');
      const refBlockNum = (properties.last_irreversible_block_num - 1) & 0xFFFF;
      return hiveApi.getBlockHeaderAsync(properties.last_irreversible_block_num).then((block) => {
        const headBlockId = block ? block.previous : '0000000000000000000000000000000000000000';
        return Object.assign({
          ref_block_num: refBlockNum,
          ref_block_prefix: new Buffer(headBlockId, 'hex').readUInt32LE(4),
          expiration: new Date(
            chainDate.getTime() +
            600 * 1000
          ),
        }, tx);
      });
    });
};

// Generated wrapper ----------------------------------------------------------
operations.forEach((operation) => {
  const operationName = camelCase(operation.operation);
  const operationParams = operation.params || [];

  const useCommentPermlink =
    operationParams.indexOf('parent_author') !== -1 &&
    operationParams.indexOf('parent_permlink') !== -1;

  hiveBroadcast[`${operationName}With`] =
    function hiveBroadcast$specializedSendWith(wif, options, callback) {
      debug(`Sending operation "${operationName}" with`, {options, callback});
      const keys = {};
      if (operation.roles && operation.roles.length) {
        keys[operation.roles[0]] = wif; // TODO - Automatically pick a role? Send all?
      }

      return hiveBroadcast.send({
        extensions: [],
        operations: [[operation.operation, Object.assign(
          {},
          options,
          options.json_metadata != null ? {
            json_metadata: toString(options.json_metadata),
          } : {},
          useCommentPermlink && options.permlink == null ? {
            permlink: formatter.commentPermlink(options.parent_author, options.parent_permlink),
          } : {}
        )]],
      }, keys, callback);
    };

  hiveBroadcast[operationName] =
    function hiveBroadcast$specializedSend(wif, ...args) {
      debug(`Parsing operation "${operationName}" with`, {args});
      const options = operationParams.reduce((memo, param, i) => {
        memo[param] = args[i]; // eslint-disable-line no-param-reassign
        return memo;
      }, {});
      const callback = args[operationParams.length];
      return hiveBroadcast[`${operationName}With`](wif, options, callback);
    };
});

hiveBroadcast.updateOperations = () => {
  console.log('Warning: call to updateOperations() is deprecated and can safely be removed')
}

const toString = obj => typeof obj === 'object' ? JSON.stringify(obj) : obj;
broadcastHelpers(hiveBroadcast);

Promise.promisifyAll(hiveBroadcast);

exports = module.exports = hiveBroadcast;
