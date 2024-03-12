import { Lookup } from '@taqeem-workspace/general-lib';
import { ValuationRequestInformation } from '../models/valuation-request-information';

export const purposeValuationList: Lookup[] = [
  {
    id: 1,
    code: 'EVALUATION_REASON_BUY',
    nameAr: 'الشراء',
    nameEn: 'Buy',
    parentId: 0,
    hintEn: 'For Buying Purpose',
    hintAr: 'غرض البيع ',
    domainName: {
      title: 'EVALUATION_REASON',
      code: 'EVALUATION_REASON',
    },
  },
  {
    id: 2,
    code: 'EVALUATION_REASON_RENT',
    nameAr: 'الايجار',
    nameEn: 'Rent',
    parentId: 0,
    hintEn: 'For Rental Purpose',
    hintAr: 'غرض الايجار',
    domainName: {
      title: 'EVALUATION_REASON',
      code: 'EVALUATION_REASON',
    },
  },
  {
    id: 3,
    code: 'EVALUATION_REASON_INSURANCE',
    nameAr: 'التامين',
    nameEn: 'Insurance',
    parentId: 0,
    hintEn: 'For Insurance Purpose',
    hintAr: 'غرض التامين',
    domainName: {
      title: 'EVALUATION_REASON',
      code: 'EVALUATION_REASON',
    },
  },
  {
    id: 4,
    code: 'EVALUATION_REASON_INVESTMENT',
    nameAr: 'الاستثمار',
    nameEn: 'Investment',
    parentId: 0,
    hintEn: 'For Investment Purpose',
    hintAr: 'غرض الاستثمار',
    domainName: {
      title: 'EVALUATION_REASON',
      code: 'EVALUATION_REASON',
    },
  },
];

export const realestateTypeList: Lookup[] = [
  {
    id: 5,
    code: 'SUBJECT_AESSET_TYPE_BUILD',
    nameAr: 'مبني',
    nameEn: 'Built',
    parentId: 0,
    hintEn: 'For Buying Purpose',
    hintAr: 'مبني ',
    domainName: {
      title: 'SUBJECT_AESSET_TYPE',
      code: 'SUBJECT_AESSET_TYPE',
    },
  },
  {
    id: 6,
    code: 'SUBJECT_AESSET_TYPE_VACANT_LAND',
    nameAr: 'ارض فضاء',
    nameEn: 'Vacant land',
    parentId: 0,
    hintEn: 'For Rental Purpose',
    hintAr: 'ارض فضاء',
    domainName: {
      title: 'SUBJECT_AESSET_TYPE',
      code: 'SUBJECT_AESSET_TYPE',
    },
  },
];

export const realestateUsageList: Lookup[] = [
  {
    id: 7,
    code: 'USAGE_SUBJECT_AESSET_OTHER',
    nameAr: 'اخري',
    nameEn: 'Other',
    parentId: 0,
    hintEn: 'Other',
    hintAr: 'اخري',
    domainName: {
      title: 'USAGE_SUBJECT_AESSET',
      code: 'USAGE_SUBJECT_AESSET',
    },
  },
  {
    id: 8,
    code: 'USAGE_SUBJECT_AESSET_INVESTMENT',
    nameAr: 'الاستثمار',
    nameEn: 'Investment',
    parentId: 0,
    hintEn: 'For Investment Purpose',
    hintAr: 'غرض الاستثمار',
    domainName: {
      title: 'USAGE_SUBJECT_AESSET',
      code: 'USAGE_SUBJECT_AESSET',
    },
  },
  {
    id: 9,
    code: 'USAGE_SUBJECT_AESSET_RESIDENTIAL',
    nameAr: 'سكني',
    nameEn: 'Residential',
    parentId: 0,
    hintEn: 'For Residential Purpose',
    hintAr: 'غرض سكني',
    domainName: {
      title: 'USAGE_SUBJECT_AESSET',
      code: 'USAGE_SUBJECT_AESSET',
    },
  },
  {
    id: 10,
    code: 'USAGE_SUBJECT_AESSET_COMMERICAL',
    nameAr: 'تجاري',
    nameEn: 'Commercial',
    parentId: 0,
    hintEn: 'For Commercial Purpose',
    hintAr: 'غرض تجاري',
    domainName: {
      title: 'USAGE_SUBJECT_AESSET',
      code: 'USAGE_SUBJECT_AESSET',
    },
  },
];

