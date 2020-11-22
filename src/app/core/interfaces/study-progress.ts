import { Course } from './courses';

export interface IStudyProgress {
    readonly _id: string;
    userId: string;
    chat_id: number;
    isAnswered: boolean;
    progress: EStudyProgress;
    lessonId: string;
    courseId: Course | string;
    status: boolean;
    createdAt: number;
    updatedAt: number;
}
export enum EStudyProgress {
    NOT_STARTED = 0,
    STARTED = 1,
    IN_PROGRESS = 2,
    COMPLETED = 3
}
