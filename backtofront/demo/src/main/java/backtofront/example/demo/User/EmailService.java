package backtofront.example.demo.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String toEmail, String verificationLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Email Verification");
        message.setText("Click the link to verify your email: " + verificationLink);

        // Optionally handle potential exceptions
        try {
            mailSender.send(message);
        } catch (MailException e) {
            // Log the error or handle it as needed
            System.err.println("Error sending email: " + e.getMessage());
        }
    }
}
