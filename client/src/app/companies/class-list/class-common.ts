import { Class } from "src/app/_models/class";
import { HsaClassDetails } from "src/app/_models/hsaclassdetails";

export const newClass = (companyId: number): Class => {
                                        
    const newClass = <Class>{};
    newClass.companyId = companyId;
    newClass.className = null;
    newClass.classNumber = null;
    newClass.classWaitingPeriod = null;
    newClass.description = null;
    newClass.personalHealthMaximum = null;
    newClass.isHsaClass = false;

    return newClass;

}

export const newHsaClassDetails = (classId: number): HsaClassDetails => {
    const newHsaClassDetails = <HsaClassDetails>{};
    newHsaClassDetails.carryForwardYears = null;
    newHsaClassDetails.classId = classId;
    newHsaClassDetails.hsaAccountTypeId = null;
    newHsaClassDetails.excludeDental = false;
    newHsaClassDetails.excludeDrug = false;
    newHsaClassDetails.excludeExtendedHealth = false;
    newHsaClassDetails.excludeVision = false;
    newHsaClassDetails.id = 0;

    return newHsaClassDetails;
}