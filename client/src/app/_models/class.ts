import { HsaClassDetails } from "./hsaclassdetails";

export interface Class {
    id: number;
    classNumber: number;
    className: string;
    description: string;
    classWaitingPeriod: number;
    personalHealthMaximum: number;
    isHsaClass: boolean;
    companyId: number;
    hsaClassDetails: HsaClassDetails[];
}