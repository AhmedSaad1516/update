import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AddEvaluationRequestRealestateService } from '../../services/add-evaluation-request-realestate.service';
import {
  RealestatType,
  RealestatTypeSuccess,
  RealestatUsage,
  RealestatUsageSuccess,
  purposeValuation,
  purposeValuationSuccess,
} from './lookup.actions';

@Injectable()
export class LookupEffects {
  constructor(
    private actions$: Actions,
    private addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService
  ) {}

  purposeValuation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(purposeValuation),
      mergeMap(() => {
        return this.addEvaluationRequestRealestateService
          .getPurposeValuationLookup()
          .pipe(
            map((purposeValuation) => {
              return purposeValuationSuccess({ purposeValuation });
            })
          );
      })
    );
  });

  realstateType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RealestatType),
      mergeMap(() => {
        return this.addEvaluationRequestRealestateService
          .getRealestateTypeLookup()
          .pipe(
            map((realestateType) => {
              return RealestatTypeSuccess({ realestateType });
            })
          );
      })
    );
  });

  realstateUsage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RealestatUsage),
      mergeMap(() => {
        return this.addEvaluationRequestRealestateService
          .getRealestateUsageLookup()
          .pipe(
            map((realestateUsage) => {
              return RealestatUsageSuccess({ realestateUsage });
            })
          );
      })
    );
  });
}
