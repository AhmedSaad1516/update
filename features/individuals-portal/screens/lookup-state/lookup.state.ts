import { Lookup } from '@taqeem-workspace/general-lib';

export interface lookupState {
  purposeValuation: Lookup[];
  realestateType: Lookup[];
  realestateUsage: Lookup[];
}

export const initialState: lookupState = {
  purposeValuation: [],
  realestateType: [],
  realestateUsage: [],
};
