import {HttpStatusCodeModel} from "../models/http-status-code.model";

export const HTTP_STATUS_CODES = {
  200: new HttpStatusCodeModel(
    200,
    'OK',
  ),
  204: new HttpStatusCodeModel(
    204,
    'No Content',
  ),
  500: new HttpStatusCodeModel(
    500,
    'Internal Server Error',
    'Chyba serveru'
  ),
  400: new HttpStatusCodeModel(
    400,
    'Bad Request',
    'Špatný požadavek'
  ),
  404: new HttpStatusCodeModel(
    404,
    'Not Found',
    'Nenalezeno'
  ),
  403: new HttpStatusCodeModel(
    403,
    'Forbidden',
    'Přístup odepřen'
  ),
};

export function getHttpStatusCode(code: number = null): HttpStatusCodeModel {
  return HTTP_STATUS_CODES[code] || null;
}
