import {JsonLdHydraMappingModel} from "./json-ld-hydra-mapping.model";

export class JsonLdListResponseModel<Type> {
  '@context': string;
  '@id'?: string | number;
  '@type'?: string;
  'hydra:member'?: Type[];
  'hydra:search'?: {
    '@type': string;
    'hydra:mapping': JsonLdHydraMappingModel[];
    'hydra:template': string;
    'hydra:variableRepresentation': string;
  };
  'hydra:totalItems'?: number;
  'hydra:view'?: any;
}
