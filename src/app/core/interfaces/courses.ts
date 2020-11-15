import { SafeHtml } from '@angular/platform-browser';

export interface Course {
    readonly id: string;
    name: string;
    description?: string;
    status?: number;
    createdAt: number;
    updatedAt: number;
}
export interface Lesson {
    readonly id: string;
    readonly _id: string;
    name: string;
    context?: string;
    file?: File;
    courseId: string;
    status?: number;
    free: boolean;
    createdAt: number;
    updatedAt: number;
}

export enum ECourseStatus {
    DRAFT = 1,
    PUBLISHED = 2
}
