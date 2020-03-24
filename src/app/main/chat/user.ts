import { ChatPreview } from './chatPreview';

export class User {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.avatar = user.avatar;
        this.status = user.status;
        this.mood = user.mood;
        this.chatList = user.chatList;

    }

    id: string;
    name: string;
    avatar: string;
    status: string;
    mood: string;
    chatList: ChatPreview[]

}