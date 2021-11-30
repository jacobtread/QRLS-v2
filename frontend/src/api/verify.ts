import axios from 'axios';
import { DateTime } from 'luxon';

export const startVerify = (data: string) => axios.post<VerifyDetails>('verify', { data });
export const confirmVerify = (data: string) => axios.post('verify/confirm', { data });
export const verifyU12 = (name: string, dob: DateTime) => axios.post('verify/u12', { name, dob: dob.toISODate() });

let verifiedList: VerifyList = [];
let verifiedListExpires = performance.now();

export const getList = async (): Promise<VerifyList> => {
  const now = performance.now();
  if (now > verifiedListExpires) {
    const { data } = await axios.get<VerifyList>('verify/list');
    verifiedListExpires = performance.now() + 10 * 60 * 1000;
    verifiedList = data;
    return data;
  } else {
    return verifiedList;
  }

};