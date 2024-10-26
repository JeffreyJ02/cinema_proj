import CryptoJS from 'crypto-js';
const key = 'teamB8';

export function encrypt(password) {
    console.log("Running Encrypt");
    const secretPass = CryptoJS.AES.encrypt(password, key).toString();
    return secretPass;
};

export function decrypt() {
    console.log("Running Decrypt");
    let secretPass = document.getElementById("pass").value;
    const password = CryptoJS.AES.decrypt(secretPass, key).toString(CryptoJS.enc.Utf8);
    document.getElementById("pass").value = password;
};