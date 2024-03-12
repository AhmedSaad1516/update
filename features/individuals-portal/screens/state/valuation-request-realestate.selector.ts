import { createFeatureSelector, createSelector } from '@ngrx/store';
import { valuationRequestRealestateState } from './valuation-request-realestate.state';

export const VALUATION_REQUEST_REALESTATE = 'valuationrequestrealestate';
const createState = createFeatureSelector<valuationRequestRealestateState>(
  VALUATION_REQUEST_REALESTATE
);

export const getValuationRequestRealestateState = createSelector(
  createState,
  (state) => {
    return state.valuationRequestInformation;
  }
);
