import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AddEvaluationRequestRealestateService } from '../../services/add-evaluation-request-realestate.service';
import {
  addValuationRequestRealestate,
  addValuationRequestRealestateSuccess,
  loadValuationRequestRealestate,
  loadValuationRequestRealestateSuccess,
} from './valuation-request-realestate.actions';

@Injectable()
export class ValuationRequestRealestateEffects {
  constructor(
    private actions$: Actions,
    private addEvaluationRequestRealestateService: AddEvaluationRequestRealestateService
  ) {}

  addEvaluationRequestRealestate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addValuationRequestRealestate),
      mergeMap((action) => {
        return this.addEvaluationRequestRealestateService
          .postValuationRequestInformation(action.valuationRequestInformation)
          .pipe(
            map((data) => {
              const valuationRequestInformation = {
                ...action.valuationRequestInformation,
              };
              return addValuationRequestRealestateSuccess({
                valuationRequestInformation,
              });
            })
          );
      })
    );
  });

  loadEvaluationRequestRealestate$ = createEffect(() => {
    const appNumber: any = localStorage.getItem('appNumber');
    return this.actions$.pipe(
      ofType(loadValuationRequestRealestate),
      mergeMap((action) => {
        return this.addEvaluationRequestRealestateService
          .getValuationRequestInformation(action.appNumber)
          .pipe(
            map((valuationRequestInformation) => {
              return loadValuationRequestRealestateSuccess({
                valuationRequestInformation,
              });
            })
          );
      })
    );
  });
}
