package ru.alexrov.qwitterapi.services;

import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.alexrov.qwitterapi.exceptions.EmailFailedException;

import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.ByteArrayOutputStream;
import java.util.Properties;

@Service
public class MailService {

    private final Gmail gmail;

    @Autowired
    public MailService(Gmail gmail) {
        this.gmail = gmail;
    }

    public void sendEmail(String to, String subject, String text) {
        Properties props = new Properties();
        Session session = Session.getInstance(props, null);
        MimeMessage message = new MimeMessage(session);
        try {

            message.setFrom(new InternetAddress("qwitter@qwitterapi.com"));
            message.addRecipient(javax.mail.Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(subject);
            message.setText(text);

            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            message.writeTo(buffer);
            byte[] bytes = buffer.toByteArray();
            String encodedEmail = Base64.encodeBase64URLSafeString(bytes);

            Message msg = new Message();
            msg.setRaw(encodedEmail);

            msg = gmail.users().messages().send("me", msg).execute();

        } catch (Exception e) {
            throw new EmailFailedException();
        }
    }
}
