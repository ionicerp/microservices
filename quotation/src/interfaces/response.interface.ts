export interface IResponse<T = any> {
  message: string;
  status: 'success' | 'error';
  data?: T | T[];
}
