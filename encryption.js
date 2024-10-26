const key = 'teamB8';
const salt = 'encryptionstuff';

export function encrypt(password) {
    const secretPass = CryptoJS.SHA256.encrypt(password + salt).toString();
    return secretPass;
};

export function decrypt(secretPass) {
    const password = CryptoJS.SHA256.decrypt(secretPass).toString(CryptoJS.enc.Utf8);
    return password;
};