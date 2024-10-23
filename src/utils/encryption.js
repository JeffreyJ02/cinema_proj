const key = 'teamB8';

export function encrypt(password) {
    const secretPass = CryptoJS.AES.encrypt(password, key);
    return secretPass;
};

export function decrypt(secretPass) {
    const password = CryptoJS.AES.decrypt(secretPass, key).toString(CryptoJS.enc.Utf8);
    return password;
};