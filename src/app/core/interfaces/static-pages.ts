
// eslint-disable-next-line no-shadow
export enum EStaticPages {
    privacyPolicy = 1,
    termsAndConditions = 2
}

export interface IStaticPages {
    readonly _id?: string;
    type: EStaticPages;
    content: string;
}
