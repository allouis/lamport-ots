# 🔏 Lamport One-Time Signatures 🔏

Lamport one-time signature scheme is a simple but effective mechanism for creating signatures built on top of hash functions.
Any cryptograph hash function can be used to implement the scheme.
Signatures using large hash functions are understood so far to be "quantum resistant"

## ⚠ Warning ⚠

The lamport one-time signature scheme uses 50% of your **private** key as the signature, this is why they are for one time use only.

Do not use a single private key to sign more than once piece of data.

## Installation

### With `npm`

```shell
npm install --save lamport-ots
```

### With `yarn`

```shell
yarn add lamport-ots
```

## Usage

### Basic usage with `SHA256` hash function

```javascript
const lamportSHA256 = require('lamport')

const { publicKey, privateKey } = lamportSHA256.keys()

const message = 'Hello, world!'
const signature = lamportSHA256.sign(message, privateKey)

// elsewhere...

if (lamportSHA256.verify(message, signature, publicKey)) {
  // Authenticity of message confirmed
} else {
  // Falsified signature, or tampered message
}
```

### With a custom hash function

```javascript
const lamport = require('lamport')

const lamportSomeHash = lamport(function (stringOrBuffer) {
  return someHashFrom(stringOrBuffer)
})

const { publicKey, privateKey } = lamportSomeHash.keys()

const message = 'Hello, world!'
const signature = lamportSomeHash.sign(message, privateKey)

// elsewhere...

if (lamportSomeHash.verify(message, signature, publicKey)) {
  // Authenticity of message confirmed
} else {
  // Falsified signature, or tampered message
}
```

## API

### `lamport(hash)`

`hash` must be a function that accepts either a String or a Buffer, and returns a Buffer of fixed length.

Returns a lamport "instance" with the following methods

  - `keys()`
  - `sign(message, privateKey)`
  - `verify(message, signature, publicKey)`

#### `lamport(hash).keys`

Returns an Object with a `publicKey` and `privateKey` property.

#### `lamport(hash).sign(message, privateKey)`

`message` must be either a String or a Buffer

`privateKey` should be a privateKey returned from keys that **hasn't** been used before.

Returns a Buffer representing the signature

#### `lamport(hash).verify(message, signature, publicKey`

`message` must be either a String or a Buffer

`signature` must be a Buffer

`publicKey` should be a publicKey returned from `keys()`

Returns a Boolean representing the validity of the signature

#### `lamport.keys`
#### `lamport.sign`
#### `lamport.verify`

The module exposes a lamport "instance" created with the sha256 hash function, which you can use directly.

## Contributing

Contributions are welcome from *anyone* and _everyone_ and the collaboration model used is the [Collective Code Construction Contract](https://rfc.zeromq.org/spec:42/C4/)
