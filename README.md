# 🔏 Lamport One-Time Signatures 🔏

Lamport one-time signature scheme is a simple but effective mechanism for creating signatures built on top of hash functions.
Any cryptograph hash function can be used to implement the scheme.
Signatures using large hash functions are understood so far to be "quantum resistant"

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

## Contributing

Contributions are welcome from *anyone* and _everyone_ and the collaboration model used is the [Collective Code Construction Contract](https://rfc.zeromq.org/spec:42/C4/)
