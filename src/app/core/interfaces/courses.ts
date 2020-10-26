export interface Course {
    readonly id: string;
    name: string;
    status?: number;
    createdAt: number;
    updatedAt: number;
}
export interface Lesson {
    readonly id: string,
    name: string,
    context?: string;
    file?: File;
    courseId: string;
    status?: number;
    createdAt: number;
    updatedAt: number;
}