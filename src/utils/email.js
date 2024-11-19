import emailjs from '@emailjs/browser';
emailjs.init('aLH3Qp8VUhQqJf1nk');

export function optInPromoEmails( {email} ) {
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

export function forgotPassword( {email, message} ) {
    const parms = {
        user_email: email,
        message: message,
        subject: 'Forgot Password'
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
  
export function emailPromo({ email, promo }) {
    const parms = {
        user_email: email,
        message: `Here's to enjoying movies! One promo code on us!!\n${promo}\nAdd this to your next order to see the magic!`,
        subject: 'Promo Code from CinemaTeamB8',
    };
    emailjs.send('service_4brc417', 'template_6zuhtqr', parms)
}