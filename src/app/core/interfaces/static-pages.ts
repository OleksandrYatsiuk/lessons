
export enum EStaticPages {
    privacyPolicy = 1,
    termsAndConditions = 2
}

export interface IStaticPages {
    readonly id?: string;
    type: EStaticPages;
    content: string;
}