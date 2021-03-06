import fetch from 'cross-fetch';
import newDebug from 'debug';
import retry from 'retry';
import Transport from './base';
import config from '../../config';

const debug = newDebug('steem:http');

export class RPCError extends Error {
  constructor(rpcError) {
    super(rpcError.message);
    this.name = 'RPCError';
    this.code = rpcError.code;
    this.data = rpcError.data;
  }
}

/**
 * Makes a JSON-RPC request using `fetch` or a user-provided `fetchMethod`.
 *
 * @param {string} uri - The URI to the JSON-RPC endpoint.
 * @param {string} options.method - The remote JSON-RPC method to call.
 * @param {string} options.id - ID for the request, for matching to a response.
 * @param {*} options.params  - The params for the remote method.
 * @param {function} [options.fetchMethod=fetch] - A function with the same
 * signature as `fetch`, which can be used to make the network request, or for
 * stubbing in tests.
 */
export function jsonRpc(uri, {method, id, params, fetchMethod=fetch}) {
  const payload = {id, jsonrpc: '2.0', method, params};
  return fetchMethod(uri, {
    body: JSON.stringify(payload),
    method: 'post',
    mode: 'cors',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP ${ res.status }: ${ res.statusText }`);
    }
    return res.json();
  }).then(rpcRes => {
    if (rpcRes.id !== id) {
      throw new Error(`Invalid response id: ${ rpcRes.id }`);
    }
    if (rpcRes.error) {
        if (rpcRes.error.code === -32602)
        {
            //hivemind returns an error when tags aren't found, but it's not really an error
            //because the http return code was ok, so just return an empty response instead
            return "{\"id\":" + rpcRes.id + ", \"result\":[], \"jsonrpc\":\"2.0\"}";
        }
      throw new RPCError(rpcRes.error);
    }
    return rpcRes.result
  });
}

export default class HttpTransport extends Transport {
  send(api, data, callback) {
    let params = data.params
    if ((config.get('useAppbaseApi') || this.options.useAppbaseApi) && api !== 'transaction_status_api') {
      api = 'condenser_api';
    }
    if (api === 'condenser_api') {
      params = data.paramsCondenserApi;
    }
    debug('Steem::send', api, data);
    const id = data.id || this.id++;
    const method = api + '.' + data.method;

    const retriable = this.retriable(api, data);
    const fetchMethod = this.options.fetchMethod;
    if (retriable) {
      retriable.attempt((currentAttempt) => {
        jsonRpc(this.options.uri, { method, id, params, fetchMethod }).then(
          res => { callback(null, res); },
          err => {
            if (retriable.retry(err)) {
              return;
            }
            callback(retriable.mainError());
          }
        );
      });
    } else {
      jsonRpc(this.options.uri, { method, id, params, fetchMethod }).then(
        res => { callback(null, res); },
        err => { callback(err); }
      );
    }
  }

  get nonRetriableOperations() {
    return this.options.nonRetriableOperations || [
      'broadcast_transaction',
      'broadcast_transaction_with_callback',
      'broadcast_transaction_synchronous',
      'broadcast_block',
      'get_account_history'
    ];
  }

  // An object which can be used to track retries.
  retriable(api, data) {
    if (this.nonRetriableOperations.some((o) => o === data.method)) {
      // Do not retry if the operation is non-retriable.
      return null;
    } else if (Object(this.options.retry) === this.options.retry) {
      // If `this.options.retry` is a map of options, pass those to operation.
      return retry.operation(this.options.retry);
    } else if (this.options.retry) {
      // If `this.options.retry` is `true`, use default options.
      return retry.operation();
    } else {
      // Otherwise, don't retry.
      return null;
    }
  }
}
