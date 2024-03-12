import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, finalize, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { inject } from '@angular/core';
import { SpinnerService } from '../../shared/services/spinner.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let activeRequests = 0;
  const spinner = inject(SpinnerService)
  activeRequests++;
  spinner.isLoading.next(true);
  // environment
  const baseUrl = environment.apiRoot;

  // const authToken =
  //   'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI1N0RCSEdkZlhfTG12NEhJTmhCQmc1eWJZeURQZE1hcTcyc294RUJNNzZBIn0.eyJleHAiOjE3MDQ5NzgxMjAsImlhdCI6MTcwNDk3NDUyMCwianRpIjoiNDY5YmQ2ODMtMGY1Zi00NDIzLWEyMDctMGYzZGQ2ZTdjZWVlIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLnRlc3RpbmcuY29tL2F1dGgvcmVhbG1zL1JFTF9UQVFFRU0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNDM5MjRiMGYtNDE0MS00Mzc1LWI5NmMtODEzM2VkZDU3ZDkxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiQ0xJX01BU1RFUiIsInNlc3Npb25fc3RhdGUiOiI5NGI0ZGUwZS03OTMxLTRiODQtYTJjNS1jY2U2MWZmMzMwNWUiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXJlbF90YXFlZW1fZGV2IiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX0sIkNMSV9NQVNURVIiOnsicm9sZXMiOlsiUk9MRV9FVkFMVUFUSU9OX0FQUExJQ0FUSU9OIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiOTRiNGRlMGUtNzkzMS00Yjg0LWEyYzUtY2NlNjFmZjMzMDVlIiwiZ3JwLW1zIjpbXSwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoic2hlaGFiIHRhcmVrIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2hlaGFiIiwiZ2l2ZW5fbmFtZSI6InNoZWhhYiIsImZhbWlseV9uYW1lIjoidGFyZWsiLCJlbWFpbCI6InNoZWhhYnNvZnQ5NEBnbWFpbC5jb20ifQ.4IbLA02av6S3iM_NIpj_OUYisrlTBhy7DKA2wMLPXuX_oV_4lYaW0zJhhD3lKBn2vcKOnl0g9A8SMu0-YXTu5OFHav_fU8SP7FNexoKkZcHFwgIj9Vf2ELehkGYV8mEw30EG3Xb_KYMltHo3x6lMkdKpgmKhAOd8CPfaon_BOOFp51bLD8xmR4mit7YA02FO_gClpB3pyVNdCIuKwcMY2yhKsArr7VPn9PRg7fkQ00P8N1_IJUlGRzNOgyjD6gJhYiDrYK1r9PUzlIJDc3SNoIuwq-vqplJJC9DgnGJZNffoBx3spRsQRDP7bDWO3Uaedrrm5vay-lYeo4TkiPcr0Q';
  let authToken = localStorage.getItem('access_token');
  let ContentType = 'application/json';
  if (authToken) ContentType = 'application/json';
  else ContentType = 'application/x-www-form-urlencoded';
  // authToken =
  //   'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ0S0dEZF9FNjItd2VMcERQdE9PUlBHTGFxNm55WUJtajBqMTBRRzVwU3pvIn0.eyJleHAiOjE3MDY3ODUzODMsImlhdCI6MTcwNjc4MTc4MywianRpIjoiMzRmNWVjMmYtYWU0Ni00MmE4LWIyM2QtZDljZWIyYTQzMDhkIiwiaXNzIjoiaHR0cDovLzEwLjAuNy4zODo4MDgwL3JlYWxtcy9SRUxfVEFRRUVNIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjYwMzg2YmY4LTlkYjMtNDdlMS04YzEzLWM4NWRjOGMxNWZkZCIsInR5cCI6IkJlYXJlciIsImF6cCI6IkNMSV9NQVNURVIiLCJzZXNzaW9uX3N0YXRlIjoiODczMDEwZmYtODlkNi00ZWU3LTk4MTktM2UyYzRhOTZkZjUwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1yZWxfdGFxZWVtX2RldiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19LCJDTElfTUFTVEVSIjp7InJvbGVzIjpbIlJPTEVfRVZBTFVBVElPTl9BUFBMSUNBVElPTiJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6Ijg3MzAxMGZmLTg5ZDYtNGVlNy05ODE5LTNlMmM0YTk2ZGY1MCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZ3JwLW1zIjpbXSwibmFtZSI6InNoZWhhYiB0YXJlayIsInByZWZlcnJlZF91c2VybmFtZSI6InNoZWhhYiIsImdpdmVuX25hbWUiOiJzaGVoYWIiLCJmYW1pbHlfbmFtZSI6InRhcmVrIiwiZW1haWwiOiJzaGVoYWJzb2Z0OTRAZ21haWwuY29tIn0.ezFhUesE8v4R0tTKnsOQW450HdJ9NsMxRuZQ1ahVf8YsNeyR0_Vq5xbEWqQzsKLimOuzDqW2mFjqHSF-5QtOPi-DW_AAsexiLCjYJnZhdwJ_mgaMILWrYsFRFmoB73ehEzIcTC58eMpGuQpd4Jua4RVLkeFTzoXB8lVauFv-1lLwXjVqdXuq8NKBCMvWrH3KJrRwGz20ZzzuUdsZjPdhicV2WNj5FhRAsqRiOax4fl91QFxg2MW9-f7HDVzZjWy9BWGZXvzAV7HX_Hzhj5pZwIgS8TFws9dj2yTGC3DAT-1LA-av_rVzARX5wLbD4QdFi-Xt404ZYus_N14veeRWSw';
  const reqCopy = req.clone({
    // url: `${baseUrl}`,
    headers: req.headers
      // .set('access-control-expose-headers', 'Authorization')
      // .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('AcceptLanguage', 'en')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Credentials', 'true'),
  });



  return next(reqCopy).pipe(
    map((event) => {
      return event;
    }),
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        spinner.isLoading.next(false);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error) {
        switch (error?.status) {
          case 0:
            errorMsg = 'errors.unknownError';
            break;
          case 400:
            return throwError(error);
            break;
          case 401:
            errorMsg = 'errors.unauthorized';
            break;
          case 403:
            errorMsg = 'errors.forbidden';
            break;
          case 404:
            errorMsg = 'errors.notFoundError';
            break;
          // case 409:
          //   return throwError(error);
          //   break;
          case 429:
            errorMsg = 'errors.tooManyRequests';
            break;
          case 500:
            errorMsg = 'errors.internalServerError';
            break;
          case 501:
            errorMsg = 'errors.notImplemented';
            break;
          case 502:
            errorMsg = 'errors.badGateway';
            break;
          case 503:
            errorMsg = 'errors.serviceUnavailable';
            break;
          case 504:
            errorMsg = 'errors.gatewayTimedOut';
            break;
          default:
            errorMsg = 'errors.unknownError';
            break;
        }
      }
      return throwError(errorMsg);
    })
  );
};
