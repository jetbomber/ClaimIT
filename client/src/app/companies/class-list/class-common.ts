import { Class } from "src/app/_models/class";

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