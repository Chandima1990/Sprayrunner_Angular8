import { Dialog } from './dialog';

export class Chat {
    constructor(chat) {
        this.id = chat.id;
        this.dialog = chat.dialog;
    }
    id: string;
    dialog: Dialog[]
}