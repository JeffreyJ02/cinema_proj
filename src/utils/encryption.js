import CryptoJS from 'crypto-js';
const key = 'teamB8';
const salt = 'encryptionstuff';

export function hash(password) {
    const secretPass = CryptoJS.SHA256(password + salt).toString();
    return secretPass;
};

export function encrypt(password) {
    const secretPass = CryptoJS.AES.encrypt(password).toString();
    return secretPass;
};


export function decrypt(secretPass) {
    const password = CryptoJS.AES.decrypt(secretPass).toString(CryptoJS.enc.Utf8);
    return password;
};