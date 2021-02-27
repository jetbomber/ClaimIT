import { Company } from "src/app/_models/company";

export const newCompany = (): Company => {
                                        
    const newCompany = <Company>{};
    newCompany.commencementDate = null;
    newCompany.groupTerminationDate = null,
    newCompany.companyName = null;
    newCompany.yearEndDate = null;
    newCompany.includeCostPlusClaims = false;
    newCompany.includeHsaClaims = false;

    return newCompany;

}