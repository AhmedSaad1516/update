import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  mockAddresses =  {
    verified: false,
    attachmentIds: [],
    id: 1,
    shortAddress: "BCDL4185",
    buildingNumber: "4185",
    street: "anas ibn malek",
    subNumber: "4185",
    district: "Malqa",
    postalCode: "77852",
    city: "Riyadh",
    country: "KSA"
}

  getMockAddresses() {
    return {
      addresses: this.mockAddresses
    };
  }
}