export interface ICertificate {
    readonly _id: string;
    id: string;
    userId: string;
    courseId: string;
    fileId: string;
    fileLink: string;
    createdAt: number;
    updatedAt: number;
}
