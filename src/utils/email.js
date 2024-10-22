import emailjs from '@emailjs/browser';
emailjs.init('aLH3Qp8VUhQqJf1nk');

function optInPromoEmails() {
    let parms = {
        subject: "Promotional Opt-In",
        user_email: "",
        user_firstname: "",
        message: "you have opted in to receive promotional emails"
    }

    emailjs.send("service_4brc417", "template_r3h3fid", parms)
}

function editProfileEmail() {
    let parms = {
        subject: "Profile Edited",
        user_email: "cinemateamb8@gmail.com",
        user_firstname: "teamb8",
        message: "your profile's information has been edited"
    }
    emailjs.send("service_4brc417", "template_r3h3fid", parms)
}

function forgotPassword() {
    let parms = {
        user_email: "",
        user_firstname: "",
        new_password: ""
    }
    emailjs.send("service_4brc417", "template_6zuhtqr", parms)
}

export function verificationCode({ email, message }) {
    const parms = {
      user_email: email,
      message,
      subject: 'Verification Code',
    };
  
    return emailjs.send('service_4brc417', 'template_6zuhtqr', parms)
  }
  
  

// in HTML button: 
// onclick="[function]"