import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
  export class UserApplicationMockService {
  jwtHelper = new JwtHelperService();
   token='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ5Qk9tdTdEM0t3dVFrWDkxakdWY1cyclJOaUpDUG5BN3d4bC10NjZvbXRvIn0.eyJleHAiOjE3MDkwMjcwOTgsImlhdCI6MTcwOTAyMzQ5OCwianRpIjoiODcwZjViOTctNzA4OS00OWExLThkNGUtN2Y1ZWU5MzEyOTBmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4NTg0L3JlYWxtcy9SRUxfVEFRRUVNIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImQyMmRiYjU2LTNmYTEtNDQzZS04NzVlLTk3MjIzYjVmMGFhNiIsInR5cCI6IkJlYXJlciIsImF6cCI6IkNMSV9NQVNURVIiLCJzZXNzaW9uX3N0YXRlIjoiNmQwMWQ2YjQtYjdlNy00NzEyLTg2ZDItN2I2NWQ1ZDI1M2VjIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1yZWxfdGFxZWVtX2RldiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJ0YXFlZW1Vc2VySWQgcmVnVHlwZSBwcm9maWxlIiwic2lkIjoiNmQwMWQ2YjQtYjdlNy00NzEyLTg2ZDItN2I2NWQ1ZDI1M2VjIiwidGFxZWVtVXNlcklkIjoib2Rvb1VzZXJJZFZhbHVlIiwiZ3JwLW1zIjpbIi9HUlBfSU5ESVZJRFVBTFMiXSwibmFtZSI6Im1vaGFtZWQgYWJkZWxmYWRpbCIsInByZWZlcnJlZF91c2VybmFtZSI6Im1pbW9hbWlyb3YiLCJnaXZlbl9uYW1lIjoibW9oYW1lZCIsImZhbWlseV9uYW1lIjoiYWJkZWxmYWRpbCIsInJlZ1R5cGUiOiJMSU5LIn0.oZzItIGVNKe2ezQ119xbjHEcLLunfX1UbfFjBt1wDrO7P9V8mkX4gd-DOWRTeAQ57FdQ6XxJAp3MXrJ3DW_wmbQQFZjK9cus6ts-fcsO96UDX1VAQ7-nKS2MRpmM98iZKO5nNaI6iwS6grHR1WgN1LtUKKLp0n55E9nkgE6Lm4eaztO2h-z1mC3WrTJq2-lR9IA8HRKzN8RAstRIIqknmEPcqkDvHnZpfbfuIDgksOApeIpVx4gukxlRe6S0vphfrJS9x5CvalwMdBzC5y3JET58gCwAHwQMx703-qeTrhBa0YgyjHwFME-bVntFYFSHPOql28whR1YIFTGUeVfZhA'
   private educationalCertificates: any[] = [];

   getUserApplication(){
    const mockData = {
      successful: true,
      data: {
        applicationType: 'VALUER',
        step: 'READY_TO_SUBMIT',
        addresses: [
            {
                "id": 1,
                "odooId": null,
                "verified": false,
                "attachmentIds": [
                    "edf124545",
                    "rq12565",
                    "1rew234"
                ],
                "shortAddress": "BCDL4185",
                "buildingNumber": "4185",
                "street": "anas ibn malek",
                "subNumber": "4185",
                "district": "Malqa",
                "postalCode": "77852",
                "city": "Riyadh",
                "country": "KSA",
                "spl": false
            },
            {
                "id": 3,
                "odooId": null,
                "verified": false,
                "attachmentIds": [
                    "gr3423",
                    "fr234"
                ],
                "shortAddress": "BCDL4185",
                "buildingNumber": "4185",
                "street": "anas ibn malek",
                "subNumber": "4185",
                "district": "Malqa",
                "postalCode": "77852",
                "city": "Riyadh",
                "country": "KSA",
                "spl": false
            },
            {
                "id": 4,
                "odooId": null,
                "verified": false,
                "attachmentIds": [],
                "shortAddress": "BCDL4185",
                "buildingNumber": "4185",
                "street": "anas ibn malek2",
                "subNumber": "4185",
                "district": "Malqa",
                "postalCode": "77852",
                "city": "Riyadh",
                "country": "KSA",
                "spl": false
            },
            {
                "id": 5,
                "odooId": null,
                "verified": false,
                "attachmentIds": [
                    "gr3423",
                    "fr234"
                ],
                "shortAddress": "BCDL4185",
                "buildingNumber": "4185",
                "street": "anas ibn malek",
                "subNumber": "4185",
                "district": "Malqa",
                "postalCode": "77852",
                "city": "Riyadh",
                "country": "KSA",
                "spl": false
            },
            {
                "id": 6,
                "odooId": null,
                "verified": false,
                "attachmentIds": [],
                "shortAddress": "BCDL4185",
                "buildingNumber": "4185",
                "street": "anas ibn malek2",
                "subNumber": "4185",
                "district": "Malqa",
                "postalCode": "77852",
                "city": "Riyadh",
                "country": "KSA",
                "spl": false
            },
            {
                "id": 7,
                "odooId": null,
                "verified": false,
                "attachmentIds": [
                    "gr3423",
                    "fr234"
                ],
                "shortAddress": "BCDL4185",
                "buildingNumber": "4185",
                "street": "anas ibn malek",
                "subNumber": "4185",
                "district": "Malqa",
                "postalCode": "77852",
                "city": "Riyadh",
                "country": "KSA",
                "spl": true
            },
            {
                "id": 8,
                "odooId": null,
                "verified": false,
                "attachmentIds": [],
                "shortAddress": "BCDL4185",
                "buildingNumber": "4185",
                "street": "anas ibn malek2",
                "subNumber": "4185",
                "district": "Malqa",
                "postalCode": "77852",
                "city": "Riyadh",
                "country": "KSA",
                "spl": true
            },
            {
                "id": 9,
                "odooId": null,
                "verified": false,
                "attachmentIds": [
                    "gr3423",
                    "fr234"
                ],
                "shortAddress": "BCDL4185",
                "buildingNumber": "4185",
                "street": "anas ibn malek",
                "subNumber": "4185",
                "district": "Malqa",
                "postalCode": "77852",
                "city": "Riyadh",
                "country": "KSA",
                "spl": true
            },
            {
                "id": 10,
                "odooId": null,
                "verified": false,
                "attachmentIds": [],
                "shortAddress": "BCDL4185",
                "buildingNumber": "4185",
                "street": "anas ibn malek2",
                "subNumber": "4185",
                "district": "Malqa",
                "postalCode": "77852",
                "city": "Riyadh",
                "country": "KSA",
                "spl": true
            }
        ],
        educationalCertificates: [
            {
                "id": 1,
                "odooId": null,
                "verified": false,
                "attachmentIds": [
                    "ed3",
                    "e42"
                ],
                "universityName": "uName2",
                "facultyName": "FCI2",
                "degree": "bachelor2",
                "major": "IT2",
                "minor": "IS2",
                "studyType": "IS2",
                "moe": true
            }
        ],
        globalCertificates: [
            {
                "id": 1,
                "odooId": null,
                "verified": false,
                "attachmentIds": [
                    "GC123",
                    "GC456"
                ],
                "name": "global 2",
                "sector": "sect2",
                "membershiptId": "55555",
                "issueDate": "2020-05-20"
            }
        ],
        profilePictures: [
            {
                "id": 1,
                "odooId": null,
                "verified": false,
                "attachmentIds": [
                    "pp34",
                    "pp1233"
                ]
            }
        ],
        otherAttachments: [
            {
                "id": 1,
                "odooId": null,
                "verified": false,
                "attachmentIds": [
                    "OA123",
                    "OA1233"
                ]
            }
        ],
      },
      error: null,
    };

    this.educationalCertificates = mockData.data.educationalCertificates
    // localStorage.setItem('educationalCertificates',JSON.stringify(this.educationalCertificates))
    return of(mockData);
  }
  addEducationalCertificate(certificate: any) {
    // this.getUserApplication()
    this.educationalCertificates.push(certificate);
  }
  updateEducationalCertificate(certificate: any) {
    // this.getUserApplication()
    const certificateIndex = this.educationalCertificates.findIndex(c => c.id === certificate.id);
  
    if (certificateIndex !== -1) {
      this.educationalCertificates[certificateIndex] = certificate;
      console.log('Certificate updated successfully!');
    } else {
      console.log('Certificate not found.');
    }
  }

  userDecodeJWT() {
    const user = this.token
    if (!user) {
      return false;
    }
    const token = this.jwtHelper.decodeToken(user);
    console.log('---------',token);
    return token;
  }
}