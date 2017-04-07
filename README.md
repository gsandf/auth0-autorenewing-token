# auth0-autorenewing-token

> A helper for auth0/node-auth0 that handles retrieving/renewing access tokens

[![Build status](https://travis-ci.org/gsandf/auth0-autorenewing-token.svg?branch=master)](https://travis-ci.org/gsandf/auth0-autorenewing-token)
[![Greenkeeper badge](https://badges.greenkeeper.io/gsandf/auth0-autorenewing-token.svg)](https://greenkeeper.io/)

Want to use the Auth0 [Management API](https://auth0.com/docs/api/management/v2) or the [Authentication API](https://auth0.com/docs/api/authentication), but don't want to renew access tokens yourself?  Us too.  That's why we made this.

Also, if you're using this, you probably want to check out Auth0's awesome [`auth0`](https://github.com/auth0/node-auth0) (if you haven't already).

## Usage

```js
const RenewingToken = require('auth0-autorenewing-token')

const auth0Options = {
  domain: 'YOUR_DOMAIN.auth0.com',
  clientId: 'CLIENT_ID',
  clientSecret: 'SEEEECRET_BOX',
  audience: ''
}

const renewingToken = new RenewingToken(auth0Options)

renewingToken
  .getToken()
  .then(token => {
    /* use the token to make calls to the Management and/or Authentication APIs */
  })
```

## Install

With either [Yarn](https://yarnpkg.com/) or [npm](https://npmjs.org/) installed, run one of the following:

```shell
# If using Yarn:
yarn add auth0-autorenewing-token

# If using npm:
npm install --save auth0-autorenewing-token

```

## See Also

- [`auth0/node-auth0`](https://github.com/auth0/node-auth0)

## License

MIT
