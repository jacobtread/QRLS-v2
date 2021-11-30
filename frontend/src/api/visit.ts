import axios from 'axios';

export const markVisitVerified = (member: string) => axios.post('visits', { member });
export const markVisitGuest = (guestName: string) => axios.post('visits', { guestName });
export const clearMarkedVerified = (member: string) => axios.delete('visits', { data: { member } });
export const clearMarkedGuest = (guestName: string) => axios.delete('visits', { data: { guestName } });