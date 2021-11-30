import axios from 'axios';

export const startVerify = (data: string) => axios.post('verify/start', { data });