



export interface ILoginResponse {
    token: string;
}

export interface IBusinessUnit {
    id: string;
    name: string;
}




type IOperationTypeList = {
    id: number
}




interface IAccess {
    id: number;
    title: string;
    parentId: number;
    sortOrder: number;
    iconName: string;
    show: true,
    linkAddress: string;
    controllerName: string;
    children: [],
    level: number;
    operationTypeList: IOperationTypeList[]
}


export interface IUserAccess {
    id: number,
    isSuccess: boolean,
    isWarning: boolean,
    isError: boolean,
    data: IAccess[];
    statusMessage: string,
    validationErrors: string[]
}