import {JsonLdHydraMapping} from "./json-ld-hydra.mapping";

export class JsonLdListResponse<Type> {
  '@context': string;
  '@id'?: string | number;
  '@type'?: string;
  'hydra:member'?: Type[];
  'hydra:search'?: {
    '@type': string;
    'hydra:mapping': JsonLdHydraMapping[];
    'hydra:template': string;
    'hydra:variableRepresentation': string;
  };
  'hydra:totalItems'?: number;
  'hydra:view'?: any;
}
