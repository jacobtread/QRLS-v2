import axios from 'axios';
import { DateTime } from 'luxon';

export const markVisitVerified = (member: string, guestName: string) => axios.post('visits', { member, guestName });
export const markVisitGuest = (guestName: string) => axios.post('visits', { guestName });
export const clearMarkedVerified = (member: string) => axios.delete('visits', { data: { member } });
export const clearMarkedGuest = (guestName: string) => axios.delete('visits', { data: { guestName } });
export const getAllForDate = (date: DateTime) => axios.get<VisitList>('visits', { params: { date: date.toISODate() } });