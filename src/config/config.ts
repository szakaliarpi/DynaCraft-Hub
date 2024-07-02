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
    enter: '(press enter to submit)',
    delete_error: "Couldn't delete, try again!"
};

export const ContactInfo = {
    email: "szakaliarpi@gmail.com",
    contact: 'hello@dynacraft.hub',
    phone: '+40 712 345 678',
};

export const Subject = {
    option1: "IT Consulting",
    option2: "Front-end",
    option3: "Back-end",
    option4: "Other",
}

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

