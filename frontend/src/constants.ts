const env = process.env.NODE_ENV === 'development' ? 'development' : 'production';

export const baseURL = env === 'development' ? 'http://localhost:3000/api' : '/api';