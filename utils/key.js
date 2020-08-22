import * as hexMD5 from '@/utils/md5.js'
const aeskeyHandler = require('./CryptoJS.js').default
const reKeyHandler = require('./jsencrypt.min.js')
const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCy8IWH/K4aj6vnWzVQuXmOeTf7hG+q4xfeRyo4pIr/qE+5/WMQVZkVzvIbTOTiXR6Fwswbfi4FA8nSgDdrpgGkDIcbH7lTNb45IbeeD1pt/Nv4pMAGZRfR5ve9zeB+wCxpdF2WZmDsNSyQIK/rVfQ1MvSujADrIS1iJOz6XqpY+QIDAQAB"

const privateKey = 'MIICXAIBAAKBgQC80np6XAGBaAykeY9DAOzZ9uub/b7U+Zx3yesp5Ra/E5Vm6PKxwKAZJvpGMjejFxL8AKrTfhvVm1gkiAypnPIKL/N8JRzYjxWvt1gEmVNfMfGQdfFpZa5flNZ5vRRzwor4sYhWqxC7Yx8nSiPT9HNYF/wmyWBZdTBvOHXYkSAQTQIDAQABAoGBAJepOyTSh4cIKrdkx9Pah2Met+mIKuHnR2zTquXwko+QzDxnOJ/bBvyM2RLOvO9q1h3A73SF4xdz+Z0GBZ2qaKCyKwuI+EBFLuNeXexE/qFLH2IS/iqL9YBTcFpudOmL70nDR8c8MvgRZUz7E7at9t0QZ49B62TqhiMgtZhM9tUlAkEA6pfeLaxIdM7OlPxhNpbCF2SgvQnFKz7w6WitsuWZcAVFbS5udmwxrzJWXImBBsSGS8x1P+xLwyLpOCuzUUkNYwJBAM4NZGAH+yRfUdwXZKJ+zLAFbc6GplpZHjdUHBEIpElsfsPG8eX5Bub390OIwkLRQumBEq8lTXpwyQ6oPufO8o8CQGDjRizA2c/8Vc+siI3eJ903fzdz4I3i2ebch9i6AOwGEU1tfsvEFaUQ+iAP3k0oP3rwv4AeHJBES+QaEF5C+JcCQQC87tKmqyrAgxZQNLL1vEZ6779rq1NFbImkOd8yTzY0jOL/KKANOnX1ulBjADb/hVlROiSjrBSKvHfelK55ZuxJAj91EwAHEOArK6rE53PSS7cOJYBsmjFjweks+FBtqK4Bwhw+QXBsr17NLqBC/kz41WCTX0CRUK90Z4TuEjfOJ2o='

// 生成密文
const generatorHandler = data => {
	const str = new Date().valueOf().toString()
	const key = hexMD5.hexMD5(str).substr(9, 16) // aesKey
	// 使用aesKey对要加密的数据进行对称加密（ecb模式），生成加密数据encryptData
	const encryptData = aeskeyHandler.Encrypt(data, key)
	// 使用ras公钥(rasPublicKey)对aeskey进行加密，得到得到encryptAesKey
	const encryptor = new reKeyHandler.JSEncrypt()
	encryptor.setPublicKey(publicKey) // 设置公钥
	// 对需要加密的数据进行加密
	const encryptAesKey = encryptor.encrypt(key)
	// 在需要登录的接口以header头，将encryptAesKey以token方式传递,
	// encryptData以请求体post或者get方式传递给后台
	return [encryptAesKey, encryptData]
}


const getDataHandler = response => {
	const key = response.key
	const encryptData = response.value
	const decryptor = new reKeyHandler.JSEncrypt()
	decryptor.setPrivateKey(privateKey)
	const encryptAesKey = decryptor.decrypt(key)
	const result = aeskeyHandler.Decrypt(encryptData, encryptAesKey)
	return result
}

export { generatorHandler, getDataHandler }