export interface IApiResponse<T = any> {
  data: T;
  isSuccess: boolean;
  isWarning: boolean;
  isError: boolean;
  statusMessage: string;
  validationErrors: string[];
  pagination: any
}




