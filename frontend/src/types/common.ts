export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  data: T;
}

export interface ApiMessage {
  status: 'success' | 'fail' | 'error';
  message: string;
}
