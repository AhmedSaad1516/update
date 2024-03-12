import { Action, createReducer, on } from '@ngrx/store';
import {
  initialState,
  valuationRequestRealestateState,
} from './valuation-request-realestate.state';
import {
  addValuationRequestRealestateSuccess,
  fullValuationRequestRealestate,
  loadValuationRequestRealestateSuccess,
} from './valuation-request-realestate.actions';

const _valuationRequestRealestateReducer = createReducer(
  initialState,
  on(fullValuationRequestRealestate, (state, action) => {
    let oneValuationRequestInformation = {
      ...action.valuationRequestInformation,
    };
    return {
      ...state,
      valuationRequestInformation: [oneValuationRequestInformation],
    };
  }),
  on(addValuationRequestRealestateSuccess, (state, action) => {
    let oneValuationRequestInformation = {
      ...action.valuationRequestInformation,
    };
    return {
      ...state,
      valuationRequestInformation: [oneValuationRequestInformation],
    };
  }),
  on(loadValuationRequestRealestateSuccess, (state, action) => {
    let oneValuationRequestInformation = {
      ...action.valuationRequestInformation,
    };
    return {
      ...state,
      valuationRequestInformation: [oneValuationRequestInformation],
    };
  })
);

export function valuationRequestRealestateReducer(
  state: valuationRequestRealestateState | undefined,
  action: Action
) {
  return _valuationRequestRealestateReducer(state, action);
}
