const test = require('tape')
const crypto = require('crypto')
const lamport = require('./')

test('It can sign and verify a message', assert => {
  const { publicKey, privateKey } = lamport.keys()

  const msg = Buffer.from('Hello, world')

  const signature = lamport.sign(msg, privateKey)

  const valid = lamport.verify(msg, signature, publicKey)

  assert.ok(valid, 'The signature was valid')
  assert.end()
})

test('it can use a custom hash function', assert => {
  const lamportSHA512 = lamport(function (data) {
    return crypto.createHash('sha512').update(data).digest()
  })

  const expectedKeyLength = 512 * 512 * 2

  const { publicKey, privateKey } = lamportSHA512.keys()

  assert.equal(privateKey[0].length + privateKey[1].length, (expectedKeyLength / 8), `The privateKey was ${expectedKeyLength} bits`)
  assert.equal(publicKey[0].length + publicKey[1].length, (expectedKeyLength / 8), `The publicKey was ${expectedKeyLength} bits`)

  const msg = Buffer.from('Hello, world')

  const signature = lamportSHA512.sign(msg, privateKey)

  assert.equal(signature.length, 512 * 512 / 8, `The signature was ${512 * 512} bits`)

  const valid = lamportSHA512.verify(msg, signature, publicKey)

  assert.ok(valid, 'The signature was valid')
  assert.end()
})
