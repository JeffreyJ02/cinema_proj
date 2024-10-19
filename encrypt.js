let password = 'cat';

const encrypt = () => {
    const encryptedPass = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        password
    ).toString();
    console.log(encryptedPass);
};