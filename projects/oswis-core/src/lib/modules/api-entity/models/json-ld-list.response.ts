export class JsonLdListResponse<Type> {
  '@context': string;
  '@id'?: string | number;
  '@type'?: string;
  'hydra:member'?: Type[];
  'hydra:search'?: any;
  'hydra:totalItems'?: number;
  'hydra:view'?: any;
}
