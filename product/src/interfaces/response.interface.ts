export interface IResponse {
  message: string;
  status: 'success' | 'error';
  data: any;
}
