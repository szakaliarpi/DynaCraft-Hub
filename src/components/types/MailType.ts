export type MailType = {
    id: string;
    to: string;
    description: string;
    message: Message;
};

type Message = {
    subject: string;
    html: string;
    text: string;
    timestamp: number;
    sender: string;
    messageSubject: string;
    fromEmail: string;
};
