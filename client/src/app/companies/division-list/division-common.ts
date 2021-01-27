import { Division } from "src/app/_models/division";

export const newDivision = (companyId: number): Division => {
                                        
    const newDivision = <Division>{};
    newDivision.companyId = companyId;
    newDivision.divisionNumber = null;
    newDivision.divisionName = null;
    newDivision.generalAdminFee = null;;
    newDivision.address = null;
    newDivision.city = null;
    newDivision.provinceId = null;
    newDivision.postalCode = null;
    newDivision.contactPersonName = null;
    newDivision.contactPersonPhoneNumber = null;
    newDivision.contactPersonPhoneNumberExt = null;
    newDivision.contactPersonEmailAddress = null;
    newDivision.contactPersonFax = null;

    return newDivision;

}