import { stat } from 'fs';

export class Contact {

    constructor(contact: any) {
        this.id = contact.id;
        this.name = contact.name;
        this.avatar = contact.avatar;
        this.status = contact.status;
        this.mood = contact.mood;
        this.unread = contact.unread
    }

    id: string;
    name: string;
    avatar: string;
    status: string;
    mood: string;
    unread: string;
}

