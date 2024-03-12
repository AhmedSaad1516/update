import { AssetInformation } from "./asset-information";
import { RequestDTO } from "./request-DTO";
import { ValuationOrganization } from "./valuation-organization";

export interface ValuationRequestInformation {
    applicationRequestDTO: RequestDTO;
    applicationValuationOrganizationDTOList?: ValuationOrganization[];
    realEstateDTOList?: AssetInformation[]; 
}
