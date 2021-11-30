import axios from 'axios';

export const startVerify = (data: string) => axios.post<VerifyDetails>('verify', { data });
export const confirmVerify = (data: string) => axios.post('verify/confirm', { data });