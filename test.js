import test from 'ava'
import nock from 'nock'
import RenewingToken from '.'

const testData = {
  domain: 'some-domain.auth0.com',
  clientId: 'CLIENT_ID',
  clientSecret: 'SEEEECRET_BOX',
  audience: ''
}

const fakeJwtPart = () => (Math.random() + 1).toString(36).slice(2)

const setupAPI = () => nock(`https://${testData.domain}`)
  .post('/oauth/token', {
    grant_type: 'client_credentials',
    client_id: testData.clientId,
    client_secret: testData.clientSecret
  })
  .reply(200, {
    access_token: `${fakeJwtPart()}.${fakeJwtPart()}.${fakeJwtPart()}`,
    expires_in: 86400
  })

test('retrieves a new token', async t => {
  const renewingToken = new RenewingToken(testData)

  const auth0Api = setupAPI()
  const token = await renewingToken.token
  auth0Api.done()

  t.is(typeof token, 'string')
  t.true(token.length > 5)
})

test('reuses token if still valid', async t => {
  const renewingToken = new RenewingToken(testData)

  // Should only make request to API once
  const auth0Api = setupAPI()
  const token1 = await renewingToken.token
  auth0Api.done()

  const token2 = await renewingToken.token

  t.deepEqual(token1, token2)
})
