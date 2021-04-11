/* eslint-disable no-shadow */

export enum EContentTypes {
    file = 'file',
    photo = 'photo',
    text = 'text'
}
export enum EMessageTypes {
    bot = 'bot',
    user = 'user'
}
export interface CustomMessage {
    readonly id?: string;
    userId: string;
    chat_id?: number;
    lessonId: string;
    type: EMessageTypes;
    message: Message;
    createdAt?: number;
}

interface Message {
    id: number;
    content?: MessageOptions;
}
export interface MessageOptions {
    type: EContentTypes;
    link: string | null;
    text: string | null;
    fileId: string;
}

