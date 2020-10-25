export interface Messages {
    readonly id: string;
    message: Message;
    chat_id: string;
    lessonId: string;
    createdAt?: number;
}


export interface CustomMessage {
    readonly id: string;
    message: Message;
    chat_id: number;
    lessonId: string;
    createdAt?: number;
}

interface Message {
    id: number;
    text: string;
    date: number;
    file: FileOptions;
}
export interface FileOptions {
    type: EFileTypes;
    link: string;
    caption: string;
}

export enum EFileTypes {
    file = 'file',
    photo = 'photo'
}