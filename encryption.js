const key = 'teamB8';

function encrypt() {
    let password = document.getElementById("pass").value;
    const secretPass = CryptoJS.AES.encrypt(password, key);
    document.getElementById("pass").value = secretPass;
};

function decrypt() {
    let secretPass = document.getElementById("pass").value;
    const password = CryptoJS.AES.decrypt(secretPass, key).toString(CryptoJS.enc.Utf8);
    document.getElementById("pass").value = password;
};