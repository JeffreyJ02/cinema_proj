import emailjs from '@emailjs/browser';
emailjs.init('aLH3Qp8VUhQqJf1nk');

export function optInPromoEmails( {email} ) {
    const parms = {
        subject: "Promotional Opt-In",
        user_email: email,
        message: "you have opted in to receive promotional emails."
    };

    emailjs.send("service_4brc417", "template_r3h3fid", parms)
}

export function editProfileEmail( {email} ) {
    const parms = {
        subject: "Profile Edited",
        user_email: email,
        message: "your profile's information has been edited."
    };

    emailjs.send("service_4brc417", "template_r3h3fid", parms);
}

export function forgotPassword( {email, message} ) {
    const parms = {
        subject: 'Forgot Password',
        user_email: email,
        message
    };

    emailjs.send("service_4brc417", "template_6zuhtqr", parms);
}

export function verificationCode( {email, message} ) {
    const parms = {
        subject: 'Verification Code',
        user_email: email,
        message
    };

    emailjs.send('service_4brc417', 'template_6zuhtqr', parms)
}

export function emailPromo({ email, promo }) {
    const parms = {
        subject: 'Promo Code from CinemaTeamB8',
        user_email: email,
        message: `Here's to enjoying movies! One promo code on us!!\n${promo}\nAdd this to your next order to see the magic!`
    };
    
    emailjs.send('service_4brc417', 'template_6zuhtqr', parms)
}

export function confirmationEmail( {email, message} ) {
    const parms = {
        subject: "Booking Confirmed!",
        user_email: email,
        message
    };

    emailjs.send("service_4brc417", "template_6zuhtqr", parms);
}

// change user_email to email if broke
export function sendTempPassword({ user_email, tempPassword }) {
    const parms = {
        subject: 'Your Temporary Password',
        user_email,
        message: `You have requested a password reset. Here is your temporary password: ${tempPassword}. Please use it to log in and change your password as soon as possible.`
    };

    emailjs.send("service_4brc417", "template_6zuhtqr", parms)
        .then(response => {
            console.log("Success:", response);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

