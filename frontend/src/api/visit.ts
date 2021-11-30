import axios from 'axios';

export const markVisitVerified = (member: string) => axios.post('visits/verified', { member });