export interface Company {
  id: number;
  companyName: string;
  yearEndDate: Date;
  groupTerminationDate: Date;
  commencementDate: Date;
  includeHsaClaims: boolean;
  includeCostPlusClaims: boolean;
}

