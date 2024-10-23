const key = 'teamB8';

function encrypt(password) {
    const secretPass = CryptoJS.AES.encrypt(password, key);
    return secretPass;
};

function decrypt() {
    let secretPass = document.getElementById("pass").value;
    const password = CryptoJS.AES.decrypt(secretPass, key).toString(CryptoJS.enc.Utf8);
    document.getElementById("pass").value = password;
};