export const valuationRequestInformationList: ValuationRequestInformation = {
  applicationRequestDTO: {
    valuationTitle: 'عنوان طلب التقييم',
    purposeValuationCode: '1',
    applicationType: 'Evaluation',
    customerId: 232323,
    cancellationDurationValuationDate: new Date(),
    description: '<p>وصف طلب التقييم</p>',
    isDynamic: false,
    automaticSelectionOfferDuration: 43,
    reportDeliveryDate: new Date(),
    numberOfReports: 3,
  },
  realEstateDTOList: [
    {
      ownershipNumber: 123,
      ownershipFilePath: 'Firefox_Screenshot_2023-12-12T12-09-45.024Z.png',
      realestateTypeCode: '6',
      realestateUsageCode: '8',
      realestateAgeDays: 43,
      realestateArea: '34',
      googleFullAddress: JSON.parse(
        '{"name": "John", "age": 30, "city": "New York"}'
      ),
      locationX: '24.7281679',
      locationY: '24.7281679',
      googleCountryName:
        'RFRA3447، 3447 المكلاة، 7502، الروضة، الرياض 13211، السعودية',
      googleCityName:
        'RFRA3447، 3447 المكلاة، 7502، الروضة، الرياض 13211، السعودية',
      googleDistrictName:
        'RFRA3447، 3447 المكلاة، 7502، الروضة، الرياض 13211، السعودية',
      googleSearchText:
        'RFRA3447، 3447 المكلاة، 7502، الروضة، الرياض 13211، السعودية',
      googleExtraInfo:
        'RFRA3447، 3447 المكلاة، 7502، الروضة، الرياض 13211، السعودية',
    },
    {
      ownershipNumber: 435,
      ownershipFilePath: 'Firefox_Screenshot_2023-12-12T12-09-14.154Z.png',
      realestateTypeCode: '6',
      realestateUsageCode: '39',
      realestateAgeDays: 43,
      realestateArea: '2345',
      googleFullAddress: JSON.parse(
        '{"name": "John", "age": 30, "city": "New York"}'
      ),
      locationX: '24.7281679',
      locationY: '24.7281679',
      googleCountryName:
        'RFRA3447، 3447 المكلاة، 7502، الروضة، الرياض 13211، السعودية',
      googleCityName:
        'RFRA3447، 3447 المكلاة، 7502، الروضة، الرياض 13211، السعودية',
      googleDistrictName:
        'RFRA3447، 3447 المكلاة، 7502، الروضة، الرياض 13211، السعودية',
      googleSearchText:
        'RFRA3447، 3447 المكلاة، 7502، الروضة، الرياض 13211، السعودية',
      googleExtraInfo:
        'RFRA3447، 3447 المكلاة، 7502، الروضة، الرياض 13211، السعودية',
    },
  ],
  applicationValuationOrganizationDTOList: [
    {
      valuationOrganizationId: 2,
    },
    {
      valuationOrganizationId: 4,
    },
  ],
};

export const valuationRequestInformationResult = {
  successful: true,
  data: {
    applicationNumber: '100202',
  },
  error: null,
};

export const googelAddress = {
  lat: 24.812609,
  long: 24.812609,
  address: {
    address_components: [
      {
        long_name: '2727',
        short_name: '2727',
        types: ['street_number'],
      },
      {
        long_name: 'RASA2727',
        short_name: 'RASA2727',
        types: ['premise'],
      },
      {
        long_name: 'طريق أنس ابن مالك',
        short_name: 'طريق أنس ابن مالك',
        types: ['route'],
      },
      {
        long_name: 'الصحافة',
        short_name: 'الصحافة',
        types: ['political', 'sublocality', 'sublocality_level_1'],
      },
      {
        long_name: 'الرياض',
        short_name: 'الرياض',
        types: ['locality', 'political'],
      },
      {
        long_name: 'امارة منطقة الرياض',
        short_name: 'امارة منطقة الرياض',
        types: ['administrative_area_level_2', 'political'],
      },
      {
        long_name: 'منطقة الرياض',
        short_name: 'منطقة الرياض',
        types: ['administrative_area_level_1', 'political'],
      },
      {
        long_name: 'السعودية',
        short_name: 'SA',
        types: ['country', 'political'],
      },
      {
        long_name: '13321',
        short_name: '13321',
        types: ['postal_code'],
      },
      {
        long_name: '8109',
        short_name: '8109',
        types: ['postal_code_suffix'],
      },
    ],
    formatted_address:
      'RASA2727، 2727 طريق أنس ابن مالك، 8109، الصحافة، الرياض 13321، السعودية',
    geometry: {
      location: {
        lat: 24.8126139,
        lng: 46.6296463,
      },
      location_type: 'ROOFTOP',
      viewport: {
        south: 24.8112649197085,
        west: 46.6282973197085,
        north: 24.8139628802915,
        east: 46.6309952802915,
      },
    },
    place_id: 'ChIJxWuBH33kLj4RO6FBvc9vAjg',
    plus_code: {
      compound_code: 'RJ7H+2V الصحافة، الرياض السعودية',
      global_code: '7HP8RJ7H+2V',
    },
    types: ['street_address'],
  },
};

