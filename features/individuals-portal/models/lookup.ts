import { DomainName } from "./domain-name";

export interface Lookup {
    id?: number;
    code?: string;
    nameAr?: string;
    nameEn?: string;
    parentId?: number;
    hintEn?: string;
    hintAr?: string;
    domainName?: DomainName;
}
