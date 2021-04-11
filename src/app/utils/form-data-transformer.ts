/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/ban-types */
export function transformToFormData(raw: object): FormData {
    const formData = new FormData();

    Object.entries(raw)
        .filter(([, value]) => value !== null)
        .forEach(([param, value]) => {
            if (Array.isArray(value)) {
                setArrayKeys(formData, param, value);
            } else if (typeof value === 'object') {
                if (value instanceof File) {
                    formData.append(param, value);
                } else {
                    setObjectKeys(formData, param, value);
                }
            } else {
                formData.append(param, value);
            }
        });
    return formData;
}

function setArrayKeys(formData: FormData, param: string, array: string[]): void {
    array.forEach((el, index) => {
        formData.append(`${param}[${index}]`, el);
    });
}

function setObjectKeys(formData: FormData, param: string, object: object): void {

    // eslint-disable-next-line guard-for-in
    // tslint:disable-next-line:forin
    for (const key in object) {
        formData.append(`${param}[${key}]`, object[key]);
    }
}
