import { SharedState } from './Shared/shared.state';
import { SHARED_STATE_NAME } from './Shared/shared.selector';
import { SharedReducer } from './Shared/shared.reducer';
import { LOOKUP } from '../screens/lookup-state/lookup.selector';
import { lookupState } from '../screens/lookup-state/lookup.state';
import { lookupReducer } from '../screens/lookup-state/lookup.reducer';
import { VALUATION_REQUEST_REALESTATE } from '../screens/state/valuation-request-realestate.selector';
import { valuationRequestRealestateState } from '../screens/state/valuation-request-realestate.state';
import { valuationRequestRealestateReducer } from '../screens/state/valuation-request-realestate.reducer';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [LOOKUP]: lookupState;
  [VALUATION_REQUEST_REALESTATE]: valuationRequestRealestateState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [LOOKUP]: lookupReducer,
  [VALUATION_REQUEST_REALESTATE]: valuationRequestRealestateReducer,
};
