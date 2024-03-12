import { createFeatureSelector, createSelector } from '@ngrx/store';
import { lookupState } from './lookup.state';

export const LOOKUP = 'lookup';
const createState = createFeatureSelector<lookupState>(LOOKUP);

export const getPurposeValuation = createSelector(createState, (state) => {
  return state.purposeValuation;
});

export const getRealstateType = createSelector(createState, (state) => {
  return state.realestateType;
});

export const getrealestateUsage = createSelector(createState, (state) => {
  return state.realestateUsage;
});
