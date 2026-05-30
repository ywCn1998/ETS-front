import { IAccess } from "@src/models/auth"

// ---------------- Enum ----------------
export enum OperationType {
    Pub = 0,
    VIW = 1,
    VIWALL = 2,
    DIS = 3,
    INS = 4,
    UPD = 5,
    DEL = 6,
    PRN = 7,
    FIL = 8,
}




// ---------------- Function ----------------
export function hasAccess(
    accessList: IAccess[],
    title: string,
    operation: OperationType
): boolean {
    const accessItem = accessList.find((item) => item.title === title)
    if (!accessItem) return false

    return accessItem.operationTypeList.some((op) => op.id === operation)
}
