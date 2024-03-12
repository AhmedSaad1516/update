import { Action, createReducer, on } from '@ngrx/store';
import { lookupState, initialState } from './lookup.state';
import {
  RealestatTypeSuccess,
  RealestatUsageSuccess,
  purposeValuationSuccess,
} from './lookup.actions';

const _lookupReducer = createReducer(
  initialState,
  on(purposeValuationSuccess, (state, action) => {
    return {
      ...state,
      purposeValuation: action.purposeValuation,
    };
  }),
  on(RealestatTypeSuccess, (state, action) => {
    return {
      ...state,
      realestateType: action.realestateType,
    };
  }),
  on(RealestatUsageSuccess, (state, action) => {
    return {
      ...state,
      realestateUsage: action.realestateUsage,
    };
  })
);
export function lookupReducer(state: lookupState | undefined, action: Action) {
  return _lookupReducer(state, action);
}
