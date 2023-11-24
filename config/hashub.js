const shajs = require('sha.js')
const bcrypt = require('bcryptjs')
const md5 = require('md5')

const HASH_SALT = 11

class Hashub {
	constructor(args) {
		// code
	}

	// methods
	// 
	static crypt(word) {
		const functionHash = 'SHA512'
		return shajs(functionHash).update(word).digest('hex')
	}

	static compare(nohash, hash) {
		let newhash = Hashub.crypt(nohash)
		console.log(newhash)

		if (newhash === hash) {
			console.log(newhash)
			console.log(hash)
			return true
		} else {
			console.log(newhash)
			console.log(hash)
			return false
		}
	}

	static cryptWithMd5(word) {
		let hashword = md5(word)
		return hashword
	}

	static cryptWithBcrypt(word) {
		let salt = bcrypt.genSaltSync(HASH_SALT)
		let hashword = bcrypt.hashSync(word, salt)

		return hashword
	}

	static compareWithBcrypt(word, hashword) {
		let similitude = bcrypt.compareSync(word, hashword)

		return similitude
	}
}

module.exports = Hashub

