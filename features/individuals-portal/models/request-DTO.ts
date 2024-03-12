import { Lookup } from '@taqeem-workspace/general-lib';

export interface RequestDTO {
  id?: string;
  applicationNumber?: string;
  valuationTitle?: string;
  applicationStatus?: ApplicationStatus;
  purposeValuationCode?: string;
  purposeValuation?: Lookup | undefined;
  applicationType?: string;
  customerId: number;
  cancellationDurationValuationDate?: Date;
  description?: string;
  isOneAsset?: boolean;
  isDynamic?: boolean;
  automaticSelectionOfferDuration?: number;
  reportDeliveryDate?: Date;
  numberOfReports?: number;
}

export interface ApplicationStatus {
  title?: string;
  code?: string;
}
