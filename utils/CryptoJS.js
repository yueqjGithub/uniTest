var CryptoJS = require('./aes.js').CryptoJS;  //引用AES源码js
//加密
const Encrypt = function (word, keyStr){ 
    
    // keyStr = keyStr ? keyStr : 'a0b923820dcc509a';
    // console.log(keyStr)
    // var str = keyStr.substr(9, 16);
    var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
   
    var iv   = CryptoJS.enc.Utf8.parse(keyStr);
    // console.log(keyStr.substr(9, 16))
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {iv:iv,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  }
//解密方法 word待解密数据,keyStr密钥
const Decrypt = function (word, keyStr){
  // keyStr = keyStr ? keyStr : 'a0b923820dcc509a';
  // console.log(keyStr)

  var key = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var iv   = CryptoJS.enc.Utf8.parse(keyStr);
  var decrypt = CryptoJS.AES.decrypt(word, key, { 
      iv:iv,
      mode: CryptoJS.mode.CBC, 
      padding: CryptoJS.pad.Pkcs7 
    });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
//暴露接口
export default {
  Encrypt,
  Decrypt
}
