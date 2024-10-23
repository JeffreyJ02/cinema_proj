import emailjs from '@emailjs/browser';
emailjs.init('aLH3Qp8VUhQqJf1nk');

function optInPromoEmails( {email} ) {
    let parms = {
        subject: "Promotional Opt-In",
        user_email: email,
        message: "you have opted in to receive promotional emails."
    }

    emailjs.send("service_4brc417", "template_r3h3fid", parms)
}

export function editProfileEmail( {email} ) {
    let parms = {
        subject: "Profile Edited",
        user_email: email,
        message: "your profile's information has been edited."
    }
    emailjs.send("service_4brc417", "template_r3h3fid", parms)
}

function forgotPassword( {email, message} ) {
    let parms = {
        user_email: email,
        message: message
    }
    emailjs.send("service_4brc417", "template_6zuhtqr", parms)
}

export function verificationCode({ email, message }) {
    const parms = {
      user_email: email,
      message,
      subject: 'Verification Code',
    };
    emailjs.send('service_4brc417', 'template_6zuhtqr', parms)
}
  
// in HTML button: 
// onclick="[function]"