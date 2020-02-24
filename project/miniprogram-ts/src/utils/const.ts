
const PREFIX: string = '';

interface IApiEnum {
    readonly DETAIL: string,
    readonly LIST: string,
}

const API:IApiEnum = {
    DETAIL: `/${PREFIX}/caseOrder/getCaseOrder`,
    LIST: `/${PREFIX}/caseOrder/getCaseOrderByPage`,
};

export {
    API,
};
