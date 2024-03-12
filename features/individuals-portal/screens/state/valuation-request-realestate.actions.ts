import { createAction, props } from '@ngrx/store';
import { ValuationRequestInformation } from '../../models/valuation-request-information';

export const FULL_VALUATION_REQUEST_REALESTATE =
  'full valuation request realestate';
export const ADD_VALUATION_REQUEST_REALESTATE =
  'add valuation request realestate';
export const ADD_VALUATION_REQUEST_REALESTATE_SUCCESS =
  'add valuation request realestate success';

export const LOAD_VALUATION_REQUEST_REALESTATE =
  'load valuation request realestate';
export const LOAD_VALUATION_REQUEST_REALESTATE_SUCCESS =
  'load valuation request realestate success';

export const fullValuationRequestRealestate = createAction(
  FULL_VALUATION_REQUEST_REALESTATE,
  props<{ valuationRequestInformation: ValuationRequestInformation }>()
);
export const addValuationRequestRealestate = createAction(
  ADD_VALUATION_REQUEST_REALESTATE,
  props<{ valuationRequestInformation: ValuationRequestInformation }>()
);
export const addValuationRequestRealestateSuccess = createAction(
  ADD_VALUATION_REQUEST_REALESTATE_SUCCESS,
  props<{ valuationRequestInformation: ValuationRequestInformation }>()
);

export const loadValuationRequestRealestate = createAction(
  LOAD_VALUATION_REQUEST_REALESTATE,
  props<{ appNumber: any }>()
);
export const loadValuationRequestRealestateSuccess = createAction(
  LOAD_VALUATION_REQUEST_REALESTATE_SUCCESS,
  props<{ valuationRequestInformation: ValuationRequestInformation }>()
);
