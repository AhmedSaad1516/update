import { Lookup } from '@taqeem-workspace/general-lib';

export interface AssetInformation {
  uuid?: string;
  applicationNumber?: string;
  ownershipNumber?: number;
  ownershipFilePath?: string;
  realestateTypeCode?: string;
  realestateType?: Lookup;
  realestateUsageCode?: string;
  realestateUsage?: Lookup;
  realestateTypeName?: string;
  realestateUsageName?: string;
  realestateAgeDays?: number;
  realestateArea?: string;
  googleFullAddress?: JSON;
  locationX?: string;
  locationY?: string;
  googleCountryName?: string;
  googleRegionName?: string;
  googleCityName?: string;
  googleDistrictName?: string;
  googleSearchText?: string;
  googleExtraInfo?: string;

  googleStreetName?: string;
  googleStreetNumber?: string;
  googlePostalCode?: string;
  googleBuildingNumber?: string;
}
