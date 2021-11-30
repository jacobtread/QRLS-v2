import axios from 'axios';
import { DateTime } from 'luxon';

export const startVerify = (data: string) => axios.post<VerifyDetails>('verify', { data });
export const confirmVerify = (data: string) => axios.post('verify/confirm', { data });
export const verifyU12 = (name: string, dob: DateTime) => axios.post('verify/u12', { name, dob: dob.toISODate() });