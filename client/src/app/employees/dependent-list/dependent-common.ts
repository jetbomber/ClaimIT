import { Dependent } from "src/app/_models/dependent";

export const newDependent = (employeeId: number, employeeLastName: string): Dependent => {
                                        
    const newDependent = <Dependent>{};
    newDependent.employeeId = employeeId;
    newDependent.lastName = employeeLastName;

    return newDependent;

}