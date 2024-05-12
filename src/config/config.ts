export const Messages = {
    notice: "Delete for all eternity?",
    received: "Message received",
    subject: "Hello, I'm ",
    sent: "Your message has been sent!",
    sending_failed: "Sending message failed! Try again later.",
    first_name_required: "First name is required",
    character_restriction: "Must be between 2 and 50 characters",
    last_name_required: "Last name is required",
    email_required: "Email is required",
    invalid_email: "Invalid email address",
    message_required: "Message is required",
    message_restriction: "Message cannot exceed 500 characters",
};

export const ContactInfo = {
    email: "szakaliarpi@gmail.com",
};

export const EmailTemplate = `
<div style="font-size: 16px;">
  <div style="display: flex;">
    <div style="font-size: 16px; font-weight: bold; margin-right: 10px;">Full Name:</div>
    <div style="font-size: 16px;">{{firstName}} {{lastName}}</div>
  </div>
  <div style="display: flex;">
    <div style="font-size: 16px; font-weight: bold; margin-right: 10px;">Email:</div>
    <div style="font-size: 16px;">{{emailAddress}}</div>
  </div>
  <div style="display: flex;">
    <div style="font-size: 16px; font-weight: bold; margin-right: 10px;">Subject:</div>
    <div style="font-size: 16px;">{{subject}}</div>
  </div>
  <div style="display: flex;">
    <div style="font-size: 16px; font-weight: bold; margin-right: 10px;">Message:</div>
    <p style="margin: 0">{{message}}</p>
  </div>
</div>`;

