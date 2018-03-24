var crypto = require("crypto")

function encrypt(key, data) {
        var cipher = crypto.createCipher('aes-256-cbc', key);
        var crypted = cipher.update(text, 'utf-8', 'hex');
        crypted += cipher.final('hex');

        return crypted;
}

function decrypt(key, data) {
        var decipher = crypto.createDecipher('aes-256-cbc', key);
        var decrypted = decipher.update(data, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');

        return decrypted;
}

var key = "vTnWFQBYfWcnvENttMajWsqds5rgNdS7DYMesYPwZGv7BxkqF6zsGppyQCv9ELJvnYJ6q6x6P6JTLfhRmLCMpFTJzsaPnNCsLYgmXw98qSwAAFfCfeYb3mJwVLWxHgzeMTnwrwxuvtRZ5nGPmzgYymnvVLDAhrH9dBMLHJ4Uv95a7jCvHUfKcJjqa5BLaUNppZthqeY3eWMfnJw8JkbVmnmKafnEzhMbdATbNKSvPzvPVrRUcVT3SpsBeYPLPeay";
var text = "p3KcEpnXGDDBtKsxGdtaJdEA7H3Qmt7TEqbHxaeUhEBdkQqwVS4P7nVF6YZuk47jxMX9vMz9gFg2qm8Xuu63uvRtcup5dRAfxP7C9ptmcHDBPknG9TzBPzLB8b6SCkeZ";
console.log("Original Text: " + text);

var encryptedText = encrypt(key, text);
console.log("Encrypted Text: " + encryptedText);
var decryptedText = decrypt(key, encryptedText);
console.log("Decrypted Text: " + decryptedText);
