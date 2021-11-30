const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

export const BASE_URL = env === 'development' ? 'http://localhost:3000/api' : '/api';
export const VACCINE_PASS_REGEX = /(NZCP:\/)(\d+)\/([A-Za-z2-7=]+)/