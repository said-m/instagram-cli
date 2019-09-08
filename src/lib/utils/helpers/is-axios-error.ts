import { AxiosError } from 'axios';
import hasProperty from 'ts-has-property';

// tslint:disable-next-line: no-any
export const isAxiosError = (data: any): data is AxiosError => {
  try {
    return hasProperty({...data}, 'isAxiosError');
  } catch {
    return false;
  }
};
