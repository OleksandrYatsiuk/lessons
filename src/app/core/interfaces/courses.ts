
// eslint-disable-next-line no-shadow
export enum ECourseStatus {
    DRAFT = 1,
    PUBLISHED = 2
}
export interface Course {
    readonly id: string;
    readonly _id: string;
    name: string;
    description?: string;
    status?: number;
    createdAt: number;
    updatedAt: number;
    price: number;
}
export interface Lesson {
    readonly id: string;
    readonly _id: string;
    name: string;
    context?: string;
    file?: string;
    presentation: string;
    video: string;
    courseId: string;
    status?: number;
    free: boolean;
    createdAt: number;
    updatedAt: number;
}

