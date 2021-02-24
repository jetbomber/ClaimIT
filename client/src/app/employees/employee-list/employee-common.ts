import { Employee } from "src/app/_models/employee";

export const newEmployee = (): Employee => {
                                        
    const newEmployee = <Employee>{};
    newEmployee.dependentCoverage = false;
    newEmployee.eft = false;
    newEmployee.cob = false;
    newEmployee.mailCompany = false;
    newEmployee.evidence = false;
    newEmployee.smoker = false;
    newEmployee.countryId = 1;

    return newEmployee;

}