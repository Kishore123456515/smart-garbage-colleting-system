// package com.smartgarbage.notification;

// import com.smartgarbage.complaint.ComplaintStatus;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.stereotype.Service;

// @Service
// public class EmailService {

//     private final JavaMailSender mailSender;

//     public EmailService(JavaMailSender mailSender) {
//         this.mailSender = mailSender;
//     }

//     public void sendStatusUpdateEmail(String toEmail,
//                                       String userName,
//                                       Long complaintId,
//                                       ComplaintStatus previousStatus,
//                                       ComplaintStatus newStatus) {
//         if (toEmail == null || toEmail.isBlank()) {
//             return;
//         }

//         String subject = "Update on your garbage complaint #" + complaintId;

//         String body = """
//                 Dear %s,

//                 Thank you for reporting garbage complaint #%d.

//                 The status of your complaint has been updated.

//                 Previous status: %s
//                 New status: %s

//                 We appreciate your effort in keeping your area clean.

//                 Regards,
//                 Smart Garbage Reporting System
//                 """.formatted(
//                 userName != null && !userName.isBlank() ? userName : "Citizen",
//                 complaintId,
//                 previousStatus != null ? previousStatus.name() : "N/A",
//                 newStatus != null ? newStatus.name() : "N/A"
//         );

//         SimpleMailMessage message = new SimpleMailMessage();
//         message.setTo(toEmail);
//         message.setSubject(subject);
//         message.setText(body);

//         try {
//             mailSender.send(message);
//         } catch (Exception ignored) {
//             // Intentionally swallow email errors so they don't break status updates
//         }
//     }
// }
// package com.smartgarbage.notification;

// import com.smartgarbage.complaint.ComplaintStatus;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.mail.javamail.MimeMessageHelper;
// import org.springframework.stereotype.Service;

// import jakarta.mail.internet.MimeMessage;

// @Service
// public class EmailService {

//     private final JavaMailSender mailSender;

//     public EmailService(JavaMailSender mailSender) {
//         this.mailSender = mailSender;
//     }

//     public void sendStatusUpdateEmail(String toEmail,
//                                       String userName,
//                                       Long complaintId,
//                                       ComplaintStatus previousStatus,
//                                       ComplaintStatus newStatus) {

//         if (toEmail == null || toEmail.isBlank()) {
//             return;
//         }

//         try {

//             MimeMessage message = mailSender.createMimeMessage();
//             MimeMessageHelper helper = new MimeMessageHelper(message, true);

//             helper.setTo(toEmail);
//             helper.setSubject("Garbage Complaint Status Update");

//             String htmlContent = """
//                     <html>
//                     <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
                    
//                     <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,0.1);">
                    
//                     <h2 style="color:#2c3e50;">Garbage Complaint Status Update</h2>
                    
//                     <p>Dear <b>%s</b>,</p>
                    
//                     <p>Your garbage complaint has been updated.</p>
                    
//                     <table style="width:100%%;border-collapse:collapse;margin-top:15px;">
//                         <tr>
//                             <td style="padding:8px;"><b>Complaint ID</b></td>
//                             <td style="padding:8px;">#%d</td>
//                         </tr>
//                         <tr>
//                             <td style="padding:8px;"><b>Previous Status</b></td>
//                             <td style="padding:8px;color:#f39c12;"><b>%s</b></td>
//                         </tr>
//                         <tr>
//                             <td style="padding:8px;"><b>Current Status</b></td>
//                             <td style="padding:8px;color:#27ae60;"><b>%s</b></td>
//                         </tr>
//                     </table>
                    
//                     <p style="margin-top:20px;">
//                     Thank you for helping us maintain a clean and healthy environment.
//                     </p>
                    
//                     <hr>
                    
//                     <p style="font-size:12px;color:gray;">
//                     Smart Garbage Reporting System<br>
//                     Municipal Support Team
//                     </p>
                    
//                     </div>
                    
//                     </body>
//                     </html>
//                     """.formatted(
//                     userName != null && !userName.isBlank() ? userName : "Citizen",
//                     complaintId,
//                     previousStatus != null ? previousStatus.name() : "N/A",
//                     newStatus != null ? newStatus.name() : "N/A"
//             );

//             helper.setText(htmlContent, true);

//             mailSender.send(message);

//         } catch (Exception ignored) {
//         }
//     }
// }
package com.smartgarbage.notification;

import com.smartgarbage.complaint.ComplaintStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendStatusUpdateEmail(String toEmail,
                                      String userName,
                                      Long complaintId,
                                      ComplaintStatus previousStatus,
                                      ComplaintStatus newStatus) {

        if (toEmail == null || toEmail.isBlank()) {
            return;
        }

        try {

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject("Garbage Complaint Status Update");

            String htmlContent = """
                <html>
                <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">

                <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px;
                box-shadow:0 0 10px rgba(0,0,0,0.1);">

                <h2 style="color:#2c3e50;">Garbage Complaint Status Update</h2>

                <p>Dear <b>%s</b>,</p>

                <p>We appreciate your effort in reporting the garbage issue in your area.</p>

                <p>Your complaint <b>(ID: %d)</b> has been reviewed and the status has been updated as follows:</p>

                <p>
                <b>Previous Status:</b> %s <br>
                <b>Updated Status:</b> %s
                </p>

                <p>
                The municipal cleaning team has successfully addressed the issue. 
                Thank you for contributing to a cleaner and better community.
                </p>

                <p>
                If you observe any other sanitation issues, please continue using our 
                <b>Smart Garbage Reporting System</b> to report them.
                </p>

                <br>

                <p>
                Sincerely,<br>
                <b>Smart Garbage Reporting System</b><br>
                Municipal Support Team
                </p>

                </div>

                </body>
                </html>
                """.formatted(
                    userName != null && !userName.isBlank() ? userName : "Citizen",
                    complaintId,
                    previousStatus != null ? previousStatus.name() : "N/A",
                    newStatus != null ? newStatus.name() : "N/A"
            );

            helper.setText(htmlContent, true);

            mailSender.send(message);

        } catch (Exception ignored) {
        }
    }

    public void sendOverdueComplaintAlert(String toEmail, Long complaintId) {
        if (toEmail == null || toEmail.isBlank()) {
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject("Overdue Garbage Complaint Alert");

            String htmlContent = """
                <html>
                <body style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">

                <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:8px;
                box-shadow:0 0 10px rgba(0,0,0,0.1);">

                <h2 style="color:#c0392b;">Overdue Garbage Complaint</h2>

                <p>Dear Admin,</p>

                <p>The following complaint has been in <b>PENDING</b> status for more than <b>48 hours</b>:</p>

                <p><b>Complaint ID:</b> %d</p>

                <p>Please review and take the necessary action to ensure timely resolution.</p>

                <br>

                <p>
                Regards,<br>
                <b>Smart Garbage Reporting System</b>
                </p>

                </div>

                </body>
                </html>
                """.formatted(complaintId);

            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (Exception ignored) {
        }
    }
}

