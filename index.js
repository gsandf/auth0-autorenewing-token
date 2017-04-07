const axios = require('axios')

class RenewingToken {
  constructor(options) {
    // Time (in milliseconds) subtracted from the actual token expiration to ensure good tokens are
    // always used. default: 1 hour
    this.safetyWindow = 60 * 60 * 1000
    this.tokenData = undefined
    this.options = options

    this.storeToken = this.storeToken.bind(this)
  }

  getToken() {
    if (this.tokenStillValid()) {
      return Promise.resolve(this.tokenData.access_token)
    }

    return this.renewToken(this.options)
  }

  renewToken() {
    const { domain, clientId, clientSecret, audience } = this.options
    const requestOptions = {
      method: 'post',
      baseURL: `https://${domain}`,
      url: '/oauth/token',
      data: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        audience: audience
      }
    }

    return axios
      .request(requestOptions)
      .then(response => response.data)
      .then(this.storeToken)
      .then(tokenData => tokenData.access_token)
  }

  storeToken(tokenData) {
    this.tokenData = Object.assign(tokenData, {
      expireTimestamp: Date.now() + tokenData.expires_in * 1000 - this.safetyWindow
    })

    return this.tokenData
  }

  tokenStillValid() {
    return (
      this.tokenData != null &&
      typeof this.tokenData.access_token === 'string' &&
      this.tokenData.access_token.length > 0 &&
      typeof this.tokenData.expires_in === 'number' &&
      this.tokenData.expires_in > 0 &&
      typeof this.tokenData.expireTimestamp === 'number' &&
      Date.now() < this.tokenData.expireTimestamp
    )
  }
}

module.exports = RenewingToken
