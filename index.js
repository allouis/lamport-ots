const crypto = require('crypto')

const array = length => Array.from({ length })

const readBytes = (buf, read, from = 0) => buf.slice(from, from + read)

const bitsForByte = byte => {
  return [128, 64, 32, 16, 8, 4, 2, 1].map(pos => {
    return byte & pos ? 1 : 0
  })
}

const bitsForBuffer = buffer => array(buffer.length).reduce((bits, _, idx) => {
  return bits.concat(bitsForByte(buffer[idx]))
}, [])

const getSizes = hash => {
  const buf = hash(Buffer.alloc(0))
  return {
    bytes: buf.length,
    bits: buf.length * 8
  }
}

function lamport (hash) {
  const { bits, bytes } = getSizes(hash)

  const readChunk = (buf, idx) => readBytes(buf, bytes, bytes * idx)

  const keys = () => {
    const privateKey = [0, 1].map(() =>
      crypto.randomBytes(bits * bytes)
    )
    const publicKey = privateKey.map(privateKeyHalf => {
      return array(bits).reduce((publicKeyHalf, _, idx) => {
        return Buffer.concat([publicKeyHalf, hash(
          readChunk(privateKeyHalf, idx)
        )], (idx + 1) * bytes)
      }, Buffer.alloc(0))
    })

    return {
      publicKey,
      privateKey
    }
  }

  const sign = (input, key) => {
    const msg = hash(input)
    return bitsForBuffer(msg).reduce((sig, bit, idx) => {
      return Buffer.concat([sig,
        readChunk(key[bit], idx)
      ], (idx + 1) * bytes)
    }, Buffer.alloc(0))
  }

  const verify = (input, sig, key) => {
    const msg = hash(input)
    return bitsForBuffer(msg).reduce((valid, bit, idx) => {
      return valid && readChunk(key[bit], idx).equals(
        hash(readChunk(sig, idx))
      )
    }, true)
  }

  return {
    keys,
    verify,
    sign
  }
}

exports = module.exports = lamport
