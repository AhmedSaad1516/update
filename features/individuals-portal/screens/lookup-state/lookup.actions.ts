import { createAction, props } from '@ngrx/store';
import { Lookup } from '@taqeem-workspace/general-lib';

export const PURPOSE_VALUATION = 'load purpose valuation lookup';
export const PURPOSE_VALUATION_SUCCESS =
  'load purpose valuation lookup success ';

export const REALESTATE_TYPE = 'load realestate type lookup';
export const REALESTATE_TYPE_SUCCESS = 'load realestate type lookup success ';

export const REALESTATE_USAGE = 'load realestate usage lookup';
export const REALESTATE_USAGE_SUCCESS = 'load realestate usage lookup success ';

export const purposeValuation = createAction(PURPOSE_VALUATION);
export const purposeValuationSuccess = createAction(
  PURPOSE_VALUATION_SUCCESS,
  props<{ purposeValuation: Lookup[] }>()
);

export const RealestatType = createAction(REALESTATE_TYPE);
export const RealestatTypeSuccess = createAction(
  REALESTATE_TYPE_SUCCESS,
  props<{ realestateType: Lookup[] }>()
);

export const RealestatUsage = createAction(REALESTATE_USAGE);
export const RealestatUsageSuccess = createAction(
  REALESTATE_USAGE_SUCCESS,
  props<{ realestateUsage: Lookup[] }>()
);
