export class JsonLdListResponse<Type> {
  '@context': string;
  '@id'?: string | number;
  '@type'?: string;
  'hydra:member'?: Type[];
  'hydra:search'?: {
    '@type': string;
    'hydra:mapping': {
      '@type': string;
      'property': string;
      'required': boolean;
      'variable': string;
    }[];
    'hydra:template': string;
    'hydra:variableRepresentation': string;
  };
  'hydra:totalItems'?: number;
  'hydra:view'?: any;
}
