import { Course } from './courses';

export interface IStudyProgress {
    readonly _id: string;
    userId: string;
    chat_id: string;
    isAnswered: boolean;
    progress: EStudyProgress;
    lessonId: string;
    courseId: Course | string;
    status: EStudyStatus;
    createdAt: number;
    updatedAt: number;
}
export enum EStudyProgress {
    NOT_STARTED = 0,
    STARTED = 1,
    IN_PROGRESS = 2,
    COMPLETED = 3
}
export enum EStudyStatus {
    ENABLED = 0,
    DISABLED = 1,
}
