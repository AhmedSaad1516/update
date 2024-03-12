import { ValuationOrganization } from "./valuation-organization";

export interface ChoosingValuationOrganization {
    uuid?: string;
    applicationNumber: string;
    isDynamic: boolean;
    applicationValuationOrganizationDTOList?: ValuationOrganization[];
    automaticSelectionOfferDuration: number;
    reportDeliveryDate: Date;
    numberOfReports: number;
}
