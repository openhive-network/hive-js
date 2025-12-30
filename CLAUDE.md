# CLAUDE.md - Hive.js Development Guide

## Project Overview

Official JavaScript API library for the Hive blockchain (`@hiveio/hive-js`). Provides client-side functionality for:
- Querying blockchain data via RPC APIs (condenser_api, database_api, etc.)
- Generating and managing cryptographic keys (secp256k1 ECDSA)
- Signing and broadcasting transactions
- Serializing blockchain operations
- Works in both Node.js and browser environments

**Current Version:** 2.0.9

## Tech Stack

- **Language:** JavaScript (ES6+ via Babel)
- **Build:** Webpack 1.x (browser), Babel (Node.js transpilation)
- **Testing:** Mocha + should.js
- **Linting:** ESLint with babel-eslint
- **Key Dependencies:** bluebird (Promises), cross-fetch, ws (WebSocket), ecurve/bigi (crypto)

## Directory Structure

```
src/
├── index.js           # Main entry - exports api, auth, broadcast, formatter, config, utils
├── config.js          # Configuration singleton
├── config.json        # Default settings (endpoints, chain_id, address_prefix)
├── formatter.js       # Data formatting (reputation, vesting, account value)
├── utils.js           # Utility functions
├── api/               # Blockchain RPC client
│   ├── index.js       # Hive class (extends EventEmitter)
│   ├── methods.js     # RPC method definitions (50+ methods)
│   └── transports/    # HTTP and WebSocket transports
├── auth/              # Cryptography & authentication
│   ├── index.js       # Key generation, signing, verification
│   ├── memo.js        # Memo encryption/decryption
│   ├── ecc/           # Elliptic curve crypto (key_private, key_public, signature)
│   └── serializer/    # Transaction serialization (types, operations)
└── broadcast/         # Transaction broadcasting
    ├── index.js       # Transaction preparation & signing
    └── operations.js  # Operation type definitions

test/                  # Mocha test files
examples/              # Usage examples (Node.js and browser)
doc/README.md          # Comprehensive API documentation
dist/                  # Built browser bundle (generated)
lib/                   # Transpiled Node.js code (generated)
```

## Development Commands

```bash
npm install             # Install dependencies
npm test                # Lint + run tests (40s timeout)
npm run test-auth       # Run only auth tests
npm run build           # Build both browser and Node.js
npm run build-browser   # Create dist/hive.min.js
npm run build-node      # Transpile src/ to lib/
```

## Key Files

| File | Purpose |
|------|---------|
| `src/index.js` | Main entry point, exports all modules |
| `src/config.json` | Default config (mainnet endpoints, chain_id) |
| `src/api/methods.js` | All available RPC method definitions |
| `src/broadcast/operations.js` | Transaction operation types |
| `src/auth/ecc/src/` | Core cryptographic implementations |
| `webpack/makeConfig.js` | Webpack build configuration |

## Coding Conventions

**Style:**
- ES6+ with Babel transpilation to ES5
- CamelCase for functions/variables, SNAKE_CASE for constants
- Prefer `const`, avoid `var` (triggers lint warning)

**Patterns:**
- Singleton config via `src/config.js`
- Promise-based with callback support via `nodeify()`
- Auto-generated `*Async` method variants
- Factory functions for formatter module

**API Naming:**
- Methods with `With` suffix accept options object: `voteWith({voter, author, ...}, cb)`
- Methods without suffix use positional args: `vote(wif, voter, author, permlink, weight, cb)`

**Blockchain:**
- Mainnet prefix: `STM`, testnet: `TST`
- Key roles: owner, active, posting, memo
- Transactions require chain_id prefix before signing

## CI/CD Notes

**CircleCI:** `.circleci/config.yml`
- Docker-based build (`docker:17-git`)
- Builds and tests in containerized environment

**Testing:**
```bash
eslint --quiet src test && mocha -t 40000 --require babel-polyfill --require babel-register
```

**Publishing:**
- npm package: `@hiveio/hive-js`
- `prepublish` runs build automatically
- CDN: `https://cdn.jsdelivr.net/npm/@hiveio/hive-js/dist/hive.min.js`

## Configuration

**Default (Mainnet):**
```javascript
{
  "uri": "https://api.hive.blog",
  "address_prefix": "STM",
  "chain_id": "beeab0de00000000000000000000000000000000000000000000000000000000"
}
```

**Testnet:**
```javascript
hive.api.setOptions({
  useTestNet: true,
  address_prefix: 'TST',
  chain_id: '46d82ab7d8db682eb1959aed0ada039a6d49afa1602491f93dde9cac3e8e6c32'
});
```

## Quick Examples

```javascript
const hive = require('@hiveio/hive-js');

// Query accounts
hive.api.getAccounts(['username'], (err, result) => console.log(result));

// Generate keys
const keys = hive.auth.getPrivateKeys('user', 'password', ['posting', 'active']);

// Send vote
const wif = hive.auth.toWif('user', 'password', 'posting');
hive.broadcast.vote(wif, 'voter', 'author', 'permlink', 10000, callback);
```
