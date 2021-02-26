import { DateAdapter } from "@angular/material/core";

export interface Dependent {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    employeeId: number;
    genderId: number;
    dependentRelationshipTypeId: number;
    dependentRelationshipTypeName: string;
}