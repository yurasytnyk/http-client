import { ParsedParams } from "./data-parser-types";

export class DataParser {
  public static parseData<T>(body: T) {
    let processedData = null;

    if (typeof body === 'string') {
      const params = body.slice(body.indexOf('?') + 1).split('&');
      const parsedParams: ParsedParams = {};

      for (let i = 0; i < params.length; i++) {
        const param = params[i].split('=');
        parsedParams[param[0]] = decodeURIComponent(param[1]);
      }

      processedData = JSON.stringify(parsedParams);
    } else {
      processedData = JSON.stringify(body);
    }

    return processedData;
  }
}