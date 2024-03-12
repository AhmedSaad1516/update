import { ValuationRequestInformation } from '../../models/valuation-request-information';

export interface valuationRequestRealestateState {
  valuationRequestInformation: ValuationRequestInformation[];
}

export const initialState: valuationRequestRealestateState = {
  valuationRequestInformation: [],
};