export const sectorCardList = [
  {
    img: 'assets/img/realestate-img.svg',
    imgText: 'assets/img/realestate-text.svg',
    imgGama: 'assets/img/qaym-logo.svg',
    title: 'homepage.evaluationRealestate',
    paragraph: 'homepage.evaluationRealestateParagraph',
  },
  {
    img: 'assets/img/business-img.svg',
    imgText: 'assets/img/business-text.svg',
    imgGama: 'assets/img/qaym-logo.svg',
    title: 'homepage.evaluationBusiness',
    paragraph: 'homepage.evaluationBusinessParagraph',
  },
  {
    img: 'assets/img/metals-img.svg',
    imgText: 'assets/img/metals-text.svg',
    imgGama: 'assets/img/qaym-logo.svg',
    title: 'homepage.evaluationMetals',
    paragraph: 'homepage.evaluationMetalsParagraph',
  },
];

export const widgetCardList = [
  {
    name: 'viewEvaluationRequestRealestate.newRequests',
    value: '25',
    newValue: '',
  },
  {
    name: 'viewEvaluationRequestRealestate.offersReceived',
    value: '20',
    newValue: '3',
  },
  {
    name: 'viewEvaluationRequestRealestate.assignedRequests',
    value: '5',
    newValue: '',
  },
  {
    name: 'viewEvaluationRequestRealestate.PaidRequests',
    value: '30',
    newValue: '',
  },
  {
    name: 'viewEvaluationRequestRealestate.completedOffers',
    value: '100',
    newValue: '',
  },
  {
    name: 'viewEvaluationRequestRealestate.canceledRequests',
    value: '19',
    newValue: '',
  },
];

export const widgetCardListHome = [
  {
    name: 'viewEvaluationRequestRealestate.newRequests',
    value: '25',
    newValue: '',
  },
  {
    name: 'viewEvaluationRequestRealestate.offersReceived',
    value: '20',
    newValue: '3',
  },
  {
    name: 'viewEvaluationRequestRealestate.assignedRequests',
    value: '5',
    newValue: '',
  },
];

export const evaluatorsCardList = [
  {
    img: 'assets/img/qayem_img.png',
    title: 'evaluators.qaymServices',
    paragraph: 'evaluators.qaymServicesDescription',
  },
  {
    img: 'assets/img/evaluation_img.png',
    title: 'evaluators.valuationFacilities',
    paragraph: 'evaluators.valuationFacilitiesDescription',
  },
  {
    img: 'assets/img/inquire_img.png',
    title: 'evaluators.inquireAboutReport',
    paragraph: 'evaluators.inquireAboutReportDescription',
  },
];
export const stepperList = [
  {
    stepStatus: {
      title: 'Completed',
      code: 'Completed',
    },
    stepDto: {
      id: 'd5c6f2fb-ba71-7148-e053-0402300a4be6',
      code: 'ApplicationCreated',
      name: 'Application Created ',
      nameAr: 'ارسال طلب التقييم ',
      stepOrder: 1,
    },
  },
  {
    stepStatus: {
      title: 'Current',
      code: 'Current',
    },
    stepDto: {
      id: 'ec43afa4-3461-4d03-a7ea-d88f77bae8f0',
      code: 'WaitingOffers',
      name: 'Waiting Offers',
      nameAr: 'بانتظار العروض',
      stepOrder: 2,
    },
  },
  {
    stepStatus: {
      title: 'New',
      code: 'New',
    },
    stepDto: {
      id: '32fc3cb4-b61e-4f7f-ad53-a28c8fa9d0dd',
      code: 'PaymentPending',
      name: 'Wating Payment ',
      nameAr: 'با نتظار الدفع ',
      stepOrder: 3,
    },
  },
  {
    stepStatus: {
      title: 'New',
      code: 'New',
    },
    stepDto: {
      id: 'b8e0322b-c9d5-4bcf-85c3-bf16880104a1',
      code: 'PaymentProcessed',
      name: 'Payment Application  is Processed',
      nameAr: 'مدفوع',
      stepOrder: 4,
    },
  },
  {
    stepStatus: {
      title: 'New',
      code: 'New',
    },
    stepDto: {
      id: '67f94572-b003-48bc-8e61-688aecff09d2',
      code: 'WaitingCertification',
      name: 'Waiting Certification',
      nameAr: 'بانتظار الاعتماد',
      stepOrder: 5,
    },
  },
  {
    stepStatus: {
      title: 'New',
      code: 'New',
    },
    stepDto: {
      id: 'fe9732e5-f757-4fa1-b9fd-30c11d19969f',
      code: 'Completed',
      name: 'Completed',
      nameAr: 'مكتمل',
      stepOrder: 6,
    },
  },
];

export const availableAction = {
  successful: true,
  data: {
    accept_evaluation_offer: true,
    cancel_evaluation_offer: false,
    pay_evaluation_offer: true,
    certify_evaluation_report: false,
    print_evaluation_report: false,
  },
  requestContext: {
    username: null,
    roles: [],
    claims: [],
  },
};
