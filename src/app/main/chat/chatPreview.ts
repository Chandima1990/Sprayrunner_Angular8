export class ChatPreview {
    constructor(chatPreview) {
        this.id = chatPreview.id;
        this.contactId = chatPreview.contactId;
        this.name = chatPreview.name;
        this.lastMessage = chatPreview.lastMessage;
        this.lastMessageTime = chatPreview.lastMessageTime;
        this.unread = chatPreview.unread;
    }

    id: string;
    contactId: string;
    name: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: number;
}
